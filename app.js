const STORAGE_KEY = "scatterbrain-prototype-state-v2";

const defaultState = {
  view: "dashboard",
  selectedProject: "structure",
  selectedNodeId: "structure-goal",
  structureMode: "roadmap",
  expandedBranches: {
    "structure:focus": true,
    "structure:design": true,
    "focus:system": true,
    "design:ui": true,
  },
  tasks: [
    { id: "cashflow", title: "Cashflow-Slot abschliessen", tag: "Heute", done: false },
    { id: "focus", title: "Aufbau-Block 90 Minuten", tag: "Fokus", done: false },
    { id: "parking", title: "Offene Ideen ins Parking legen", tag: "Ordnen", done: true },
  ],
  projectTasks: [
    { id: "tokens", title: "Design-Tokens finalisieren", tag: "Design", done: true },
    { id: "tabs", title: "Tab-Leiste als Muster definieren", tag: "UI", done: false },
    { id: "detail", title: "Detailansicht mit Meta-Infos bauen", tag: "Ebene 5", done: false },
  ],
  habits: [
    { id: "sport", title: "Sport", done: true },
    { id: "lesen", title: "Lesen", done: false },
    { id: "wasser", title: "Wasser", done: true },
  ],
  brainDump: [
    {
      id: "seed-1",
      category: "Idee",
      text: "Jede Information zuerst sammeln, danach als Aufgabe, Notiz oder Bereich einordnen.",
      createdAt: new Date().toISOString(),
    },
  ],
};

