#!/bin/sh
# SessionStart hook (startup | resume | clear | compact): a short state brief so
# a fresh or compacted session doesn't spend tokens rediscovering where work is.
# Prints state, never instructions; stays under ~10 lines.
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
if git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Branch: $(git branch --show-current 2>/dev/null) — $(git status --short 2>/dev/null | wc -l | tr -d ' ') changed file(s)"
  if command -v gh >/dev/null 2>&1 && git remote get-url origin >/dev/null 2>&1; then
    prs=$(gh pr list --state open --json number,title -q '.[] | "#\(.number) \(.title)"' 2>/dev/null | head -5)
    [ -n "$prs" ] && echo "Open PRs:" && echo "$prs" | sed 's/^/  /'
  fi
else
  echo "Not a git repository — git hooks and the PR hand-off guard are inactive."
fi
next=$(grep -nE '^- \[ \] [0-9]+\.[0-9]+' docs/PLAN.md 2>/dev/null | head -3 | cut -c1-110)
[ -n "$next" ] && echo "Next in docs/PLAN.md:" && echo "$next" | sed 's/^/  /'
[ -f docs/HANDOFF.md ] && echo "Hand-off notes: docs/HANDOFF.md"
exit 0
