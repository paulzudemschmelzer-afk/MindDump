# AGENTS.md — Anleitung für den Taurus Coding Agent

> Dieses Dokument richtet sich an den **Taurus** Agent (OpenClaw) und alle anderen
> KI-Agenten, die am MindDump-Repository arbeiten. Bitte vor jeder Änderung lesen.

---

## 1. Projekt-Übersicht

**MindDump** ist eine schlanke Single-File Web-App zur Verwaltung von Gedanken,
Aufgaben, Snippets und Kalender-Events. Die gesamte App liegt in **einer einzigen
HTML-Datei** mit eingebettetem CSS und JavaScript.

### Tech-Stack
- **Frontend:** Vanilla HTML / CSS / JavaScript (kein Build-Step)
- **Sync / Login:** Firebase (Auth + Firestore)
- **KI-Backend:** Groq API (Llama 3.1) für Text-Verarbeitung
- **Kalender:** Google Calendar API (OAuth)
- **Hosting:** GitHub Pages

### Repository-Struktur
```
MindDump/
├── MindDump.html      ← Die komplette App (HTML + CSS + JS in einer Datei)
├── LICENSE            ← CC BY-NC-ND 4.0
├── AGENTS.md          ← Diese Anleitung (für KI-Agenten)
└── CHANGELOG.md       ← Hier trägst du jede Änderung ein
```

---

## 2. Wo finde ich was in `MindDump.html`?

Die Datei ist ca. 1300 Zeilen lang. Grobe Orientierung:

| Bereich | Zeilen (ungefähr) | Inhalt |
|---|---|---|
| `<head>` + `<style>` | 1 – 270 | Meta-Tags, Firebase-Imports, gesamtes CSS |
| `<body>` | 280 – 460 | Sidebar, Tabs, Forms, Settings-Panels |
| `<script>` Datenmodell | 480 – 540 | Globale State-Variablen, Firestore-Helper |
| Auth / Firebase | 540 – 610 | Login, Logout, User-Sync |
| Tasks / Thoughts / Snippets | 610 – 1000 | CRUD, Render-Funktionen |
| Groq API Calls | 690 – 730 | Llama-Anfragen für Auto-Kategorisierung |
| Google Calendar | 1260 – 1320 | OAuth, Event-Sync |
| Settings / Init | 1180 – 1260 | Settings laden/speichern, App-Init |

> **Tipp:** Suche im Code mit `Grep` nach Funktionsnamen statt Zeilennummern,
> da sich diese durch Edits verschieben können.

---

## 3. Sicherheits-Regeln (KRITISCH)

### NIEMALS in den Code committen:
- API-Keys (Groq, OpenClaw, OpenAI, Anthropic, …)
- Auth-Tokens (Bearer-Tokens, Gateway-Tokens)
- Passwörter, Cookies, Session-IDs
- Firebase Admin SDK Credentials (das Frontend-`apiKey` ist okay, da public)
- OAuth Client Secrets
- Persönliche Daten von Nutzern aus Firestore

### Stattdessen:
- Tokens werden **vom Nutzer im Settings-Tab** der App eingegeben und in
  `localStorage` (lokal) bzw. Firestore (synchronisiert) gespeichert.
- Falls ein Default-Wert nötig ist: **leerer String `''`**, niemals ein
  echter Token-Wert.
- Beispiel-Werte in Placeholdern: `gsk_...`, `Bearer ...`, niemals echte
  Strings einsetzen.

### Vor jedem Commit prüfen:
```bash
# Suche nach typischen Secret-Patterns
grep -nE '(sk-[a-zA-Z0-9]{20,}|gsk_[a-zA-Z0-9]{20,}|[a-f0-9]{40,})' MindDump.html
```
Wenn dieser Befehl irgendetwas findet → **NICHT committen**, sondern erst
entfernen.

### Wenn du Logs / Outputs / Screenshots produzierst:
- Niemals den Inhalt von `localStorage`, `S.groqKey`, oder Tokens loggen
- Keine Firestore-Dokumente von Nutzern ausgeben
- Bei Debug-Outputs sensitive Felder maskieren (`***`)

