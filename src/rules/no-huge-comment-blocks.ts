import type { RuleTester } from "oxlint/plugins-dev";

type Rule = Parameters<RuleTester["run"]>[1];

const delimiterOnly = (text: string) => /^[/*]+$/.test(text.trim());

/** Reject adjacent comment runs with more than three content lines. */
const rule: Rule = {
  meta: {
    type: "suggestion" as const,
    docs: { description: "Disallow comment blocks spanning more than three content lines." },
  },
  create(context) {
    return {
      Program() {
        const comments = context.sourceCode.getAllComments();
        const sourceLines = context.sourceCode.text.split(/\r?\n/);
        let block: typeof comments = [];

        const reportBlock = () => {
          if (block.length === 0) return;
          let start = block[0].loc.start.line;
          let end = block.at(-1)?.loc.end.line ?? start;
          if (end > start && delimiterOnly(sourceLines[start - 1] ?? "")) start += 1;
          if (end > start && delimiterOnly(sourceLines[end - 1] ?? "")) end -= 1;
          const lineCount = end - start + 1;
          if (lineCount > 3) {
            context.report({
              node: block[0],
              message: `Comment block spans ${lineCount} lines; maximum is 3.`,
            });
          }
          block = [];
        };

        for (const comment of comments) {
          const previous = block.at(-1);
          if (previous !== undefined && comment.loc.start.line > previous.loc.end.line + 1) reportBlock();
          block.push(comment);
        }
        reportBlock();
      },
    };
  },
};

export default rule;
