# Pipeline Blueprint & Architectural Separation

## Conceptual Pipeline

```text
source + transformation
          │
          ▼
      traversal  (Interprets transformation structure)
       /   |   \
   object array value
      |      |    |
      |      |    └─ resolve value / path / action
      |      └────── iterate source collection
      └───────────── apply child mappings
          │
          ▼
     OUTPUT JSON
```

## Architectural Separation of Responsibilities

The codebase divides concerns strictly into independent modules:

| Module | Core Responsibility | Must NEVER Do |
|---|---|---|
| **`traverse.js`** | Interprets the transformation structure (objects, arrays, lists). | Must NOT inspect or parse internal source data formats. |
| **`resolve.js`** | Evaluates source paths against source data (dotted keys, literal dotted keys, root paths). | Must NOT alter or interpret transformation control flow. |
| **`value.js`** | Connects instructions to resolved values or literals. | Must NOT handle array iteration. |
| **`actions.js`** | Executes explicit type conversions or transformation actions. | Must NOT perform path lookups. |
| **`constants.js`** | Defines grammar identifiers (`item`, `list`, `transform`, `alterKey`). | Must NOT contain logic. |

## Path Resolver Rules

When resolving `path` against `obj`:

1. **Empty String `""`:** Returns the current iteration item.
2. **Root Path `^path`:** Evaluates against the root source object instead of the current local scope.
3. **Literal Dotted Key Check:**
   If `obj` contains the exact key `path` (even if it contains dots, like `"LEDGERNAME.#text"`), return `obj[path]` immediately.
4. **Nested Splitting:**
   If no exact key matches, split by `.` and navigate property by property, checking at each step if remaining joined segments form an exact key.
