# The Developer Guide: Engine Architecture & Internals

> **`@keshavsoft/json-transformer` Core Engine (`src/v8/`)**

This document serves as the architectural reference for contributors, maintainers, and AI pair-programmers extending the core transformation engine.

---

## 1. Engine Evolution (v1 to v8)

Enterprise data transformations frequently begin with mutable, imperative scripting. Over eight major iterations, `@keshavsoft/json-transformer` was refined into a pure, declarative recursive compiler:

* **1.29 KB Bundle Size**: Zero external dependencies.
* **Pure Functional Invariant**: `(inSource, inRecipe) -> Output JSON`.
* **Zero Comments in Core Code**: Architecture is communicated completely through file/directory hierarchy and explicit function naming.
* **Strict Parameter Envelopes**: Scoped variables with immediate unpacking.

---

## 2. The Four Architectural Invariants

### Invariant 1: The `in` and `local` Parameter Scoping Convention
Functions accept a single configuration object with `in`-prefixed keys, which are immediately unpacked into `local`-prefixed variables:

```javascript
// GOOD: Adheres strictly to KeshavSoft convention
const startFunc = ({ inSource, inRecipe }) => {
    const localSource = inSource;
    const localRecipe = inRecipe;

    // Use ONLY local-prefixed variables throughout
    if (Array.isArray(localSource)) {
        return traverseArray({ inItems: localSource, inRecipe: localRecipe });
    }
    return localSource;
};

// BAD: Naked parameters or re-assignments
function startFunc(source, recipe) { ... }
```

### Invariant 2: Absolute Source Immutability
`inSource` is never mutated. Output is constructed as a new object or array. This guarantees that parent memory references and upstream callers remain pure.

### Invariant 3: Zero Dependencies
The engine is written in standard ES modules without third-party dependencies (no lodash, ramda, or custom parsers).

### Invariant 4: Zero Code Comments in Core Engine
Code intent is expressed through explicit directory structure (`traverseObject`, `traverseArray`, `ifTransformFound`) and semantic naming.

---

## 3. The Traversal Pipeline Anatomy

```text
src/v8/
├── index.js                  # Public API wrapper: transform(source, recipe)
├── traverse.js               # Central recursive dispatcher
├── traverseObject/
│   └── index.js              # The Gatekeeper: checks recipe for "transform"
├── traverseArray/
│   └── index.js              # Collection processor: maps, flattens & filters
└── ifTransformFound/
    └── index.js              # Inversion of Control: source drives, recipe directs
```

### Step-by-Step Execution:

1. **`src/v8/index.js` (Public Envelope)**:
   Accepts `(source, recipe)` and passes `{ inSource: localSource, inRecipe: localRecipe }` to `traverse.js`.

2. **`src/v8/traverse.js` (Central Dispatcher)**:
   * Primitives (strings, numbers, booleans, null) pass through unchanged.
   * Arrays route to `traverseArray`.
   * Objects route to `traverseObject`.

3. **`src/v8/traverseObject/index.js` (The Gatekeeper)**:
   * **Why the recipe is checked first**: If `localRecipe` contains `"transform"`, it triggers `ifTransformFound`. If absent, child properties continue unhindered to prevent unintended data loss.

4. **`src/v8/ifTransformFound/index.js` (The Inversion of Control)**:
   * `localSource` drives the loop (`Object.entries(localSource)`), preventing the creation of phantom properties.
   * `localTransform` acts as the directive lookup. Any key absent from the recipe is pruned.
   * Directives are applied in strict sequence: `alterKey` &rarr; nested `transform` recursion &rarr; `valueType: "array"` &rarr; `valueKey` extraction.

5. **`src/v8/traverseArray/index.js` (Collection Processor)**:
   * Maps each element recursively through `traverse`.
   * Flattens nested arrays with `.flat(Infinity)`.
   * Filters out falsy/null values with `.filter(Boolean)`.

---

## 4. Handling Real-World Enterprise Quirks

* **Literal Dotted Keys**: Tally XML generates keys like `BATCHALLOCATIONS.LIST` and `LEDGERNAME.#text`. Because `ifTransformFound` accesses properties directly via `localTransform[key]`, literal dotted keys resolve without splitting or ambiguous parsing.
* **Single vs Multi-Item Cardinality**: XML parsers output an object for a single item and an array for multiple items. The `valueType: "array"` directive normalizes single-item objects into arrays cleanly.
* **XML Attribute Pruning**: Unwanted metadata (e.g. `@_TYPE="String"`) is pruned automatically because it is omitted from the recipe.

---

## 5. Development & Testing Workflow

Run test samples inside the container:
```bash
# Test full batch allocation payload (Tally ERP):
wslc exec node-dev node samples/6oct/batches/index.js

# Test simple transformation:
wslc exec node-dev node samples/new/simple/index.js
```

Build the production bundle:
```bash
wslc exec node-dev npm --prefix /workspace/json-transformer run build
```
The bundle is compiled to `docs/dist/v8/min.js` and copied to `docs/dist/min.js`.
