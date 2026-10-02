# Arrays

Arrays are described by selecting a source collection and providing an item recipe.

## Basic array

```json
{
  "items": [
    {
      "list": "products",
      "item": {"name": "NAME"}
    }
  ]
}
```

## Nested arrays

The same pattern can be repeated:

```text
orders[]
  └── items[]
        └── batches[]
```

Each level selects a collection, repeats its item mapping, and constructs output.

## Scalar arrays

For:

```json
{"names":["A","B","C"]}
```

`""` can consume the current value while the list mapping repeats.

## Composition

There is no separate algorithm for every business shape. The mapping model composes recursively for structures such as:

```text
voucher[]
  ├── inventory[]
  │     └── batch[]
  ├── ledger[]
  └── allLedger[]
```
