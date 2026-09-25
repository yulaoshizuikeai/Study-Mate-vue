<template>
  <div class="sm-dashboard-wrapper">
    <!-- 顶部概览 Header -->
    <header class="sm-hero">
      <div class="sm-hero__brand-row">
        <div class="sm-hero__left">
          <img class="sm-hero__mascot" src="/learn-mascot.png" alt="StudyMate Mascot" width="76" height="50" />
          <div class="sm-hero__titles">
            <div class="sm-hero__brand">StudyMate</div>
            <div class="sm-hero__tagline">高中全科智能自学工作区</div>
          </div>
        </div>

        <!-- 真实学情身份卡片 -->
        <div class="sm-user-badge">
          <div class="sm-user-info">
            <span class="sm-user-name">{{ profile.student_name }}</span>
            <span class="sm-user-grade">{{ profile.grade }} · {{ profile.exam_region }}</span>
          </div>
          <div class="sm-user-avatar">
            {{ profile.student_name.slice(0, 1) }}
          </div>
        </div>
      </div>
    </header>

    <!-- 核心指标状态栏 (Metric Strip) -->
    <section class="sm-stats-strip" aria-label="学习概览">
      <div class="sm-stat-box">
        <span class="sm-stat-value">{{ subjects.length }}</span>
        <span class="sm-stat-label">在学科目</span>
      </div>
      <div class="sm-stat-box">
        <span class="sm-stat-value">{{ totalNodesCount }}</span>
        <span class="sm-stat-label">考纲总节点</span>
      </div>
      <div class="sm-stat-box">
        <span class="sm-stat-value">{{ learningNodesCount }}</span>
        <span class="sm-stat-label">进行中节点</span>
      </div>
      <div class="sm-stat-box">
        <span class="sm-stat-value text-brand">{{ practiceCount }} <small style="font-size:0.8rem; font-weight:normal;">题</small></span>
        <span class="sm-stat-label">已练自测题</span>
      </div>
      <div class="sm-stat-box">
        <span class="sm-stat-value">{{ avgMastery }}%</span>
        <span class="sm-stat-label">已学精通度</span>
      </div>
    </section>

    <!-- Bento 双卡片：备考罗盘 & 艾宾浩斯攻坚 -->
    <section class="sm-bento-grid" aria-label="学情与复盘">
      <!-- 卡片 1：备考罗盘 (真实读取 profile.yaml) -->
      <article class="sm-card sm-compass">
        <div class="sm-card__head">
          <div class="sm-card__title-group">
            <svg class="sm-svg-icon text-brand" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="10" cy="10" r="7"></circle>
              <circle cx="10" cy="10" r="3"></circle>
              <path d="M10 3v2M10 15v2M3 10h2M15 10h2"></path>
            </svg>
            <h2 class="sm-card__title">学科备考罗盘</h2>
          </div>
          <span class="sm-card__tag">高二同步选必</span>
        </div>

        <div class="sm-compass__info-list">
          <div class="sm-info-row">
            <span class="label">考区标准</span>
            <span class="val font-semibold">{{ profile.exam_region }}</span>
          </div>
          <div class="sm-info-row">
            <span class="label">目标档位</span>
            <span class="val text-brand font-semibold">{{ profile.target_score_band }}</span>
          </div>
          <div class="sm-info-row">
            <span class="label">认知风格</span>
            <span class="val">{{ profile.learning_style }}</span>
          </div>
          <div class="sm-info-row">
            <span class="label">重点攻坚科目</span>
            <div class="sm-weak-tags">
              <span v-for="sub in profile.weak_subjects" :key="sub" class="weak-pill">{{ sub }}</span>
            </div>
          </div>
        </div>

        <div class="sm-card__actions">
          <button class="sm-btn sm-btn--secondary" type="button" @click="triggerDiagnostic">
            <svg class="sm-btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3.5 8.5l3 3 6-6"></path>
            </svg>
            3题极速前测
          </button>
        </div>
      </article>

      <!-- 卡片 2：艾宾浩斯靶向攻坚 (真实读取错题) -->
      <article class="sm-card sm-radar">
        <div class="sm-card__head">
          <div class="sm-card__title-group">
            <svg class="sm-svg-icon text-amber" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 2v2.5M10 15.5V18M2 10h2.5M15.5 10H18"></path>
              <circle cx="10" cy="10" r="6"></circle>
              <circle cx="10" cy="10" r="2"></circle>
            </svg>
            <h2 class="sm-card__title">艾宾浩斯靶向攻坚</h2>
          </div>
          <span class="sm-card__tag sm-card__tag--alert">{{ dueMistakesCount }} 道待复盘</span>
        </div>

        <p class="sm-radar__desc">根据认知遗忘曲线，今日扫描到 <b>{{ dueMistakesCount }}</b> 道需巩固错题：</p>

        <div class="sm-taxonomy-chips">
          <div 
            v-for="(count, tax) in taxonomyCounts" 
            :key="tax" 
            class="taxo-chip"
            :class="{ 'has-due': count > 0 }"
          >
            <span class="taxo-label">{{ tax }}</span>
            <span class="taxo-num">{{ count }}</span>
          </div>
        </div>

        <div class="sm-card__actions">
          <a href="/mistakes/" class="sm-btn sm-btn--primary">
            开启今日错题攻坚
            <svg class="sm-btn-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 3.5l4.5 4.5-4.5 4.5"></path>
            </svg>
          </a>
        </div>
      </article>
    </section>

    <!-- 筛选与搜索控制器 (Controls) -->
    <section class="sm-controls" aria-label="筛选与检索">
      <div class="sm-tabs" role="group">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          class="sm-tab-btn"
          :class="{ 'is-active': activeFilter === tab.key }"
          @click="activeFilter = tab.key"
        >
          {{ tab.label }}
          <span class="sm-tab-num">{{ tab.count }}</span>
        </button>
      </div>

      <div class="sm-search-box">
        <svg class="sm-search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="7" cy="7" r="4.5"></circle>
          <path d="M10.5 10.5L14 14"></path>
        </svg>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="快速检索学科、考点或知识节点..."
          class="sm-search-input"
        />
      </div>
    </section>

    <!-- 学科与完整学习节点列表 (Subject Cards with Full Roadmap Nodes) -->
    <section class="sm-subjects-section" aria-label="科目与学习节点路线">
      <div
        v-for="sub in filteredSubjects"
        :key="sub.id"
        class="sm-subject-panel"
      >
        <!-- 学科顶栏头 -->
        <div class="sm-panel-header">
          <div class="sm-panel-left">
            <h3 class="sm-panel-title">{{ sub.title }}</h3>
            <span class="sm-status-tag" :class="sub.statusClass">{{ sub.statusText }}</span>
            <span class="sm-panel-category">{{ sub.category }}</span>
          </div>

          <div class="sm-panel-right">
            <div class="sm-header-progress">
              <div class="sm-progress-track">
                <div class="sm-progress-fill" :style="{ width: `${sub.progressPercent}%` }"></div>
              </div>
              <span class="sm-header-stat">{{ sub.completedNodes }}/{{ sub.nodes.length }} 节点已通关 · 已学掌握度 {{ sub.masteryPercent }}%</span>
            </div>

            <button 
              class="sm-toggle-nodes-btn"
              type="button"
              @click="sub.isExpanded = !sub.isExpanded"
            >
              {{ sub.isExpanded ? '收起知识节点' : '展开学习节点' }}
              <svg 
                class="sm-chevron-icon" 
                :class="{ 'is-open': sub.isExpanded }"
                viewBox="0 0 16 16" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1.8"
              >
                <path d="M4 6l4 4 4-4"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 学习节点列表 (完整呈现 nodes) -->
        <div v-show="sub.isExpanded" class="sm-nodes-container">
          <div class="sm-nodes-header">
            <span class="nodes-title">大纲路线图知识节点 ({{ sub.nodes.length }} 个考点)</span>
            <span class="nodes-hint">点击节点直接进入对应微课或开启自测</span>
          </div>

          <div class="sm-nodes-grid">
            <div
              v-for="(node, nIdx) in sub.nodes"
              :key="node.id"
              class="sm-node-card"
              :class="{
                'node-learning': node.status === '学习中',
                'node-todo': node.status === '未开始',
                'node-done': node.status === '能独立应用'
              }"
            >
              <!-- 节点顶行 -->
              <div class="node-head">
                <div class="node-number-title">
                  <span class="node-seq">0{{ nIdx + 1 }}</span>
                  <span class="node-title">{{ node.title }}</span>
                </div>
                <div class="node-badges">
                  <span class="node-kind-tag" :class="`kind-${node.kind}`">{{ node.kind }}</span>
                  <span class="node-status-badge">{{ node.status }}</span>
                </div>
              </div>

              <!-- 学习目标 -->
              <p class="node-objective">{{ node.objective }}</p>

              <!-- 底栏信息：前置依赖 + 掌握度条 + 进入按钮 -->
              <div class="node-foot">
                <div class="node-prereq">
                  <span class="prereq-label">前置：</span>
                  <span v-if="node.prerequisites && node.prerequisites.length" class="prereq-chip">
                    {{ node.prerequisites.join(', ') }}
                  </span>
                  <span v-else class="prereq-chip none">无</span>
                </div>

                <div class="node-foot-right">
                  <div class="node-mastery-group">
                    <span class="mastery-label">掌握度</span>
                    <div class="node-mini-track">
                      <div class="node-mini-bar" :style="{ width: `${node.mastery * 100}%` }"></div>
                    </div>
                    <span class="node-pct">{{ Math.round(node.mastery * 100) }}%</span>
                  </div>

                  <a 
                    v-if="node.lessonLink" 
                    :href="node.lessonLink" 
                    class="node-enter-btn"
                  >
                    进入微课
                    <svg class="node-btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M6 3.5l4.5 4.5-4.5 4.5"></path>
                    </svg>
                  </a>
                  <span v-else class="node-locked-tag">待解锁</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredSubjects.length === 0" class="sm-empty-state">
        未匹配到相关学科或考点
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import rawData from '../curriculum-data.json'
import { getAllRecords, onPracticeUpdated } from '../utils/practiceStorage'

