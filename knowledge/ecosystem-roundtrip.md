# The KeshavSoft Declarative Round-Trip Ecosystem

## The Complete Loop

```text
┌────────────────┐      (Extract Spec)       ┌────────────────────────┐
│  Live HTML DOM │ ────────────────────────► │ Declarative JSON Spec  │
└────────────────┘       tag-to-json         └────────────────────────┘
        ▲                                                ▲
        │                                                │
 (Render DOM)                                   (Transform Data)
 json-to-tag                                    json-transformer
        │                                                │
        └────────────────────────────────────────────────┘
                               ▲
                        ┌──────────────┐
                        │  Raw Source  │
                        │ (APIs, Tally)│
                        └──────────────┘
```

## The Trio

1. **tag-to-json**:
   - Web: https://keshavsoft.github.io/tag-to-json/
   - Role: Reverse-engineers live HTML DOM elements, extracting attributes, styles, hierarchy, and content into standard declarative JSON specs.

2. **json-transformer**:
   - Web: https://keshavsoft.github.io/json-transformer/
   - Role: Pure declarative data transformer. Consumes raw enterprise structures (e.g. Tally accounting XML, ERP payloads, REST responses) and maps them into target JSON specs or application data models.

3. **json-to-tag**:
   - Web: https://keshavsoft.github.io/json-to-tag/
   - Role: Declarative DOM compiler. Takes JSON specifications and constructs reactive, high-performance HTML DOM trees.
