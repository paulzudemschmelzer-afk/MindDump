# Dead-Code-Bereinigung — MindDump.html

**Stack-Erkennung:** Single-file HTML/CSS/JS (vanilla, kein Build-System, kein `package.json`). Firebase/Google-APIs werden per CDN `<script src>` geladen. Kein npm/pip-Projekt → keine projekt-spezifischen Dead-Code-Tools (knip/depcheck/vulture) anwendbar.

**Eingesetzte Tools:**
- `eslint@8` (via `npx`) mit `no-unused-vars`, `no-unreachable`, `no-empty`, `no-fallthrough`, `no-constant-condition`, `no-dupe-keys/-args`, `no-self-compare`, `no-useless-return` u.a. gegen den extrahierten `<script>`-Inhalt
- Node-Skripte für CSS-Selektor-Audit (Klassen, IDs, Custom Properties, `@keyframes`) gegen den gesamten HTML/JS-Body
- Manuelles Grep als Fallback/Verifikation, da diese Codebasis fast ausschließlich über `onclick="funcName(...)"`-Strings in Template-Literalen aufruft — für ESLint unsichtbar. **Ergebnis:** von 146 durch ESLint als "unused" markierten Funktionen/Variablen waren 139 (95%) false positives (per Grep als tatsächlich genutzt verifiziert). Nur echte Grep-Bestätigung (0 Treffer außerhalb der Definition) zählt als Löschbeleg.

**Build/Test/App-Start:** kein Build-Schritt nötig. Verifikation = `node --check` auf den extrahierten Script-Inhalt (Syntax) + Laden der Seite im Browser (lokaler HTTP-Server) mit Konsolen-Fehler-Check + Durchklicken aller verbliebenen Tabs.

---

## Inventar

