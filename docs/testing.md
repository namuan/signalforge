# Testing patterns

Copy only the boundary that the target codebase needs, but give agents enough
access to run every meaningful boundary themselves. Tests are part of the
implementation, not a later manual review phase.

## Unit and integration tests

[`examples/testing/vitest`](../examples/testing/vitest/README.md) contains:

- a configurable factory;
- separate unit and integration example configs;
- a small unit test and a neutral in-memory integration example;
- optional Effect equality setup.

Unit tests exclude `test/integration/**`. Integration mode includes only that
tree and uses longer timeouts. Replace include patterns and resource ownership
with the target codebase’s conventions.

For database behavior, use an in-memory implementation when it proves the
contract. Use PGlite when SQL behavior matters and Testcontainers when the real
protocol, extension, or startup behavior is part of the contract. Keep schemas,
credentials, endpoints, and business fixtures out of reusable examples.

Prefer a locally owned database, container, or service fixture over instructions
that ask a person to prepare state. Resource startup and teardown belong in the
test boundary.

## Browser tests

[`examples/testing/playwright`](../examples/testing/playwright/README.md)
contains a policy factory, a concrete configuration example, and a smoke-spec
shape. The policy uses Chromium, fully parallel execution, focused-test
protection when `CI=true`, zero retries, a line reporter, retained failure
traces, and explicit server reuse semantics.

Agents should be able to start the application, control the browser, inspect
the result, and retain failure evidence without a human performing the steps.

## Coverage

This reference does not impose a percentage. Coverage thresholds depend on the
risk and behavior of the target codebase. Acceptance here is behavioral:
representative positive and negative rule cases, integration coverage for
discovery and command behavior, and deterministic neutral fixtures.

Test quantity is not the objective by itself. Add as many unit, integration,
and browser tests as needed to cover meaningful observable decisions, then let
agents maintain them alongside the implementation.
