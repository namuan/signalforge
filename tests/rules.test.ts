import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { RuleTester } from "oxlint/plugins-dev";
import plugin from "../src/index.ts";
import noDirectFetch from "../src/rules/no-direct-fetch.ts";
import noAmbientNondeterminism from "../src/rules/no-ambient-nondeterminism.ts";
import noApiBackendImports from "../src/rules/no-api-backend-imports.ts";
import noApiRepositoryImports from "../src/rules/no-api-repository-imports.ts";
import noBannedTypeAssertions from "../src/rules/no-banned-type-assertions.ts";
import noCssModules from "../src/rules/no-css-modules.ts";
import noDirectBrowserStorage from "../src/rules/no-direct-browser-storage.ts";
import noDirectXstateCreateMachine from "../src/rules/no-direct-xstate-create-machine.ts";
import noDirectXstateUseSelector from "../src/rules/no-direct-xstate-use-selector.ts";
import noCascadingLayerProvide from "../src/rules/no-cascading-layer-provide.ts";
import noGlobalJson from "../src/rules/no-global-json.ts";
import noFixedHeightOnContent from "../src/rules/no-fixed-height-on-content.ts";
import noNonRouteLayoutFiles from "../src/rules/no-non-route-layout-files.ts";
import noNestedLayerProvide from "../src/rules/no-nested-layer-provide.ts";
import noJsxStyle from "../src/rules/no-jsx-style.ts";
import noDisableValidation from "../src/rules/no-disable-validation.ts";
import noEffectAsvoid from "../src/rules/no-effect-asvoid.ts";
import noInOperator from "../src/rules/no-in-operator.ts";
import noTypeofObject from "../src/rules/no-typeof-object.ts";
import { noChainedTypeAssertionsRule } from "../src/rules/no-chained-type-assertions.ts";
import { noConditionalEmptyObjectSpreadRule } from "../src/rules/no-conditional-empty-object-spread.ts";
import { noKnownValueWideningRule } from "../src/rules/no-known-value-widening.ts";
import { noModuleMockingRule } from "../src/rules/no-module-mocking.ts";
import { noReflectGetRule } from "../src/rules/no-reflect-get.ts";
import { noForbiddenTermInSymbolNamesRule } from "../src/rules/no-shape-in-symbol-names.ts";
import { requireSafetyCommentForTypeAssertionRule } from "../src/rules/require-safety-comment-for-type-assertion.ts";
import requireTsxInUiFolders from "../src/rules/require-tsx-in-ui-folders.ts";
import { noRuntimeTypeofRule } from "../src/rules/no-runtime-typeof.ts";
import noReactStateHooks from "../src/rules/no-react-state-hooks.ts";
import noReactComponentInnerFunctions from "../src/rules/no-react-component-inner-functions.ts";
import noReactNonComponentFunctionExports from "../src/rules/no-react-non-component-function-exports.ts";
import requireXstateEventSatisfies from "../src/rules/require-xstate-event-satisfies.ts";
import { noUnknownParametersRule } from "../src/rules/no-unknown-parameters.ts";
import { noUnknownReturnsRule } from "../src/rules/no-unknown-returns.ts";
import { noUnknownTypeAliasesRule } from "../src/rules/no-unknown-type-aliases.ts";
import { noUnsafeDictionaryTypeRule } from "../src/rules/no-unsafe-dictionary-type.ts";
import { noWidenThenAssertRule } from "../src/rules/no-widen-then-assert.ts";
import { noObjectParametersRule } from "../src/rules/no-object-parameters.ts";
import { noReflectApplyRule } from "../src/rules/no-reflect-apply.ts";
import { maxFileLinesError, maxFileLinesWarn } from "../src/rules/max-file-lines.ts";
import noHugeCommentBlocks from "../src/rules/no-huge-comment-blocks.ts";
import noImportThenExport from "../src/rules/no-import-then-export.ts";
import noLikelySlopLanguage from "../src/rules/no-likely-slop-language.ts";
import noLongCommentLines from "../src/rules/no-long-comment-lines.ts";
import noMultipleFunctionParams from "../src/rules/no-multiple-function-params.ts";
import noMultipleXstateHooks from "../src/rules/no-multiple-xstate-hooks.ts";
import noNestedEffectArrayMethods from "../src/rules/no-nested-effect-array-methods.ts";
import noOptionalFunctionParameters from "../src/rules/no-optional-function-parameters.ts";
import noServiceOption from "../src/rules/no-service-option.ts";
import noStaticEffectServiceForwarders from "../src/rules/no-static-effect-service-forwarders.ts";
import noShadowedStandardArrayStatic from "../src/rules/no-shadowed-standard-array-static.ts";
import noSqlTypeParameter from "../src/rules/no-sql-type-parameter.ts";
import pipeMaxArguments from "../src/rules/pipe-max-arguments.ts";
import preferOptionFromNullable from "../src/rules/prefer-option-from-nullable.ts";
import noSingleCallerFunction from "../src/rules/no-single-caller-function.ts";
import noSingleUsePrivateFunctions from "../src/rules/no-single-use-private-functions.ts";
import noSingleUseXstateActions from "../src/rules/no-single-use-xstate-actions.ts";
import noSingleUseXstateGuards from "../src/rules/no-single-use-xstate-guards.ts";
import noReexportOnlyModules from "../src/rules/no-reexport-only-modules.ts";
import preferEffectMatch from "../src/rules/prefer-effect-match.ts";
import noSilentErrorSwallow from "../src/rules/no-silent-error-swallow.ts";
import privateFunctionPrefix from "../src/rules/private-function-prefix.ts";
import noComments from "../src/rules/no-comments.ts";
import noSwitch from "../src/rules/no-switch.ts";
import requireApprovedUiPrimitives from "../src/rules/require-approved-ui-primitives.ts";
import requireContextServiceInServices from "../src/rules/require-context-service-in-services.ts";
import requireCnForClassnameComposition from "../src/rules/require-cn-for-classname-composition.ts";
import requireDefaultComponentExport from "../src/rules/require-default-component-export.ts";
import noTryCatch from "../src/rules/no-try-catch.ts";
import noTypeAssertion from "../src/rules/no-type-assertion.ts";

