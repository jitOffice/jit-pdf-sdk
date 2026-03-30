<script setup lang="ts">
import { ref } from "vue";
import {
  JitPdfEditor,
  createIndexedDbPdfEditorService,
  type PdfSource
} from "jit-pdf";

const service = createIndexedDbPdfEditorService({
  databaseName: "jit-pdf-vue-demo"
});

const source = ref<PdfSource | null>(null);
const status = ref("请先选择一个 PDF 文件");

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  const uploaded = await service.uploadFile(file);
  source.value = {
    type: "local",
    fileId: uploaded.id,
    name: uploaded.name
  };
  status.value = `已打开：${uploaded.name}`;
}
</script>

<template>
  <div class="shell">
    <header class="toolbar">
      <strong>Vue 项目接入示例</strong>
      <input type="file" accept=".pdf,application/pdf" @change="onFileChange" />
      <span>{{ status }}</span>
    </header>

    <main class="stage">
      <JitPdfEditor
        v-if="source"
        :source="source"
        :service="service"
        locale="zh-CN"
        theme="blue-enterprise"
      />
      <div v-else class="empty">导入 PDF 后，这里会直接渲染 Jit PDF 编辑器。</div>
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100vh;
  background: #eef5ff;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #d9e7ff;
  background: rgba(255, 255, 255, 0.92);
}

.toolbar strong {
  color: #0958d9;
}

.stage {
  min-height: 0;
  padding: 18px;
}

.empty {
  display: grid;
  place-items: center;
  height: 100%;
  color: #5a7089;
  border: 1px dashed #cfe0ff;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.72);
}
</style>
