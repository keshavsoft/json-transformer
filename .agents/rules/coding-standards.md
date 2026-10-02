# Coding Standards: Parameter Naming Convention

All JavaScript code written in this repository must follow the `in` / `local` parameter naming convention:

1. **Destructured Input Object:** All functions must accept a single configuration object `{ inParam1, inParam2 }`.
2. **`in`-Prefix:** Input object keys must be prefixed with `in` (e.g. `inData`, `inRecipe`, `inStructure`).
3. **`local`-Prefix:** At the top of every function body, immediately assign inputs to local variables prefixed with `local` (e.g. `const localData = inData;`).
4. **Local Variables Only:** Only use `local`-prefixed variables in the remainder of the function. Never mutate or reference `in` parameters directly in function logic.
