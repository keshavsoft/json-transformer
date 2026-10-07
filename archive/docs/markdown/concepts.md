# Concepts

## The central idea

```text
SOURCE JSON + TRANSFORMATION JSON → OUTPUT JSON
```

### Source JSON

The source is the data being transformed. It may come from an API, database, file, Tally, XML-to-JSON conversion, or another service.

### Transformation JSON

The transformation is the instruction set. It describes output names, nesting, arrays, source paths, literals, repetition, conversions, and supported actions.

### Output JSON

The output is constructed by applying the transformation to the source.

## Ownership

```text
DATA PROVIDER → SOURCE JSON
                    │
APPLICATION ──► TRANSFORMATION
                    │
                    ▼
                OUTPUT JSON → CONSUMER
```

The source should not be modified merely to make a particular output shape possible. The transformation bridges different shapes.

## Output shape

The transformation controls the output shape. It can create an output object that did not exist in the source, rename fields, omit fields, or create nested arrays.

## Composition

Mappings can be nested repeatedly:

```text
object → array → object → array → object
```

The same mapping model is reused at every level.

## Scalar current value

Inside an iteration, `""` represents the current source value. This allows scalar arrays such as `{"names":["A","B","C"]}` to be transformed without wrapping each value in an object.

> **Source is data. Transformation is instruction. Output is result.**

---

[← Index](index.md) | [Next: Architecture →](architecture.md)