RuleTester.it = (name, run) => {
  try {
    run();
  } catch (error) {
    console.error(`Failed test case: ${name}`);
    throw error;
  }
};

const tester = new RuleTester({
  cwd: process.cwd(),
  languageOptions: { parserOptions: { lang: "ts" } },
});

tester.run("no-non-route-layout-files", noNonRouteLayoutFiles, {
  valid: [
    { code: "export default function Layout() {}", filename: "app/layout.tsx" },
    { code: "export const config = {}", filename: "app/dashboard.tsx" },
  ],
  invalid: [
    {
      code: "export default function Layout() {}",
      filename: "app/dashboard-layout.tsx",
      errors: [{ message: /nearest Next.js/ }],
    },
    {
      code: "export default function Layout() {}",
      filename: "app/dashboard/layout-old.tsx",
      errors: [{ message: /nearest Next.js/ }],
    },
  ],
});

tester.run("require-tsx-in-ui-folders", requireTsxInUiFolders, {
  valid: [
    { code: "export const value = 1", filename: "src/lib/value.ts" },
    { code: "export const GET = () => Response.json({})", filename: "src/app/api/route.ts" },
  ],
  invalid: [
    {
      code: "export const Button = () => null",
      filename: "src/components/Button.ts",
      errors: [{ message: /Only TSX files belong/ }],
    },
    {
      code: "export const value = 1",
      filename: "src/app/dashboard/data.ts",
      errors: [{ message: /Only TSX files belong/ }],
    },
  ],
});

tester.run("no-fixed-height-on-content", noFixedHeightOnContent, {
  valid: [
    { code: "const view = <p className='h-auto'>Text</p>", filename: "src/view.tsx" },
    { code: "const view = <img className='h-8' />", filename: "src/view.tsx" },
    { code: "const view = <p className='h-8'>Text</p>", filename: "src/native/view.tsx" },
  ],
  invalid: [
    {
      code: "const view = <p className='h-8'>Text</p>",
      filename: "src/view.tsx",
      errors: [{ message: /Content-bearing elements should derive their height/ }],
    },
  ],
});

tester.run("no-direct-xstate-create-machine", noDirectXstateCreateMachine, {
  valid: ["import { setup } from 'xstate'", "import { createMachine } from './machineFactory'"],
  invalid: [
    { code: "import { createMachine } from 'xstate'", errors: [{ message: /Do not use createMachine directly/ }] },
    { code: "import * as XState from 'xstate'; XState.createMachine({})", errors: [{ message: /Do not use createMachine directly/ }] },
  ],
});

