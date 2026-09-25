<template>
  <div class="learning-dashboard-container">
    <!-- 顶部状态栏：高考倒计时与打卡看板 -->
    <div class="dashboard-banner">
      <div class="banner-item">
        <span class="banner-icon">🎯</span>
        <div class="banner-info">
          <div class="banner-label">距新高考冲刺</div>
          <div class="banner-value highlight">255 <small>天</small></div>
        </div>
      </div>
      <div class="banner-divider"></div>
      <div class="banner-item">
        <span class="banner-icon">🔥</span>
        <div class="banner-info">
          <div class="banner-label">连续自学打卡</div>
          <div class="banner-value">7 <small>天</small></div>
        </div>
      </div>
      <div class="banner-divider"></div>
      <div class="banner-item">
        <span class="banner-icon">⏳</span>
        <div class="banner-info">
          <div class="banner-label">今日专注学习</div>
          <div class="banner-value">45 <small>分钟</small></div>
        </div>
      </div>
      <div class="banner-divider"></div>
      <div class="banner-item">
        <span class="banner-icon">💡</span>
        <div class="banner-info">
          <div class="banner-label">今日掌握母题模型</div>
          <div class="banner-value">2 <small>个</small></div>
        </div>
      </div>
    </div>

    <!-- 主体两栏栅格：学科进度 + 认知能力 -->
    <div class="dashboard-grid">
      <!-- 左栏：各学科考纲通关进度条 -->
      <div class="dashboard-card subjects-card">
        <div class="card-header">
          <div class="card-title">
            <span class="title-icon">📚</span>
            <span>学科考纲攻克罗盘</span>
          </div>
          <span class="card-subtitle">按新课标知识图谱动态统计</span>
        </div>

        <div class="subject-progress-list">
          <!-- 物理 -->
          <div class="subject-item">
            <div class="subject-meta">
              <div class="subject-name">
                <span class="badge physics">物理</span>
                <b>高考动力学与能量</b>
              </div>
              <div class="subject-stat">
                已通关 <b>2</b> / 8 讲 · <span class="rate">25%</span>
              </div>
            </div>
            <div class="progress-track">
              <div class="progress-bar physics-bar" style="width: 25%"></div>
            </div>
            <div class="subject-foot">
              <span class="recent-lesson">当前进行：<b>01 规范受力分析与隔离法</b> (已拿 90 分)</span>
              <a href="/subjects/physics-dynamics/lessons/01-force-analysis" class="continue-btn">继续学习 →</a>
            </div>
          </div>

          <!-- 化学 -->
          <div class="subject-item">
            <div class="subject-meta">
              <div class="subject-name">
                <span class="badge chemistry">化学</span>
                <b>水溶液中的离子平衡</b>
              </div>
              <div class="subject-stat">
                已通关 <b>1</b> / 6 讲 · <span class="rate">17%</span>
              </div>
            </div>
            <div class="progress-track">
              <div class="progress-bar chemistry-bar" style="width: 17%"></div>
            </div>
            <div class="subject-foot">
              <span class="recent-lesson">当前进行：<b>01 水的电离平衡与Kw</b> (已掌握自偶图景)</span>
              <a href="/subjects/chemistry-water-ionization/lessons/water.ionization-kw" class="continue-btn">继续学习 →</a>
            </div>
          </div>

          <!-- 数学 -->
          <div class="subject-item">
            <div class="subject-meta">
              <div class="subject-name">
                <span class="badge math">数学</span>
                <b>导数与解析几何大题</b>
              </div>
              <div class="subject-stat">
                考纲已规划 · <span class="rate">待开启</span>
              </div>
            </div>
            <div class="progress-track">
              <div class="progress-bar math-bar" style="width: 5%"></div>
            </div>
            <div class="subject-foot">
              <span class="recent-lesson">下节目标：<b>01 导数切线几何意义与单调性分类讨论</b></span>
              <span class="pending-tag">待 AI 主教练激活</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右栏：高考四维解题能力雷达 & 错题预警 -->
      <div class="dashboard-right-col">
        <!-- 四大核心能力条 -->
        <div class="dashboard-card ability-card">
          <div class="card-header">
            <div class="card-title">
              <span class="title-icon">⚡</span>
              <span>高考高分思维能力</span>
            </div>
            <span class="score-overall">综合 81 分</span>
          </div>

          <div class="ability-bars">
            <div class="ability-row">
              <div class="ability-info">
                <span>审题建模与临界条件捕捉</span>
                <b>82%</b>
              </div>
              <div class="ability-track">
                <div class="ability-fill fill-1" style="width: 82%"></div>
              </div>
            </div>

            <div class="ability-row">
              <div class="ability-info">
                <span>规范受力分析与几何光路画图</span>
                <b>90%</b>
              </div>
              <div class="ability-track">
                <div class="ability-fill fill-2" style="width: 90%"></div>
              </div>
            </div>

            <div class="ability-row">
              <div class="ability-info">
                <span>正交分解与公式分步列式</span>
                <b>74%</b>
              </div>
              <div class="ability-track">
                <div class="ability-fill fill-3" style="width: 74%"></div>
              </div>
            </div>

            <div class="ability-row">
              <div class="ability-info">
                <span>大题踩分点自测与防粗心能力</span>
                <b>78%</b>
              </div>
              <div class="ability-track">
                <div class="ability-fill fill-4" style="width: 78%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 艾宾浩斯复盘提醒与错因归因卡 -->
        <div class="dashboard-card review-card">
          <div class="card-header">
            <div class="card-title">
              <span class="title-icon">🧠</span>
              <span>艾宾浩斯错题复盘拦截</span>
            </div>
            <span class="review-badge">1 题今日到期</span>
          </div>

          <div class="review-box">
            <div class="review-target">
              <span class="err-tag">[概念混淆]</span>
              <span class="err-text">斜面受力分析：误将重力下滑分力重复当作“下滑力”</span>
            </div>
            <p class="review-quote">“受力分析只画施力物体施加的真实力，分力绝不能作为独立外力画出！”</p>
            <div class="review-actions">
              <a href="/mistakes/" class="review-btn">靶向做 1 道变式题 (2分钟) →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 高中学霸伴学进度罗盘看板
