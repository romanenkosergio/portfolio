#!/usr/bin/env python3
"""PreToolUse (Bash) hook: the session's last PR carries the hand-off.

When a `gh pr create` runs while this chat is past context-guard's warning
threshold, the PR is the last of the session, so it must change
docs/HANDOFF.md (against the remote's default branch). If it doesn't, the call is denied
with the reason; below the threshold, or with the hand-off already in the
branch, the hook is silent. Any failure to tell stays silent too.

Whatever the context size, a `gh pr create` is denied while docs/HANDOFF.md or
docs/PLAN.md is over 8000 bytes: both are read at every session start.
"""
import json
import os
import re
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from context_size import WARN_AT, context_tokens  # noqa: E402

HANDOFF = "docs/HANDOFF.md"
PLAN = "docs/PLAN.md"
MAX_BYTES = 8000


def default_branch(root: str) -> str:
    head = subprocess.run(
        ["git", "symbolic-ref", "--short", "refs/remotes/origin/HEAD"],
        cwd=root, capture_output=True, text=True, timeout=10,
    )
    return head.stdout.strip() if head.returncode == 0 and head.stdout.strip() else "origin/main"


def handoff_in_branch(root: str) -> bool:
    changed = subprocess.run(
        ["git", "diff", "--name-only", f"{default_branch(root)}...HEAD"],
        cwd=root, capture_output=True, text=True, timeout=10,
    )
    if changed.returncode != 0:
        return True
    return HANDOFF in changed.stdout.split()


def main() -> int:
    try:
        event = json.load(sys.stdin)
    except ValueError:
        return 0
    command = (event.get("tool_input") or {}).get("command") or ""
    if not re.search(r"\bgh\s+pr\s+create\b", command):
        return 0
    root = os.environ.get("CLAUDE_PROJECT_DIR") or event.get("cwd") or "."
    for rel in (HANDOFF, PLAN):
        try:
            nbytes = os.path.getsize(os.path.join(root, rel))
        except OSError:
            nbytes = 0
        if nbytes > MAX_BYTES:
            print(json.dumps({
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": (
                        f"{rel} is {nbytes} bytes, the limit is {MAX_BYTES}. Shorten it: "
                        + ("keep only the current state, next decision numbers, next steps, "
                           "open questions and environment; replace the old 'Current state' "
                           "instead of appending; move anything durable to DECISIONS "
                           "or PLAN, delete the rest (git is the history)."
                           if rel == HANDOFF else
                           "keep only open items, one line each; delete done items and add "
                           "their numbers to the 'Done' line (git is the history).")
                    ),
                }
            }))
            return 0
    size = context_tokens(event.get("transcript_path") or "")
    if size < WARN_AT:
        return 0
    try:
        if handoff_in_branch(root):
            return 0
    except (OSError, subprocess.SubprocessError):
        return 0
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": (
                f"Context ~{size // 1000}k tokens: this is the session's last PR, and it "
                f"doesn't change {HANDOFF}. Update the hand-off (current state, next "
                "decision numbers, next steps), commit and push it in this branch, then "
                "open the PR."
            ),
        }
    }))
    return 0


if __name__ == "__main__":
    sys.exit(main())
