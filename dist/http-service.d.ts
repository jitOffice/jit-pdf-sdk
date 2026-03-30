import type { PdfEditorService } from "./types";
export interface HttpPdfEditorServiceOptions {
    baseUrl?: string;
    annotationDatabaseName?: string;
}
export declare function createHttpPdfEditorService(options?: HttpPdfEditorServiceOptions): PdfEditorService;
