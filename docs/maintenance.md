# Maintenance

Keep the project understandable through one story:

```text
SOURCE = data
TRANSFORMATION = instructions
OUTPUT = result
```

## Keep responsibilities separate

Do not modify source data merely because a transformation is difficult. Improve the transformation, resolver, or relevant instruction instead.

## Protect traversal

Traversal should understand the structure of the transformation, not become a general-purpose source parser.

## Protect resolution

Path resolution should handle nested paths, literal dotted keys, root paths, and current source context.

## Preserve composition

Mappings should remain composable:

```text
object → array → object → array → object
```

Avoid special-case implementations when the existing mapping model can express the requirement.

## Regression stories

Protect:

- object mapping;
- nested objects;
- source arrays;
- scalar arrays;
- nested arrays;
- dotted paths;
- literal dotted keys;
- root-path resolution;
- Tally-shaped data.

## Before changing code

Ask:

1. Is this a transformation-language change?
2. Is it traversal?
3. Is it source resolution?
4. Is it value resolution?
5. Is it an action/conversion?
6. Can the existing mapping composition already express it?

## Final test

> A JSON Transformer takes source data and a transformation recipe and produces output JSON.