| Symbol/Datei | Kategorie | Nachweis | Aktion |
|---|---|---|---|
| `deleteSubcategory(kat, subName)` (Zeile 2122) | Duplikat ersetzter Implementierung | 0 Referenzen außer Definition; `deleteSubcategoryFromEl(el)` ist die aktuell per onclick genutzte, vollständigere Version (inkl. Kind-Key-Cleanup + Firebase-Sync) | löschen |
| `editKat(k)` (Zeile 2353) | Duplikat ersetzter Implementierung | 0 Referenzen außer Definition; `renameTaskCategory(key)` wird an 4 Stellen per onclick/oncontextmenu genutzt | löschen |
| `setQl`, `saveQuickLog`, `renderQlMiniChart`, `buildLineChart`, `_qlEnergie` + CSS `.quicklog-*`, `.ql-mini-chart`, `.linechart-*` | Unerreichbares Feature (Intraday-Quick-Log-Widget) | Einstiegspunkte `setQl`/`saveQuickLog` 0 Referenzen; Ziel-Elemente `#ql-mini-chart`/`#ql-saved`/`#ql-energie-btns` existieren nirgends im HTML → `renderQlMiniChart`/`buildLineChart` nur transitiv von toten Funktionen erreichbar | löschen |
| `showHcalTaskPicker`, `scheduleFromPicker`, `closeHcalPicker` + HTML-Panel `#hcal-task-picker` + CSS `.hcal-picker-*` | Duplikat ersetzter Implementierung (alte Bottom-Sheet-Task-Auswahl) | `showHcalTaskPicker` 0 Referenzen; `hcalLongPressStart` (aktiver Long-Press-Handler) ruft stattdessen `openQuickAddCal()` auf — `scheduleFromPicker`/`closeHcalPicker` nur noch von der toten `showHcalTaskPicker`-Ausgabe referenziert | löschen |
| `noteMode` (Zeile 1101) | Unbenutzte Variable | 1 Treffer total (nur Deklaration `let noteMode='type'`), nie gelesen/geschrieben — Relikt der alten Type/Draw-Modus-Trennung in Notizen, ersetzt durch Text+Zeichnung-Mischansicht | löschen |
| `DAYS` (Zeile 1129) | Unbenutzte Variable | 1 Treffer total — Relikt der entfernten Woche-Kalender-Funktion | löschen |
| `y` in `fmtDue()` (Destructuring) | Unbenutzte lokale Variable | ESLint (scope-aware): nur `m,d` aus `ds.split('-').map(Number)` tatsächlich verwendet | Destructuring auf `[,m,d]` kürzen |
| `todayStr` in `clearHeute()` | Unbenutzte lokale Variable | ESLint (scope-aware): deklariert, nie gelesen; Filter nutzt direkt `t.forToday` | Zeile löschen |
| `dragSourceDay`, `dragGrabOffsetMin`, `CAL_PX_PER_MIN` (in/um `dragTask()`) | Tote Berechnung in sonst lebendiger Funktion | Beide Variablen werden in `dragTask()` nur geschrieben, nirgends gelesen (die einzigen Leser — Woche-Drop-Handler — wurden in früherer Session entfernt); `CAL_PX_PER_MIN` wird nur noch für diese tote Berechnung gebraucht | Zuweisungen + Deklarationen löschen |
| CSS `.empty`, `.empty h3`, `.empty p`, `.empty-icon` | Verwaistes CSS (früherer Feature-Cleanup) | 0 Treffer für `class="empty` im gesamten Dokument — gehörte zu den bereits entfernten Features (Snippets/Thoughts/Uni/Stats/Finance) | löschen |
| CSS `.search-row`, `.search-input` | Verwaistes CSS | 0 Referenzen; gehörte zur entfernten Snippets-Suche, Notizen-Suche (`#notes-search`) nutzt keine Klasse | löschen |
| CSS `.dump-item` | Verwaistes CSS | 0 Referenzen (Sibling `.dump-check` ist aktiv und bleibt) | löschen |
| CSS `.topic-select-inline` (+ `label`-Regel) | Verwaistes CSS (Vorgänger-Klasse) | 0 Referenzen; direkt daneben steht `.dump-task-routing`, die aktuell für dasselbe UI-Muster genutzt wird (8 Referenzen) | löschen |
| CSS `.sleep-track-row` | Verwaistes CSS | 0 Referenzen; Kind-Elemente `.sleep-btn` sind aktiv, der umschließende Container hat im aktuellen HTML keine Klasse mehr | löschen |
| CSS `.hcal-drop-hint` | Verwaistes CSS | 0 Referenzen im HTML/JS | löschen |
| CSS `.note-canvas-wrap`, `.note-canvas-wrap.active` | Verwaistes CSS (alte Type/Draw-Modus-UI) | 0 Referenzen; gehört zusammen mit `noteMode` zur abgelösten Umschalt-Ansicht | löschen |
| CSS `.draw-toolbar`, `.draw-toolbar.active` | Verwaistes CSS | 0 Referenzen; aktuelle Zeichnen-Toolbar nutzt `.draw-size-btn`/`.nt-color-btn` | löschen |
| CSS `.heute-habit-check`, `:hover`, `.done`, `.minimal` | Verwaistes CSS (Vorgänger-Klasse) | 0 Referenzen; aktuelle Heute-Habits-Buttons nutzen `.hh-btn`/`.hh-btn-full`/`.hh-btn-min`/`.hh-btn-miss` | löschen |
| CSS `.habit-check-btn.done`, `.habit-check-btn.minimal-done` | Totes CSS (State wird nie gesetzt) | `renderHabitCard()` fügt nie `done`/`minimal-done` per classList/Template zum `.habit-check-btn`-Element hinzu — Checkin-Feedback läuft über `flashBtn()` + Toast, nicht über diese Klassen | löschen |
| CSS `.prio-high`, `.prio-medium`, `.prio-low` (englische Hälfte der Comma-Selektoren) | Verwaistes CSS (Sprachrelikt) | `pc = 'prio-'+(t.priority||'mittel').toLowerCase()` erzeugt ausschließlich die deutschen Werte `hoch/mittel/niedrig` — die englischen Klassennamen werden nie erzeugt | englische Selektor-Hälfte aus den 3 Comma-Regeln entfernen, deutsche bleibt |
| CSS `.subgoal-state.plain` | Totes CSS (Modifier wird nie gesetzt) | Beide Render-Zweige von `.subgoal-state` in `renderGoals()` nutzen ausschließlich die Basisklasse ohne `.plain` | löschen |
| CSS Custom Properties `--today-habits-soft`, `--today-intro-soft`, `--today-tasks-soft`, `--yellow` | Unbenutzte Design-Tokens | 0 `var(--name)`-Referenzen im gesamten Stylesheet; keine JS-seitige `getPropertyValue`-Nutzung | löschen |

### Geprüft, aber NICHT gelöscht (Unsicher-Liste / bewusst erhalten)

