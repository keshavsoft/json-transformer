# The User Guide: The Recipe Author's Handbook

> **`@keshavsoft/json-transformer`**: Pure JSON Specification Compiler `(structure, data) -> Spec JSON`

---

## 1. The Core Story & Mental Model

When developing modern applications, data from enterprise systems (Tally ERP, SAP, SQL databases, XML exports) arrives in verbose, inconsistent formats containing XML artifacts (`#text`, `@_TYPE`), uppercase keys, and unpredictable array vs. single-object structures.

Traditional approaches rely on fragile imperative JavaScript loops and mutable scripts that collapse whenever an optional field is missing.

`@keshavsoft/json-transformer` replaces glue code with an unshakeable declarative invariant:

```text
DATA PROVIDER (Untouchable)      APPLICATION (Declarative)       CONSUMER (Clean Result)
┌─────────────────────────┐     ┌────────────────────────┐      ┌─────────────────────────┐
│     structure.json      │ ──► │       data.json        │ ───► │       Result JSON       │
│       (The Food)        │     │      (The Recipe)      │      │       (The Dish)        │
└─────────────────────────┘     └────────────────────────┘      └─────────────────────────┘
```

* **`structure.json` is The Food**: Raw, untouched source data belonging to the upstream producer. It is sacrosanct and 100% immutable.
* **`data.json` is The Recipe**: Clean declarative transformation instructions specifying which keys to keep, what to rename, which fields to unwrap, and how to nest.
* **`json-transformer` is The Kitchen**: A deterministic compiler that applies the recipe to the food, producing the final output with **zero side-effects**.

---

## 2. Why Two Separate JSONs? The Immutability Principle

1. **Client Data is Sacrosanct**: Incoming client payloads belong to the data provider. Mutating incoming objects pollutes shared memory references, breaks caches, and introduces side-effects.
2. **Preventing Infinite Loops**: If a recursive traversal engine mutates or enriches source objects while navigating them, self-referencing branches trigger infinite execution loops.
3. **Independent Lifecycles**: Client data changes on every HTTP request or database query. The transformation recipe changes only when your business contract evolves.

### The Recipe is Domain Proof, Not Duplication
Why does the recipe mirror the path of the source data? Because **you cannot transform complex enterprise data without first proving you understand its hierarchy**. 

When an engineer constructs a recipe, they formally codify: *"I understand that `STOCKITEM` contains `BATCHALLOCATIONS.LIST`, which contains `GODOWNNAME`."* Any field not explicitly acknowledged in the recipe is safely excluded from the output.

---

## 3. The Directive Vocabulary

Recipes are built with four simple declarative directives:

| Directive | Type | Purpose | Example |
| :--- | :--- | :--- | :--- |
| `alterKey` | `string` | Renames the property on the output object. | `{ "alterKey": "StockItems" }` |
| `transform` | `object` | Specifies nested transformation rules for child objects or arrays. | `{ "transform": { "NAME": { ... } } }` |
| `valueKey` | `string` | Extracts a child property value directly (e.g. unwrapping `#text`). | `{ "valueKey": "#text" }` |
| `valueType` | `"array"` | Enforces that the output is wrapped in an array, even if the input is a single object. | `{ "valueType": "array" }` |

---

## 4. Real-World Enterprise Cookbook

### Scenario A: Unwrapping XML Text Nodes
Tally XML exports wrap strings inside `#text` objects:
```json
// Source JSON (The Food)
{
  "LEDGER": {
    "NAME": { "#text": "HDFC Bank Ltd", "@_TYPE": "String" },
    "CURRENCY": { "#text": "INR", "@_TYPE": "Currency" }
  }
}
```

```json
// Recipe JSON (The Recipe)
{
  "transform": {
    "LEDGER": {
      "alterKey": "Account",
      "transform": {
        "NAME": { "alterKey": "bankName", "valueKey": "#text" },
        "CURRENCY": { "alterKey": "currency", "valueKey": "#text" }
      }
    }
  }
}
```

**Output:**
```json
{
  "Account": {
    "bankName": "HDFC Bank Ltd",
    "currency": "INR"
  }
}
```

---

### Scenario B: Normalizing Tally Batches (Single Object &rarr; Array)
When a stock item has only one batch, Tally outputs an object instead of an array. We normalize it to a clean list:
```json
// Source JSON (The Food)
{
  "STOCKITEM": [
    {
      "BASEUNITS": { "#text": "kgs" },
      "@_NAME": "Steel Rod 10mm",
      "BATCHALLOCATIONS.LIST": {
        "GODOWNNAME": "Warehouse 1",
        "BATCHNAME": "B-2026-01"
      }
    }
  ]
}
```

```json
// Recipe JSON (The Recipe)
{
  "transform": {
    "STOCKITEM": {
      "alterKey": "Items",
      "transform": {
        "BASEUNITS": { "alterKey": "units", "valueKey": "#text" },
        "@_NAME": { "alterKey": "name" },
        "BATCHALLOCATIONS.LIST": {
          "alterKey": "batches",
          "valueType": "array",
          "transform": {
            "GODOWNNAME": { "alterKey": "location" }
          }
        }
      }
    }
  }
}
```

**Output:**
```json
{
  "Items": [
    {
      "units": "kgs",
      "name": "Steel Rod 10mm",
      "batches": [
        {
          "location": "Warehouse 1"
        }
      ]
    }
  ]
}
```

---

## 5. Usage in Code

```bash
npm install @keshavsoft/json-transformer
```

```javascript
import transform from "@keshavsoft/json-transformer";

const result = transform(sourceData, recipeData);
```

For live in-browser testing, open [`docs/user.html`](user.html) to use the interactive 3-pane sandbox.
