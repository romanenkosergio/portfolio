# Sourced by the hooks: switch to the Node major in .nvmrc when the shell runs another one.
# Without nvm it stays silent here, and the one-line message below names the mismatch.
want=$(tr -d ' v\n' <.nvmrc)
have=$(node -v 2>/dev/null | sed 's/^v//')
if [ "${have%%.*}" != "${want%%.*}" ]; then
    NVM_DIR=${NVM_DIR:-$HOME/.nvm}
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        . "$NVM_DIR/nvm.sh" >/dev/null 2>&1 || true
        nvm use --silent >/dev/null 2>&1 || true
    fi
    have=$(node -v 2>/dev/null | sed 's/^v//')
    if [ "${have%%.*}" != "${want%%.*}" ]; then
        echo "Node $want needed, have ${have:-none}"
        exit 1
    fi
fi
