/**
 * Rules that still fail on existing code, switched off for the specific files
 * only (D5). Each entry names the PLAN item that removes it together with the
 * code it covers; when that item lands, its entries are deleted and the rules
 * apply. No call-site disables. Last in the composition, so these win.
 */

const off = rules => Object.fromEntries(rules.map(rule => [rule, "off"]));
export const pendingConfigs = [];
