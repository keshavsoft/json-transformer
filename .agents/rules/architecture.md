# Architectural Invariants & Engine Rules

1. **The Invariant:** Source is data. Transformation is instruction. Output is result.
2. **Never modify source data:** Never mutate or preprocess raw source structures simply to make an output shape easier. The transformation is responsible for bridging different shapes.
3. **Traversal vs. Resolution:**
   - `traverse.js` understands transformation structure.
   - `resolve.js` understands source data paths and literal dotted keys (`LEDGERNAME.#text`).
   - Never blend traversal and resolution concerns.
4. **Composition:** Mappings compose recursively (`object → array → object`). Avoid adding one-off features for specific business domains (e.g. keep Tally XML logic generalized inside path resolution).
