## MindDump Workflow

- When working on `MindDump.html`, always report the delivery status explicitly:
  - changed locally
  - committed locally
  - pushed to GitHub
- Do not assume local edits are enough when the user expects the live GitHub project to change.
- Before finishing a MindDump implementation task, check `git status`, `git log -n 1`, and whether a push happened.
- If the user says to "make it" or "do it", prefer completing the full flow through commit and push unless they say otherwise.
