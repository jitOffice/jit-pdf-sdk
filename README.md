# Jit PDF

<div align="center">

🎨 **企业级 PDF 在线预览与编辑 SDK** | 开箱即用 | 中文支持 | 批注脱敏 | 多框架集成

[![npm version](https://img.shields.io/npm/v/jit-pdf.svg?style=flat-square)](https://www.npmjs.com/package/jit-pdf)
[![npm downloads](https://img.shields.io/npm/dm/jit-pdf.svg?style=flat-square)](https://www.npmjs.com/package/jit-pdf)
[![npm license](https://img.shields.io/npm/l/jit-pdf.svg?style=flat-square)](https://www.npmjs.com/package/jit-pdf)
[![GitHub stars](https://img.shields.io/github/stars/MrXujiang/jit-pdf-sdk?style=flat-square)](https://github.com/MrXujiang/jit-pdf-sdk/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/MrXujiang/jit-pdf-sdk?style=flat-square)](https://github.com/MrXujiang/jit-pdf-sdk/network/members)
[![GitHub issues](https://img.shields.io/github/issues/MrXujiang/jit-pdf-sdk?style=flat-square)](https://github.com/MrXujiang/jit-pdf-sdk/issues)
[![Vue.js](https://img.shields.io/badge/Vue-3.5+-42b883.svg?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

[快速开始](#快速开始) · [功能特性](#功能概览) · [接入示例](#快速开始) · [API 文档](#核心-api) · [示例代码](#示例与文档)

</div>

---

## 📖 简介

**Jit PDF** 是一套面向业务系统的 **PDF 预览与编辑 SDK**，提供开箱即用的中文界面、蓝色主题工作台、批注与脱敏能力，以及本地存储和服务端文件服务两种接入模式。

它适合这些场景：

- 🏢 **OA / ERP / 电子档案 / 合同审阅** - 企业内部文档管理系统
- 📝 **内部文档系统的 PDF 在线查看与批注** - 快速集成 PDF 工作能力
- 🔧 **低代码平台、传统 JSP / Thymeleaf / PHP 页面中的嵌入式 PDF 工作台** - 兼容各种技术栈
- 🎯 **Vue 项目、静态 HTML 页面，以及需要"挂载式"集成的多框架项目** - 灵活集成方式

## ✨ 亮点

- 🎨 **开箱即用的专业界面**：内置工具栏、缩略图导航、浮动属性面板、批注管理抽屉
- 🇨🇳 **完整中文体验**：默认中文文案、蓝色主题、适合企业系统集成
- ✏️ **常用编辑能力**：高亮、便签、自由文本、涂鸦、删除批注、批量管理批注
- 🔍 **审阅与输出**：全文搜索、脱敏、另存副本、历史副本查看
- 🚀 **大文件友好**：支持服务端 `Range` 流式读取，适配本地文件服务
- 💾 **双存储模式**：支持纯前端 `IndexedDB` 模式，也支持 `NestJS` 文件服务模式
- 🔌 **多接入形式**：支持 `npm` 引入、浏览器挂载入口、UMD `<script>` 直引
- 📦 **零配置启动**：无需复杂配置，几分钟内即可集成到项目中

## 功能概览

### 预览能力

- 单页聚焦阅读与内部滚动
- 多页文档缩略图导航
- 页码同步、缩放、适应整页、适应页宽
- 全文搜索与结果高亮

### 编辑与审阅

- 文本高亮
- 便签批注与内容编辑
- 自由文本
- 涂鸦
- 删除选中批注
- 批注管理面板
- 批量删除批注
- 脱敏框选与提交导出

### 数据与存储

- 本地 PDF 上传与 IndexedDB 存储
- 批注快照持久化到 IndexedDB
- 远程文件列表、元信息、历史副本读取
- 本地文件服务流式预览与另存副本

## 📦 安装

### 1. Vue / ESM 项目（推荐）

如果你在 Vue 项目、React 项目、Angular 项目或其他基于打包器的项目中使用：

```bash
pnpm add jit-pdf vue
# 或使用 npm
npm install jit-pdf vue
# 或使用 yarn
yarn add jit-pdf vue
```

说明：

- `jit-pdf` 是对外发布包名
- `vue` 是运行时依赖
- 不需要额外安装 PDF 预览或批注相关第三方包

### 2. 纯 HTML / CDN 直引

如果你在静态 HTML、传统后端模板页面里使用，可以直接引入 UMD 包：

```html
<!-- 推荐使用 jsDelivr CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jit-pdf@latest/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/jit-pdf@latest/dist/jit-pdf.umd.js"></script>

<!-- 或使用 unpkg CDN -->
<link rel="stylesheet" href="https://unpkg.com/jit-pdf@latest/dist/style.css" />
<script src="https://unpkg.com/jit-pdf@latest/dist/jit-pdf.umd.js"></script>
```

全局变量名为：

```js
window.JitPdfSdk
```

### 3. 浏览器直接试用

你可以直接在浏览器中打开示例文件进行试用：

```bash
# 克隆项目后
pnpm install
pnpm dev
```

访问 `http://localhost:5173` 即可查看完整演示。

## 🚀 快速开始

### Vue 3 项目接入（纯本地模式）

下面示例使用纯本地模式，不依赖服务端：

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

### Vue 3 + 服务端文件模式（推荐生产环境）

如果你希望用本地文件服务、流式预览和副本保存：

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

### 纯 HTML 页面接入（零框架依赖）

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Jit PDF Demo</title>
    <!-- 使用 jsDelivr CDN -->
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

    <!-- 使用 jsDelivr CDN -->
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

### React / Angular / 任意框架项目（挂载式集成）

如果你不是 Vue 项目，但使用现代打包器，也可以通过浏览器挂载入口来集成：

```bash
pnpm add jit-pdf vue
# 或 npm install jit-pdf vue
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

适用范围：

- React
- Next.js 客户端组件
- Angular
- Umi / Micro Frontends
- 低代码平台自定义组件容器

## 🗂️ 数据模式

### 模式一：纯本地模式（推荐用于 POC/演示）

适合：

- ✅ 无后端接入
- ✅ 本地调研、POC、组件演示
- ✅ 希望 PDF 与批注都保存在浏览器端

使用：

- `createIndexedDbPdfEditorService()`
- 文件保存到 `IndexedDB`
- 批注快照也保存到 `IndexedDB`

### 模式二：服务端文件模式（推荐用于生产环境）

适合：

- ✅ 本地文件目录预览
- ✅ 大文件流式读取
- ✅ 需要上传、删除、另存副本、历史副本

使用：

- `createHttpPdfEditorService()`
- 文件流通过 `/api/files/:id/content`
- 批注默认仍保存在浏览器 IndexedDB，可按项目需要二次扩展为服务端持久化

## 核心 API

### 组件入口

```ts
import { JitPdfEditor } from "jit-pdf";
```

### 服务工厂

```ts
import {
  createHttpPdfEditorService,
  createIndexedDbPdfEditorService
} from "jit-pdf";
```

### 浏览器挂载入口

```ts
import { mountJitPdfEditor } from "jit-pdf/browser";
```

### 常用类型

```ts
import type {
  PdfSource,
  PdfEditorService,
  JitPdfEditorProps
} from "jit-pdf";
```

## 对外类型

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

## 事件

`JitPdfEditor` 和 `mountJitPdfEditor()` 都支持这些生命周期事件：

- `ready`
- `dirty-change`
- `save-start`
- `save-success`
- `save-error`
- `load-error`

浏览器挂载示例：

```ts
mountJitPdfEditor({
  target: "#app",
  source,
  service,
  onReady(event) {
    console.log("文档已就绪", event.documentId);
  },
  onSaveSuccess(result) {
    console.log("副本保存成功", result.relativePath);
  },
  onLoadError(error) {
    console.error("加载失败", error.message);
  }
});
```

## 打包产物

`packages/pdf-sdk` 会输出以下产物：

- `dist/index.js`
- `dist/index.cjs`
- `dist/browser.js`
- `dist/browser.cjs`
- `dist/jit-pdf.umd.js`
- `dist/style.css`

对应关系：

- `jit-pdf`：Vue / ESM / CJS 项目入口
- `jit-pdf/browser`：挂载式入口
- `jit-pdf/styles.css`：公共样式
- UMD：适合 `<script>` 直引

## 📚 示例与文档

仓库中已经提供了完整示例：

- 📝 **Vue 接入示例**：[`packages/pdf-sdk/examples/vue-demo/App.vue`](packages/pdf-sdk/examples/vue-demo/App.vue)
- 🌐 **HTML 接入示例**：[`packages/pdf-sdk/examples/html-demo/index.html`](packages/pdf-sdk/examples/html-demo/index.html)
- 📖 **SDK 使用说明页**：[`apps/demo-web/public/sdk-guide.html`](apps/demo-web/public/sdk-guide.html)

## 🤝 贡献指南

我们欢迎各种形式的贡献：

- 🐛 报告 Bug 或提出问题
- 💡 分享你的使用经验
- 🔧 提交 Pull Request 改进代码
- 📖 完善文档和示例

## 📄 开源协议

MIT License

## 🔗 相关链接

- [npm 主页](https://www.npmjs.com/package/jit-pdf)
- [GitHub 仓库](https://github.com/MrXujiang/jit-pdf-sdk)
- [EmbedPDF](https://github.com/embedpdf/embedpdf) - 底层 PDF 引擎

---

<div align="center">

**Jit PDF** - 让 PDF 在线编辑更简单 ✨

Made with ❤️ by the Jit PDF Team

</div>

## 🏗️ Monorepo 结构

```plaintext
jit-pdf/
├── apps/demo-web/              # 完整业务化演示应用
│   └── 包含文件列表、上传、批注、脱敏、删除、历史副本
├── apps/file-service/          # NestJS 本地文件服务
│   └── 支持目录浏览、上传、删除、Range 流式读取、另存副本
├── packages/pdf-sdk/           # SDK 本体（npm 包：jit-pdf）
├── packages/shared/            # 共享 DTO、类型与错误定义
└── documents/                  # 技术文档
```

详细说明：

- **`apps/demo-web`** - 完整业务化演示应用，包含文件列表、上传、批注、脱敏、删除、历史副本
- **`apps/file-service`** - NestJS 本地文件服务，支持目录浏览、上传、删除、Range 流式读取、另存副本
- **`packages/pdf-sdk`** - SDK 本体，对外发布包名为 `jit-pdf`
- **`packages/shared`** - 共享 DTO、类型与错误定义

## 🛠️ 本地开发

### 环境准备

确保已安装以下工具：

- Node.js >= 18.x
- pnpm >= 9.x

### 快速启动

```bash
# 安装依赖
pnpm install

# 启动开发服务器（同时启动文件服务和演示应用）
pnpm dev
```

默认启动：

- 🌐 **业务演示应用**：`http://localhost:5173`
- 🔧 **文件服务**：`http://localhost:4000`

### 其他常用命令

```bash
# 构建所有子项目
pnpm build

# 运行测试
pnpm test

# 单独构建 SDK 包
pnpm --filter jit-pdf build

# 单独开发文件服务
pnpm --filter @jit-pdf/file-service dev

# 单独开发演示应用
pnpm --filter @jit-pdf/demo-web dev
```

### 自定义文件服务读取目录

如果你要指定文件服务读取目录：

```bash
PDF_ROOT_DIR=/absolute/path/to/pdfs pnpm --filter @jit-pdf/file-service dev
```

### 构建产物

SDK 打包后会生成以下文件：

```plaintext
packages/pdf-sdk/dist/
├── index.js          # ESM 入口
├── index.cjs         # CommonJS 入口
├── browser.js        # 浏览器挂载入口（ESM）
├── browser.cjs       # 浏览器挂载入口（CommonJS）
├── jit-pdf.umd.js    # UMD 版本（CDN 直引）
└── style.css         # 样式文件
```

对应关系：

- `jit-pdf`：Vue / ESM / CJS 项目入口
- `jit-pdf/browser`：挂载式入口
- `jit-pdf/styles.css`：公共样式
- UMD：适合 `<script>` 直引

## 🎯 落地建议

### 推荐接入路径

1. **🔍 调研或 PoC 阶段**
   - 先用 `createIndexedDbPdfEditorService()` 走纯本地模式
   - 快速验证功能，无需服务端支持

2. **🚀 联调阶段**
   - 切换到 `createHttpPdfEditorService()` 对接文件服务
   - 实现文件上传、下载、历史版本管理等能力

3. **🏠 Vue 项目**
   - 优先直接使用 `JitPdfEditor` 组件
   - 享受完整的 Vue 生态体验

4. **🔌 非 Vue 项目**
   - 优先使用 `mountJitPdfEditor()` 或 UMD 直引模式
   - React/Angular/低代码平台均适用

### 典型应用场景

如果你希望把它做成企业内部统一文档能力平台，当前这套 SDK 已经适合作为：

- 📄 **合同预览与审阅底座** - 支持批注、脱敏、版本管理
- 🧾 **发票 / 证明 / 附件查看器** - 快速集成 PDF 预览能力
- 📚 **文档归档系统的 PDF 工作台** - 完整的编辑与管理能力
- 🔧 **多项目复用的通用 PDF 组件** - 一次集成，多处复用

### 最佳实践

- ✅ **开发阶段**：使用纯本地模式，减少依赖
- ✅ **测试阶段**：切换服务端模式，验证完整流程
- ✅ **生产部署**：配合文件服务，实现完整功能
- ✅ **性能优化**：大文件使用 Range 流式读取
- ✅ **安全考虑**：敏感文件建议启用脱敏功能