const projects = [
  {
    id: "structure",
    symbol: "SB",
    title: "Scatterbrain Konzept",
    status: "Leitprojekt",
    progress: 68,
    summary: "Roadmap fuer Brain Dump, Fokus, Projekte, Struktur und spaeteren Agenten-Layer.",
    detail:
      "Legt fest, wie rohe Gedanken in klare Bereiche, Quests und naechste Schritte uebersetzt werden.",
    goal: {
      id: "structure-goal",
      title: "Chaos in eine gefuehrte Umsetzungslogik verwandeln",
      summary:
        "Der Kern des Produkts: Capture zuerst, dann KI-gestuetztes Strukturieren, dann klare naechste Quest.",
      status: "Aktiv",
      nextStep: "Projekt- und Strukturansicht an eine gemeinsame Roadmap koppeln.",
      tasks: [
        "Roadmap statt starrer Kachel-Map zeigen",
        "Baumansicht an dieselbe Projektlogik anbinden",
      ],
      notes: [
        "Die App braucht weniger Parallelflaechen und mehr gefuehrte Priorisierung.",
      ],
      files: ["vision-notes.md"],
    },
    branches: [
      {
        id: "focus",
        title: "Fokuslogik",
        summary: "Weniger Kontextwechsel, klare Tagessteuerung, sichtbarer naechster Hebel.",
        progress: 74,
        owner: "System",
        nextStep: "Heute-Ansicht und Parking als ein gemeinsames Focus-Modul denken.",
        tasks: ["Tagesfokus schaerfen", "Nebensachen sichtbar parken"],
        notes: ["Ein Aufbau-Block sollte staerker als Quest erscheinen."],
        files: ["focus-rules.md"],
        quests: [
          {
            id: "focus-today",
            title: "Heute-Ansicht reduzieren",
            summary: "Nur Hauptblock, Nebenblock und Parking sichtbar halten.",
            status: "Aktiv",
            nextStep: "Task- und Habit-Module auf denselben Interaktionsstil bringen.",
            tasks: ["Komponenten vereinheitlichen", "Weniger Deko, mehr Klarheit"],
            notes: ["Der Nutzer will weniger Tool-Look, mehr Guidance."],
            files: ["today-wireframe.png"],
          },
          {
            id: "focus-parking",
            title: "Parking intelligent machen",
            summary: "Nebenideen sollen nicht verschwinden, aber auch nicht den Fokus stoeren.",
            status: "Offen",
            nextStep: "Parking mit Reaktivierungslogik versehen.",
            tasks: ["Sortierregeln definieren"],
            notes: ["Parking spaeter als Hermes-Eingang denkbar."],
            files: [],
          },
        ],
      },
      {
        id: "design",
        title: "Designsystem",
        summary: "Apple-inspirierte Ruhe mit schwarzem/lila Colorway und mehr Hierarchie.",
        progress: 61,
        owner: "UI",
        nextStep: "Quest-Module und Strukturansicht visuell angleichen.",
        tasks: ["Dichte reduzieren", "Roadmap lesbarer machen"],
        notes: ["Weniger blass, aber nicht ueberladen."],
        files: ["design-tokens.pdf"],
        quests: [
          {
            id: "design-roadmap",
            title: "Vertikale Quest-Roadmap bauen",
            summary: "Linie mit Knoten statt mehreren gleichwertigen Karten.",
            status: "Aktiv",
            nextStep: "Branch-Karten mit Progress-Ring und Unterquests koppeln.",
            tasks: ["Vertikale Linie", "Aktive Quest highlighten"],
            notes: ["Das ist die direkte Antwort auf die aktuelle UI-Ueberladung."],
            files: [],
          },
          {
            id: "design-tree",
            title: "Kleine Baumansicht als Alternative",
            summary: "Projektlogik in kompakter Form fuer Ziel > Ast > Blatt zeigen.",
            status: "Offen",
            nextStep: "Baum in Struktur-View rendern.",
            tasks: ["Tree-Layout", "Node-Selektion"],
            notes: [],
            files: [],
          },
        ],
      },
      {
        id: "system",
        title: "Systemlogik",
        summary: "Brain Dump, Projekte, Struktur und spaeter Hermes technisch verbinden.",
        progress: 48,
        owner: "Core",
        nextStep: "Datamodel fuer Inbox > Quest > Bereich festziehen.",
        tasks: ["Einheitliche Datenbasis", "Ausbaustufen definieren"],
        notes: ["Chatbot und Hermes existieren aktuell noch nicht als echte Features."],
        files: ["architecture.md"],
        quests: [
          {
            id: "system-brain",
            title: "Brain Dump in Quests uebersetzen",
            summary: "Aus rohen Eingaben sollen strukturierte Projektkarten entstehen.",
            status: "Offen",
            nextStep: "Parser-/Agentenfluss definieren.",
            tasks: ["Intent erkennen", "Projektzuordnung ermoeglichen"],
            notes: ["Hier waere spaeter die KI-Logik angeschlossen."],
            files: [],
          },
          {
            id: "system-hermes",
            title: "Hermes als Management-Layer definieren",
            summary: "Nicht als extra Spielzeug, sondern als Steuerlogik fuer Priorisierung.",
            status: "Geplant",
            nextStep: "Rollenbild und Eingriffsrechte dokumentieren.",
            tasks: ["Verantwortung klaeren"],
            notes: ["Aktuell gibt es dafuer noch keine App-Logik."],
            files: [],
          },
        ],
      },
    ],
  },
  {
    id: "focus",
    symbol: "FC",
    title: "Fokus-Layer",
    status: "Systemmodul",
    progress: 72,
    summary: "Tagesfokus, Anti-Verzettelung und Rueckfuehrung auf den groessten Hebel.",
    detail: "Konzentriert sich auf Routinen, Fokus-Meter, Tagesblock und Review-Schleifen.",
    goal: {
      id: "focus-goal",
      title: "Jeden Tag auf einen klaren Hebel reduzieren",
      summary: "Nicht mehr zehn gleich wichtige Inputs, sondern eine sichtbare Hauptbewegung.",
      status: "Aktiv",
      nextStep: "Fokus-Regeln in Wochen- und Tagesansicht durchziehen.",
      tasks: ["Tageslogik vereinheitlichen"],
      notes: [],
      files: [],
    },
    branches: [
      {
        id: "system",
        title: "Tagessteuerung",
        summary: "Blockt den Tag in Fokus, Support und Parking.",
        progress: 77,
        owner: "Fokus",
        nextStep: "Week-Board mit Fokus-Regeln verbinden.",
        tasks: ["Heute und Woche koppeln"],
        notes: [],
        files: [],
        quests: [
          {
            id: "system-board",
            title: "Wochenboard entschlacken",
            summary: "Wiederkehrende Aufgaben und Fokusbloecke klarer zeigen.",
            status: "Offen",
            nextStep: "Recurring-Logik als echte Daten, nicht statisch.",
            tasks: ["Recurring sichtbar machen"],
            notes: [],
            files: [],
          },
        ],
      },
      {
        id: "habits",
        title: "Basis-Habits",
        summary: "Soll Basisstabilitaet zeigen, nicht noch ein zweites To-do-System werden.",
        progress: 58,
        owner: "Routine",
        nextStep: "Habit-Komponente vereinfachen.",
        tasks: ["Status lesbarer machen"],
        notes: [],
        files: [],
        quests: [
          {
            id: "habits-minimal",
            title: "Habit-Liste minimieren",
            summary: "Checkbox + Signal statt eigener Mini-App.",
            status: "Offen",
            nextStep: "UI auf weniger Reibung trimmen.",
            tasks: ["Zeilen kompakter machen"],
            notes: [],
            files: [],
          },
        ],
      },
    ],
  },
  {
    id: "design",
    symbol: "DS",
    title: "Designsystem",
    status: "Visual Layer",
    progress: 54,
    summary: "Lila/schwarzer Glas-Look mit klarerer Hierarchie und weniger Flaechenrauschen.",
    detail: "Definiert Farben, Typografie, Karten, Linienfuehrung und visuelle Priorisierung.",
    goal: {
      id: "design-goal",
      title: "Weniger Deko, mehr visuelle Fuehrung",
      summary: "Das UI soll Entscheidungen beschleunigen, nicht neue Aufmerksamkeit ziehen.",
      status: "Aktiv",
      nextStep: "Roadmap- und Baumdarstellung vereinheitlichen.",
      tasks: ["Spacing beruhigen"],
      notes: [],
      files: ["style-reference.pdf"],
    },
    branches: [
      {
        id: "ui",
        title: "UI-Hierarchie",
        summary: "Groesse, Kontrast und Linien muessen Relevanz klar trennen.",
        progress: 63,
        owner: "Design",
        nextStep: "Content-Kompression in allen Hauptansichten angleichen.",
        tasks: ["Meta kleiner", "Quest-Karten dominanter"],
        notes: [],
        files: [],
        quests: [
          {
            id: "ui-density",
            title: "Informationsdichte reduzieren",
            summary: "Auf jedem Screen muessen 1-2 Sachen dominieren, nicht 8.",
            status: "Aktiv",
            nextStep: "Uebersichtsblende statt Kachelwand.",
            tasks: ["Sekundaere Infos in Listen schieben"],
            notes: [],
            files: [],
          },
        ],
      },
      {
        id: "motion",
        title: "Bewegung",
        summary: "Gezielte Animation fuer Kontextwechsel, nicht fuer Dekoration.",
        progress: 32,
        owner: "UX",
        nextStep: "Selection-State und Fokusquest visuell fuehren.",
        tasks: ["Node highlighten"],
        notes: [],
        files: [],
        quests: [
          {
            id: "motion-focus",
            title: "Aktive Quest hervorheben",
            summary: "Wie ein Quest-Marker im Spiel, aber ruhig gehalten.",
            status: "Geplant",
            nextStep: "Selection-State spaeter mit Animation ausbauen.",
            tasks: ["Pulse/Glow definieren"],
            notes: [],
            files: [],
          },
        ],
      },
    ],
  },
];

