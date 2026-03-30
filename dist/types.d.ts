import type { ApiErrorPayload, FileTreeNode, FileMeta, FileHistoryItem, FileListResponse, UploadFileResult, DeleteFileResult, SaveCopyResult, SaveReason } from "@jit-pdf/shared";
export type { ApiErrorPayload, FileTreeNode, FileMeta, FileHistoryItem, FileListResponse, UploadFileResult, DeleteFileResult, SaveCopyResult, SaveReason };
export type PdfSource = {
    type: "remote";
    fileId: string;
    name?: string;
} | {
    type: "local";
    fileId: string;
    name?: string;
} | {
    type: "url";
    url: string;
    name?: string;
};
export type PdfAnnotationSnapshot = Record<string, unknown>;
export interface PdfEditorCapabilities {
    annotation: boolean;
    ink: boolean;
    freeText: boolean;
    redaction: boolean;
    export: boolean;
    thumbnail: boolean;
    search: boolean;
}
export interface SaveCopyInput {
    fileId: string;
    fileName: string;
    content: Blob;
    reason?: SaveReason;
}
export interface PdfEditorService {
    getFileList(): Promise<FileListResponse>;
    getFileMeta(fileId: string): Promise<FileMeta>;
    getFileHistory(fileId: string): Promise<FileHistoryItem[]>;
    getFileStreamUrl(fileId: string): string;
    uploadFile(file: File): Promise<UploadFileResult>;
    deleteFile(fileId: string): Promise<DeleteFileResult>;
    saveCopy(input: SaveCopyInput): Promise<SaveCopyResult>;
    loadAnnotations(fileId: string): Promise<PdfAnnotationSnapshot[]>;
    saveAnnotations(fileId: string, annotations: PdfAnnotationSnapshot[]): Promise<void>;
}
export interface JitPdfEditorProps {
    source: PdfSource;
    locale?: "zh-CN";
    theme?: "blue-enterprise";
    capabilities?: Partial<PdfEditorCapabilities>;
    service: PdfEditorService;
    readonly?: boolean;
}
export interface JitPdfEditorReadyEvent {
    documentId: string;
}
export interface JitPdfEditorDirtyChangeEvent {
    dirty: boolean;
}
export interface JitPdfEditorErrorEvent {
    message: string;
    cause?: unknown;
}