tester.run("no-direct-xstate-use-selector", noDirectXstateUseSelector, {
  valid: ["import { useSelector } from './typedHooks'"],
  invalid: [
    { code: "import { useSelector } from '@xstate/react'", errors: [{ message: /Use selector hooks/ }] },
    { code: "import * as xstate from '@xstate/react'; xstate.useSelector(actor, selector)", errors: [{ message: /Use selector hooks/ }] },
  ],
});

tester.run("no-react-state-hooks", noReactStateHooks, {
  valid: ["import { useActor } from '@xstate/react'; useActor(actor)"],
  invalid: [
    { code: "import { useState } from 'react'; useState(0)", errors: [{ message: /useState is banned/ }] },
    { code: "import * as React from 'react'; React.useEffect(effect)", errors: [{ message: /useEffect is banned/ }] },
  ],
});

tester.run("require-xstate-event-satisfies", requireXstateEventSatisfies, {
  valid: ["sendTo(actor, { type: 'saved' } satisfies Event)"],
  invalid: [
    { code: "sendTo(actor, { type: 'saved' })", errors: [{ message: /must use satisfies/ }] },
  ],
});

tester.run("no-direct-browser-storage", noDirectBrowserStorage, {
  valid: ["keyValueStore.get('name')", "const storage = createStorage()"],
  invalid: [
    { code: "window.localStorage.getItem('name')", errors: [{ message: /Do not use localStorage directly/ }] },
    { code: "globalThis.sessionStorage", errors: [{ message: /Do not use sessionStorage directly/ }] },
  ],
});

tester.run("no-global-json", noGlobalJson, {
  valid: ["codec.parse(input)", "const payload = { name: 'Ada' }"],
  invalid: [
    { code: "JSON.parse(input)", errors: [{ message: /Do not use the global JSON API/ }] },
    { code: "globalThis.JSON.stringify(value)", errors: [{ message: /Do not use the global JSON API/ }] },
  ],
});

tester.run("no-css-modules", noCssModules, {
  valid: ["import styles from './styles.css'", "import './styles.module.css?inline'"],
  invalid: [
    { code: "import styles from './styles.module.css'", errors: [{ message: /CSS Modules are not allowed/ }] },
    { code: "const styles = require('./styles.module.scss')", errors: [{ message: /CSS Modules are not allowed/ }] },
  ],
});

tester.run("no-jsx-style", noJsxStyle, {
  valid: [
    { code: "const view = <div className='panel' />", filename: "src/view.tsx" },
    { code: "const view = <div style={{ color: 'red' }} />", filename: "src/native/view.tsx" },
  ],
  invalid: [
    {
      code: "const view = <div style={{ color: 'red' }} />",
      filename: "src/view.tsx",
      errors: [{ message: /Do not use JSX style props/ }],
    },
  ],
});

tester.run("require-cn-for-classname-composition", requireCnForClassnameComposition, {
  valid: [
    { code: "import { cn } from '@scope/ui-utils'; const view = <div className={cn('base', active && 'active')} />", filename: "src/view.tsx" },
    { code: "const view = <div className='base' />", filename: "src/view.tsx" },
  ],
  invalid: [
    {
      code: "const view = <div className={active ? 'active' : 'inactive'} />",
      filename: "src/view.tsx",
      errors: [{ message: /Compose conditional or combined className values with cn/ }],
    },
  ],
});

tester.run("no-react-component-inner-functions", noReactComponentInnerFunctions, {
  valid: [
    { code: "function helper() { return 1 } function App() { return <div /> }", filename: "src/view.tsx" },
  ],
  invalid: [
    {
      code: "function App() { function helper() { return 1 } return <div /> }",
      filename: "src/view.tsx",
      errors: [{ message: /Move "helper" out of the component/ }],
    },
  ],
});

tester.run("no-react-non-component-function-exports", noReactNonComponentFunctionExports, {
  valid: [
    { code: "export function Button() { return null }", filename: "src/view.tsx" },
  ],
  invalid: [
    {
      code: "export function formatValue(value: string) { return value.trim() }",
      filename: "src/view.tsx",
      errors: [{ message: /Move "formatValue" out of the TSX file/ }],
    },
  ],
});

