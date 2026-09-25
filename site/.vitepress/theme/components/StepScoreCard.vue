<template>
  <div class="highschool-step-score-card">
    <div class="step-card-header">
      <div class="header-left">
        <span class="exam-badge">🎯 高考母题 · 分步踩分自测</span>
        <span class="score-pill">总分 {{ totalPoints }} 分</span>
      </div>
      <div class="header-right">
        <button class="toggle-btn" @click="isOpen = !isOpen">
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
          <span v-if="scorePercent === 100" class="eval-perfect">🌟 满分通关！卷面表述极度严谨！</span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface CriteriaItem {
  desc: string
  points: number
}

const props = withDefaults(defineProps<{
  question?: string
  solution?: string
  pitfall?: string
  criteria?: CriteriaItem[]
}>(), {
  question: '',
  solution: '',
  pitfall: '',
  criteria: () => [
    { desc: '垂直斜面方向受力平衡列式正确', points: 2 },
    { desc: '滑动摩擦力公式计算正确并标明方向', points: 2 },
    { desc: '沿斜面方向列出牛顿平衡方程', points: 2 },
    { desc: '最终拉力结果正确且带单位', points: 1 }
  ]
})

const isOpen = ref(false)
const checkedItems = ref<number[]>([])

const criteriaList = computed(() => props.criteria)

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
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
</style>
