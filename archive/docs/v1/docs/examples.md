# Examples

## Rename fields

```json
SOURCE:
{"NAME":"Keshav","CITY":"Kakinada"}

TRANSFORMATION:
{"mapping":{"item":{"name":"NAME","city":"CITY"}}}

OUTPUT:
{"name":"Keshav","city":"Kakinada"}
```

## Omit fields

If a source field is not mentioned in the transformation, it is not automatically copied.

```json
SOURCE:
{"id":10,"name":"Keshav","secret":"x"}

TRANSFORMATION:
{"mapping":{"item":{"id":"id","name":"name"}}}

OUTPUT:
{"id":10,"name":"Keshav"}
```

## Nested output

```json
{
  "mapping": {
    "item": {
      "customer": {
        "item": {
          "name": "name",
          "location": {"item":{"city":"city"}}
        }
      }
    }
  }
}
```

## Array output

```json
{
  "mapping": {
    "item": {
      "products": [
        {
          "list": "items",
          "item": {"name":"name","amount":"amount"}
        }
      ]
    }
  }
}
```

## Tally-shaped data

```json
{
  "mapping": {
    "item": {
      "ledger": [
        {
          "list": "LEDGERENTRIES.LIST",
          "item": {
            "name": "LEDGERNAME.#text",
            "amount": "AMOUNT.#text"
          }
        }
      ]
    }
  }
}
```

Every example follows the same model:

```text
SOURCE → TRANSFORMATION → OUTPUT
```

---

[← Previous: Tally & XML](tally.md) | [Index](index.md) | [Next: Maintenance Principles →](maintenance.md)
