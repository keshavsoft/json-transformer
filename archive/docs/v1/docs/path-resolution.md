# Path Resolution

Path resolution answers:

> Which value in the source does this mapping instruction refer to?

## Ordinary path

For:

```json
{"customer":{"address":{"city":"Kakinada"}}}
```

the path `customer.address.city` resolves to `Kakinada`.

## Literal dotted property names

XML/Tally-derived JSON may contain:

```json
{"LEDGERNAME.#text":"Cash"}
```

The key itself contains a dot. The resolver must distinguish such a literal property from ordinary nested-path traversal.

## Root paths

`^path` lets a nested mapping resolve against the original root source rather than only the current nested context.

## Separation

Traversal decides what the transformation asks for. Resolution decides where that value exists in the source.

---

[← Previous: Arrays & Collections](arrays.md) | [Index](index.md) | [Next: Tally & XML →](tally.md)