tester.run("no-single-use-xstate-actions", noSingleUseXstateActions, {
  valid: ["setup({ actions: { log: () => {} } }).createMachine({ actions: ['log', 'log'] })"],
  invalid: [
    {
      code: "setup({ actions: { log: () => {} } }).createMachine({ actions: 'log' })",
      errors: [{ message: /Inline the "log" XState action/ }],
    },
  ],
});

tester.run("no-single-use-xstate-guards", noSingleUseXstateGuards, {
  valid: ["setup({ guards: { ready: () => true } }).createMachine({ on: { GO: [{ guard: 'ready' }, { guard: 'ready' }] } })"],
  invalid: [
    {
      code: "setup({ guards: { ready: () => true } }).createMachine({ on: { GO: { guard: 'ready' } } })",
      errors: [{ message: /Inline the "ready" XState guard/ }],
    },
  ],
});

tester.run("no-reexport-only-modules", noReexportOnlyModules, {
  valid: [
    "export { value } from './value'; export const local = true",
    { code: "export { default } from './page'", filename: "app/loading.tsx" },
  ],
  invalid: [
    { code: "export { value } from './value'", errors: [{ message: /re-export-only modules/ }] },
    { code: "export * from './value'", errors: [{ message: /re-export-only modules/ }] },
  ],
});

tester.run("require-context-service-in-services", requireContextServiceInServices, {
  valid: [
    { code: "class UserService extends Context.Service {}", filename: "src/services/user.ts" },
    { code: "export const value = 1", filename: "src/lib/value.ts" },
  ],
  invalid: [
    {
      code: "export const value = 1",
      filename: "src/services/user.ts",
      errors: [{ message: /must define a class extending Context.Service/ }],
    },
  ],
});

tester.run("require-approved-ui-primitives", requireApprovedUiPrimitives, {
  valid: [
    { code: "const view = <Button />", filename: "src/applications/store/view.tsx" },
    { code: "const view = <button />", filename: "src/shared/view.tsx" },
  ],
  invalid: [
    {
      code: "const view = <button />",
      filename: "src/applications/store/view.tsx",
      errors: [{ message: /approved design-system component/ }],
    },
    {
      code: "import Link from './Link'",
      filename: "src/applications/store/view.tsx",
      errors: [{ message: /Import Link from next\/link/ }],
    },
  ],
});

tester.run("require-default-component-export", requireDefaultComponentExport, {
  valid: [
    { code: "export default function Page() { return null }", filename: "src/applications/store/page.tsx" },
    { code: "export function Button() { return null }", filename: "src/components/Button.tsx" },
  ],
  invalid: [
    {
      code: "export function Button() { return null }",
      filename: "src/applications/store/components/Button.tsx",
      errors: [{ message: /Export one main component as default/ }],
    },
  ],
});

tester.run("no-nested-effect-array-methods", noNestedEffectArrayMethods, {
  valid: ["import { Array } from 'effect'; Array.map(items, transform)"],
  invalid: [
    {
      code: "import { Array } from 'effect'; Array.map(Array.filter(items, predicate), transform)",
      errors: [{ message: /Do not nest Effect Array method calls/ }],
    },
  ],
});

tester.run("prefer-effect-match", preferEffectMatch, {
  valid: ["const result = state === 'ready' ? 1 : fallback"],
  invalid: [
    {
      code: "const result = state === 'ready' ? 1 : state === 'loading' ? 2 : 0",
      errors: [{ message: /Use Match from effect/ }],
    },
  ],
});

tester.run("no-silent-error-swallow", noSilentErrorSwallow, {
  valid: ["Effect.catch(effect, (error) => Effect.fail(error))"],
  invalid: [
    {
      code: "Effect.catch(effect, () => Effect.void)",
      errors: [{ message: /Do not silently swallow Effect errors/ }],
    },
  ],
});

tester.run("no-multiple-xstate-hooks", noMultipleXstateHooks, {
  valid: ["import { useActor } from '@xstate/react'; function App() { useActor(first); return null }"],
  invalid: [
    {
      code: "import { useActor, useMachine } from '@xstate/react'; function App() { useActor(first); useMachine(second); return null }",
      errors: [{ message: /uses multiple @xstate\/react actor hooks/ }],
    },
  ],
});