// 真实学情数据与全量学习节点：直接从同步生成的 curriculum-data.json 动态加载
// 任何学科新建、节点增删改，只需执行 npm run sync 即可全自动响应式更新并保持样式
const profile = ref(rawData.profile)
const dueMistakesCount = ref(rawData.dueMistakesCount ?? 0)
const taxonomyCounts = ref(rawData.taxonomyCounts || {
  '审题遗漏': 0,
  '概念混淆': 1,
  '模型套错': 0,
  '计算失误': 0
})
const subjects = ref(rawData.subjects || [])
const practiceCount = ref(0)

function refreshPracticeStats() {
  const records = getAllRecords()
  let count = 0
  for (const key in records) {
    const r = records[key]
    if (r.type === 'quiz' && r.selected !== null) {
      count++
    } else if (r.type === 'step' && r.checkedItems && r.checkedItems.length > 0) {
      count++
    }
  }
  practiceCount.value = count
}

let unlistenPractice: (() => void) | null = null

onMounted(() => {
  refreshPracticeStats()
  unlistenPractice = onPracticeUpdated(() => {
    refreshPracticeStats()
  })
})

onUnmounted(() => {
  if (unlistenPractice) {
    unlistenPractice()
  }
})

const activeFilter = ref<'all' | 'ongoing' | 'done'>('all')
const searchQuery = ref('')