const week = [
  ["Mo", "Cashflow", "Aufbau-Block", "Habits"],
  ["Di", "Inbox ordnen", "Design", "Training"],
  ["Mi", "Deep Work", "Technik", "Notizen"],
  ["Do", "Heute-Plan", "Detailansicht", "Review"],
  ["Fr", "Abschluss", "Parking", "Reflexion"],
  ["Sa", "Leicht planen", "Sport", "Frei"],
  ["So", "Woche pruefen", "Reset", "Fokus"],
];

const metrics = [
  ["Produktive Stunden", "23h", "12% vs. letzte Woche"],
  ["Habits", "87%", "5 Tage stark"],
  ["Aktive Projekte", "3", "optimal"],
  ["Fokus", "72%", "stabil"],
  ["Aufgaben erledigt", "42", "18% mehr"],
  ["App Nutzung", "2h 45m", "ruhiger Verlauf"],
  ["Parking", "9", "kontrolliert"],
  ["Kontextwechsel", "4", "gesunken"],
];

const state = loadState();
ensureValidSelection();

const viewButtons = [...document.querySelectorAll("[data-view]")];
const views = [...document.querySelectorAll(".view")];
const navItems = [...document.querySelectorAll(".nav-item")];
const tabPills = [...document.querySelectorAll(".tab-pill")];
const zoomItems = [...document.querySelectorAll(".zoom-item")];
const projectGrid = document.querySelector("#projectGrid");
const projectTemplate = document.querySelector("#projectCardTemplate");
const todayTasks = document.querySelector("#todayTasks");
const projectTasks = document.querySelector("#projectTasks");
const habitList = document.querySelector("#habitList");
const detailContent = document.querySelector("#detailContent");
const brainDumpList = document.querySelector("#brainDumpList");
const weekBoard = document.querySelector("#weekBoard");
const metricGrid = document.querySelector("#metricGrid");
const brainForm = document.querySelector("#brainForm");
const brainInput = document.querySelector("#brainInput");
const brainCategory = document.querySelector("#brainCategory");
const brainFormLarge = document.querySelector("#brainFormLarge");
const brainInputLarge = document.querySelector("#brainInputLarge");
const brainCategoryLarge = document.querySelector("#brainCategoryLarge");
const clearBrainForm = document.querySelector("#clearBrainForm");
const clearBrainDump = document.querySelector("#clearBrainDump");
const projectTabs = [...document.querySelectorAll("[data-project-panel]")];
const projectPanels = [...document.querySelectorAll(".project-panel")];
const projectSymbol = document.querySelector("#projectSymbol");
const projectTitle = document.querySelector("#projectTitle");
const projectSummary = document.querySelector("#projectSummary");
const projectRoadmap = document.querySelector("#projectRoadmap");
const structureTree = document.querySelector("#structureTree");
const structureCanvas = document.querySelector("#structureCanvas");
const structureContentTitle = document.querySelector("#structureContentTitle");
const structureContentTabs = document.querySelector("#structureContentTabs");
const structureContentTable = document.querySelector("#structureContentTable");
const structureModeButtons = [...document.querySelectorAll("[data-structure-mode]")];

