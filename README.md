JSON Transformer

A practical JSON-to-JSON transformation engine.

The idea is simple:

SOURCE JSON
    +
TRANSFORMATION JSON
    │
    ▼
OUTPUT JSON

The three have different responsibilities:

- Source JSON is the data.
- Transformation JSON is the instruction.
- Output JSON is the result.

The source can belong to another system. The transformation belongs to the application. The output belongs to the consumer.

---

The Mental Model

Think of the transformation as an output recipe.

Source JSON

{
  "name": "Keshav",
  "city": "Kakinada",
  "phone": "9999999999",
  "internalCode": "SECRET"
}

This is simply data.

Transformation JSON

const transformation = {
    mapping: {
        item: {
            customerName: "name",
            customerCity: "city"
        }
    }
};

This is the instruction.

It says:

«Create "customerName" using "name", and create "customerCity" using "city".»

Output JSON

{
  "customerName": "Keshav",
  "customerCity": "Kakinada"
}

The source has not been modified.

The transformation has decided what the output should look like.

---

The Core Rule

SOURCE JSON
    = DATA

TRANSFORMATION JSON
    = INSTRUCTIONS

OUTPUT JSON
    = RESULT

This distinction is the foundation of the project.

---

Basic Usage

import transformer from "json-traversal";

const source = {
    name: "Keshav",
    city: "Kakinada"
};

const transformation = {
    mapping: {
        item: {
            customerName: "name",
            customerCity: "city"
        }
    }
};

const result = transformer.transform(source, transformation);

console.log(result);

Result:

{
  "customerName": "Keshav",
  "customerCity": "Kakinada"
}

---

The Transformation Defines the Output

The source does not have to look like the output.

A source can contain:

{
  "id": 1001,
  "name": "Keshav",
  "city": "Kakinada",
  "phone": "9999999999",
  "internalCode": "SECRET"
}

while the transformation selects only:

{
  "id": "id",
  "name": "name",
  "city": "city"
}

The result becomes:

{
  "id": 1001,
  "name": "Keshav",
  "city": "Kakinada"
}

Unmentioned source properties are not automatically copied.

---

The Output Can Have a Different Shape

The transformation can create structure that does not exist in the source.

Source:

{
  "name": "Keshav",
  "city": "Kakinada"
}

Transformation:

{
    mapping: {
        item: {
            customer: {
                item: {
                    name: "name",
                    location: {
                        item: {
                            city: "city"
                        }
                    }
                }
            }
        }
    }
}

Output:

{
  "customer": {
    "name": "Keshav",
    "location": {
      "city": "Kakinada"
    }
  }
}

The source provided the data.

The transformation created the shape.

---

Arrays

The same transformation model works with collections.

Source:

{
  "items": [
    { "name": "ROPE", "amount": 260 },
    { "name": "CABLE", "amount": 540 }
  ]
}

Transformation:

{
    mapping: {
        item: {
            products: [
                {
                    list: "items",
                    item: {
                        productName: "name",
                        amount: "amount"
                    }
                }
            ]
        }
    }
}

Output:

{
  "products": [
    {
      "productName": "ROPE",
      "amount": 260
    },
    {
      "productName": "CABLE",
      "amount": 540
    }
  ]
}

The important part is that "list" selects the source collection and "item" describes how each element becomes output.

The same idea can be composed again for nested arrays.

---

Scalar Arrays

The source collection does not have to contain objects.

For example:

{
  "LedgerName": [
    "Cash",
    "Sales",
    "Purchase"
  ]
}

A list can process those values directly.

Within the current item:

""

represents the current source value.

Therefore the same mechanism can process scalar collections without requiring the source to be changed into artificial objects.

---

Tally and XML-Shaped JSON

The transformer is useful with JSON produced from XML/Tally-style structures.

A source may contain keys such as:

ALLINVENTORYENTRIES.LIST
LEDGERENTRIES.LIST
LEDGERNAME.#text
AMOUNT.#text

The transformation can describe the application-facing result:

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

The Tally structure remains on the source side.

The application receives the shape described by the transformation.

Tally is therefore a source story, not the definition of the transformer itself.

---

Mapping Language

The transformation language provides several mapping forms:

Mapping| Purpose
"item"| Describe an output object
"list"| Select a source collection and repeat an item mapping
"objectify"| Represent a source value through an array-oriented mapping
"flat"| Select one indexed element from a source array
"collect"| Compose array results
"$value"| Provide a literal value
""""| Use the current source value
"(TYPE)"| Apply a supported type conversion
"{ACTION}"| Apply a supported action
"^path"| Resolve against the root source

See ""docs/mapping-language.md"" (docs/mapping-language.md) for the detailed language.

---

Architecture

Conceptually:

transform(source, transformation)
              │
              ▼
       mapping traversal
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
     object  array   value
       │      │       │
       │      │       ▼
       │      │   resolve value
       │      │       │
       │      │       ▼
       │      │   resolve path
       │      │
       │      ▼
       │   source collection
       │
       ▼
 recursively traverse
 child mappings
              │
              ▼
          OUTPUT JSON

The responsibilities are intentionally separated:

- "traverse.js" understands the transformation structure.
- "resolve.js" understands source paths.
- "value.js" resolves mapping values.
- "actions.js" handles supported actions and conversions.
- "constants.js" contains mapping syntax identifiers.

---

Documentation

- [**Live Showcase & Playground**](https://keshavsoft.github.io/json-transformer/) — interactive browser sandbox.
- [**Documentation Index**](docs/index.md) — complete reading order and ecosystem story.
- [**Concepts**](docs/concepts.md) — the central mental model and ownership boundaries.
- [**Architecture**](docs/architecture.md) — how traversal and resolution operate separately.
- [**Mapping Language**](docs/mapping-language.md) — transformation syntax and directives.
- [**Arrays & Collections**](docs/arrays.md) — basic, nested, and scalar array iteration.
- [**Path Resolution**](docs/path-resolution.md) — dotted keys, XML `#text`, and root escapes.
- [**Tally & XML**](docs/tally.md) — consuming real-world Tally accounting vouchers.
- [**Examples & Recipes**](docs/examples.md) — progressive cookbook and patterns.
- [**Maintenance Principles**](docs/maintenance.md) — rules for evolving and protecting the engine.

---

One Sentence

«JSON Transformer takes source data and a transformation recipe and produces output JSON.»

Everything else in the project exists to make that transformation understandable, composable, and reliable.