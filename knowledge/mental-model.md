# Mental Model & Ownership Invariant

## The Central Invariant

> **Source is data. Transformation is instruction. Output is result.**

```text
DATA PROVIDER                APPLICATION                   CONSUMER
┌─────────────┐             ┌─────────────────────┐       ┌─────────────┐
│ SOURCE JSON │  ───────►   │ TRANSFORMATION JSON │ ────► │ OUTPUT JSON │
│   (Data)    │             │    (Instructions)   │       │  (Results)  │
└─────────────┘             └─────────────────────┘       └─────────────┘
```

## Ownership Boundaries

1. **Source JSON belongs to the Data Provider:**
   - Originates from third-party APIs, database queries, XML exports, or accounting packages like Tally.
   - It may contain unconventional property keys (e.g. `LEDGERNAME.#text`, `ALLINVENTORYENTRIES.LIST`), nested hierarchies, or extra fields.
   - **Rule:** Never ask the data provider or preprocessing step to restructure the source data merely because writing the transformation is hard.

2. **Transformation JSON belongs to the Application:**
   - The application defines what fields it requires, what names they should have, and how arrays or objects should be formed.
   - The transformation is the contract and bridge between shapes.

3. **Output JSON belongs to the Consumer:**
   - Clean, standardized, and immediately ready for frontend display, API response, or downstream processing.

## Composition & Invariants

- **Recursive Composition:** Mappings can be nested arbitrarily:
  `object → array → object → array → object`
  There are no special one-off algorithms for business shapes.
- **Current Value (`""`):** In list iterations, `""` identifies the current scalar value, allowing scalar lists (`["A", "B", "C"]`) to be mapped cleanly.
- **Root Resolution (`^path`):** Nested mappings can access root-level contextual data via the `^` prefix without threading context down manually.