render();

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

brainForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBrainDump(brainInput.value, brainCategory.value);
  brainInput.value = "";
});

brainFormLarge.addEventListener("submit", (event) => {
  event.preventDefault();
  addBrainDump(brainInputLarge.value, brainCategoryLarge.value);
  brainInputLarge.value = "";
});

clearBrainForm.addEventListener("click", () => {
  brainInput.value = "";
  brainInput.focus();
});

clearBrainDump.addEventListener("click", () => {
  state.brainDump = [];
  persist();
  renderBrainDump();
});

projectTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const panelName = button.dataset.projectPanel;
    projectTabs.forEach((tab) => tab.classList.toggle("active", tab === button));
    projectPanels.forEach((panel) => {
      panel.classList.toggle("active-project-panel", panel.id === `project-${panelName}`);
    });
  });
});

structureModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.structureMode = button.dataset.structureMode;
    persist();
    renderStructure();
  });
});

function setView(view) {
  state.view = view;
  persist();
  renderActiveView();
}

function render() {
  renderActiveView();
  renderProjects();
  renderProjectHeader();
  renderProjectOverview();
  renderTasks(todayTasks, state.tasks);
  renderTasks(projectTasks, state.projectTasks);
  renderHabits();
  renderDetail();
  renderBrainDump();
  renderWeek();
  renderMetrics();
  renderStructure();
}

function renderActiveView() {
  views.forEach((view) => {
    view.classList.toggle("active-view", view.id === state.view);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === state.view);
  });

  tabPills.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === state.view);
  });

  zoomItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === state.view);
  });
}

function renderProjects() {
  projectGrid.replaceChildren();

  projects.forEach((project) => {
    const fragment = projectTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".project-card");
    const title = fragment.querySelector("strong");
    const status = fragment.querySelector("small");
    const progress = fragment.querySelector(".progress-track span");

    card.classList.toggle("selected", project.id === state.selectedProject);
    title.textContent = project.title;
    status.textContent = project.status;
    progress.style.width = `${project.progress}%`;
    card.addEventListener("click", () => {
      setSelectedProject(project.id);
      setView("projects");
    });

    projectGrid.appendChild(fragment);
  });
}

function renderProjectHeader() {
  const project = getSelectedProject();
  projectSymbol.textContent = project.symbol;
  projectTitle.textContent = project.title;
  projectSummary.textContent = project.summary;
}