| Symbol | Grund |
|---|---|
| ~139 von ESLint als "unused" markierte Funktionen (z.B. `deleteHabit`, `renderGoals`, `createNote`, `toggleTask`, `setFinanceRange`-artige …) | Dynamische Referenz — ausschließlich per `onclick="name(...)"` in Template-Literalen aufgerufen, für statische Analyse unsichtbar. Per Grep einzeln verifiziert (>1 Treffer = Definition + mind. 1 Aufruf) |
| `.prio-hoch`, `.prio-mittel`, `.prio-niedrig`, `.kat-geld`, `.kat-haushalt`, `.kat-einkaufen`, `.kat-business`, `.kat-schule`, `.kat-tech`, `.kat-familie`, `.kat-sonstiges` | Dynamisch per Template-String gebaute Klassennamen (`'kat-'+kat`, `'prio-'+priority.toLowerCase()`) — Basis-Suche fand keinen Literal-Treffer, manuell im generierenden Code verifiziert: **aktiv genutzt** |
| `.habit-fill.hp`, `.habit-fill.strength`, `.habit-fill.risk` | Dynamisch per Parameter (`habitMeter(label, value, type)` mit `type='hp'/'strength'/'risk'`) gesetzt — Aufrufstellen manuell verifiziert (Zeilen ~4184-4187): **aktiv genutzt** |
| `.toast.ok`, `.toast.err`, `.toast.show`, `.api-status.ok` | Werden über `element.className = 'toast show '+type` bzw. `'api-status '+state` per String-Konkatenation gesetzt, nicht per `class="..."`-Literal. Aufrufstellen verifiziert: **aktiv genutzt** |
| Leere `catch(e){}`-Blöcke (6 Stellen: `localStorage`-Zugriff, Firebase-App-Cleanup, Pointer-Capture) | Bewusstes Fehler-Schlucken für optionale/nicht-kritische Operationen, kein Versehen — nicht angefasst |
| `console.error`/`console.warn` (7 Stellen) | Alles legitime Fehlerbehandlung für async Firebase-Operationen, keine Debug-Reste |
| `sw.js`, `manifest.json`, `icon.svg` | Geprüft — alle referenzierten Pfade existieren, keine toten Verweise, kein Leichencode |
| Compound-CSS-Selektoren mit anderswo aktiven Einzelklassen (>310 Regeln insgesamt) | Vollständige Reachability-Prüfung jeder Klassen-KOMBINATION (nicht nur jedes Klassennamens) hätte manuelle Prüfung aller ~310 CSS-Regeln erfordert — unverhältnismäßiger Aufwand für tote CSS-Regeln, die (anders als toter JS-Code) keine Laufzeit-Risiken bergen. Eine zufällig beim Nachbarschafts-Check gefundene (`.habit-check-btn.done`) wurde mit aufgenommen; weitere könnten existieren |

**Nicht gefunden (0 Treffer, sauber):** auskommentierte Code-Blöcke, TODO/FIXME/HACK-Marker, `console.log`/`debugger`-Reste, unerreichbarer Code nach `return`/`throw`, immer-false Feature-Flags, ungenutzte `@keyframes`, tote CDN-Dependencies.

---

## Commits

1. `cleanup: entferne veraltete Duplikate (deleteSubcategory, editKat)`
2. `cleanup: entferne totes Intraday-Quick-Log-Feature`
3. `cleanup: entferne toten alten Hcal-Task-Picker`
4. `cleanup: entferne verwaiste Variablen (noteMode, DAYS, dragTask-Reste, y, todayStr)`
5. `cleanup: entferne verwaiste CSS-Selektoren aus frueherem Feature-Cleanup`

## Verifikation

Nach allen 5 Commits: ESLint (`no-unreachable`, `no-empty`, `no-constant-condition`,
`no-dupe-keys/-args`, `no-self-compare`, `no-useless-return` u.a.) → 0 Funde.
`no-unused-vars`-Kandidaten (134) einzeln per Grep gegen den Gesamtcode
gegengeprüft → 0 echte Treffer (alle Rest-Kandidaten sind dieselben bereits
dokumentierten dynamischen Referenzen wie `kat-*`, `prio-hoch/mittel/niedrig`,
`ok`/`err`/`show`, `hp`/`risk`/`strength`). CSS-Klassen/IDs/Custom-Properties/
`@keyframes`-Audit → 0 neue Funde. `node --check` auf den extrahierten Script-
Inhalt → syntaktisch valide. Ein zweiter, identischer Verifikationslauf wurde
bewusst ausgelassen (Aufwand/Ertrag-Abwägung mit dem Nutzer) — der erste Lauf
war bereits vollständig sauber.

## Bilanz

| | Zeilen |
|---|---|
| Vor diesem Cleanup | 5168 |
| Nach diesem Cleanup | 4987 |
| Differenz | −181 |

(Zum Vergleich: vor dem separaten großen Feature-Cleanup in einer früheren
Session waren es 7930 Zeilen — dieser Dead-Code-Durchgang betraf ausschließlich
echte Leichen, keine Features.)