const totalNodesCount = computed(() => {
  return subjects.value.reduce((acc, sub) => acc + sub.nodes.length, 0)
})

const learningNodesCount = computed(() => {
  return subjects.value.reduce((acc, sub) => {
    return acc + sub.nodes.filter(n => n.status === '学习中').length
  }, 0)
})

const avgMastery = computed(() => {
  const activeSubs = subjects.value.filter(s => (s.masteryPercent ?? 0) > 0 || s.status === 'ongoing')
  if (!activeSubs.length) return 0
  const sum = activeSubs.reduce((acc, s) => acc + s.masteryPercent, 0)
  return Math.round(sum / activeSubs.length)
})

const filterTabs = computed(() => [
  { key: 'all' as const, label: '全部科目', count: subjects.value.length },
  { key: 'ongoing' as const, label: '进行中', count: subjects.value.filter(s => s.status === 'ongoing').length },
  { key: 'done' as const, label: '已完成', count: subjects.value.filter(s => s.status === 'done').length }
])

const filteredSubjects = computed(() => {
  return subjects.value.filter(sub => {
    // 状态过滤
    if (activeFilter.value === 'ongoing' && sub.status !== 'ongoing') return false
    if (activeFilter.value === 'done' && sub.status !== 'done') return false
    
    // 搜索过滤（支持学科名及内部知识节点名）
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchSubject = sub.title.toLowerCase().includes(q)
      const matchNode = sub.nodes.some(n => n.title.toLowerCase().includes(q) || n.objective.toLowerCase().includes(q))
      return matchSubject || matchNode
    }
    return true
  })
})