function renderProjectOverview() {
  const project = getSelectedProject();
  const selectedNode = getNodeDetails(project, state.selectedNodeId);

  projectRoadmap.replaceChildren();

  const intro = document.createElement("div");
  intro.className = "roadmap-intro";
  intro.innerHTML = `
    <div>
      <p class="micro-label">Quest-Ansicht</p>
      <h3>${project.goal.title}</h3>
      <p>${project.goal.summary}</p>
    </div>
    <button class="ghost-button" type="button">Struktur oeffnen</button>
  `;
  intro.querySelector("button").addEventListener("click", () => setView("structure"));
  projectRoadmap.appendChild(intro);

  const roadmap = document.createElement("div");
  roadmap.className = "quest-roadmap";

  const goalCard = document.createElement("button");
  goalCard.type = "button";
  goalCard.className = "goal-banner";
  goalCard.classList.toggle("selected", selectedNode.id === project.goal.id);
  goalCard.innerHTML = `
    <span class="goal-badge">Ziel</span>
    <strong>${project.goal.title}</strong>
    <small>${project.goal.nextStep}</small>
  `;
  goalCard.addEventListener("click", () => selectNode(project.id, project.goal.id));
  roadmap.appendChild(goalCard);

  project.branches.forEach((branch) => {
    roadmap.appendChild(createBranchStage(project, branch));
  });

  projectRoadmap.appendChild(roadmap);
}

function createBranchStage(project, branch) {
  const selectedNode = getNodeDetails(project, state.selectedNodeId);
  const branchSelected =
    selectedNode.id === branch.id || branch.quests.some((quest) => quest.id === selectedNode.id);
  const expanded = isBranchExpanded(project.id, branch.id);

  const stage = document.createElement("article");
  stage.className = "roadmap-stage";
  if (branchSelected) {
    stage.classList.add("selected");
  }

  const rail = document.createElement("div");
  rail.className = "stage-rail";
  rail.innerHTML = `
    <span class="stage-dot"></span>
    <span class="stage-line"></span>
  `;

  const content = document.createElement("div");
  content.className = "stage-content";

  const branchCard = document.createElement("div");
  branchCard.className = "branch-card";
  branchCard.innerHTML = `
    <button class="branch-main" type="button">
      <span class="progress-ring" style="--progress:${branch.progress}%">
        <span>${branch.progress}%</span>
      </span>
      <span class="branch-copy">
        <span class="branch-kicker">${branch.owner}</span>
        <strong>${branch.title}</strong>
        <small>${branch.summary}</small>
      </span>
    </button>
    <div class="branch-actions">
      <span class="branch-next">${branch.nextStep}</span>
      <button class="branch-toggle" type="button" aria-label="Unterquests umschalten">
        ${expanded ? "▾" : "▸"}
      </button>
    </div>
  `;

  branchCard.querySelector(".branch-main").addEventListener("click", () => {
    selectNode(project.id, branch.id);
  });
  branchCard.querySelector(".branch-toggle").addEventListener("click", () => {
    toggleBranch(project.id, branch.id);
  });
  content.appendChild(branchCard);

  if (expanded) {
    const questList = document.createElement("div");
    questList.className = "quest-list";

    branch.quests.forEach((quest) => {
      const questButton = document.createElement("button");
      questButton.type = "button";
      questButton.className = "quest-chip";
      questButton.classList.toggle("selected", selectedNode.id === quest.id);
      questButton.innerHTML = `
        <span class="quest-status ${toClassName(quest.status)}">${quest.status}</span>
        <strong>${quest.title}</strong>
        <small>${quest.summary}</small>
      `;
      questButton.addEventListener("click", () => {
        selectNode(project.id, quest.id);
      });
      questList.appendChild(questButton);
    });

    content.appendChild(questList);
  }

  stage.append(rail, content);
  return stage;
}

