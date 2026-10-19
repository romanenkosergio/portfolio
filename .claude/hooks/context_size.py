"""Shared by the hooks: this chat's context size and its hand-off thresholds.

The size is the last main-chat assistant turn's input + cache read + cache
creation tokens, read from the session transcript.
"""
import json

WARN_AT = 280_000
CEILING = 350_000


def context_tokens(path: str) -> int:
    last = 0
    try:
        with open(path, encoding="utf-8") as transcript:
            for line in transcript:
                if '"usage"' not in line:
                    continue
                try:
                    record = json.loads(line)
                except ValueError:
                    continue
                if record.get("isSidechain"):
                    continue
                usage = (record.get("message") or {}).get("usage") or {}
                total = (
                    usage.get("input_tokens", 0)
                    + usage.get("cache_read_input_tokens", 0)
                    + usage.get("cache_creation_input_tokens", 0)
                )
                if total:
                    last = total
    except OSError:
        return 0
    return last
