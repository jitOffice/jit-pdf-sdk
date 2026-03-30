# Jit PDF

<div align="center">

🎨 **Enterprise PDF Preview & Editing SDK** | Ready to use | Chinese UI support | Annotation redaction | Multi-framework integration

[![npm version](https://img.shields.io/npm/v/jit-pdf.svg?style=flat-square)](https://www.npmjs.com/package/jit-pdf)
[![npm downloads](https://img.shields.io/npm/dm/jit-pdf.svg?style=flat-square)](https://www.npmjs.com/package/jit-pdf)
[![npm license](https://img.shields.io/npm/l/jit-pdf.svg?style=flat-square)](https://www.npmjs.com/package/jit-pdf)
[![GitHub stars](https://img.shields.io/github/stars/MrXujiang/jit-pdf-sdk?style=flat-square)](https://github.com/MrXujiang/jit-pdf-sdk/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MrXujiang/jit-pdf-sdk?style=flat-square)](https://github.com/MrXujiang/jit-pdf-sdk/network/members)
[![GitHub issues](https://img.shields.io/github/issues/MrXujiang/jit-pdf-sdk?style=flat-square)](https://github.com/MrXujiang/jit-pdf-sdk/issues)
[![Vue.js](https://img.shields.io/badge/Vue-3.5+-42b883.svg?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

[Quick Start](#quick-start) · [Feature Overview](#feature-overview) · [Integration Examples](#quick-start) · [API Docs](#core-api) · [Examples](#examples-and-docs)

</div>

---

[中文文档](README.zh-CM.md)

<a id="introduction"></a>

## 📖 Introduction

**Jit PDF** is a **PDF preview and editing SDK** built for business systems. It provides a ready-to-use Chinese interface, a blue enterprise-style workspace, annotation and redaction capabilities, plus both local storage and server-backed file service integration modes.

It fits scenarios like these:

- 🏢 **OA / ERP / digital archives / contract review** - internal enterprise document management systems
- 📝 **Online PDF viewing and annotation in internal document systems** - quickly add PDF workflows
- 🔧 **Embedded PDF workspaces in low-code platforms, traditional JSP / Thymeleaf / PHP pages** - compatible with a wide range of stacks
- 🎯 **Vue projects, static HTML pages, and multi-framework apps that need mount-based integration** - flexible integration options

## ✨ Highlights

- 🎨 **Professional UI out of the box**: built-in toolbar, thumbnail navigation, floating property panel, and annotation management drawer
- 🇨🇳 **Complete Chinese experience**: Chinese copy by default, blue theme, and enterprise-friendly presentation
- ✏️ **Common editing tools**: highlight, sticky notes, free text, drawing, annotation deletion, and batch annotation management
- 🔍 **Review and output workflows**: full-text search, redaction, save copy, and history version browsing
- 🚀 **Large-file friendly**: supports server-side `Range` streaming and works well with local file services
- 💾 **Dual storage modes**: supports pure frontend `IndexedDB` mode and `NestJS` file service mode
- 🔌 **Multiple integration styles**: supports `npm`, browser mount entry, and direct UMD `<script>` usage
- 📦 **Zero-config startup**: integrate into a project in just a few minutes

<a id="feature-overview"></a>

## Feature Overview

### Preview Features

- Single-page focused reading with internal scrolling
- Thumbnail navigation for multi-page documents
- Page sync, zoom, fit-to-page, and fit-to-width
- Full-text search with highlighted results

### Editing and Review

- Text highlighting
- Sticky note annotations with content editing
- Free text
- Drawing
- Delete selected annotations
- Annotation management panel
- Batch annotation deletion
- Area-based redaction and export submission

### Data and Storage

- Local PDF upload with IndexedDB storage
- Persistent annotation snapshots in IndexedDB
- Remote file list, metadata, and history version retrieval
- Streamed preview and save-copy support through a local file service

## 📦 Installation

### 1. Vue / ESM Projects (Recommended)

If you are using Vue, React, Angular, or any other bundler-based project:

```bash
pnpm add jit-pdf vue
# or with npm
npm install jit-pdf vue
# or with yarn
yarn add jit-pdf vue
```

Notes:

- `jit-pdf` is the published package name
- `vue` is a runtime dependency
- No extra third-party PDF preview or annotation packages are required

### 2. Plain HTML / CDN

If you are using static HTML or traditional server-rendered template pages, you can include the UMD bundle directly:

```html
<!-- jsDelivr CDN recommended -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jit-pdf@latest/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/jit-pdf@latest/dist/jit-pdf.umd.js"></script>

<!-- or use unpkg -->
<link rel="stylesheet" href="https://unpkg.com/jit-pdf@latest/dist/style.css" />
<script src="https://unpkg.com/jit-pdf@latest/dist/jit-pdf.umd.js"></script>
```

The global variable name is:

```js
window.JitPdfSdk
```

### 3. Try It Directly in the Browser

You can open the example locally in your browser right away:

```bash
# after cloning the project
pnpm install
pnpm dev
```

Visit `http://localhost:5173` to view the full demo.

<a id="quick-start"></a>

## 🚀 Quick Start

### Integrate into a Vue 3 Project (Pure Local Mode)

The example below uses pure local mode and does not rely on a backend service:

```vue
<script setup lang="ts">
import { ref } from "vue";
import "jit-pdf/styles.css";
import {
  JitPdfEditor,
  createIndexedDbPdfEditorService,
  type PdfSource
} from "jit-pdf";

const service = createIndexedDbPdfEditorService({
  databaseName: "my-jit-pdf"
});

const source = ref<PdfSource | null>(null);

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const uploaded = await service.uploadFile(file);
  source.value = {
    type: "local",
    fileId: uploaded.id,
    name: uploaded.name
  };
}
</script>

<template>
  <div style="height: 100vh">
    <input type="file" accept=".pdf,application/pdf" @change="onFileChange" />
    <JitPdfEditor
      v-if="source"
      :source="source"
      :service="service"
      locale="zh-CN"
      theme="blue-enterprise"
    />
  </div>
</template>
```

### Vue 3 + Server File Mode (Recommended for Production)

If you want local file service support, streamed preview, and copy saving:

```ts
import { createHttpPdfEditorService } from "jit-pdf";

const service = createHttpPdfEditorService({
  baseUrl: "http://localhost:4000",
  annotationDatabaseName: "jit-pdf-annotations"
});
```

```vue
<JitPdfEditor
  :source="{ type: 'remote', fileId: 'your-file-id' }"
  :service="service"
  locale="zh-CN"
  theme="blue-enterprise"
/>
```

### Plain HTML Integration (No Framework Dependency)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Jit PDF Demo</title>
    <!-- using jsDelivr CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jit-pdf@latest/dist/style.css" />
    <style>
      html, body, #app {
        height: 100%;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="toolbar">
      <input id="fileInput" type="file" accept=".pdf,application/pdf" />
    </div>
    <div id="app" style="height: calc(100% - 48px)"></div>

    <!-- using jsDelivr CDN -->
    <script src="https://cdn.jsdelivr.net/npm/jit-pdf@latest/dist/jit-pdf.umd.js"></script>
    <script>
      const { createIndexedDbPdfEditorService, mountJitPdfEditor } = window.JitPdfSdk;
      const service = createIndexedDbPdfEditorService({
        databaseName: "jit-pdf-html-demo"
      });

      let mounted = null;

      document.getElementById("fileInput").addEventListener("change", async (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const uploaded = await service.uploadFile(file);

        if (mounted) {
          mounted.unmount();
        }

        mounted = mountJitPdfEditor({
          target: "#app",
          source: {
            type: "local",
            fileId: uploaded.id,
            name: uploaded.name
          },
          service,
          locale: "zh-CN",
          theme: "blue-enterprise"
        });
      });
    </script>
  </body>
</html>
```

### React / Angular / Any Framework (Mount-Based Integration)

If your project is not built with Vue but uses a modern bundler, you can integrate through the browser mount entry:

```bash
pnpm add jit-pdf vue
# or npm install jit-pdf vue
```

```tsx
import { useEffect, useRef } from "react";
import "jit-pdf/styles.css";
import {
  createIndexedDbPdfEditorService,
  mountJitPdfEditor
} from "jit-pdf/browser";

const service = createIndexedDbPdfEditorService({
  databaseName: "jit-pdf-react-demo"
});

export function PdfPanel({ fileId, fileName }: { fileId: string; fileName?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mounted = mountJitPdfEditor({
      target: containerRef.current,
      source: {
        type: "local",
        fileId,
        name: fileName
      },
      service,
      locale: "zh-CN",
      theme: "blue-enterprise"
    });

    return () => mounted.unmount();
  }, [fileId, fileName]);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
}
```

Applicable to:

- React
- Next.js client components
- Angular
- Umi / micro frontends
- Custom component containers in low-code platforms

## 🗂️ Data Modes

### Mode 1: Pure Local Mode (Recommended for POCs / Demos)

Best for:

- ✅ No backend integration
- ✅ Local research, POCs, and component demos
- ✅ Storing both PDFs and annotations in the browser

Usage:

- `createIndexedDbPdfEditorService()`
- Files are stored in `IndexedDB`
- Annotation snapshots are also stored in `IndexedDB`

### Mode 2: Server File Mode (Recommended for Production)

Best for:

- ✅ Local directory preview
- ✅ Large-file streaming reads
- ✅ Upload, delete, save copy, and version history workflows

Usage:

- `createHttpPdfEditorService()`
- File streams are served through `/api/files/:id/content`
- Annotations are still stored in browser IndexedDB by default, and can be extended to server-side persistence as needed

<a id="core-api"></a>

## Core API

### Component Entry

```ts
import { JitPdfEditor } from "jit-pdf";
```

### Service Factories

```ts
import {
  createHttpPdfEditorService,
  createIndexedDbPdfEditorService
} from "jit-pdf";
```

### Browser Mount Entry

```ts
import { mountJitPdfEditor } from "jit-pdf/browser";
```

### Common Types

```ts
import type {
  PdfSource,
  PdfEditorService,
  JitPdfEditorProps
} from "jit-pdf";
```

## Public Types

### `PdfSource`

```ts
type PdfSource =
  | { type: "remote"; fileId: string; name?: string }
  | { type: "local"; fileId: string; name?: string }
  | { type: "url"; url: string; name?: string };
```

### `PdfEditorService`

```ts
interface PdfEditorService {
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
```

### `JitPdfEditorProps`

```ts
interface JitPdfEditorProps {
  source: PdfSource;
  locale?: "zh-CN";
  theme?: "blue-enterprise";
  capabilities?: Partial<PdfEditorCapabilities>;
  service: PdfEditorService;
  readonly?: boolean;
}
```

## Events

Both `JitPdfEditor` and `mountJitPdfEditor()` support the following lifecycle events:

- `ready`
- `dirty-change`
- `save-start`
- `save-success`
- `save-error`
- `load-error`

Browser mount example:

```ts
mountJitPdfEditor({
  target: "#app",
  source,
  service,
  onReady(event) {
    console.log("Document ready", event.documentId);
  },
  onSaveSuccess(result) {
    console.log("Copy saved successfully", result.relativePath);
  },
  onLoadError(error) {
    console.error("Load failed", error.message);
  }
});
```

## Build Outputs

`packages/pdf-sdk` generates the following artifacts:

- `dist/index.js`
- `dist/index.cjs`
- `dist/browser.js`
- `dist/browser.cjs`
- `dist/jit-pdf.umd.js`
- `dist/style.css`

Mapping:

- `jit-pdf`: Vue / ESM / CJS project entry
- `jit-pdf/browser`: mount-based entry
- `jit-pdf/styles.css`: shared styles
- UMD: suitable for direct `<script>` usage

<a id="examples-and-docs"></a>

## 📚 Examples and Docs

The repository already includes complete examples:

- 📝 **Vue integration example**: [`packages/pdf-sdk/examples/vue-demo/App.vue`](packages/pdf-sdk/examples/vue-demo/App.vue)
- 🌐 **HTML integration example**: [`packages/pdf-sdk/examples/html-demo/index.html`](packages/pdf-sdk/examples/html-demo/index.html)
- 📖 **SDK usage guide page**: [`apps/demo-web/public/sdk-guide.html`](apps/demo-web/public/sdk-guide.html)

## 🤝 Contributing

Contributions of all kinds are welcome:

- 🐛 Report bugs or raise issues
- 💡 Share your usage experience
- 🔧 Submit pull requests to improve the code
- 📖 Improve documentation and examples

## 📄 License

MIT License

## 🔗 Related Links

- [npm package](https://www.npmjs.com/package/jit-pdf)
- [GitHub repository](https://github.com/MrXujiang/jit-pdf-sdk)

---

<div align="center">

**Jit PDF** - Make online PDF editing simpler ✨

Made with ❤️ by the Jit PDF Team

</div>