tester.run("no-ambient-nondeterminism", noAmbientNondeterminism, {
  valid: ["const now = clock.currentTime", { code: "const now = Date.now()", filename: "src/view.tsx" }],
  invalid: [
    { code: "const now = Date.now()", filename: "src/service.ts", errors: [{ message: /ambient Date/ }] },
    { code: "const value = Math.random()", errors: [{ message: /ambient Math.random/ }] },
    { code: "const value = crypto.randomUUID()", errors: [{ message: /ambient crypto/ }] },
  ],
});

tester.run("no-api-backend-imports", noApiBackendImports, {
  valid: [
    { code: "import { Contract } from './contract'", filename: "/repo/src/contracts/index.ts" },
    { code: "import { Effect } from 'effect'", filename: "/repo/src/contracts/index.ts" },
  ],
  invalid: [
    {
      code: "import { User } from '../backend/user'",
      filename: "/repo/src/contracts/user.ts",
      errors: [{ message: /public contract area may import only local modules/ }],
    },
  ],
});

tester.run("no-api-repository-imports", noApiRepositoryImports, {
  valid: [
    { code: "import { userRepository } from '../repositories/user'", filename: "/repo/src/services/user.ts" },
    { code: "import { userRepository } from '../repositories/user'", filename: "/repo/src/api/__tests__/user.test.ts" },
  ],
  invalid: [
    {
      code: "import { userRepository } from '../repositories/user'",
      filename: "/repo/src/api/user.ts",
      errors: [{ message: /must call a service instead/ }],
    },
  ],
});

tester.run("no-cascading-layer-provide", noCascadingLayerProvide, {
  valid: ["import { Layer } from 'effect'; program.pipe(Layer.provide(Service))"],
  invalid: [
    {
      code: "import { Layer } from 'effect'; program.pipe(Layer.provide(A), Layer.provide(B))",
      errors: [{ message: /multiple Layer.provide/ }],
    },
  ],
});

tester.run("no-nested-layer-provide", noNestedLayerProvide, {
  valid: ["Layer.provide(program, Service)"],
  invalid: [
    {
      code: "Layer.provide(Layer.provide(program, Inner), Outer)",
      errors: [{ message: /Avoid nested Layer.provide/ }],
    },
  ],
});

tester.run("no-static-effect-service-forwarders", noStaticEffectServiceForwarders, {
  valid: [
    "import { Effect } from 'effect'; class ServiceApi { method = Effect.flatMap(Effect.service(this), (service) => service.method()) }",
  ],
  invalid: [
    {
      code: "import { Effect } from 'effect'; class ServiceApi { static method = Effect.flatMap(Effect.service(this), (service) => service.method()) }",
      errors: [{ message: /Do not expose an Effect service method through a static forwarder/ }],
    },
  ],
});

tester.run("no-sql-type-parameter", noSqlTypeParameter, {
  valid: ["sql`select * from users`", "query<User>`select * from users`"],
  invalid: [
    { code: "sql<User>`select * from users`", errors: [{ message: /Do not use sql<Type>/ }] },
  ],
});

tester.run("no-shadowed-standard-array-static", noShadowedStandardArrayStatic, {
  valid: ["import { Array } from 'effect'; globalThis.Array.from(items)"],
  invalid: [
    { code: "import { Array } from 'effect'; Array.from(items)", errors: [{ message: /Use globalThis.Array/ }] },
    { code: "import { Array } from 'effect'; Array.isArray(value)", errors: [{ message: /Use globalThis.Array/ }] },
  ],
});

tester.run("no-service-option", noServiceOption, {
  valid: ["Effect.service(Database)", "serviceOption(Database)"],
  invalid: [
    { code: "Effect.serviceOption(Database)", errors: [{ message: /Do not use Effect.serviceOption/ }] },
  ],
});

tester.run("pipe-max-arguments", pipeMaxArguments, {
  valid: ["value.pipe(one, two)", `value.pipe(${Array(19).fill("step").join(", ")})`],
  invalid: [
    { code: `value.pipe(${Array(21).fill("step").join(", ")})`, errors: [{ message: /too many arguments/ }] },
  ],
});

tester.run("prefer-option-from-nullable", preferOptionFromNullable, {
  valid: ["Option.fromNullable(value)", "value === null ? Option.none() : Option.some(value)"],
  invalid: [
    {
      code: "value !== null ? Option.some(value) : Option.none()",
      errors: [{ message: /Option.fromNullable/ }],
    },
  ],
});

