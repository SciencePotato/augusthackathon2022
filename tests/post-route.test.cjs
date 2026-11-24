const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");

function route() {
  const router = { isReady: false, query: {} };
  let state, initialized = false, dependencies, pending;
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync("pages/post/[ID]/index.tsx", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, {
    exports,
    require: name => {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx, Fragment: "fragment" };
      if (name === "next/router") return { useRouter: () => router };
      if (name === "react") return {
        useState: initial => { if (!initialized) { state = initial; initialized = true; } return [state, value => state = value]; },
        useEffect: (fn, deps) => {
          if (JSON.stringify(deps) !== JSON.stringify(dependencies)) pending = fn;
          dependencies = deps;
        },
      };
      return { default: {} };
    },
  });
  function render() {
    let node = exports.default();
    if (pending) { const fn = pending; pending = null; fn(); node = exports.default(); }
    return node.props.children.find(child => child.type === "h1").props.children;
  }
  return { router, render };
}

test("unknown, malformed and array-valued IDs render not-found rather than crashing", () => {
  for (const id of ["0", "999", "oops", "1junk", ["1", "2"], undefined]) {
    const r = route();
    r.router.isReady = true;
    r.router.query.ID = id;
    assert.match(r.render(), /not found/i);
  }
});

test("the route waits for readiness and updates on same-page ID changes", () => {
  const r = route();
  assert.match(r.render(), /loading/i);
  r.router.isReady = true;
  r.router.query.ID = "1";
  assert.equal(r.render(), "a");
  r.router.query.ID = "2";
  assert.equal(r.render(), "b");
});