### Historischer Vorfall:
Im April 2026 wurde versehentlich ein OpenClaw Auth Token als hardcoded
Fallback-Wert in `MindDump.html` committet (Commit `a31acec`). GitGuardian
hat den Leak erkannt. Der Token wurde rotiert und der Code bereinigt. Lesson
learned: **Niemals Tokens als Fallback hardcoden** — auch nicht "nur zum
Testen".

---

## 4. Coding-Konventionen

- **Sprache:** UI-Texte auf Deutsch, Code-Kommentare gemischt (DE/EN okay)
- **Stil:** Kompakte, einzeilige Funktionen wo möglich (siehe bestehende
  Datei). Keine zusätzlichen Formatter ausführen — der bestehende dichte
  Stil ist gewollt.
- **Keine externen Dependencies hinzufügen** außer es ist absolut nötig.
  Die App soll als Single-File deploybar bleiben.
- **CSS-Variablen** in `:root` benutzen (`--accent`, `--text`, etc.) statt
  Hex-Werte hardcoden.
- **State-Mutations** immer über `saveSettings()` / `D[...]` Helper, nicht
  direkt manipulieren.
- **Toasts** für User-Feedback: `toast('Text','ok'|'err')`.

---

## 5. Workflow für Änderungen

1. **Lesen vor Schreiben:** Datei oder relevanten Bereich erst mit Read-Tool
   anschauen, bevor du editierst.
2. **Kleine, fokussierte Edits:** Eine logische Änderung pro Commit.
3. **Lokal verifizieren:**
   - Datei im Browser öffnen (`file://` oder lokaler Webserver)
   - Browser-Konsole auf Errors checken
   - Mindestens den geänderten Tab/Feature manuell testen
4. **CHANGELOG.md aktualisieren** (siehe unten)
5. **Commit-Message:**
   - Kurze Zeile auf Deutsch oder Englisch, ≤ 70 Zeichen
   - Format: `<Bereich>: <Was geändert wurde>`
   - Beispiele: `Tasks: Fix Sortierung bei leerem Datum`,
     `CSS: Sidebar-Toggle auf Mobile`
6. **Push:** Auf den vereinbarten Branch (z.B. `main` oder Feature-Branch),
   niemals direkt auf `main` force-pushen.

### Branch-Strategie
- `main` — produktiv, GitHub Pages Deployment
- `claude/*` oder `taurus/*` — Feature-Branches für Agent-Arbeit
- Direkt auf `main` nur committen wenn der Nutzer das explizit erlaubt

---

## 6. Was du **NICHT** ohne Rückfrage tun solltest

- Den **Tech-Stack ändern** (z.B. ein Framework einführen, Build-Tool hinzufügen)
- **Dateien löschen** außer es ist Teil eines klar definierten Tasks
- **Firebase-Konfig** anfassen (Auth-Provider, Firestore-Rules)
- **Force-Push** auf `main`
- **Git-History umschreiben** (`filter-repo`, `rebase -i` auf gepushte Commits)
- **Dependencies** in `<script src="...">` Tags ändern (Firebase-Versionen etc.)
- **Externe Requests** an URLs die nicht zur App gehören
- **Persönliche Daten** des Nutzers aus Firestore lesen oder verarbeiten

Wenn unsicher → **fragen statt machen**.

---

## 7. CHANGELOG.md pflegen

Nach jeder Änderung **eine Zeile** in `CHANGELOG.md` eintragen:

```markdown
## [YYYY-MM-DD] — <kurzer Titel>
- **Geändert:** Was wurde verändert (Funktion / Bereich)
- **Warum:** Begründung in einem Satz
- **Agent:** Taurus (oder dein Name)
- **Commit:** <kurzer Commit-Hash>
```

Trage neue Einträge **oben** ein (neueste zuerst). Keine sensitiven Daten in
den Changelog-Einträgen — keine Tokens, keine User-Daten, keine Pfade zu
privaten Dateien.

---

## 8. Notfall-Kontakt

Wenn etwas schiefgeht (Token geleakt, Daten gelöscht, kaputter Commit auf `main`):
1. **Sofort stoppen** — keine weiteren Commits/Pushes
2. Den Vorfall im Chat dem Nutzer melden
3. Auf Anweisung warten

Lieber einmal zu viel fragen als einmal zu wenig.
