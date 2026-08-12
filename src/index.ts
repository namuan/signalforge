import noBannedTypeAssertions from "./rules/no-banned-type-assertions.ts";
import { maxFileLinesError, maxFileLinesWarn } from "./rules/max-file-lines.ts";
import noHugeCommentBlocks from "./rules/no-huge-comment-blocks.ts";
import noImportThenExport from "./rules/no-import-then-export.ts";
import noLikelySlopLanguage from "./rules/no-likely-slop-language.ts";
import noLongCommentLines from "./rules/no-long-comment-lines.ts";
import noSingleCallerFunction from "./rules/no-single-caller-function.ts";
import { noChainedTypeAssertionsRule } from "./rules/no-chained-type-assertions.ts";
import { noConditionalEmptyObjectSpreadRule } from "./rules/no-conditional-empty-object-spread.ts";
import { noKnownValueWideningRule } from "./rules/no-known-value-widening.ts";
import { noModuleMockingRule } from "./rules/no-module-mocking.ts";
import { noObjectParametersRule } from "./rules/no-object-parameters.ts";
import { noReflectApplyRule } from "./rules/no-reflect-apply.ts";
import { noReflectGetRule } from "./rules/no-reflect-get.ts";
import { noRuntimeTypeofRule } from "./rules/no-runtime-typeof.ts";
import { noForbiddenTermInSymbolNamesRule } from "./rules/no-shape-in-symbol-names.ts";
import { noUnknownParametersRule } from "./rules/no-unknown-parameters.ts";
import { noUnknownReturnsRule } from "./rules/no-unknown-returns.ts";
import { noUnknownTypeAliasesRule } from "./rules/no-unknown-type-aliases.ts";
import { noUnsafeDictionaryTypeRule } from "./rules/no-unsafe-dictionary-type.ts";
import { noWidenThenAssertRule } from "./rules/no-widen-then-assert.ts";
import { requireSafetyCommentForTypeAssertionRule } from "./rules/require-safety-comment-for-type-assertion.ts";
import noCascadingLayerProvide from "./rules/no-cascading-layer-provide.ts";
import noApiBackendImports from "./rules/no-api-backend-imports.ts";
import noApiRepositoryImports from "./rules/no-api-repository-imports.ts";
import noAmbientNondeterminism from "./rules/no-ambient-nondeterminism.ts";
import noComments from "./rules/no-comments.ts";
import noCssModules from "./rules/no-css-modules.ts";
import noDirectBrowserStorage from "./rules/no-direct-browser-storage.ts";
import noDirectFetch from "./rules/no-direct-fetch.ts";
import noDirectXstateCreateMachine from "./rules/no-direct-xstate-create-machine.ts";
import noDirectXstateUseSelector from "./rules/no-direct-xstate-use-selector.ts";
import noDisableValidation from "./rules/no-disable-validation.ts";
import noEffectAsvoid from "./rules/no-effect-asvoid.ts";
import noGlobalJson from "./rules/no-global-json.ts";
import noInOperator from "./rules/no-in-operator.ts";
import noJsxStyle from "./rules/no-jsx-style.ts";
import noFixedHeightOnContent from "./rules/no-fixed-height-on-content.ts";
import noMultipleFunctionParams from "./rules/no-multiple-function-params.ts";
import noMultipleXstateHooks from "./rules/no-multiple-xstate-hooks.ts";
import noNestedEffectArrayMethods from "./rules/no-nested-effect-array-methods.ts";
import noNestedLayerProvide from "./rules/no-nested-layer-provide.ts";
import noNonRouteLayoutFiles from "./rules/no-non-route-layout-files.ts";
import noOptionalFunctionParameters from "./rules/no-optional-function-parameters.ts";
import noReexportOnlyModules from "./rules/no-reexport-only-modules.ts";
import noReactComponentInnerFunctions from "./rules/no-react-component-inner-functions.ts";
import noReactNonComponentFunctionExports from "./rules/no-react-non-component-function-exports.ts";
import noReactStateHooks from "./rules/no-react-state-hooks.ts";
import noServiceOption from "./rules/no-service-option.ts";
import noShadowedStandardArrayStatic from "./rules/no-shadowed-standard-array-static.ts";
import noSilentErrorSwallow from "./rules/no-silent-error-swallow.ts";
import noStaticEffectServiceForwarders from "./rules/no-static-effect-service-forwarders.ts";
import noSingleUsePrivateFunctions from "./rules/no-single-use-private-functions.ts";
import noSingleUseXstateActions from "./rules/no-single-use-xstate-actions.ts";
import noSingleUseXstateGuards from "./rules/no-single-use-xstate-guards.ts";
import noSqlTypeParameter from "./rules/no-sql-type-parameter.ts";
import noSwitch from "./rules/no-switch.ts";
import noTypeAssertion from "./rules/no-type-assertion.ts";
import noTypeofObject from "./rules/no-typeof-object.ts";
import noTryCatch from "./rules/no-try-catch.ts";
import pipeMaxArguments from "./rules/pipe-max-arguments.ts";
import preferEffectMatch from "./rules/prefer-effect-match.ts";
import preferOptionFromNullable from "./rules/prefer-option-from-nullable.ts";
import privateFunctionPrefix from "./rules/private-function-prefix.ts";
import requireApprovedUiPrimitives from "./rules/require-approved-ui-primitives.ts";
import requireCnForClassnameComposition from "./rules/require-cn-for-classname-composition.ts";
import requireContextServiceInServices from "./rules/require-context-service-in-services.ts";
import requireDefaultComponentExport from "./rules/require-default-component-export.ts";
import requireTsxInUiFolders from "./rules/require-tsx-in-ui-folders.ts";
import requireXstateEventSatisfies from "./rules/require-xstate-event-satisfies.ts";
import type { RuleTester } from "oxlint/plugins-dev";

