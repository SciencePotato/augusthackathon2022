const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");

function signupPage(register, navigationResult) {
  const exports = {}, state = [], pushes = [];
  let hook = 0;
  const jsx = (type, props) => ({ type, props });
  const code = ts.transpileModule(fs.readFileSync("pages/signup/index.tsx", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, {
    exports, console: { log() {} },
    document: { getElementById: id => ({ value: id === "txtEmail" ? "test@example.invalid" : "test-password" }) },
    require: name => {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "react") return { useState: initial => {
        const i = hook++; if (!(i in state)) state[i] = initial;
        return [state[i], value => state[i] = value];
      }};
      if (name === "next/router") return { useRouter: () => ({ push: path => {
        pushes.push(path);
        if (navigationResult instanceof Error) return Promise.reject(navigationResult);
        return navigationResult ?? true;
      } }) };
      if (name === "firebase/app") return { initializeApp: () => ({}) };
      if (name === "firebase/auth") return { getAuth: () => ({}), createUserWithEmailAndPassword: register };
      if (name.endsWith("component/database/config")) return { config: { firebaseConfig: {} } };
      return { default: {} };
    },
  });
  function all(node, predicate) {
    if (!node || typeof node !== "object") return [];
    return [...(predicate(node) ? [node] : []), ...[node.props?.children].flat(Infinity).flatMap(n => all(n, predicate))];
  }
  function render() { hook = 0; return exports.default(); }
  const tree = render();
  const submit = all(tree, n => n.type === "form")[0]?.props.onSubmit
    ?? all(tree, n => n.props?.id === "btnSignUp")[0].props.onClick;
  return { render, all, submit, pushes };
}

test("signup does not expose a premature home link and remains on the page after provider rejection", async () => {
  const page = signupPage(async () => { throw Error("synthetic rejection"); });
  assert.equal(page.all(page.render(), n => n.props?.href === "/home").length, 0);
  await page.submit({ preventDefault() {} });
  assert.equal(page.pushes.length, 0);
  assert.equal(page.all(page.render(), n => n.props?.role === "alert").length, 1);
});

test("signup navigates only after successful account creation and disables duplicate activation while pending", async () => {
  let resolve;
  const page = signupPage(() => new Promise(done => { resolve = done; }));
  const pending = page.submit({ preventDefault() {} });
  assert.equal(page.pushes.length, 0);
  assert.equal(page.all(page.render(), n => n.props?.id === "btnSignUp")[0].props.disabled, true);
  resolve({ user: { uid: "synthetic" } });
  await pending;
  assert.deepEqual(page.pushes, ["/home"]);
});

test("a failed or cancelled navigation does not falsely report that account creation failed", async () => {
  for (const result of [new Error("navigation failed"), false]) {
    const page = signupPage(async () => ({ user: { uid: "synthetic" } }), result);
    await page.submit({ preventDefault() {} });
    const error = page.all(page.render(), n => n.props?.role === "alert")[0];
    assert.match(error.props.children, /account was created/);
    assert.equal(page.all(page.render(), n => n.props?.id === "btnSignUp")[0].props.disabled, false);
  }
});
