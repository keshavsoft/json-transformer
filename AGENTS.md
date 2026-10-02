# Agent Context & Knowledge Base: JSON Transformer

Welcome AI Agent (Antigravity, Gemini, Claude, Cursor, Copilot, etc.). This document serves as your primary context, architectural directive, and coding standards guide for `@keshavsoft/json-transformer`.

---

## 1. Core Invariant & Mental Model

```text
DATA PROVIDER                APPLICATION                   CONSUMER
┌─────────────┐             ┌─────────────────────┐       ┌─────────────┐
│ SOURCE JSON │  ───────►   │ TRANSFORMATION JSON │ ────► │ OUTPUT JSON │
│   (Data)    │             │    (Instructions)   │       │  (Results)  │
└─────────────┘             └─────────────────────┘       └─────────────┘
```

> **Invariant**: *Source is data. Transformation is instruction. Output is result.*

- **Source JSON** belongs to the data provider (external APIs, databases, XML exports, Tally). **NEVER modify the source data** merely to satisfy an output requirement. The transformation bridges differing shapes.
- **Transformation JSON** belongs to the application. It acts as an output recipe describing field names, nesting, array iterations, conversions, and root escapes.
- **Output JSON** belongs to the consumer. It is constructed declaratively without side-effects.

---

## 2. KeshavSoft Declarative Ecosystem

This project is the transformation engine of a 3-part lossless declarative ecosystem:

1. **[tag-to-json](https://keshavsoft.github.io/tag-to-json/)**: Extracts live HTML DOM trees into declarative JSON specifications.
2. **json-transformer**: Transforms heterogeneous domain data (APIs, Tally/XML, SQL) into canonical target data shapes or UI specs.
3. **[json-to-tag](https://keshavsoft.github.io/json-to-tag/)**: Renders declarative JSON specifications into reactive native HTML DOM elements.

---

## 3. Strict Coding Conventions

### Function Parameter Naming Convention: `in` and `local`
All functions must adhere to the KeshavSoft naming convention:
1. **Object Destructuring for Inputs:** Functions must accept a single configuration object.
2. **`in`-Prefixed Properties:** Input properties must be prefixed with `in` (e.g., `inData`, `inStructure`, `inConfig`).
3. **`local`-Prefixed Variables:** Immediately at the top of the function body, assign each `in`-property to a `local`-prefixed variable (e.g., `const localData = inData;`).
4. **Usage:** Only `local`-prefixed variables may be referenced throughout the remainder of the function.

```javascript
// GOOD
export function transformNode({ inSource, inRecipe, inRoot }) {
    const localSource = inSource;
    const localRecipe = inRecipe;
    const localRoot = inRoot;

    // Use only local-prefixed variables
    return traverse(localRecipe, localSource, localRoot);
}

// BAD - Violates convention
export function transformNode(source, recipe, root) {
    return traverse(recipe, source, root);
}
```

---

## 4. Architectural Boundaries

### Traversal vs. Resolution Separation
- **`traverse.js`** understands the **transformation structure** (objects, arrays, lists, mapping grammar). It does NOT know about source data complexities.
- **`resolve.js`** understands the **source data paths** (dotted paths, root `^` paths, literal dotted keys).
- **`value.js`** resolves mapping values and connects instructions to resolved data.
- **`actions.js`** handles explicit conversions and custom action functions.

### Handling Literal Dotted Keys (Tally / XML)
XML/Tally sources frequently contain literal dots in property names (e.g. `LEDGERNAME.#text`, `ALLINVENTORYENTRIES.LIST`).
- The resolver must always check if the literal string exists directly as a key on the source object before attempting nested dot-splitting.

---

## 5. Repository Structure

```text
json-transformer/
├── AGENTS.md               <-- You are here (AI context entry point)
├── GEMINI.md               <-- Antigravity / Gemini symlink/reference
├── knowledge/              <-- Detailed architecture & design documents
│   ├── mental-model.md     <-- Core philosophy & ownership boundaries
│   ├── naming-convention.md<-- 'in' and 'local' naming standard
│   ├── pipeline-blueprint.md<-- Traversal vs Resolution breakdown
│   └── ecosystem-roundtrip.md<-- The Round-Trip Story
├── docs/                   <-- Public documentation & GitHub Pages
│   ├── index.html          <-- Live interactive showcase & playground
│   ├── index.md            <-- Markdown documentation index
│   ├── concepts.md         <-- Fundamental concepts
│   ├── architecture.md     <-- Architectural design
│   ├── mapping-language.md <-- Syntax reference
│   ├── arrays.md           <-- Collection processing
│   ├── path-resolution.md  <-- Path resolver details
│   ├── tally.md            <-- Real-world Tally/XML data guide
│   ├── examples.md         <-- Practical cookbook
│   └── maintenance.md      <-- Architectural guardrails & checklists
├── src/                    <-- Core engine implementation
│   ├── index.js            <-- Public package exports
│   └── v6/                 <-- Latest engine version
└── samples/                <-- Test cases & real-world samples
    └── new/
        ├── simple/         <-- Basic field transformation
        ├── units/          <-- Units mapping
        ├── tally1/         <-- Tally XML mapping
        ├── sales/          <-- Full sales voucher transformation
        ├── ledgers/        <-- Multi-ledger voucher transformation
        └── batches/        <-- Inventory batch allocations
```

---

## 6. How to Run Samples & Verify Changes

To test without external dependencies:

```bash
# Run simple sample
node samples/new/simple/index.js

# Run tally sample
node samples/new/tally1/index.js

# Run sales sample
node samples/new/sales/index.js
```

---

## 7. Rules Before Modifying Code

Ask these 6 questions before writing any code:
1. Is this a transformation language change?
2. Is it traversal? (Structure of recipe)
3. Is it source resolution? (Finding data in source)
4. Is it value resolution?
5. Is it an action/conversion?
6. Can existing recursive mapping composition already express it without adding new core code?
