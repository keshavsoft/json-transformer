# Gemini / Antigravity Agent Directives

See full context, architectural rules, and coding conventions in [AGENTS.md](AGENTS.md).

## Quick Summary
- **Invariant**: Source is data. Transformation is instruction. Output is result.
- **Convention**: All functions accept `{ inParam }` and immediately assign to `const localParam = inParam;`.
- **Architecture**: Keep Traversal (`traverse.js`) separate from Resolution (`resolve.js`). Do not contaminate traversal with source parsing.
- **Tally / XML**: Preserve literal dotted key checks (`LEDGERNAME.#text`) in the resolver.
- **Samples**: Verify changes by executing `node samples/new/simple/index.js` or `node samples/new/sales/index.js`.
