# Mapping Language

The transformation describes the desired output and where its values come from.

## `item`

Describes an output object:

```json
{"mapping":{"item":{"name":"NAME","city":"CITY"}}}
```

## `list`

Selects a source collection and repeats an item mapping:

```json
{"list":"ITEMS","item":{"name":"NAME"}}
```

## Current value

```text
""
```

means the current source value while processing a collection.

## Literal values

`$value` represents literal-value behavior supported by the current mapping language.

## Other mapping families

- `objectify` — array-oriented mapping of a source value.
- `flat` — select one indexed array element and map it.
- `collect` — compose array results.
- `(TYPE)` — supported type conversion.
- `{ACTION}` — supported action.
- `^path` — resolve against the root source.

## Language rule

Every mapping instruction should answer one of these questions:

```text
What should the output look like?
Where should its value come from?
Is it a literal?
Should a collection be repeated?
Should the value be specially processed?
```
