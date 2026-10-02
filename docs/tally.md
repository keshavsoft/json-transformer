# Tally

Tally is an important real-world source format for this project. The transformer is not a Tally parser; it is a general JSON transformation engine that can consume Tally/XML-shaped JSON.

Typical source keys include:

```text
ALLINVENTORYENTRIES.LIST
LEDGERENTRIES.LIST
LEDGERNAME.#text
AMOUNT.#text
```

A transformation can map them into an application-facing shape:

```js
{
    mapping: {
        item: {
            ledger: [
                {
                    list: "LEDGERENTRIES.LIST",
                    item: {
                        name: "LEDGERNAME.#text",
                        amount: "AMOUNT.#text"
                    }
                }
            ]
        }
    }
}
```

The Tally/XML naming stays on the source side. The application receives its own shape.

## Boundary

Tally is a source story, not a reason to make the core transformer Tally-specific.

---

[← Previous: Path Resolution](path-resolution.md) | [Index](index.md) | [Next: Examples & Recipes →](examples.md)