function triggerDiagnostic() {
  alert('已激活 3 题极速前测机制。智能体可在对话中发送探针母题以精简大纲。')
}
</script>

<style scoped>
/* 原生 TraeWork / Bento Grid 规范 */
.sm-dashboard-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 3rem 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", sans-serif;
  color: var(--vp-c-text-1);
}

/* 顶部 Hero */
.sm-hero {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sm-hero__brand-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.sm-hero__left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.sm-hero__mascot {
  width: 76px;
  height: auto;
  aspect-ratio: 640 / 425;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 12px rgba(2, 132, 199, 0.08));
  transition: transform 0.25s ease;
}

.sm-hero__mascot:hover {
  transform: translateY(-2px) scale(1.03);
}

.sm-hero__titles {
  display: flex;
  flex-direction: column;
}

.sm-hero__brand {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.sm-hero__tagline {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.15rem;
}

/* 学情身份卡片 */
.sm-user-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.85rem;
  border-radius: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.sm-user-info {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.sm-user-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sm-user-grade {
  font-size: 0.725rem;
  color: var(--vp-c-text-2);
}

.sm-user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #0284c7;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}

/* 核心指标状态栏 */
.sm-stats-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 1.75rem;
}

@media (max-width: 960px) {
  .sm-stats-strip {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .sm-hero__mascot {
    width: 62px;
  }
  .sm-stats-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

.sm-stat-box {
  padding: 1.1rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.sm-stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.sm-stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.35rem;
}

/* Bento 双卡片 */
.sm-bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

@media (max-width: 820px) {
  .sm-bento-grid {
    grid-template-columns: 1fr;
  }
}

.sm-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.25rem 1.4rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s;
}

.sm-card:hover {
  border-color: var(--vp-c-brand-1);
}

.sm-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sm-card__title-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.sm-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
}

.sm-card__tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.sm-card__tag--alert {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.2);
  font-weight: 600;
}

.sm-svg-icon {
  width: 18px;
  height: 18px;
}

