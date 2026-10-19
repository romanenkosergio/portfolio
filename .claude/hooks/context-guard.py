#!/usr/bin/env python3
"""UserPromptSubmit hook: warn when this chat's context grows large.

Reads the session transcript (path from the hook's stdin JSON), takes the last
assistant turn's context size (input + cache read + cache creation tokens) and
prints one line only past the thresholds — silent otherwise, so it costs
nothing on ordinary turns. Thresholds follow ai-templates' measurement: most
spend is re-reading context; past ~350k a fresh chat from docs/HANDOFF.md wins.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from context_size import CEILING, WARN_AT, context_tokens  # noqa: E402


def main() -> int:
    try:
        event = json.load(sys.stdin)
    except ValueError:
        return 0
    size = context_tokens(event.get("transcript_path") or "")
    if size >= CEILING:
        print(
            f"Context ~{size // 1000}k tokens — PAST the ~{CEILING // 1000}k ceiling. "
            "Finish the current theme — its PR carries the docs/HANDOFF.md update — and "
            "continue in a fresh chat."
        )
    elif size >= WARN_AT:
        print(
            f"Context ~{size // 1000}k tokens — approaching the ~{CEILING // 1000}k ceiling; "
            "plan to hand off at the next natural boundary — the next PR is the last of this "
            "session and carries the docs/HANDOFF.md update."
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
