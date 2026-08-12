import type { RuleTester } from "oxlint/plugins-dev";

type Rule = Parameters<RuleTester["run"]>[1];

const createMaxFileLinesRule = (maximum: number): Rule => ({
  meta: {
    type: "suggestion" as const,
    docs: { description: `Disallow files longer than ${maximum} lines.` },
  },
  create(context) {
    return {
      Program(node) {
        const lineCount = context.sourceCode.text.split(/\r?\n/).length;
        if (lineCount > maximum) {
          context.report({ node, message: `File has ${lineCount} lines; maximum is ${maximum}.` });
        }
      },
    };
  },
});

export const maxFileLinesWarn = createMaxFileLinesRule(500);
export const maxFileLinesError = createMaxFileLinesRule(750);
