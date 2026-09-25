<template>
  <div class="highschool-step-score-card" :class="{ 'has-score': checkedItems.length > 0 }">
    <div class="step-card-header">
      <div class="header-left">
        <span class="exam-badge">🎯 高考母题 · 分步踩分自测</span>
        <span class="score-pill">总分 {{ totalPoints }} 分</span>
        <span v-if="checkedItems.length > 0" class="status-pill" :class="scorePercent === 100 ? 'pill-perfect' : 'pill-done'">
          已得 {{ currentScore }}/{{ totalPoints }} 分
        </span>
      </div>

      <div class="header-right">
        <button
          v-if="checkedItems.length > 0"
          class="reset-step-btn"
          title="重置当前自评采分点"
          type="button"
          @click="resetScoring"
        >
          <svg class="reset-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2.5 8a5.5 5.5 0 0 1 9.3-3.9L14 6.5M13.5 8a5.5 5.5 0 0 1-9.3 3.9L2 9.5"></path>
            <path d="M14 2.5v4h-4M2 13.5v-4h4"></path>
          </svg>
          重置
        </button>

        <button class="toggle-btn" type="button" @click="toggleOpen">
          {{ isOpen ? '收起采分细则' : '展开采分自测' }}
          <span class="arrow" :class="{ 'is-open': isOpen }">▼</span>
        </button>
      </div>
    </div>

    <!-- 题目区 -->
    <div class="problem-content">
      <div class="problem-title">【母题题干】</div>
      <div class="problem-text">
        <slot name="question">{{ question }}</slot>
      </div>
    </div>

    <!-- 展开区：分步踩分与标准解答 -->
    <div v-show="isOpen" class="scoring-body">
      <!-- 计分罗盘 -->
      <div class="score-dashboard">
        <div class="score-display">
          我的得分：<span class="my-score">{{ currentScore }}</span> / {{ totalPoints }} 分
        </div>
        <div class="score-bar-bg">
          <div class="score-bar-fill" :style="{ width: `${scorePercent}%` }"></div>
        </div>
        <div class="score-evaluation">
          <span v-if="checkedItems.length === 0" class="eval-empty">💡 请先自己独立草稿作答，再逐条核对下列评分标准！</span>
          <span v-else-if="scorePercent === 100" class="eval-perfect">🌟 满分通关！卷面表述极度严谨！</span>
          <span v-else-if="scorePercent >= 70" class="eval-good">👍 掌握良好，注意规范细节与单位！</span>
          <span v-else class="eval-need-work">⚠️ 仍有失分点，请核对是否漏列方程或方向错误！</span>
        </div>
      </div>

      <!-- 采分点自检清单 -->
      <div class="criteria-section">
        <div class="section-title">📝 阅卷采分点逐项自评（逐条核对并勾选）：</div>
        <div class="criteria-list">
          <label 
            v-for="(item, idx) in criteriaList" 
            :key="idx" 
            class="criteria-item"
            :class="{ 'is-checked': checkedItems.includes(idx) }"
          >
            <input 
              type="checkbox" 
              :value="idx" 
              v-model="checkedItems"
              class="criteria-checkbox"
              @change="onCheckedChange"
            />
            <div class="criteria-detail">
              <span class="criteria-desc">{{ item.desc }}</span>
              <span class="criteria-point">+{{ item.points }}分</span>
            </div>
          </label>
        </div>
      </div>

      <!-- 高考标准作答规范 -->
      <div class="solution-section">
        <div class="section-title">📐 高考标准解题步骤与排版范式：</div>
        <div class="solution-content">
          <slot name="solution">
            <pre class="solution-pre"><code>{{ solution }}</code></pre>
          </slot>
        </div>
      </div>

      <!-- 避坑提醒 -->
      <div class="pitfall-box">
        <div class="pitfall-title">🚨 阅卷老师视角·失分避坑警示：</div>
        <div class="pitfall-text">
          <slot name="pitfall">{{ pitfall }}</slot>
        </div>
      </div>

      <!-- 自动保存底栏提示 -->
      <div class="save-status-bar">
        <span class="save-tip">
          <svg class="save-check-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3.5 8.5 6.5 11.5 12.5 4.5"></polyline>
          </svg>
          踩分自测进度已自动保存至本地
        </span>
        <span v-if="savedTime" class="save-time">上次自测：{{ savedTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import { generateProblemId, getStepRecord, saveRecord, removeRecord } from '../utils/practiceStorage'

export interface CriteriaItem {
  desc: string
  points: number
}

const props = withDefaults(defineProps<{
  id?: string
  question?: string
  solution?: string
  pitfall?: string
  criteria?: CriteriaItem[]
}>(), {
  id: '',
  question: '',
  solution: '',
  pitfall: '',
  criteria: () => []
})

const route = useRoute()
const isOpen = ref(false)
const checkedItems = ref<number[]>([])
const savedTime = ref<string>('')

const problemId = computed(() => {
  return generateProblemId(route.path, props.id, props.question || props.solution || props.pitfall)
})

const criteriaList = computed<CriteriaItem[]>(() => {
  if (props.criteria && props.criteria.length > 0) {
    return props.criteria
  }
  if (props.pitfall) {
    const list: CriteriaItem[] = []
    const lines = props.pitfall.split('\n')
    for (const l of lines) {
      const line = l.trim()
      if (!line || line.startsWith('【')) continue
      const m = line.match(/([（(]?(?:得|\+)?\s*(\d+)\s*分[)）]?)/)
      const points = m ? parseInt(m[2], 10) : 1
      let desc = line.replace(/^[①②③④⑤⑥⑦⑧⑨⑩\d\.\s、-]+/, '').trim()
      if (m) {
        desc = desc.replace(m[1], '').trim().replace(/[；;。，,]$/, '')
      }
      if (desc) {
        list.push({ desc, points })
      }
    }
    if (list.length > 0) return list
  }
  return [
    { desc: '解题思路清晰，列出关键物理/化学方程', points: 3 },
    { desc: '过程推导与公式代入准确', points: 3 },
    { desc: '最终数值计算正确且带规范物理量单位', points: 2 }
  ]
})

const totalPoints = computed(() => {
  return criteriaList.value.reduce((sum, item) => sum + item.points, 0)
})

const currentScore = computed(() => {
  return checkedItems.value.reduce((sum, idx) => {
    const item = criteriaList.value[idx]
    return sum + (item ? item.points : 0)
  }, 0)
})

const scorePercent = computed(() => {
  if (!totalPoints.value) return 0
  return Math.round((currentScore.value / totalPoints.value) * 100)
})

function persistCurrentState() {
  saveRecord({
    type: 'step',
    id: problemId.value,
    path: route.path,
    isOpen: isOpen.value,
    checkedItems: [...checkedItems.value],
    score: currentScore.value,
    totalPoints: totalPoints.value,
    updatedAt: Date.now()
  })
  savedTime.value = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function toggleOpen() {
  isOpen.value = !isOpen.value
  persistCurrentState()
}

function onCheckedChange() {
  persistCurrentState()
}

function resetScoring() {
  checkedItems.value = []
  savedTime.value = ''
  removeRecord(problemId.value)
}

onMounted(() => {
  const existing = getStepRecord(problemId.value)
  if (existing) {
    if (Array.isArray(existing.checkedItems)) {
      checkedItems.value = existing.checkedItems
    }
    if (typeof existing.isOpen === 'boolean') {
      isOpen.value = existing.isOpen
    } else if (checkedItems.value.length > 0) {
      isOpen.value = true
    }
    if (existing.updatedAt) {
      savedTime.value = new Date(existing.updatedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
  }
})
</script>

<style scoped>
.highschool-step-score-card {
  margin: 1.75rem 0;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
}

.step-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exam-badge {
  font-size: 0.85rem;
  font-weight: 700;
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.12);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

.score-pill {
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.status-pill {
  font-size: 0.775rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.pill-done {
  background: rgba(124, 58, 237, 0.12);
  color: #7c3aed;
}

.pill-perfect {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.reset-step-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}

.reset-step-btn:hover {
  color: #7c3aed;
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.08);
}

.reset-icon {
  width: 12px;
  height: 12px;
}

.toggle-btn {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.toggle-btn:hover {
  background: var(--vp-c-brand-soft);
}

.arrow {
  font-size: 0.7rem;
  transition: transform 0.2s;
}

.arrow.is-open {
  transform: rotate(180deg);
}

.problem-content {
  padding: 1.25rem;
}

.problem-title {
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.4rem;
}

.problem-text {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--vp-c-text-1);
}

.scoring-body {
  padding: 0 1.25rem 1.25rem 1.25rem;
  border-top: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg);
}

/* 计分罗盘 */
.score-dashboard {
  margin: 1.25rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.score-display {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.my-score {
  font-size: 1.5rem;
  font-weight: 800;
  color: #7c3aed;
}

.score-bar-bg {
  height: 8px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.score-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #10b981);
  transition: width 0.3s ease;
}

.score-evaluation {
  font-size: 0.85rem;
  font-weight: 600;
}

.eval-empty { color: var(--vp-c-text-2); }
.eval-perfect { color: #10b981; }
.eval-good { color: #3b82f6; }
.eval-need-work { color: #f59e0b; }

/* 采分点清单 */
.section-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 1rem 0 0.5rem 0;
}

.criteria-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.criteria-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.15s ease;
}

.criteria-item:hover {
  border-color: #7c3aed;
}

.criteria-item.is-checked {
  background: rgba(124, 58, 237, 0.08);
  border-color: #7c3aed;
}

.criteria-checkbox {
  margin-top: 0.25rem;
  cursor: pointer;
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #7c3aed;
}

.criteria-detail {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.criteria-desc {
  font-size: 0.925rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.criteria-point {
  font-size: 0.825rem;
  font-weight: 700;
  color: #7c3aed;
  white-space: nowrap;
}

/* 解题步骤 */
.solution-pre {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.925rem;
  line-height: 1.7;
  white-space: pre-wrap;
  border: 1px solid var(--vp-c-divider);
}

/* 避坑警示 */
.pitfall-box {
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  background: rgba(239, 68, 68, 0.08);
  border-left: 4px solid #ef4444;
  border-radius: 0 6px 6px 0;
}

.pitfall-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 0.3rem;
}

.pitfall-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

/* 自动保存状态指示 */
.save-status-bar {
  margin-top: 1rem;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.save-tip {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #10b981;
  font-weight: 500;
}

.save-check-icon {
  width: 12px;
  height: 12px;
}
</style>
