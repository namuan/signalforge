# Signalforge

[![CI](https://github.com/namuan/signalforge/actions/workflows/ci.yml/badge.svg)](https://github.com/namuan/signalforge/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Signalforge is a self-contained OXLint plugin and configuration for detecting low-evidence TypeScript, likely AI-generated slop, and project-structure drift. It provides 71 custom rules under one `signalforge/*` namespace, with no ESLint runtime dependency.

## Use it

Clone Signalforge, install its development dependencies, then point its one OXLint command at a target repository:

```sh
git clone https://github.com/namuan/signalforge.git
cd signalforge
npm ci
npm run lint -- ../my-project
```

Use `npm run lint:fix -- ../my-project` to apply available fixes. OXLint discovers `oxlint.config.ts`; no ESLint configuration is used.

## Included rules

- 50 OXLint rules for TypeScript, architecture, Effect, React, XState, and Next/Tailwind patterns.
- 15 evidence-oriented TypeScript and JavaScript rules.
- 6 OXLint-native slop-signal rules, including comment-quality, file-size, pass-through export, and trivial-wrapper checks.
- OXLint's built-in `no-unused-vars` rule, replacing the original ESLint implementation.

The default config enables portable rules. Framework- and repository-specific rules remain available in `src/rules/` but are opt-in because they require local path, package, or architectural assumptions.

Do not enable `signalforge/no-comments` with `signalforge/require-safety-comment-for-type-assertion`: one prohibits ordinary comments and the other requires an assertion justification.

## Develop

```sh
npm ci
npm run check
```

GitHub Actions runs the same check on pull requests and pushes to `main`.

## Acknowledgements

Signalforge consolidates and adapts ideas and code from:

- [typeonce-dev/ai-automation](https://github.com/typeonce-dev/ai-automation)
- [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop)
- [LBognanni/slopocop](https://github.com/LBognanni/slopocop)

See [ACKNOWLEDGEMENTS.md](ACKNOWLEDGEMENTS.md) for the nature of each contribution and [NOTICE](NOTICE) for retained notices and licensing provenance.

## Licence

Signalforge is available under the [MIT License](LICENSE). Some vendored or adapted material has separate provenance and notices; see [NOTICE](NOTICE).
