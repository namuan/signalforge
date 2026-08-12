# Automation-first operating model

AI can produce and inspect code faster than a person can review it line by line.
If every implementation still waits for complete human reading, human attention
becomes the throughput limit.

This repository follows a different operating model: people own architecture,
system boundaries, and the verification strategy; agents implement changes and
prove them against automated constraints. Human review concentrates on
decisions and exceptional risk rather than routine syntax.

## Turn observations into enforcement

When an implementation reveals a repeatable bad pattern, do not rely on future
reviewers remembering it. Ask another agent to encode the observation at the
strongest practical layer:

| Concern                                         | Preferred enforcement                                                       |
| ----------------------------------------------- | --------------------------------------------------------------------------- |
| Invalid states and data shapes                  | Strict types, branded types, schemas, and exhaustive matching               |
| Forbidden code patterns or ownership violations | Syntax or type-aware lint rules                                             |
| Inconsistent UI primitives and styling          | Closed design tokens, component boundaries, style lint, and CSS compilation |
| Observable behavior and failures                | Unit, integration, and browser tests                                        |
| Context-dependent implementation judgment       | A concise implementation skill                                              |
| High-risk changed files or APIs                 | Diff-based alerts                                                           |

If a preference is deterministic enough to lint or test, move it out of prose.
Skills are for decisions that remain contextual.

## Begin with strict types

Types are the first verification boundary. Enable the strongest practical
compiler settings, model invalid states out of public contracts, and use
branded values, schemas, and exhaustive matching where plain structural types
cannot express an invariant.

Use type-aware lint only when the compiler has enough information to identify a
project-specific misuse that typechecking itself permits.

## Maintain a closed UI system

Open access to a framework's full styling vocabulary produces inconsistent
interfaces. A reusable UI setup should instead:

1. remove all default Tailwind theme tokens with `--*: initial;`;
2. define the smallest useful set of project-owned tokens;
3. expose repeated behavior through an approved component library;
4. reject unknown, deprecated, conflicting, duplicate, concatenated, arbitrary,
   or otherwise restricted classes;
5. reject native interactive elements outside the component boundary;
6. make the approved `className` composition path the only styling mechanism;
7. compile CSS and assert both that custom utilities exist and defaults do not.

The goal is a closed world: an agent can compose only the styles and primitives
the design system intentionally exposes.

## Let agents verify end to end

Agents should have access to every locally reproducible verification surface
required by the change: typechecking, linters, databases, containers, browser
automation, local servers, webhook tunnels, telemetry, crash reports, and other
relevant tools.

A completed implementation should include its verification evidence. Avoid
handoffs that require a person to perform routine setup or manually inspect
behavior that an agent could have exercised.

## Spend attention on critical changes

Manual review is most valuable for architecture, irreversible operations,
security boundaries, migrations, public contracts, dependency changes, and
other exceptional risk. Added-lines and changed-file scripts should surface
those changes directly instead of making a person search the entire diff.

The operating loop is:

1. let an agent implement and run the complete verification boundary;
2. inspect architecture and flagged critical changes;
3. turn newly observed repeatable failures into types, rules, tests, or scripts;
4. update skills only for the judgment that cannot yet be automated.
