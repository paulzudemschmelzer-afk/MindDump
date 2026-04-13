const STORAGE_KEY = "mind-dump-entries";
const DRAFT_KEY = "mind-dump-draft";

const state = {
  entries: loadEntries(),
  filter: "all",
  search: "",
};

const entryForm = document.querySelector("#entryForm");
const titleInput = document.querySelector("#titleInput");
const contentInput = document.querySelector("#contentInput");
const tagsInput = document.querySelector("#tagsInput");
const starInput = document.querySelector("#starInput");
const clearDraftButton = document.querySelector("#clearDraftButton");
const draftState = document.querySelector("#draftState");
const entriesGrid = document.querySelector("#entriesGrid");
const emptyState = document.querySelector("#emptyState");
const template = document.querySelector("#entryTemplate");
const searchInput = document.querySelector("#searchInput");
const exportButton = document.querySelector("#exportButton");
const importInput = document.querySelector("#importInput");
const totalCount = document.querySelector("#totalCount");
const starredCount = document.querySelector("#starredCount");
const archivedCount = document.querySelector("#archivedCount");
const filterButtons = [...document.querySelectorAll("[data-filter]")];

hydrateDraft();
render();

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const content = contentInput.value.trim();
  if (!content) {
    contentInput.focus();
    return;
  }

  const entry = {
    id: crypto.randomUUID(),
    title: titleInput.value.trim() || deriveTitle(content),
    content,
    tags: parseTags(tagsInput.value),
    starred: starInput.checked,
    archived: false,
    createdAt: new Date().toISOString(),
  };

  state.entries.unshift(entry);
  persistEntries();
  resetForm();
  render();
});

[titleInput, contentInput, tagsInput, starInput].forEach((field) => {
  field.addEventListener("input", persistDraft);
  field.addEventListener("change", persistDraft);
});

clearDraftButton.addEventListener("click", () => {
  clearDraft();
  titleInput.focus();
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim().toLowerCase();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    render();
  });
});

exportButton.addEventListener("click", () => {
  const payload = JSON.stringify(state.entries, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mind-dump-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

importInput.addEventListener("change", async (event) => {
  const [file] = event.target.files ?? [];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const incoming = JSON.parse(text);
    if (!Array.isArray(incoming)) {
      throw new Error("Datei enthaelt keine Eintragsliste.");
    }

    state.entries = normalizeImportedEntries(incoming);
    persistEntries();
    render();
    draftState.textContent = "Import erfolgreich geladen.";
  } catch (error) {
    draftState.textContent = "Import fehlgeschlagen. Bitte JSON pruefen.";
  } finally {
    importInput.value = "";
  }
});

function render() {
  updateStats();
  updateFilters();

  const visibleEntries = getVisibleEntries();
  entriesGrid.replaceChildren();
  emptyState.hidden = visibleEntries.length > 0;

  visibleEntries.forEach((entry) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".entry-card");
    const date = fragment.querySelector(".entry-date");
    const title = fragment.querySelector(".entry-title");
    const content = fragment.querySelector(".entry-content");
    const tagList = fragment.querySelector(".tag-list");
    const starButton = fragment.querySelector(".star-button");
    const archiveButton = fragment.querySelector(".archive-button");
    const deleteButton = fragment.querySelector(".delete-button");

    date.textContent = formatDate(entry.createdAt);
    title.textContent = entry.title;
    content.textContent = entry.content;

    if (entry.tags.length) {
      entry.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "tag";
        chip.textContent = `#${tag}`;
        tagList.appendChild(chip);
      });
    } else {
      tagList.remove();
    }

    starButton.textContent = entry.starred ? "[*]" : "[ ]";
    starButton.classList.toggle("is-starred", entry.starred);
    starButton.setAttribute("aria-pressed", String(entry.starred));
    starButton.setAttribute("aria-label", entry.starred ? "Nicht mehr merken" : "Merken");
    starButton.addEventListener("click", () => toggleStar(entry.id));

    archiveButton.textContent = entry.archived ? "Reaktivieren" : "Archivieren";
    archiveButton.addEventListener("click", () => toggleArchive(entry.id));

    deleteButton.addEventListener("click", () => deleteEntry(entry.id));

    if (entry.archived) {
      card.style.opacity = "0.72";
    }

    entriesGrid.appendChild(fragment);
  });
}