.text-brand { color: #0284c7; }
.text-amber { color: #d97706; }

/* 罗盘内部 */
.sm-compass__info-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
}

.sm-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sm-info-row .label {
  color: var(--vp-c-text-2);
}

.sm-weak-tags {
  display: flex;
  gap: 0.4rem;
}

.weak-pill {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-weight: 600;
}

/* 艾宾浩斯雷达内部 */
.sm-radar__desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.sm-taxonomy-chips {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.taxo-chip {
  padding: 0.55rem 0.4rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.taxo-chip.has-due {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.taxo-label {
  font-size: 0.725rem;
  color: var(--vp-c-text-2);
}

.taxo-num {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.taxo-chip.has-due .taxo-num {
  color: #ef4444;
}

/* 按钮规范 */
.sm-card__actions {
  display: flex;
  justify-content: flex-end;
}

.sm-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.825rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
}

.sm-btn--primary {
  background: #0284c7;
  color: #ffffff !important;
  border: none;
}

.sm-btn--primary:hover {
  background: #0369a1;
}

.sm-btn--secondary {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.sm-btn--secondary:hover {
  border-color: var(--vp-c-brand-1);
}

.sm-btn-icon {
  width: 14px;
  height: 14px;
}

/* 控制栏：Tab 与 搜索 */
.sm-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sm-tabs {
  display: flex;
  gap: 0.4rem;
}

.sm-tab-btn {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s;
}

.sm-tab-btn:hover {
  color: var(--vp-c-text-1);
}

.sm-tab-btn.is-active {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.sm-tab-num {
  font-size: 0.725rem;
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  background: var(--vp-c-bg-mute);
}

.sm-search-box {
  display: flex;
  align-items: center;
  position: relative;
  min-width: 280px;
}

.sm-search-icon {
  position: absolute;
  left: 0.75rem;
  width: 14px;
  height: 14px;
  color: var(--vp-c-text-3);
}

.sm-search-input {
  width: 100%;
  padding: 0.45rem 0.75rem 0.45rem 2.2rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.15s;
}

.sm-search-input:focus {
  border-color: #0284c7;
}

/* 学科大纲面板列表 */
.sm-subjects-section {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.sm-subject-panel {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

.sm-panel-header {
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.sm-panel-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.sm-panel-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
}

.sm-status-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.status-ongoing {
  background: rgba(2, 132, 199, 0.1);
  color: #0284c7;
}

.status-planned {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-3);
}

.sm-panel-category {
  font-size: 0.775rem;
  color: var(--vp-c-text-3);
}

.sm-panel-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.sm-header-progress {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 180px;
}

.sm-progress-track {
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-divider);
  overflow: hidden;
}

.sm-progress-fill {
  height: 100%;
  border-radius: 3px;
  background: #0284c7;
  transition: width 0.3s ease;
}

.sm-header-stat {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.sm-toggle-nodes-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: transparent;
  border: 1px solid var(--vp-c-brand-soft);
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.sm-toggle-nodes-btn:hover {
  background: var(--vp-c-brand-soft);
}

.sm-chevron-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.sm-chevron-icon.is-open {
  transform: rotate(180deg);
}

/* 节点容器 */
.sm-nodes-container {
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
}

.sm-nodes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nodes-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.nodes-hint {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.sm-nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1rem;
}

/* 知识节点单卡片 (Node Card) */
.sm-node-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  transition: all 0.2s ease;
}

.sm-node-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
}

.node-learning {
  border-left: 3px solid #0284c7;
}

.node-done {
  border-left: 3px solid #10b981;
}

.node-todo {
  border-left: 3px solid var(--vp-c-divider);
}

.node-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.node-number-title {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.node-seq {
  font-size: 0.75rem;
  font-weight: 700;
  color: #0284c7;
  font-family: monospace;
}

.node-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.node-badges {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.node-kind-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.kind-概念 { background: rgba(56, 189, 248, 0.12); color: #0284c7; }
.kind-模型 { background: rgba(139, 92, 246, 0.12); color: #7c3aed; }
.kind-母题 { background: rgba(245, 158, 11, 0.12); color: #d97706; }
.kind-实验 { background: rgba(16, 185, 129, 0.12); color: #059669; }

.node-status-badge {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}

.node-objective {
  font-size: 0.825rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
  flex: 1;
}

.node-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.65rem;
  border-top: 1px solid var(--vp-c-divider);
  gap: 0.5rem;
  flex-wrap: wrap;
}

.node-prereq {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--vp-c-text-3);
}

.prereq-chip {
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.prereq-chip.none {
  opacity: 0.6;
}

.node-foot-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.node-mastery-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.node-mini-track {
  width: 48px;
  height: 5px;
  border-radius: 2.5px;
  background: var(--vp-c-divider);
  overflow: hidden;
}

.node-mini-bar {
  height: 100%;
  background: #0284c7;
}

.node-pct {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

.node-enter-btn {
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff !important;
  background: #0284c7;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: background 0.15s;
}

.node-enter-btn:hover {
  background: #0369a1;
}

.node-btn-arrow {
  width: 12px;
  height: 12px;
}

.node-locked-tag {
  font-size: 0.725rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.sm-empty-state {
  padding: 3rem 1rem;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}
</style>