tester.run("no-banned-type-assertions", noBannedTypeAssertions, {
  valid: ["const value = input as string", "const value = input as const"],
  invalid: [
    { code: "const value = input as any", errors: [{ message: /Do not assert to any/ }] },
    { code: "const value = input as unknown", errors: [{ message: /Do not assert to any/ }] },
  ],
});

tester.run("no-disable-validation", noDisableValidation, {
  valid: ["const options = { disableValidation: false }", "const options = { validate: true }"],
  invalid: [
    { code: "const options = { disableValidation: true }", errors: [{ message: /Do not use disableValidation/ }] },
  ],
});

tester.run("no-effect-asvoid", noEffectAsvoid, {
  valid: ["asVoid(effect)", "Effect.map(effect, () => undefined)"],
  invalid: [
    { code: "Effect.asVoid", errors: [{ message: /Avoid Effect\.asVoid/ }] },
  ],
});

tester.run("no-in-operator", noInOperator, {
  valid: ["const value = object.hasOwnProperty(key)", "const value = left + right"],
  invalid: [
    { code: "const value = key in object", errors: [{ message: /Do not use the "in" operator/ }] },
  ],
});

tester.run("no-typeof-object", noTypeofObject, {
  valid: ["const value = typeof input === 'string'", "const value = input === null"],
  invalid: [
    { code: "const value = typeof input === 'object'", errors: [{ message: /Do not compare typeof values/ }] },
  ],
});

tester.run("no-shape-in-symbol-names", noForbiddenTermInSymbolNamesRule, {
  valid: ["const geometry = {}", "function describeOutline() {}"],
  invalid: [
    { code: "const shapeCache = {}", errors: [{ messageId: "forbiddenSymbolName" }] },
    { code: "function ShapeFactory() {}", errors: [{ messageId: "forbiddenSymbolName" }] },
  ],
});

tester.run("require-safety-comment-for-type-assertion", requireSafetyCommentForTypeAssertionRule, {
  valid: [
    "const value = input as const",
    "// SAFETY: input was validated by the schema.\nconst value = input as string",
  ],
  invalid: [
    { code: "const value = input as string", errors: [{ messageId: "missingSafetyComment" }] },
    { code: "const value = <string>input", errors: [{ messageId: "missingSafetyComment" }] },
  ],
});

tester.run("no-reflect-get", noReflectGetRule, {
  valid: ["const value = record.name", "const Reflect = { get() {} }; Reflect.get(record, 'name')"],
  invalid: [
    { code: "Reflect.get(record, 'name')", errors: [{ messageId: "reflectGet" }] },
    { code: "Reflect['get'](record, 'name')", errors: [{ messageId: "reflectGet" }] },
  ],
});

tester.run("no-runtime-typeof", noRuntimeTypeofRule, {
  valid: ["const value = isString(input)", "const value = input === null"],
  invalid: [
    { code: "if (typeof input === 'string') run()", errors: [{ messageId: "runtimeTypeof" }] },
  ],
});

tester.run("no-unknown-parameters", noUnknownParametersRule, {
  valid: ["function fail(cause: unknown) {}", "function accept(value: string) {}"],
  invalid: [
    { code: "function accept(value: unknown) {}", errors: [{ messageId: "unknownParameter" }] },
    { code: "const accept = (value: unknown) => value", errors: [{ messageId: "unknownParameter" }] },
  ],
});

tester.run("no-unknown-returns", noUnknownReturnsRule, {
  valid: ["function parse(): User { return user }", "function identity<T>(value: T): T { return value }"],
  invalid: [
    { code: "function parse(): unknown { return input }", errors: [{ messageId: "unknownReturn" }] },
    { code: "function parse(): Promise<unknown> { return input }", errors: [{ messageId: "unknownReturn" }] },
  ],
});

tester.run("no-unknown-type-aliases", noUnknownTypeAliasesRule, {
  valid: ["type Input = string", "type Cause = unknown | Error"],
  invalid: [
    { code: "type Input = unknown", errors: [{ messageId: "unknownAlias" }] },
    { code: "type Input = Hidden; type Hidden = unknown", errors: [{ messageId: "unknownAlias" }, { messageId: "unknownAlias" }] },
  ],
});

tester.run("no-unsafe-dictionary-type", noUnsafeDictionaryTypeRule, {
  valid: ["type Values = Record<string, User>", "type Values = { [key: string]: User }"],
  invalid: [
    { code: "type Values = Record<string, unknown>", errors: [{ messageId: "unsafeDictionary" }] },
    { code: "type Values = { [key: string]: any }", errors: [{ messageId: "unsafeDictionary" }] },
  ],
});

