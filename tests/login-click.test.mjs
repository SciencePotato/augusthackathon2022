import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { test } from "node:test";
import ts from "typescript";

test("each React login click immediately submits the current credentials once", async () => {
  const { outputText } = ts.transpileModule(
    fs.readFileSync(new URL("../pages/login/index.tsx", import.meta.url), "utf8"),
    { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
  );
  const calls = [], listeners = [];
  const fields = {
    txtEmail: { value: "first@example.test" },
    txtPassword: { value: "fixture-password-one" },
    btnSignIn: { addEventListener: (...args) => listeners.push(args) },
  };
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    document: { getElementById: id => fields[id] },
    console: { log() {} },
    require: name => {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "firebase/auth") return {
        getAuth: () => ({}),
        signInWithEmailAndPassword: (_auth, email, password) => {
          calls.push({ email, password });
          return Promise.resolve({ user: {} });
        },
      };
      if (name === "firebase/app") return { initializeApp: () => ({}) };
      if (name.endsWith("/config")) return { config: { firebaseConfig: {} } };
      return { default: "inert-child" };
    },
  });
  function nodes(node) {
    if (Array.isArray(node)) return node.flatMap(nodes);
    if (!node || typeof node !== "object") return [];
    return [node, ...nodes(node.props?.children)];
  }
  const button = nodes(exports.default()).find(node => node.props.id === "btnSignIn");
  button.props.onClick();
  await Promise.resolve();
  assert.equal(calls.length, 1, "the first click must submit, not register a later click");
  assert.equal(calls[0].email, fields.txtEmail.value);
  fields.txtEmail.value = "second@example.test";
  fields.txtPassword.value = "fixture-password-two";
  button.props.onClick();
  await Promise.resolve();
  assert.equal(calls.length, 2);
  assert.equal(calls[1].email, fields.txtEmail.value);
  assert.equal(calls[1].password, fields.txtPassword.value);
  assert.equal(listeners.length, 0, "React clicks must not accumulate native click listeners");
});
