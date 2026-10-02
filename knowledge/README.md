# Repository Brain & Knowledge Base

This directory (`/knowledge`) stores internal architectural blueprints, mental models, naming conventions, and ecosystem context for developers and AI agents (such as Antigravity, Gemini, Claude, Cursor, Copilot).

---

## Knowledge Artifacts

| Document | Focus | Purpose |
|---|---|---|
| [**mental-model.md**](mental-model.md) | Core Philosophy & Invariant | Defines ownership boundaries: Provider (Source) vs Application (Recipe) vs Consumer (Output). |
| [**naming-convention.md**](naming-convention.md) | Coding Standards | Strict `in`-prefixed parameter and `local`-prefixed variable naming rules. |
| [**pipeline-blueprint.md**](pipeline-blueprint.md) | Internal Engine Architecture | Traversal vs. Resolution separation, file responsibilities, and resolver priorities. |
| [**ecosystem-roundtrip.md**](ecosystem-roundtrip.md) | KeshavSoft Declarative Suite | How `tag-to-json`, `json-transformer`, and `json-to-tag` interoperate in a complete round-trip. |

---

## Purpose for AI Assistants

When modifying this repository:
1. Adhere strictly to the parameter naming convention in [naming-convention.md](naming-convention.md).
2. Never weaken the separation between `traverse.js` and `resolve.js` documented in [pipeline-blueprint.md](pipeline-blueprint.md).
3. Check regression cases described in [mental-model.md](mental-model.md).
