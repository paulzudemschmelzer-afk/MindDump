# CHANGELOG

> Hier werden alle Änderungen am MindDump-Code dokumentiert.
> Neueste Einträge **oben**. Format siehe `AGENTS.md` Abschnitt 7.
> **Wichtig:** Keine Tokens, Keys oder persönliche Daten in Einträge schreiben.

---

## [2026-04-10] — AGENTS.md erweitert um Session-Start/Ende
- **Geändert:** Neue Abschnitte 0 (Session-Start) und 9 (Session-Ende)
  in `AGENTS.md`. Definiert Trigger-Phrasen wie "Ich will an MindDump
  weiterarbeiten" und beschreibt was Taurus dann automatisch tun soll
  (Repo pullen, AGENTS + CHANGELOG lesen, Status melden, dann auf Task warten)
- **Warum:** Taurus hat kein langfristiges Gedächtnis zwischen Sessions —
  AGENTS.md und CHANGELOG.md dienen als externes Gedächtnis und müssen
  bei jedem Session-Start gelesen werden
- **Agent:** Claude (Review-Session)
- **Commit:** _(wird beim Commit ergänzt)_

---

## [2026-04-10] — AGENTS.md & CHANGELOG.md angelegt
- **Geändert:** Neue Dateien `AGENTS.md` und `CHANGELOG.md` im Repo-Root
- **Warum:** Damit der Taurus Agent (OpenClaw) eine klare Anleitung hat,
  wie er sicher am Code arbeitet, ohne sensitive Informationen zu leaken
- **Agent:** Claude (Review-Session)
- **Commit:** `c633a9e`

---

## [2026-04-09] — Taurus Chat-Tab entfernt
- **Geändert:** Kompletter Taurus/OpenClaw Chat-Bereich aus `MindDump.html`
  entfernt (Sidebar-Tab, Chat-UI, Settings-Card, JS-Funktionen)
- **Warum:** Feature wurde nicht mehr gebraucht; ein versehentlich
  hardcodeter Auth-Token sollte aus dem aktiven Code raus
- **Agent:** Claude Opus 4.6
- **Commit:** `3824770`
- **Sicherheitshinweis:** Der zugehörige Token wurde anschließend rotiert.
  Kein Token-Wert in diesem Eintrag dokumentiert (siehe AGENTS.md §3).

---

## [2026-04-08] — Taurus Chat-Tab hinzugefügt _(später entfernt)_
- **Geändert:** Neuer Sidebar-Tab "Taurus" mit Chat-UI, Streaming und
  Activity-Log; Settings für Gateway URL + Token
- **Warum:** Experimenteller OpenClaw Agent-Zugang aus der App heraus
- **Agent:** Claude Sonnet 4.6
- **Commit:** `a31acec`
- **Status:** Wieder entfernt in `3824770` (siehe oben)

---

## Frühere Änderungen

Vor Anlegen dieses Changelogs wurden Änderungen nur in Git-Commits
dokumentiert. Siehe `git log --oneline` für die vollständige Historie.
Die wichtigsten Meilensteine:

- Kategorie-System mit Filter-Tabs und Klapp-Gruppen
- Google Calendar Sync (OAuth + Event-Push)
- Wochenansicht im Apple-Calendar-Stil mit Drag & Drop
- Firebase Login-Gate + API-Key-Sync
- Sidebar mit Toggle-Button
