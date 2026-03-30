import type { PdfAnnotationSnapshot, PdfEditorService } from "./types";
export interface IndexedDbPdfEditorServiceOptions {
    databaseName?: string;
}
export declare function createIndexedDbPdfEditorService(options?: IndexedDbPdfEditorServiceOptions): PdfEditorService;
export declare function createIndexedDbAnnotationRepository(options?: IndexedDbPdfEditorServiceOptions): {
    load(fileId: string): Promise<PdfAnnotationSnapshot[]>;
    save(fileId: string, annotations: PdfAnnotationSnapshot[]): Promise<void>;
};
export declare function warmIndexedDbFileUrl(service: PdfEditorService, fileId: string): Promise<string>;
