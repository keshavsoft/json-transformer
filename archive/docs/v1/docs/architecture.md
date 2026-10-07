# Architecture

## Entry point

Conceptually:

```js
transform(source, transformation)
```

The two inputs remain separate.

## Traversal

Traversal interprets the transformation structure. It determines whether the current instruction describes an object, collection, value, or nested mapping.

## Resolution

Resolution answers:

> Given this source and this path, what value does the instruction identify?

Keeping this separate lets the source format be complicated without making the transformation language complicated.

## Value handling

A value instruction may represent a source path, literal, current value, converted value, or action result.

## Conceptual pipeline

```text
source + transformation
          │
          ▼
      traversal
       /   |   \
   object array value
      |      |    |
      |      |    └─ value/path/action resolution
      |      └────── source collection
      └───────────── child mappings
          │
          ▼
       output
```

Responsibilities:

- `traverse.js` — transformation structure.
- `resolve.js` — source-path resolution.
- `value.js` — mapping values.
- `actions.js` — conversions/actions.
- `constants.js` — language identifiers.

## Dotted keys

XML/Tally data can contain literal keys such as `LEDGERNAME.#text` or `ALLINVENTORYENTRIES.LIST`. Distinguishing a literal dotted key from a nested path belongs to the resolver, not the traversal layer.

Traversal understands the transformation. Resolution understands the source. Value handling connects instructions to values. Actions handle special processing.

---

[← Previous: Concepts](concepts.md) | [Index](index.md) | [Next: Mapping Language →](mapping-language.md)
