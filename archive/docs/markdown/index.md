# JSON Transformer Documentation

> **Invariant**: *Source is data. Transformation is instruction. Output is result.*

Welcome to the **JSON Transformer** documentation. This suite of documents describes the mental model, architectural boundaries, mapping grammar, collection processing, path resolution, real-world case studies (such as Tally/XML), and maintenance principles of the transformation engine.

---

## The Central Story

```text
DATA PROVIDER                APPLICATION                   CONSUMER
┌─────────────┐             ┌─────────────────────┐       ┌─────────────┐
│ SOURCE JSON │  ───────►   │ TRANSFORMATION JSON │ ────► │ OUTPUT JSON │
│   (Data)    │             │    (Instructions)   │       │  (Results)  │
└─────────────┘             └─────────────────────┘       └─────────────┘
```

The transformation acts as a bridge between shapes without modifying the source data or requiring consumer compromises:

- **Source JSON** belongs to the data provider (external APIs, databases, XML exports, legacy ERPs).
- **Transformation JSON** belongs to the application (the declarative recipe and mapping contract).
- **Output JSON** belongs to the consumer (clean, structured, and ready for ingestion or rendering).

---

## The Ecosystem: The Full Round-Trip

`json-transformer` is part of the KeshavSoft declarative data and UI workflow:

1. **[tag-to-json](https://keshavsoft.github.io/tag-to-json/)**: Extracts native HTML DOM structures into declarative JSON specifications.
2. **[json-transformer](https://keshavsoft.github.io/json-transformer/)**: Takes arbitrary raw/foreign source data and translates it into canonical application data or UI specs.
3. **[json-to-tag](https://keshavsoft.github.io/json-to-tag/)**: Consumes declarative JSON specifications to construct reactive, high-performance HTML DOM trees.

---

## Documentation Index & Reading Order

Follow these documents to understand the engine from fundamentals to enterprise usage:

| # | Document | Scope & Focus | Key Concepts |
|---|---|---|---|
| **01** | [**Concepts**](concepts.md) | Foundational mental model | Data ownership, composition (`object → array → object`), scalar values (`""`), invariants |
| **02** | [**Architecture**](architecture.md) | Internal pipeline design | Traversal vs. Resolution separation, `traverse.js`, `resolve.js`, value handling |
| **03** | [**Mapping Language**](mapping-language.md) | Syntax and directive reference | `item`, `list`, scalar current value (`""`), `$value` literals, `^path` root resolution |
| **04** | [**Arrays & Collections**](arrays.md) | Processing lists & repetitions | Basic lists, nested iterations (`voucher → inventory → batch`), scalar arrays |
| **05** | [**Path Resolution**](path-resolution.md) | Navigating complex source trees | Dotted navigation (`a.b.c`), literal dotted keys (`LEDGERNAME.#text`), root escaping |
| **06** | [**Tally & XML Data**](tally.md) | Real-world enterprise case study | Consuming enterprise XML/Tally structures without polluting the core engine |
| **07** | [**Examples & Recipes**](examples.md) | Practical cookbook | Renaming fields, omitting unmentioned keys, nested objects, array recipes |
| **08** | [**Maintenance Principles**](maintenance.md) | Guidelines for contributors | Protecting traversal and resolution boundaries, regression stories, change checklist |

---

## Pipeline Overview

```text
source + transformation
          │
          ▼
      traversal  (interprets transformation shape)
       /   |   \
   object array value
      |      |    |
      |      |    └─ resolve value / literal / root / action
      |      └────── iterate source collection
      └───────────── apply child mappings
          │
          ▼
     OUTPUT JSON
```

---

## Quick Reference

### Renaming Fields
```json
{
  "mapping": {
    "item": {
      "customerName": "NAME",
      "city": "CITY"
    }
  }
}
```

### Iterating Arrays
```json
{
  "mapping": {
    "item": {
      "products": [
        {
          "list": "items",
          "item": { "name": "title", "price": "unitPrice" }
        }
      ]
    }
  }
}
```

### Navigating Literal Dotted Keys (Tally / XML)
```json
{
  "mapping": {
    "item": {
      "ledgerEntries": [
        {
          "list": "LEDGERENTRIES.LIST",
          "item": {
            "account": "LEDGERNAME.#text",
            "amount": "AMOUNT.#text"
          }
        }
      ]
    }
  }
}
```

---

For an interactive sandbox and live demonstrations, visit the [json-transformer Live Showcase](https://keshavsoft.github.io/json-transformer/).
