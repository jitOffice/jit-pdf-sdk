import type { JitPdfEditorDirtyChangeEvent, JitPdfEditorErrorEvent, JitPdfEditorProps, JitPdfEditorReadyEvent, SaveCopyResult } from "../types";
declare const _default: import("vue").DefineComponent<JitPdfEditorProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    ready: (payload: JitPdfEditorReadyEvent) => any;
    "dirty-change": (payload: JitPdfEditorDirtyChangeEvent) => any;
    "save-start": () => any;
    "save-success": (payload: SaveCopyResult) => any;
    "save-error": (payload: JitPdfEditorErrorEvent) => any;
    "load-error": (payload: JitPdfEditorErrorEvent) => any;
}, string, import("vue").PublicProps, Readonly<JitPdfEditorProps> & Readonly<{
    onReady?: ((payload: JitPdfEditorReadyEvent) => any) | undefined;
    "onDirty-change"?: ((payload: JitPdfEditorDirtyChangeEvent) => any) | undefined;
    "onSave-start"?: (() => any) | undefined;
    "onSave-success"?: ((payload: SaveCopyResult) => any) | undefined;
    "onSave-error"?: ((payload: JitPdfEditorErrorEvent) => any) | undefined;
    "onLoad-error"?: ((payload: JitPdfEditorErrorEvent) => any) | undefined;
}>, {
    readonly: boolean;
    locale: "zh-CN";
    theme: "blue-enterprise";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