function renderTasks(container, tasks) {
  container.replaceChildren();

  tasks.forEach((task) => {
    const row = document.createElement("div");
    row.className = "task-row";
    row.classList.toggle("done", task.done);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.setAttribute("aria-label", task.done ? "Als offen markieren" : "Als erledigt markieren");
    toggle.addEventListener("click", () => {
      task.done = !task.done;
      persist();
      renderTasks(container, tasks);
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = task.tag;

    row.append(toggle, title, tag);
    container.appendChild(row);
  });
}

function renderHabits() {
  habitList.replaceChildren();

  state.habits.forEach((habit) => {
    const row = document.createElement("div");
    row.className = "habit-row";
    row.classList.toggle("done", habit.done);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.setAttribute("aria-label", habit.done ? "Habit offen markieren" : "Habit erledigen");
    toggle.addEventListener("click", () => {
      habit.done = !habit.done;
      persist();
      renderHabits();
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = habit.title;

    const meta = document.createElement("span");
    meta.className = "task-meta";
    meta.textContent = habit.done ? "done" : "offen";

    row.append(toggle, title, meta);
    habitList.appendChild(row);
  });
}

function renderDetail() {
  const project = getSelectedProject();
  const node = getNodeDetails(project, state.selectedNodeId);
  const metaRows = [
    ["Projekt", project.title],
    ["Ebene", node.kind],
    ["Status", node.status],
    ["Naechster Schritt", node.nextStep],
  ];

  detailContent.replaceChildren();

  const card = document.createElement("div");
  card.className = "detail-card";
  card.innerHTML = `
    <div class="status-pill">${node.kind}</div>
    <h3>${node.title}</h3>
    <p>${node.summary}</p>
  `;

  metaRows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "property";
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    card.appendChild(row);
  });

  if (node.tasks.length) {
    const block = document.createElement("div");
    block.className = "detail-sublist";
    block.innerHTML = `<span class="micro-label">Tasks</span>${node.tasks
      .map((task) => `<div class="detail-bullet">${task}</div>`)
      .join("")}`;
    card.appendChild(block);
  }

  detailContent.appendChild(card);
}

function addBrainDump(value, category) {
  const text = value.trim();
  if (!text) {
    return;
  }

  state.brainDump.unshift({
    id: crypto.randomUUID(),
    category,
    text,
    createdAt: new Date().toISOString(),
  });

  persist();
  renderBrainDump();
}

function renderBrainDump() {
  brainDumpList.replaceChildren();

  if (!state.brainDump.length) {
    const empty = document.createElement("p");
    empty.textContent = "Die Inbox ist leer. Der naechste rohe Gedanke darf hier rein.";
    brainDumpList.appendChild(empty);
    return;
  }

  state.brainDump.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "inbox-item";

    const content = document.createElement("div");
    const label = document.createElement("span");
    label.className = "tag";
    label.textContent = entry.category;
    const text = document.createElement("p");
    text.textContent = entry.text;
    content.append(label, text);

    const time = document.createElement("small");
    time.className = "task-meta";
    time.textContent = formatTime(entry.createdAt);

    item.append(content, time);
    brainDumpList.appendChild(item);
  });
}

function renderWeek() {
  weekBoard.replaceChildren();

  week.forEach((day, index) => {
    const column = document.createElement("div");
    column.className = "day-column";
    column.classList.toggle("today", index === 3);

    const title = document.createElement("h3");
    title.textContent = day[0];
    column.appendChild(title);

    day.slice(1).forEach((slot, slotIndex) => {
      const block = document.createElement("div");
      block.className = "slot";
      block.classList.toggle("focus", slotIndex === 1);
      block.textContent = slot;
      column.appendChild(block);
    });

    weekBoard.appendChild(column);
  });
}

function renderMetrics() {
  metricGrid.replaceChildren();

  metrics.forEach((metric, index) => {
    const card = document.createElement("article");
    card.className = "metric-card";
    card.innerHTML = `
      <span class="micro-label">${metric[0]}</span>
      <strong>${metric[1]}</strong>
      <p>${metric[2]}</p>
      <svg class="sparkline" viewBox="0 0 160 50" aria-hidden="true">
        <polyline points="${sparkPoints(index)}" />
      </svg>
    `;
    metricGrid.appendChild(card);
  });
}

function renderStructure() {
  renderStructureTree();
  renderStructureCanvas();
  renderStructureContent();

  structureModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.structureMode === state.structureMode);
  });
}

