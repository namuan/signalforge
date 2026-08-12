import type { RuleTester } from "oxlint/plugins-dev";

type Rule = Parameters<RuleTester["run"]>[1];
// The visitor exposes distinct OXC node unions; this rule needs only these
// common ESTree fields while constructing its local call graph.
type Node = any;

type Call = { readonly name: string; readonly node: Node };

const isFunction = (node: Node): boolean =>
  node.type === "FunctionDeclaration" || node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression";

const isExported = (node: Node) => {
  let current: Node | null | undefined = node;
  while (current !== null && current !== undefined) {
    if (current.type === "ExportNamedDeclaration" || current.type === "ExportDefaultDeclaration") return true;
    current = current.parent;
  }
  return false;
};

const enclosingFunction = (node: Node) => {
  let current = node.parent;
  while (current !== null && current !== undefined) {
    if (isFunction(current)) return current;
    current = current.parent;
  }
  return undefined;
};

const nameOf = (node: Node) =>
  node.type === "FunctionDeclaration" ? node.id?.name : node.parent?.type === "VariableDeclarator" ? node.parent.id?.name : undefined;

const isWithin = (node: Node, ancestor: Node) => {
  let current: Node | null | undefined = node;
  while (current !== null && current !== undefined) {
    if (current === ancestor) return true;
    current = current.parent;
  }
  return false;
};

/** Reject a private function which is only called by a wrapper that calls nothing else. */
const rule: Rule = {
  meta: {
    type: "suggestion" as const,
    docs: { description: "Disallow private functions with one trivial caller." },
  },
  create(context) {
    const functions = new Map<string, Node>();
    const duplicates = new Set<string>();
    const calls: Call[] = [];
    const register = (name: string, node: Node) => {
      if (duplicates.has(name)) return;
      if (functions.has(name)) {
        functions.delete(name);
        duplicates.add(name);
      } else functions.set(name, node);
    };

    return {
      FunctionDeclaration(node) {
        if (node.id?.name !== undefined && !isExported(node)) register(node.id.name, node);
      },
      VariableDeclarator(node) {
        if (node.id.type === "Identifier" && node.id.name !== undefined && node.init !== null && node.init !== undefined && isFunction(node.init) && !isExported(node.init)) {
          register(node.id.name, node.init);
        }
      },
      CallExpression(node) {
        if (node.callee.type === "Identifier" && node.callee.name !== undefined) calls.push({ name: node.callee.name, node });
      },
      "Program:exit"() {
        for (const [name, fn] of functions) {
          const fnCalls = calls.filter((call) => call.name === name && !isWithin(call.node, fn));
          if (fnCalls.length !== 1) continue;
          const caller = enclosingFunction(fnCalls[0].node);
          if (caller === undefined || calls.filter((call) => enclosingFunction(call.node) === caller).length !== 1) continue;
          const callerName = nameOf(caller);
          if (callerName === undefined) continue;
          context.report({ node: fn, message: `Function '${name}' has one trivial caller ('${callerName}'); inline it.` });
        }
      },
    };
  },
};

export default rule;
