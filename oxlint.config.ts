import { defineConfig } from "oxlint";

/**
 * The single command for this collection is `npm run lint` (or `npx oxlint`).
 * Rules that encode framework or architecture choices remain opt-in; see README.
 */
export default defineConfig({
  ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/coverage/**", "**/*.d.ts"],
  jsPlugins: [{ name: "signalforge", specifier: "./src/index.ts" }],
  rules: {
    "no-unused-vars": "error",

    "signalforge/max-file-lines-warn": "warn",
    "signalforge/max-file-lines-error": "error",
    "signalforge/no-huge-comment-blocks": "error",
    "signalforge/no-import-then-export": "error",
    "signalforge/no-likely-slop-language": "warn",
    "signalforge/no-long-comment-lines": "error",
    "signalforge/no-single-caller-function": "error",

    "signalforge/no-chained-type-assertions": "error",
    "signalforge/no-conditional-empty-object-spread": "error",
    "signalforge/no-known-value-widening": "error",
    "signalforge/no-module-mocking": "error",
    "signalforge/no-object-parameters": "error",
    "signalforge/no-reflect-apply": "error",
    "signalforge/no-reflect-get": "error",
    "signalforge/no-runtime-typeof": "error",
    "signalforge/no-shape-in-symbol-names": "error",
    "signalforge/no-unknown-parameters": "error",
    "signalforge/no-unknown-returns": "error",
    "signalforge/no-unknown-type-aliases": "error",
    "signalforge/no-unsafe-dictionary-type": "error",
    "signalforge/no-widen-then-assert": "error",
    "signalforge/require-safety-comment-for-type-assertion": "error",

    "signalforge/no-multiple-function-params": "error",
    "signalforge/no-optional-function-parameters": "error",
    "signalforge/no-single-use-private-functions": "error",
    "signalforge/private-function-prefix": "error"
  }
});