type Rule = Parameters<RuleTester["run"]>[1];

interface Plugin {
  readonly meta: {
    readonly name: string;
  };
  readonly rules: Readonly<Record<string, Rule>>;
}

const plugin: Plugin = {
  meta: {
    name: "signalforge",
  },
  rules: {
    "max-file-lines-error": maxFileLinesError,
    "max-file-lines-warn": maxFileLinesWarn,
    "no-huge-comment-blocks": noHugeCommentBlocks,
    "no-import-then-export": noImportThenExport,
    "no-likely-slop-language": noLikelySlopLanguage,
    "no-long-comment-lines": noLongCommentLines,
    "no-single-caller-function": noSingleCallerFunction,
    "no-chained-type-assertions": noChainedTypeAssertionsRule,
    "no-conditional-empty-object-spread": noConditionalEmptyObjectSpreadRule,
    "no-known-value-widening": noKnownValueWideningRule,
    "no-module-mocking": noModuleMockingRule,
    "no-object-parameters": noObjectParametersRule,
    "no-reflect-apply": noReflectApplyRule,
    "no-reflect-get": noReflectGetRule,
    "no-runtime-typeof": noRuntimeTypeofRule,
    "no-shape-in-symbol-names": noForbiddenTermInSymbolNamesRule,
    "no-unknown-parameters": noUnknownParametersRule,
    "no-unknown-returns": noUnknownReturnsRule,
    "no-unknown-type-aliases": noUnknownTypeAliasesRule,
    "no-unsafe-dictionary-type": noUnsafeDictionaryTypeRule,
    "no-widen-then-assert": noWidenThenAssertRule,
    "require-safety-comment-for-type-assertion": requireSafetyCommentForTypeAssertionRule,
    "no-ambient-nondeterminism": noAmbientNondeterminism,
    "no-api-backend-imports": noApiBackendImports,
    "no-api-repository-imports": noApiRepositoryImports,
    "no-banned-type-assertions": noBannedTypeAssertions,
    "no-cascading-layer-provide": noCascadingLayerProvide,
    "no-comments": noComments,
    "no-css-modules": noCssModules,
    "no-direct-browser-storage": noDirectBrowserStorage,
    "no-direct-fetch": noDirectFetch,
    "no-direct-xstate-create-machine": noDirectXstateCreateMachine,
    "no-direct-xstate-use-selector": noDirectXstateUseSelector,
    "no-disable-validation": noDisableValidation,
    "no-effect-asvoid": noEffectAsvoid,
    "no-global-json": noGlobalJson,
    "no-in-operator": noInOperator,
    "no-jsx-style": noJsxStyle,
    "no-fixed-height-on-content": noFixedHeightOnContent,
    "no-multiple-function-params": noMultipleFunctionParams,
    "no-multiple-xstate-hooks": noMultipleXstateHooks,
    "no-nested-effect-array-methods": noNestedEffectArrayMethods,
    "no-nested-layer-provide": noNestedLayerProvide,
    "no-non-route-layout-files": noNonRouteLayoutFiles,
    "no-optional-function-parameters": noOptionalFunctionParameters,
    "no-reexport-only-modules": noReexportOnlyModules,
    "no-react-component-inner-functions": noReactComponentInnerFunctions,
    "no-react-non-component-function-exports":
      noReactNonComponentFunctionExports,
    "no-react-state-hooks": noReactStateHooks,
    "no-service-option": noServiceOption,
    "no-shadowed-standard-array-static": noShadowedStandardArrayStatic,
    "no-silent-error-swallow": noSilentErrorSwallow,
    "no-static-effect-service-forwarders": noStaticEffectServiceForwarders,
    "no-single-use-private-functions": noSingleUsePrivateFunctions,
    "no-single-use-xstate-actions": noSingleUseXstateActions,
    "no-single-use-xstate-guards": noSingleUseXstateGuards,
    "no-sql-type-parameter": noSqlTypeParameter,
    "no-switch": noSwitch,
    "no-type-assertion": noTypeAssertion,
    "no-typeof-object": noTypeofObject,
    "no-try-catch": noTryCatch,
    "pipe-max-arguments": pipeMaxArguments,
    "prefer-effect-match": preferEffectMatch,
    "prefer-option-from-nullable": preferOptionFromNullable,
    "private-function-prefix": privateFunctionPrefix,
    "require-approved-ui-primitives": requireApprovedUiPrimitives,
    "require-cn-for-classname-composition": requireCnForClassnameComposition,
    "require-context-service-in-services": requireContextServiceInServices,
    "require-default-component-export": requireDefaultComponentExport,
    "require-tsx-in-ui-folders": requireTsxInUiFolders,
    "require-xstate-event-satisfies": requireXstateEventSatisfies,
  },
};

export default plugin;

