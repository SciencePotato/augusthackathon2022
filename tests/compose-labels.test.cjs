const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

test("each existing question textarea has a unique native label association", () => {
  const source = readFileSync(join(__dirname, "../pages/create/index.tsx"), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(code, {
    exports,
    require: (id) => id === "react/jsx-runtime" ? { jsx, jsxs: jsx } : { default: {}, __esModule: true },
  });
  const elements = [];
  function visit(node) {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    elements.push(node);
    visit(node.props.children);
  }
  visit(exports.default());
  const labels = elements.filter((element) => element.type === "label");
  const inputs = elements.filter((element) => element.type === "textarea");
  assert.equal(labels.length, 3);
  assert.equal(inputs.length, 3);
  assert.equal(new Set(inputs.map((input) => input.props.id)).size, 3);
  for (const input of inputs) {
    assert.ok(input.props.id);
    assert.equal(labels.filter((label) => label.props.htmlFor === input.props.id).length, 1);
  }
});
