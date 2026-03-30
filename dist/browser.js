import { createApp as f, h as m } from "vue";
import { a as p, c as E, _ as S } from "./http-service-DBwg8kDH.js";
import { u as _ } from "./http-service-DBwg8kDH.js";
function v(r) {
  if (typeof r == "string") {
    const e = document.querySelector(r);
    if (!e)
      throw new Error(`未找到挂载容器：${r}`);
    return e;
  }
  return r;
}
function P(r) {
  const {
    target: e,
    onReady: n,
    onDirtyChange: i,
    onSaveStart: c,
    onSaveSuccess: d,
    onSaveError: s,
    onLoadError: u,
    ...a
  } = r, t = v(e), o = f({
    render() {
      return m(S, {
        ...a,
        onReady: n,
        onDirtyChange: i,
        onSaveStart: c,
        onSaveSuccess: d,
        onSaveError: s,
        onLoadError: u
      });
    }
  });
  return o.mount(t), {
    app: o,
    element: t,
    unmount() {
      o.unmount();
    }
  };
}
const h = {
  mountJitPdfEditor: P,
  createHttpPdfEditorService: E,
  createIndexedDbPdfEditorService: p
};
export {
  S as JitPdfEditor,
  h as browser,
  E as createHttpPdfEditorService,
  p as createIndexedDbPdfEditorService,
  P as mountJitPdfEditor,
  _ as usePdfEditorSdk
};
