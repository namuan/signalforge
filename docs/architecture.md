# Architecture by intent

The top-level folders answer the first question an extracting agent has: “Do I
copy this, adapt it, run it, or only read it?”

The [operating model](operating-model.md) supplies the larger rule: encode every
deterministic preference in types, lint, tests, or scripts, and reserve prose
for contextual judgment.

```text
rules/       executable lint implementations and behavioral tests
scripts/     reusable checks and repository-maintenance tools
examples/    configuration and testing patterns to copy and adapt
docs/        navigation, decisions, recipes, and generated inventory
.codex/      implementation judgment for coding agents
```

## `rules`: executable policy

`rules/oxlint` owns syntax-level checks. Its registry, metadata, profiles, and
tests form one cohesive unit. `rules/typed` owns checks that need TypeScript
type information or inspect files outside a TypeScript program.

These directories contain implementation code worth extracting. Tests live
beside the engine so an agent can preserve both passing and failing behavior
while moving a rule.

## `scripts`: operational checks

`scripts/diff-check` is a review-time program, not a normal source rule set. It
compares against a selected base revision and reports violations only on added
lines. `scripts/rule-catalog` is internal maintenance code that validates
registry parity and produces the canonical inventory. `check-neutrality.ts`
protects this reference from source-specific naming.

## `examples`: copy and adapt

Configuration and test policy are intentionally examples. Paths, project
boundaries, environment loading, and stylesheet entry points belong to the
target codebase. An agent should copy the smallest relevant example, replace
local assumptions, and keep the surrounding explanation as a review checklist.

## `docs` and `.codex`: judgment

Documentation explains applicability and extraction steps. The implementation
skill covers ownership, boundaries, failure design, state-machine behavior, and
observable tests. These are guidance, not executable policy.

When guidance becomes deterministic, promote it into a rule or test and reduce
the prose. The intended direction is from human review toward executable
enforcement.

## Generated catalog

Structured metadata feeds one catalog covering OXLint rules, typed rules, file
rules, built-ins, Tailwind policy, and added-lines checks. The generator verifies
that documented rule names match executable registries, so adding a rule does
not depend on manually maintained totals.