function renderStructureTree() {
  const project = getSelectedProject();
  const list = document.createElement("ul");
  list.className = "tree-list";

  const rootItem = document.createElement("li");
  const rootButton = document.createElement("button");
  rootButton.className = "tree-root";
  rootButton.type = "button";
  rootButton.textContent = project.title;
  rootButton.addEventListener("click", () => selectNode(project.id, project.goal.id));
  rootItem.appendChild(rootButton);

  const children = document.createElement("ul");
  project.branches.forEach((branch) => {
    const branchItem = document.createElement("li");
    const branchButton = document.createElement("button");
    branchButton.type = "button";
    branchButton.classList.toggle("active-tree-node", state.selectedNodeId === branch.id);
    branchButton.textContent = branch.title;
    branchButton.addEventListener("click", () => selectNode(project.id, branch.id));
    branchItem.appendChild(branchButton);

    const questList = document.createElement("ul");
    branch.quests.forEach((quest) => {
      const questItem = document.createElement("li");
      const questButton = document.createElement("button");
      questButton.type = "button";
      questButton.classList.toggle("active-tree-node", state.selectedNodeId === quest.id);
      questButton.textContent = quest.title;
      questButton.addEventListener("click", () => selectNode(project.id, quest.id));
      questItem.appendChild(questButton);
      questList.appendChild(questItem);
    });

    branchItem.appendChild(questList);
    children.appendChild(branchItem);
  });

  rootItem.appendChild(children);
  list.appendChild(rootItem);

  structureTree.replaceChildren(list);
}

function renderStructureCanvas() {
  const project = getSelectedProject();
  structureCanvas.replaceChildren();

  if (state.structureMode === "table") {
    const table = document.createElement("div");
    table.className = "structure-table";
    project.branches.forEach((branch) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "structure-table-row";
      row.innerHTML = `
        <strong>${branch.title}</strong>
        <span>${branch.quests.length} Quests</span>
        <small>${branch.nextStep}</small>
      `;
      row.addEventListener("click", () => selectNode(project.id, branch.id));
      table.appendChild(row);
    });
    structureCanvas.appendChild(table);
    return;
  }

  if (state.structureMode === "tree") {
    const tree = document.createElement("div");
    tree.className = "mini-tree";

    const crown = document.createElement("button");
    crown.type = "button";
    crown.className = "mini-tree-goal";
    crown.textContent = project.goal.title;
    crown.addEventListener("click", () => selectNode(project.id, project.goal.id));
    tree.appendChild(crown);

    const branches = document.createElement("div");
    branches.className = "mini-tree-branches";
    project.branches.forEach((branch) => {
      const branchWrap = document.createElement("div");
      branchWrap.className = "mini-tree-branch";

      const branchButton = document.createElement("button");
      branchButton.type = "button";
      branchButton.className = "mini-tree-node";
      branchButton.textContent = branch.title;
      branchButton.addEventListener("click", () => selectNode(project.id, branch.id));
      branchWrap.appendChild(branchButton);

      const leaves = document.createElement("div");
      leaves.className = "mini-tree-leaves";
      branch.quests.forEach((quest) => {
        const leaf = document.createElement("button");
        leaf.type = "button";
        leaf.className = "mini-tree-leaf";
        leaf.textContent = quest.title;
        leaf.addEventListener("click", () => selectNode(project.id, quest.id));
        leaves.appendChild(leaf);
      });
      branchWrap.appendChild(leaves);
      branches.appendChild(branchWrap);
    });
    tree.appendChild(branches);
    structureCanvas.appendChild(tree);
    return;
  }

  const roadmap = document.createElement("div");
  roadmap.className = "structure-roadmap";
  project.branches.forEach((branch) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "structure-roadmap-card";
    card.innerHTML = `
      <span class="tag">${branch.owner}</span>
      <strong>${branch.title}</strong>
      <small>${branch.summary}</small>
    `;
    card.addEventListener("click", () => selectNode(project.id, branch.id));
    roadmap.appendChild(card);
  });
  structureCanvas.appendChild(roadmap);
}

function renderStructureContent() {
  const project = getSelectedProject();
  const node = getNodeDetails(project, state.selectedNodeId);
  const counts = [
    ["Tasks", node.tasks.length],
    ["Notizen", node.notes.length],
    ["Dateien", node.files.length],
    ["Meta", 4],
  ];

  structureContentTitle.textContent = node.title;
  structureContentTabs.replaceChildren();
  counts.forEach(([label, count], index) => {
    const chip = document.createElement("span");
    chip.className = index === 0 ? "active" : "";
    chip.textContent = `${label} ${count}`;
    structureContentTabs.appendChild(chip);
  });

  structureContentTable.replaceChildren();
  buildNodeRows(project, node).forEach(([label, value]) => {
    const row = document.createElement("div");
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    structureContentTable.appendChild(row);
  });
}

