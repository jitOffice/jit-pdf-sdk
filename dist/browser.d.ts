import { type App as VueApp } from "vue";
import { createHttpPdfEditorService } from "./http-service";
import { createIndexedDbPdfEditorService } from "./indexeddb-service";
import type { JitPdfEditorDirtyChangeEvent, JitPdfEditorErrorEvent, JitPdfEditorProps, JitPdfEditorReadyEvent, SaveCopyResult } from "./types";
export * from "./index";
export interface MountJitPdfEditorOptions extends JitPdfEditorProps {
    target: string | HTMLElement;
    onReady?: (payload: JitPdfEditorReadyEvent) => void;
    onDirtyChange?: (payload: JitPdfEditorDirtyChangeEvent) => void;
    onSaveStart?: () => void;
    onSaveSuccess?: (payload: SaveCopyResult) => void;
    onSaveError?: (payload: JitPdfEditorErrorEvent) => void;
    onLoadError?: (payload: JitPdfEditorErrorEvent) => void;
}
export interface MountedJitPdfEditor {
    app: VueApp;
    element: HTMLElement;
    unmount: () => void;
}
export declare function mountJitPdfEditor(options: MountJitPdfEditorOptions): MountedJitPdfEditor;
export declare const browser: {
    mountJitPdfEditor: typeof mountJitPdfEditor;
    createHttpPdfEditorService: typeof createHttpPdfEditorService;
    createIndexedDbPdfEditorService: typeof createIndexedDbPdfEditorService;
};
