#!/bin/sh
# decision.sh — print docs/DECISIONS.md rows by number.
#
#   sh scripts/decision.sh D12 D7        # rows capped at 1500 characters
#   CAP=0 sh scripts/decision.sh D12     # the whole row
#
# The rows run to several kilobytes; grepping the files whole costs an agent thousands of tokens.
cd "$(dirname "$0")/.." || exit 1
cap=${CAP:-1500}
[ $# -gt 0 ] || { echo "usage: sh scripts/decision.sh <D###>..." >&2; exit 2; }
status=0
for id in "$@"; do
    rows=$(grep -h "^| $id[ |]" docs/DECISIONS.md)
    if [ -z "$rows" ]; then
        echo "$id: no row" >&2
        status=1
        continue
    fi
    if [ "$cap" -gt 0 ]; then
        printf '%s\n' "$rows" | cut -c1-"$cap"
    else
        printf '%s\n' "$rows"
    fi
done
exit "$status"