function getVisibleEntries() {
  return state.entries.filter((entry) => {
    const matchesSearch = [entry.title, entry.content, entry.tags.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(state.search);

    const matchesFilter =
      state.filter === "all" ||
      (state.filter === "starred" && entry.starred) ||
      (state.filter === "active" && !entry.archived) ||
      (state.filter === "archived" && entry.archived);

    return matchesSearch && matchesFilter;
  });
}

function updateFilters() {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === state.filter);
  });
}

function updateStats() {
  totalCount.textContent = String(state.entries.length);
  starredCount.textContent = String(state.entries.filter((entry) => entry.starred).length);
  archivedCount.textContent = String(state.entries.filter((entry) => entry.archived).length);
}

function toggleStar(id) {
  state.entries = state.entries.map((entry) =>
    entry.id === id ? { ...entry, starred: !entry.starred } : entry,
  );
  persistEntries();
  render();
}

function toggleArchive(id) {
  state.entries = state.entries.map((entry) =>
    entry.id === id ? { ...entry, archived: !entry.archived } : entry,
  );
  persistEntries();
  render();
}

function deleteEntry(id) {
  state.entries = state.entries.filter((entry) => entry.id !== id);
  persistEntries();
  render();
}

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return seedEntries();
    }

    const parsed = JSON.parse(raw);
    return normalizeImportedEntries(parsed);
  } catch {
    return seedEntries();
  }
}

function persistEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.entries));
}

function persistDraft() {
  const draft = {
    title: titleInput.value,
    content: contentInput.value,
    tags: tagsInput.value,
    starred: starInput.checked,
  };

  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  draftState.textContent = "Entwurf lokal gesichert.";
}

function hydrateDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) {
      return;
    }

    const draft = JSON.parse(raw);
    titleInput.value = draft.title ?? "";
    contentInput.value = draft.content ?? "";
    tagsInput.value = draft.tags ?? "";
    starInput.checked = Boolean(draft.starred);
    draftState.textContent = "Gespeicherten Entwurf wiederhergestellt.";
  } catch {
    draftState.textContent = "Entwurf wird lokal gespeichert.";
  }
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
  starInput.checked = false;
  draftState.textContent = "Entwurf geloescht.";
}

function resetForm() {
  entryForm.reset();
  localStorage.removeItem(DRAFT_KEY);
  draftState.textContent = "Eintrag gespeichert. Entwurf ist leer.";
}

function deriveTitle(content) {
  return content.split(/\s+/).slice(0, 6).join(" ");
}

function parseTags(value) {
  return [...new Set(value.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
}

function formatDate(isoString) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
}

function normalizeImportedEntries(entries) {
  return entries
    .filter((entry) => entry && typeof entry === "object" && entry.content)
    .map((entry) => ({
      id: entry.id || crypto.randomUUID(),
      title: String(entry.title || deriveTitle(String(entry.content))),
      content: String(entry.content),
      tags: Array.isArray(entry.tags) ? entry.tags.map((tag) => String(tag)) : [],
      starred: Boolean(entry.starred),
      archived: Boolean(entry.archived),
      createdAt: entry.createdAt || new Date().toISOString(),
    }))
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
}

function seedEntries() {
  return [
    {
      id: crypto.randomUUID(),
      title: "Erster Kopf-Reset",
      content:
        "Ich will alles, was offen im Kopf liegt, einmal ungefiltert sammeln und spaeter entscheiden, was wirklich wichtig ist.",
      tags: ["start", "fokus"],
      starred: true,
      archived: false,
      createdAt: new Date().toISOString(),
    },
  ];
}
