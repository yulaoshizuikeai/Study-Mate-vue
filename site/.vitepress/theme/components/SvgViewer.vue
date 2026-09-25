<template>
  <div class="highschool-svg-viewer" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="svg-top-bar">
      <span class="svg-title">📐 {{ title || '高中理科标准矢量图解' }}</span>
      <div class="svg-actions">
        <button class="action-btn" @click="resetZoom" title="重置比例">↺ 100%</button>
        <button class="action-btn" @click="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏观察'">
          {{ isFullscreen ? '⤢ 退出全屏' : '⤢ 放大' }}
        </button>
      </div>
    </div>

    <div class="svg-stage">
      <div class="svg-inner">
        <slot></slot>
      </div>
    </div>

    <div v-if="caption" class="svg-caption">
      💡 <b>观察与审题重点：</b>{{ caption }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
  caption?: string
}>()

const isFullscreen = ref(false)

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function resetZoom() {
  isFullscreen.value = false
}
</script>

<style scoped>
.highschool-svg-viewer {
  margin: 1.75rem 0;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
  width: 100%;
}

.highschool-svg-viewer:hover {
  border-color: var(--vp-c-brand-1);
}

.svg-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 1.1rem;
  background: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-divider);
}

.svg-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.svg-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  font-size: 0.775rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}

.action-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.svg-stage {
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-bg);
  width: 100%;
  overflow-x: auto;
}

.svg-inner {
  width: 100%;
  max-width: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 核心：确保在 Flex 容器下 SVG 绝对不塌陷 */
.svg-inner :deep(svg) {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 180px;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.06));
}

.svg-caption {
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

/* 全屏模态 */
.is-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  border-radius: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
}

.is-fullscreen .svg-stage {
  flex: 1;
  padding: 2rem;
}

.is-fullscreen .svg-inner {
  max-width: 90vw;
}

.is-fullscreen .svg-inner :deep(svg) {
  max-height: 85vh;
  width: auto !important;
}
</style>