function selectNode(projectId, nodeId) {
  state.selectedProject = projectId;
  state.selectedNodeId = nodeId;
  persist();
  renderProjects();
  renderProjectHeader();
  renderProjectOverview();
  renderDetail();
  renderStructure();
}

function setSelectedProject(projectId) {
  state.selectedProject = projectId;
  const project = getSelectedProject();
  if (!doesNodeBelongToProject(project, state.selectedNodeId)) {
    state.selectedNodeId = project.goal.id;
  }
  persist();
  renderProjects();
  renderProjectHeader();
  renderProjectOverview();
  renderDetail();
  renderStructure();
}

function toggleBranch(projectId, branchId) {
  const key = `${projectId}:${branchId}`;
  state.expandedBranches[key] = !isBranchExpanded(projectId, branchId);
  persist();
  renderProjectOverview();
}

function isBranchExpanded(projectId, branchId) {
  return state.expandedBranches[`${projectId}:${branchId}`] !== false;
}

function getSelectedProject() {
  return projects.find((project) => project.id === state.selectedProject) ?? projects[0];
}

function getNodeDetails(project, nodeId) {
  if (project.goal.id === nodeId) {
    return {
      id: project.goal.id,
      kind: "Ziel",
      title: project.goal.title,
      summary: project.goal.summary,
      status: project.goal.status,
      nextStep: project.goal.nextStep,
      tasks: project.goal.tasks,
      notes: project.goal.notes,
      files: project.goal.files,
    };
  }

  for (const branch of project.branches) {
    if (branch.id === nodeId) {
      return {
        id: branch.id,
        kind: "Bereich",
        title: branch.title,
        summary: branch.summary,
        status: `${branch.progress}%`,
        nextStep: branch.nextStep,
        tasks: branch.tasks,
        notes: branch.notes,
        files: branch.files,
      };
    }

    for (const quest of branch.quests) {
      if (quest.id === nodeId) {
        return {
          id: quest.id,
          kind: "Quest",
          title: quest.title,
          summary: quest.summary,
          status: quest.status,
          nextStep: quest.nextStep,
          tasks: quest.tasks,
          notes: quest.notes,
          files: quest.files,
        };
      }
    }
  }

  return getNodeDetails(project, project.goal.id);
}

function doesNodeBelongToProject(project, nodeId) {
  if (project.goal.id === nodeId) {
    return true;
  }
  return project.branches.some(
    (branch) => branch.id === nodeId || branch.quests.some((quest) => quest.id === nodeId),
  );
}

function ensureValidSelection() {
  const project = getSelectedProject();
  if (!doesNodeBelongToProject(project, state.selectedNodeId)) {
    state.selectedNodeId = project.goal.id;
  }
}

function buildNodeRows(project, node) {
  const rows = [
    ["Projekt", project.title],
    ["Ebene", node.kind],
    ["Status", node.status],
    ["Naechster Schritt", node.nextStep],
  ];

  node.tasks.forEach((task) => rows.push(["Task", task]));
  node.notes.forEach((note) => rows.push(["Notiz", note]));
  node.files.forEach((file) => rows.push(["Datei", file]));

  return rows;
}

function toClassName(value) {
  return value.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
}

function sparkPoints(offset) {
  const sets = [
    "0,35 20,30 40,32 60,22 80,26 100,18 120,21 140,12 160,16",
    "0,30 20,24 40,28 60,20 80,18 100,16 120,14 140,19 160,12",
    "0,38 20,34 40,26 60,30 80,20 100,24 120,18 140,20 160,15",
    "0,28 20,31 40,22 60,25 80,19 100,15 120,20 140,13 160,10",
  ];
  return sets[offset % sets.length];
}

function formatTime(iso) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return structuredClone(defaultState);
    }

    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      expandedBranches: {
        ...structuredClone(defaultState).expandedBranches,
        ...(parsed.expandedBranches ?? {}),
      },
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
