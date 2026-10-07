# Proposal: Single Source of Truth Engine for json-transformer

## 1. Context & Motivation
In `json-driven-npm`, the entire route structure and execution contract is dictated by JSON specifications (`api.json` and `source.json`). No route handlers or branches are hardcoded.

In `json-transformer`, we have a pure, co-traversal engine:
$$\text{DATA (Source)} \times \text{RECIPE (Instruction)} \longrightarrow \text{OUTPUT}$$

Currently, `json-transformer` produces in-memory JavaScript/JSON objects. The goal is to elevate `json-transformer` to be a **Single Source of Truth** that can drive:
1. **In-Memory Data Reshaping** (e.g. converting raw Tally XML responses to clean client JSON).
2. **Filesystem Tree Generation** (e.g. converting a spec JSON directly into physical folders and files on disk).

---

## 2. Core Architecture: The Three-Tier Schema

Following the `json-driven-npm` paradigm, `json-transformer` will define three clear layers:

```
┌──────────────────────────────────────────┐
│             SPECIFICATION                │
│ (Declarative JSON: shape & directives)   │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│            CO-TRAVERSAL ENGINE           │
│     (src/v7: traverse, ifDirective)      │
└────────────────────┬─────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌─────────────────┐     ┌──────────────────┐
│  OBJECT SINK    │     │ FILESYSTEM SINK  │
│  (In-Memory)    │     │  (Folders/Files) │
└─────────────────┘     └──────────────────┘
```

---

## 3. How Filesystem Generation Works via json-transformer

Instead of writing custom recursive scripts for scaffolding folders and test files, `json-transformer` takes a filesystem recipe:

### Recipe JSON (`fs-recipe.json`)
```json
{
  "tally": {
    "fsType": "dir",
    "transform": {
      "masters": {
        "fsType": "dir",
        "transform": {
          "unit": {
            "fsType": "dir",
            "transform": {
              "all": {
                "fsType": "file",
                "fileName": "all.js",
                "template": "test-leaf"
              }
            }
          }
        }
      }
    }
  }
}
```

### The Traversal Behavior:
1. **Branch Encounter (`fsType === "dir"`):**
   - Collects accumulated path: `targetDir/tally/masters/unit`.
   - Ensures directory exists: `fs.mkdirSync(dirPath, { recursive: true })`.
   - Continues co-traversal into children.
2. **Leaf Encounter (`fsType === "file"`):**
   - Resolves template (e.g. standard leaf test script importing `app` and calling endpoint).
   - Writes file: `fs.writeFileSync(path.join(dirPath, fileName), renderedCode)`.

---

## 4. Why This Unifies the Ecosystem

1. **Zero Boilerplate:** Neither routing nor file scaffolding requires ad-hoc manual code.
2. **Declarative Parity:** When a new endpoint is added to `api.json`, the transformer automatically maps it, generates the test directory, scaffolds the test file, and executes the transformation.
3. **Pure Reusability:** The co-traversal engine (`src/v7`) remains 100% untouched; only the sink/emitter strategy is parameterized.
