<template>
  <div class="highschool-quiz-card" :class="{ 'is-submitted': selected !== null }">
    <div class="quiz-header">
      <span class="quiz-badge">💡 随堂自测 · {{ category || '概念理解' }}</span>
      <span v-if="tag" class="quiz-tag">{{ tag }}</span>
    </div>

    <div class="quiz-question">
      <slot name="question">{{ question }}</slot>
    </div>

    <div class="quiz-options">
      <button
        v-for="(opt, idx) in options"
        :key="idx"
        class="quiz-option-btn"
        :class="{
          'is-selected': selected === idx,
          'is-correct': selected !== null && idx === correctIndex,
          'is-wrong': selected === idx && idx !== correctIndex
        }"
        :disabled="selected !== null"
        @click="selectOption(idx)"
      >
        <span class="option-label">{{ ['A', 'B', 'C', 'D', 'E'][idx] }}.</span>
        <span class="option-text">{{ opt }}</span>
        <span v-if="selected !== null && idx === correctIndex" class="option-icon correct">✓</span>
        <span v-if="selected === idx && idx !== correctIndex" class="option-icon wrong">✗</span>
      </button>
    </div>

    <!-- 结果与解析面板 -->
    <div v-if="selected !== null" class="quiz-feedback" :class="isCorrect ? 'feedback-correct' : 'feedback-wrong'">
      <div class="feedback-title">
        <span v-if="isCorrect" class="feedback-status">🎉 恭喜回答正确！</span>
        <span v-else class="feedback-status">⚠️ 回答有误，请注意错因归因！</span>
      </div>

      <!-- 错因归因自查 -->
      <div v-if="!isCorrect" class="error-attribution">
        <div class="attr-label">深度错因归类（自省标注）：</div>
        <div class="attr-chips">
          <button 
            v-for="err in errorTypes" 
            :key="err"
            class="chip-btn" 
            :class="{ active: currentErrorType === err }"
            @click="currentErrorType = err"
          >
            {{ err }}
          </button>
        </div>
        <div v-if="currentErrorType" class="attr-tip">
          已标记为 <b>{{ currentErrorType }}</b>，复习时将按认知偏误进行靶向强化。
        </div>
      </div>

      <div class="feedback-explanation">
        <div class="exp-title">📘 名师思路透析：</div>
        <div class="exp-body">
          <slot name="explanation">{{ explanation }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  question?: string
  options: string[]
  answer: number | string // 可以是 0,1,2,3 或是 "A","B","C","D"
  explanation?: string
  category?: string
  tag?: string
}>(), {
  question: '',
  explanation: '',
  category: '概念理解',
  tag: ''
})

const selected = ref<number | null>(null)
const currentErrorType = ref<string>('')

const errorTypes = [
  '审题遗漏',
  '概念混淆',
  '模型套错',
  '计算失误'
]

const correctIndex = computed(() => {
  if (typeof props.answer === 'number') {
    return props.answer
  }
  const map: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 }
  return map[props.answer.toUpperCase()] ?? 0
})

const isCorrect = computed(() => selected.value === correctIndex.value)

function selectOption(idx: number) {
  selected.value = idx
}
</script>

<style scoped>
.highschool-quiz-card {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;
}

.highschool-quiz-card:hover {
  border-color: var(--vp-c-brand-1);
}

.quiz-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.quiz-badge {
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.quiz-tag {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.quiz-question {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.quiz-option-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  line-height: 1.4;
  transition: all 0.15s ease;
}

.quiz-option-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.option-label {
  font-weight: 700;
  margin-right: 0.6rem;
  color: var(--vp-c-brand-1);
  min-width: 1.2rem;
}

.option-text {
  flex: 1;
}

.option-icon {
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 0.5rem;
}

.option-icon.correct {
  color: #10b981;
}

.option-icon.wrong {
  color: #ef4444;
}

.quiz-option-btn.is-correct {
  border-color: #10b981 !important;
  background: rgba(16, 185, 129, 0.12) !important;
  color: #065f46;
}

.quiz-option-btn.is-wrong {
  border-color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.12) !important;
  color: #991b1b;
}

/* 结果与解析面板 */
.quiz-feedback {
  margin-top: 1.25rem;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid;
  animation: fadeIn 0.25s ease-in;
}

.feedback-correct {
  background: rgba(16, 185, 129, 0.08);
  border-color: #10b981;
}

.feedback-wrong {
  background: rgba(239, 68, 68, 0.08);
  border-color: #ef4444;
}

.feedback-status {
  font-size: 1rem;
  font-weight: 700;
}

.error-attribution {
  margin: 0.75rem 0;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px dashed #ef4444;
}

.attr-label {
  font-size: 0.825rem;
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 0.4rem;
}

.attr-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip-btn {
  font-size: 0.775rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.15s;
}

.chip-btn.active {
  background: #ef4444;
  color: #ffffff;
  border-color: #ef4444;
}

.attr-tip {
  font-size: 0.775rem;
  color: var(--vp-c-text-2);
  margin-top: 0.4rem;
}

.feedback-explanation {
  margin-top: 0.75rem;
  font-size: 0.925rem;
  line-height: 1.6;
}

.exp-title {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
