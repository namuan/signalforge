import type { RuleTester } from "oxlint/plugins-dev";

type Rule = Parameters<RuleTester["run"]>[1];

// The OXLint visitor node unions are intentionally broad. This rule only
// needs the ESTree fields below, so keep its traversal adapter untyped.
type Node = any;

const sourceName = (node: Node) => typeof node.source?.value === "string" ? node.source.value : undefined;
const isPureBarrel = (program: Node) =>
  program.body?.every((statement: Node) =>
    statement.type === "ImportDeclaration" ||
    statement.type === "ExportAllDeclaration" ||
    (statement.type === "ExportNamedDeclaration" && statement.declaration === null) ||
    (statement.type === "ExportDefaultDeclaration" && statement.declaration?.type === "Identifier"),
  ) ?? true;

/** Reject pass-through exports except in files whose sole purpose is a barrel. */
const rule: Rule = {
  meta: {
    type: "suggestion" as const,
    docs: { description: "Disallow imported bindings being re-exported outside pure barrel modules." },
  },
  create(context) {
    const imported = new Map<string, string>();
    const reports: Array<{ node: Node; message: string }> = [];

    return {
      ImportDeclaration(node) {
        const item = node as Node;
        for (const specifier of item.specifiers) {
          if (specifier.local?.name !== undefined) {
            const source = sourceName(item);
            if (source !== undefined) imported.set(specifier.local.name, source);
          }
        }
      },
      ExportNamedDeclaration(node) {
        const item = node as Node;
        const directSource = sourceName(item);
        for (const specifier of item.specifiers) {
          const name = specifier.local?.name;
          if (name === undefined) continue;
          const source = directSource ?? imported.get(name);
          if (source !== undefined) reports.push({ node: specifier, message: `'${name}' is re-exported from '${source}'.` });
        }
      },
      ExportAllDeclaration(node) {
        const item = node as Node;
        const source = sourceName(item);
        if (source !== undefined) reports.push({ node: item, message: `Wildcard re-export of '${source}'.` });
      },
      ExportDefaultDeclaration(node) {
        const item = node as Node;
        if (item.declaration?.type !== "Identifier" || item.declaration.name === undefined) return;
        const source = imported.get(item.declaration.name);
        if (source !== undefined) reports.push({ node: item, message: `'${item.declaration.name}' is re-exported as default from '${source}'.` });
      },
      "Program:exit"(node) {
        if (isPureBarrel(node as Node)) return;
        for (const report of reports) context.report(report);
      },
    };
  },
};

export default rule;