tester.run("no-known-value-widening", noKnownValueWideningRule, {
  valid: ["const value = { name: 'Ada' }", "const value: User = { name: 'Ada' }"],
  invalid: [
    { code: "const value: object = { name: 'Ada' }", errors: [{ messageId: "widening" }] },
  ],
});

tester.run("no-widen-then-assert", noWidenThenAssertRule, {
  valid: [
    "const value: User = { name: 'Ada' }; const parsed = value as User",
    "const value: unknown = input; const parsed = decode(value)",
  ],
  invalid: [
    {
      code: "const value: unknown = { name: 'Ada' }; const parsed = value as User",
      errors: [{ messageId: "widenThenAssert" }],
    },
  ],
});

tester.run("no-chained-type-assertions", noChainedTypeAssertionsRule, {
  valid: ["const value = input as string", "const value = input as const"],
  invalid: [
    { code: "const value = input as unknown as string", errors: [{ messageId: "chained" }] },
    { code: "const value = <string><unknown>input", errors: [{ messageId: "chained" }] },
  ],
});

tester.run("no-conditional-empty-object-spread", noConditionalEmptyObjectSpreadRule, {
  valid: [
    "const value = { ...(condition ? { name } : { name: 'default' }) }",
    "const value = condition ? { ...source } : {}",
  ],
  invalid: [
    {
      code: "const value = { ...(condition ? { name } : {}) }",
      errors: [{ messageId: "avoid" }],
    },
  ],
});

tester.run("no-object-parameters", noObjectParametersRule, {
  valid: ["function receive(value: Record<string, string>) {}", "function receive(value: User) {}"],
  invalid: [
    { code: "function receive(value: object) {}", errors: [{ messageId: "objectParameter" }] },
    { code: "type Input = object; function receive(value: Input) {}", errors: [{ messageId: "objectParameter" }] },
  ],
});

tester.run("no-module-mocking", noModuleMockingRule, {
  valid: [
    "mockService.mock()",
    "const vi = { mock() {} }; vi.mock()",
  ],
  invalid: [
    { code: "vi.mock('./dependency')", errors: [{ messageId: "moduleMock" }] },
    { code: "jest['doMock']('./dependency')", errors: [{ messageId: "moduleMock" }] },
  ],
});

tester.run("no-reflect-apply", noReflectApplyRule, {
  valid: [
    "handler.call(context, value)",
    "const Reflect = { apply() {} }; Reflect.apply(handler, context, args)",
  ],
  invalid: [
    { code: "Reflect.apply(handler, context, args)", errors: [{ messageId: "reflectApply" }] },
    { code: "Reflect['apply'](handler, context, args)", errors: [{ messageId: "reflectApply" }] },
  ],
});

tester.run("max-file-lines-warn", maxFileLinesWarn, {
  valid: ["const value = 1", Array(500).fill("0;").join("\n")],
  invalid: [
    { code: Array(501).fill("0;").join("\n"), errors: [{ message: /maximum is 500/ }] },
  ],
});

tester.run("max-file-lines-error", maxFileLinesError, {
  valid: [Array(750).fill("0;").join("\n")],
  invalid: [
    { code: Array(751).fill("0;").join("\n"), errors: [{ message: /maximum is 750/ }] },
  ],
});

tester.run("no-huge-comment-blocks", noHugeCommentBlocks, {
  valid: ["/* one\n * two\n * three */", "// one\n\n// two\n\n// three\n\n// four"],
  invalid: [
    { code: "/* one\n * two\n * three\n * four */", errors: [{ message: /spans 4 lines/ }] },
  ],
});

tester.run("no-long-comment-lines", noLongCommentLines, {
  valid: ["// short comment", `// ${"x".repeat(100)}`],
  invalid: [
    { code: `// ${"x".repeat(101)}`, errors: [{ message: /maximum is 100/ }] },
  ],
});

tester.run("no-likely-slop-language", noLikelySlopLanguage, {
  valid: ["// This comment explains the check."],
  invalid: [
    { code: "// Here's the thing: no shortcuts.", errors: [{ message: /slop/ }] },
  ],
});

