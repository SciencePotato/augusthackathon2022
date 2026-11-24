const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

test("the home page releases its Firebase auth subscription when leaving the route", () => {
  let subscribed = 0, released = 0, callback;
  const effects = [];
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync("pages/home/index.tsx", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports, console: { log() {} },
    require(name) {
      if (name === "react") return { useState: initial => [initial, () => {}], useEffect: effect => effects.push(effect) };
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name === "firebase/app") return { initializeApp: () => ({}) };
      if (name === "firebase/auth") return {
        getAuth: () => ({}),
        onAuthStateChanged(_auth, listener) { subscribed++; callback = listener; return () => { released++; }; },
      };
      if (name.endsWith("/database/config")) return { config: { firebaseConfig: {} } };
      return { __esModule: true, default: name };
    },
  });
  module.exports.default();
  assert.equal(subscribed, 0);
  const cleanup = effects[0]();
  assert.equal(subscribed, 1);
  callback(null);
  callback({ uid: "local-test" });
  assert.equal(released, 0);
  assert.equal(typeof cleanup, "function");
  cleanup();
  assert.equal(released, 1);
});