</script>

<style scoped>
.learning-dashboard-container {
  margin: 1.5rem 0 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* 顶部状态横幅 */
.dashboard-banner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.1rem 1.5rem;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(56, 189, 248, 0.04));
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.banner-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.banner-icon {
  font-size: 1.6rem;
}

.banner-info {
  display: flex;
  flex-direction: column;
}

.banner-label {
  font-size: 0.775rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.banner-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.banner-value small {
  font-size: 0.775rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.banner-value.highlight {
  color: #0284c7;
}

.banner-divider {
  width: 1px;
  height: 36px;
  background: var(--vp-c-divider);
}

/* 栅格 */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 860px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .dashboard-banner {
    flex-wrap: wrap;
    gap: 1rem;
  }
  .banner-divider {
    display: none;
  }
}

.dashboard-card {
  padding: 1.25rem 1.4rem;
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.1rem;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.card-subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

/* 学科进度条列表 */
.subject-progress-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.subject-item {
  padding: 0.9rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.subject-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subject-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.badge {
  font-size: 0.725rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
}

.badge.physics { background: rgba(2, 132, 199, 0.15); color: #0284c7; }
.badge.chemistry { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.badge.math { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; }

.subject-stat {
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
}

.subject-stat .rate {
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.progress-track {
  height: 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.physics-bar { background: linear-gradient(90deg, #0284c7, #38bdf8); }
.chemistry-bar { background: linear-gradient(90deg, #10b981, #34d399); }
.math-bar { background: linear-gradient(90deg, #8b5cf6, #c084fc); }

.subject-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.775rem;
}

.recent-lesson {
  color: var(--vp-c-text-2);
}

.continue-btn {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  transition: all 0.15s;
}

.continue-btn:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.pending-tag {
  color: var(--vp-c-text-3);
  font-style: italic;
}

/* 右栏 */
.dashboard-right-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.score-overall {
  font-size: 0.8rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  padding: 0.15rem 0.55rem;
  border-radius: 12px;
}

.ability-bars {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ability-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ability-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.ability-info b {
  color: var(--vp-c-text-1);
}

.ability-track {
  height: 6px;
  border-radius: 3px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.ability-fill {
  height: 100%;
  border-radius: 3px;
}

.fill-1 { background: #38bdf8; }
.fill-2 { background: #10b981; }
.fill-3 { background: #f59e0b; }
.fill-4 { background: #8b5cf6; }

/* 错题复盘 */
.review-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
}

.review-box {
  padding: 0.85rem;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px dashed #ef4444;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-target {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.825rem;
}

.err-tag {
  color: #ef4444;
  font-weight: 700;
  white-space: nowrap;
}

.err-text {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.review-quote {
  font-size: 0.775rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  margin: 0;
  line-height: 1.4;
}

.review-actions {
  display: flex;
  justify-content: flex-end;
}

.review-btn {
  font-size: 0.775rem;
  font-weight: 600;
  color: #ef4444;
  text-decoration: none;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: rgba(239, 68, 68, 0.08);
}

.review-btn:hover {
  background: #ef4444;
  color: #fff;
}
</style>