tester.run("no-import-then-export", noImportThenExport, {
  valid: [
    "import { value } from './source'; export { value }",
    "import { value } from './source'; const copy = value",
  ],
  invalid: [
    {
      code: "import { value } from './source'; const local = 1; export { value }",
      errors: [{ message: /re-exported from/ }],
    },
  ],
});

tester.run("no-direct-fetch", noDirectFetch, {
  valid: ["client.fetch(url)", "window.fetcher(url)", "const response = request(url)"],
  invalid: [
    { code: "fetch(url)", errors: [{ message: /Do not call fetch directly/ }] },
    { code: "window.fetch(url)", errors: [{ message: /Do not call fetch directly/ }] },
    { code: "globalThis.fetch(url)", errors: [{ message: /Do not call fetch directly/ }] },
  ],
});

tester.run("no-comments", noComments, {
  valid: [
    "const value = 1",
    { code: "// eslint-disable-next-line no-unused-vars\nconst value = 1", filename: "file.ts" },
    { code: "const value = 1", filename: "file.generated.ts" },
  ],
  invalid: [
    { code: "// explanatory\nconst value = 1", errors: [{ message: /Remove this comment/ }] },
    { code: "/* explanatory */ const value = 1", errors: [{ message: /Remove this comment/ }] },
  ],
});

tester.run("no-switch", noSwitch, {
  valid: ["const value = condition ? left : right", "if (condition) run()"],
  invalid: [
    { code: "switch (value) { case 1: break }", errors: [{ message: /Switch statements are banned/ }] },
  ],
});

tester.run("no-try-catch", noTryCatch, {
  valid: ["const value = run()", "Effect.try(() => run())"],
  invalid: [
    { code: "try { run() } catch { recover() }", errors: [{ message: /Do not use try\/catch/ }] },
  ],
});

tester.run("no-type-assertion", noTypeAssertion, {
  valid: [
    "const value = { name: 'Ada' } as const",
    "const value = makeValue()",
    "const machine = setup({ types: { context: {} as Context } })",
  ],
  invalid: [
    { code: "const value = input as string", errors: [{ message: /Avoid type assertions/ }] },
    { code: "const value = <string>input", errors: [{ message: /Avoid type assertions/ }] },
  ],
});

tester.run("no-multiple-function-params", noMultipleFunctionParams, {
  valid: [
    "function load(options: Options) {}",
    "items.map((item, index) => item + index)",
  ],
  invalid: [
    {
      code: "function add(left: number, right: number) { return left + right }",
      errors: [{ message: /more than one parameter/ }],
    },
  ],
});

tester.run("no-optional-function-parameters", noOptionalFunctionParameters, {
  valid: ["function load(value: string | undefined) {}", "const load = (value: string) => value"],
  invalid: [
    { code: "function load(value?: string) {}", errors: [{ message: /Optional function parameters are banned/ }] },
    { code: "const load = (value?: string) => value", errors: [{ message: /Optional function parameters are banned/ }] },
  ],
});

tester.run("private-function-prefix", privateFunctionPrefix, {
  valid: ["function _load() {}", "export function load() {}", "function Load() {}"],
  invalid: [
    { code: "function load() {}", errors: [{ message: /must start with an underscore/ }] },
    { code: "const load = () => 1", errors: [{ message: /must start with an underscore/ }] },
  ],
});

tester.run("no-single-use-private-functions", noSingleUsePrivateFunctions, {
  valid: [
    "function load() { return 1 } const first = load(); const second = load()",
    "export function load() { return 1 } const value = load()",
  ],
  invalid: [
    {
      code: "function load() { return 1 } const value = load()",
      errors: [{ message: /Inline the private function/ }],
    },
  ],
});

tester.run("no-single-caller-function", noSingleCallerFunction, {
  valid: [
    "function load() { return 1 } function first() { return load() } function second() { return load() }",
    "export function load() { return 1 } function wrapper() { return load() }",
  ],
  invalid: [
    {
      code: "function load() { return 1 } function wrapper() { return load() }",
      errors: [{ message: /one trivial caller/ }],
    },
  ],
});

const testSource = readFileSync(new URL(import.meta.url), "utf8");
const testedRuleNames = new Set(
  [...testSource.matchAll(/tester\.run\("([^"]+)"/g)].map((match) => match[1])
);
assert.deepEqual(
  Object.keys(plugin.rules).sort(),
  [...testedRuleNames].sort()
);
