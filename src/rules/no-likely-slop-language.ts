import type { RuleTester } from "oxlint/plugins-dev";

type Rule = Parameters<RuleTester["run"]>[1];

const patterns = [
  ["em dash", /—/],
  ["load-bearing", /load[- ]bearing/i],
  ["no X, no Y", /\bno ([^,]+), no ([^,]+)/i],
  ["honest take", /honest take/i],
  ["here's the thing", /here'?s the thing/i],
  ["the truth is", /the truth is/i],
  ["it turns out", /it turns out/i],
  ["here's what", /here'?s what/i],
  ["here's why", /here'?s why/i],
  ["kept here", /kept here/i],
  ["planning reference", /\b(?:spec|milestone|draft|plan|M[0-9]+|task\s*[0-9]+|T[0-9]+)\b/i],
] as const;

/** Flag stock LLM prose and planning debris in comments. */
const rule: Rule = {
  meta: {
    type: "suggestion" as const,
    docs: { description: "Disallow comments containing likely LLM-generated phrasing." },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          for (const line of comment.value.split("\n")) {
            for (const [name, pattern] of patterns) {
              if (pattern.test(line)) {
                context.report({ node: comment, message: `Comment reads like slop (${name}).` });
              }
            }
          }
        }
      },
    };
  },
};

export default rule;
