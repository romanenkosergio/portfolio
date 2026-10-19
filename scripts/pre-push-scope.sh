#!/bin/sh
# pre-push-scope.sh — a push that changes only text skips the full gate.
#
# Reads the pre-push hook's stdin (`<local ref> <local sha> <remote ref> <remote sha>`
# per line). When every pushed file is text — `docs/**` or a root `*.md` — it runs
# Prettier and exits with its result. Anything else — another path, a deleted file,
# a range it cannot work out — exits 2: the hook then runs the full `yarn gate:push`.
# When in doubt it asks for the full gate.

ZERO=0000000000000000000000000000000000000000
FULL=2

base_ref=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null) || base_ref=origin/main

files=$(mktemp) || exit "$FULL"
trap 'rm -f "$files"' EXIT

while read -r _local_ref local_sha _remote_ref remote_sha; do
    [ "$local_sha" = "$ZERO" ] && continue # a branch deletion pushes no files
    if [ "$remote_sha" = "$ZERO" ]; then
        base=$(git merge-base "$base_ref" "$local_sha" 2>/dev/null) || exit "$FULL"
    else
        base=$remote_sha
    fi
    git cat-file -e "$base^{commit}" 2>/dev/null || exit "$FULL"
    # The check below reads the working tree: it must be the pushed commit, nothing uncommitted.
    git diff --quiet "$local_sha" -- || exit "$FULL"
    # A deleted or renamed-away file may break a consumer: only additions and edits are text-only.
    git diff --name-only --diff-filter=DR "$base" "$local_sha" | grep -q . && exit "$FULL"
    git diff --name-only "$base" "$local_sha" >>"$files" || exit "$FULL"
done

[ -s "$files" ] || exit "$FULL"

while read -r path; do
    case "$path" in
        docs/*) ;;
        */*) exit "$FULL" ;;
        *.md) ;;
        *) exit "$FULL" ;;
    esac
done <"$files"

echo "pre-push: text only — Prettier, not the full gate."
yarn -s prettier --check . --log-level=warn || exit 1
exit 0
