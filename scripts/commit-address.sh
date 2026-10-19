#!/bin/sh
# commit-address.sh — this repository commits from personal addresses only.
#
# An allow-list: it names the addresses that may commit, so it stays correct for
# every address nobody has thought of yet. Both GitHub noreply forms pass so a
# merge made on github.com is never blocked.

ALLOWED="sergromanenko97@gmail.com @users.noreply.github.com noreply@github.com"

addr=${GIT_AUTHOR_EMAIL:-}
[ -n "$addr" ] || addr=$(git config user.email 2>/dev/null)
[ -n "$addr" ] || exit 0

for suffix in $ALLOWED; do
    case "$addr" in *"$suffix") exit 0 ;; esac
done

echo "commit-address: refusing a commit as <$addr>." >&2
echo "  This repository commits only from personal addresses. Set one:" >&2
echo "    git config user.email \"sergromanenko97@gmail.com\"" >&2
exit 1
