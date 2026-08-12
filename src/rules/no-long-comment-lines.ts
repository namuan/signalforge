import type { RuleTester } from "oxlint/plugins-dev";

type Rule = Parameters<RuleTester["run"]>[1];

/** Reject comments that are long enough to hide prose dumps in source code. */
const rule: Rule = {
  meta: {
    type: "suggestion" as const,
    docs: { description: "Disallow comment lines longer than 100 characters." },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          for (const [index, rawLine] of comment.value.split("\n").entries()) {
            const text = rawLine.trim().replace(/^\*\s?/, "");
            if (text.length <= 100) continue;
            context.report({
              node: comment,
              message: `Comment line ${comment.loc.start.line + index} is ${text.length} characters; maximum is 100.`,
            });
          }
        }
      },
    };
  },
};

export default rule;
