# MindDump — Arbeitsregeln für Claude

## Projekt
Single-file HTML5 SPA: `/home/user/MindDump/MindDump.html`
Feature-Branch: `claude/mind-dump-feature-DVVqs`
GitHub Pages läuft von `main`.

## Git-Regeln (WICHTIG)

### Nach jedem Commit sofort auf main mergen
```bash
git checkout main
git merge claude/mind-dump-feature-DVVqs --no-edit
git push origin main
git checkout claude/mind-dump-feature-DVVqs
```
Nie einen langen Divergenz zwischen Feature-Branch und `main` aufbauen — je länger, desto gefährlicher der Merge.

### Bei Merge-Konflikten NIE blind `--theirs` oder `--ours` nutzen
`git checkout --theirs` wirft eine komplette Seite weg. Stattdessen:
1. Konflikt-Diff manuell lesen: `git diff`
2. Beide Seiten zusammenführen
3. Dann committen

### Vor jedem Merge prüfen was auf main liegt
```bash
git log --oneline main..HEAD        # was ist auf Feature-Branch aber nicht main
git log --oneline HEAD..origin/main # was ist auf main aber nicht hier
```

## Was schiefgelaufen ist (zur Erinnerung)

**Problem 1:** `git checkout --theirs` beim Merge-Konflikt → 3 Commits von `main` verloren:
- Routine-Buttons Reihenfolge
- Duplicate-Notes-Fix
- Wochenanalyse in Statistik verschoben

**Problem 2:** `badges()` in `init()` vor `renderNav()` aufgerufen → `b-tasks` existierte noch nicht → JS-Crash → leere Nav.
Lehre: Wenn neue DOM-Elemente dynamisch erstellt werden, muss der Render-Call VOR allen Funktionen stehen die diese Elemente lesen.

## Kommunikation (WICHTIG)
- Immer "FERTIG" (Großbuchstaben) schreiben wenn eine Aufgabe abgeschlossen ist
- **Vor jeder Implementierung**: Verständnis kurz wiedergeben und den User fragen ob es korrekt ist — erst dann umsetzen.
  Beispiel: "Ich verstehe: Du willst X. Ist das richtig?"
- Gilt auch für kleine Änderungen.
