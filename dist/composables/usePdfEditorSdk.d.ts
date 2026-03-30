import type { JitPdfEditorProps, PdfEditorCapabilities } from "../types";
export declare function usePdfEditorSdk(props: Pick<JitPdfEditorProps, "capabilities" | "readonly" | "source">): {
    capabilities: import("vue").ComputedRef<PdfEditorCapabilities>;
    canSaveToService: import("vue").ComputedRef<boolean>;
    statusMessage: import("vue").Ref<string, string>;
    leftDrawerOpen: import("vue").Ref<boolean, boolean>;
    rightDrawerOpen: import("vue").Ref<boolean, boolean>;
};
