---
title: 外界条件对水电离平衡的影响与计算
goal: 掌握温度、酸、碱、盐对水电离平衡移动方向的判定规律，熟练运用“抓少数离子”黄金法则秒杀水电离离子浓度计算。
---

## 真实情景与认知冲突

在上一节课中，我们知道了在常温纯水中：
$$c(H^+) = c(OH^-) = 1.0 \times 10^{-7}\text{ mol/L}$$
这时由水分子自身电离出的 $c_水(H^+)$ 恰好也是 $1.0 \times 10^{-7}\text{ mol/L}$。

现在，如果向纯水中滴入几滴浓盐酸，使溶液中的总氢离子浓度变为 $c_{总}(H^+) = 0.01\text{ mol/L}$：
1. 水分子的电离是被**促进**了，还是被**抑制**了？
2. 溶液中这 $0.01\text{ mol/L}$ 的 $H^+$ 到底来自盐酸还是来自水？
3. 水本身还能电离出多少 $H^+$？

很多同学在做高考选择题时，常常把“溶液里的总离子浓度”与“由水电离出的离子浓度”混为一谈，导致丢分惨重。本节课我们将建立清晰的微观动态图景，彻底攻破这一高考必考难点！

---

## 水电离平衡移动的微观动力学

水的电离是一个极微弱的动态可逆过程：
$$H_2O \rightleftharpoons H^+ + OH^- \quad \Delta H > 0$$

根据**勒夏特列原理**，任何外界条件的改变都会驱使平衡发生移动：

<SvgViewer>
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%; height:auto; font-family:system-ui, -apple-system, sans-serif;">
  <defs>
    <linearGradient id="shiftBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <marker id="arrowRight" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
    </marker>
    <marker id="arrowLeft" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 8 1 L 0 5 L 8 9 z" fill="#f43f5e" />
    </marker>
  </defs>

  <!-- 背景底板板 -->
  <rect x="10" y="10" width="740" height="280" rx="16" fill="url(#shiftBg)" stroke="#334155" stroke-width="2"/>

  <!-- 核心平衡方程式居中显示 -->
  <rect x="230" y="30" width="300" height="50" rx="25" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
  <text x="380" y="62" fill="#f8fafc" font-size="20" font-weight="bold" text-anchor="middle">
    H₂O ⇌ H⁺ + OH⁻  (ΔH &gt; 0)
  </text>

  <!-- 四类外界条件分支卡片 -->
  <!-- 1. 升温 -->
  <g transform="translate(30, 110)">
    <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="80" y="32" fill="#f59e0b" font-size="16" font-weight="bold" text-anchor="middle">🔥 升高温度</text>
    <line x1="20" y1="45" x2="140" y2="45" stroke="#334155" stroke-width="1"/>
    <text x="80" y="70" fill="#f8fafc" font-size="13" text-anchor="middle">移动方向: 正向移动 ➔</text>
    <text x="80" y="95" fill="#38bdf8" font-size="13" text-anchor="middle">Kw: 显著增大 ⬆</text>
    <text x="80" y="120" fill="#4ade80" font-size="13" text-anchor="middle">α(H₂O): 增大 (促进)</text>
    <text x="80" y="142" fill="#94a3b8" font-size="12" text-anchor="middle">中性本质保持不变</text>
  </g>

  <!-- 2. 加酸 (H+) -->
  <g transform="translate(210, 110)">
    <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="80" y="32" fill="#f43f5e" font-size="16" font-weight="bold" text-anchor="middle">🧪 外加酸液 (H⁺)</text>
    <line x1="20" y1="45" x2="140" y2="45" stroke="#334155" stroke-width="1"/>
    <text x="80" y="70" fill="#f8fafc" font-size="13" text-anchor="middle">同离子效应: 逆向 ⬅</text>
    <text x="80" y="95" fill="#94a3b8" font-size="13" text-anchor="middle">Kw: 保持恒定不变</text>
    <text x="80" y="120" fill="#f43f5e" font-size="13" text-anchor="middle">α(H₂O): 显著减小 (抑制)</text>
    <text x="80" y="142" fill="#38bdf8" font-size="12" text-anchor="middle">c水(H⁺) = Kw / c总(H⁺)</text>
  </g>

  <!-- 3. 加碱 (OH-) -->
  <g transform="translate(390, 110)">
    <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#ec4899" stroke-width="1.5"/>
    <text x="80" y="32" fill="#ec4899" font-size="16" font-weight="bold" text-anchor="middle">🧼 外加碱液 (OH⁻)</text>
    <line x1="20" y1="45" x2="140" y2="45" stroke="#334155" stroke-width="1"/>
    <text x="80" y="70" fill="#f8fafc" font-size="13" text-anchor="middle">同离子效应: 逆向 ⬅</text>
    <text x="80" y="95" fill="#94a3b8" font-size="13" text-anchor="middle">Kw: 保持恒定不变</text>
    <text x="80" y="120" fill="#f43f5e" font-size="13" text-anchor="middle">α(H₂O): 显著减小 (抑制)</text>
    <text x="80" y="142" fill="#38bdf8" font-size="12" text-anchor="middle">c水(OH⁻) = Kw / c总(OH⁻)</text>
  </g>

  <!-- 4. 加水解盐 -->
  <g transform="translate(570, 110)">
    <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#4ade80" stroke-width="1.5"/>
    <text x="80" y="32" fill="#4ade80" font-size="16" font-weight="bold" text-anchor="middle">🧂 加水解弱盐</text>
    <line x1="20" y1="45" x2="140" y2="45" stroke="#334155" stroke-width="1"/>
    <text x="80" y="70" fill="#f8fafc" font-size="13" text-anchor="middle">消耗离子: 正向移动 ➔</text>
    <text x="80" y="95" fill="#94a3b8" font-size="13" text-anchor="middle">Kw: 保持恒定不变</text>
    <text x="80" y="120" fill="#4ade80" font-size="13" text-anchor="middle">α(H₂O): 显著增大 (促进)</text>
    <text x="80" y="142" fill="#38bdf8" font-size="12" text-anchor="middle">c水(H⁺) = c总(H⁺) &gt; 10⁻⁷</text>
  </g>
</svg>
</SvgViewer>

---

## 核心铁律：水电离守恒原理

无论外界向水中加入了酸、碱还是盐，只要不发生核反应，每一个电离的水分子必定同时产生一个 $H^+$ 和一个 $OH^-$：

$$\text{核心恒等式：} \quad c_水(H^+) = c_水(OH^-)$$

这个简单的等式，就是我们破解高考所有“水电离离子浓度”计算的终极秘密钥匙！

---

## 高考四大黄金计算模型（考场秒杀口诀）

### 模型一：酸溶液中——“抓少数离子”看水
向水中加入酸（如 $0.01\text{ mol/L HCl}$）：
- 溶液中外来的 $H^+$ 铺天盖地：$c_{总}(H^+) \approx c_{酸}(H^+) = 1.0 \times 10^{-2}\text{ mol/L}$。
- 水电离受到了严重抑制，但水自身产生的 $H^+$ 和 $OH^-$ 依然相等。
- 此时溶液中的 $OH^-$ **没有任何外界来源，只能由水的电离产生**！
- 因此，抓住“少数离子” $OH^-$：
  $$c_水(H^+) = c_水(OH^-) = c_{总}(OH^-) = \frac{K_w}{c_{总}(H^+)} = \frac{1.0 \times 10^{-14}}{1.0 \times 10^{-2}} = 1.0 \times 10^{-12}\text{ mol/L}$$
- **结论**：在酸溶液中，$c_水(H^+) = 10^{-12}\text{ mol/L} \ll 10^{-7}\text{ mol/L}$（电离被抑制了 10 万倍！）。

### 模型二：碱溶液中——“抓少数离子”看水
向水中加入碱（如 $25^\circ\text{C}$ 下 $pH = 12$ 的 $NaOH$ 溶液）：
- 溶液中总的 $c_{总}(H^+) = 1.0 \times 10^{-12}\text{ mol/L}$，外来的 $OH^-$ 占据主导：$c_{总}(OH^-) = 0.01\text{ mol/L}$。
- 此时溶液中微量的 $H^+$ **没有任何外界来源，全部来自水分子电离**！
- 因此，抓住“少数离子” $H^+$：
  $$c_水(OH^-) = c_水(H^+) = c_{总}(H^+) = 1.0 \times 10^{-12}\text{ mol/L}$$

::: tip 考场秒杀口诀
**“酸中找氢氧根，碱中找氢离子，找谁谁就来自水！”**
- 酸溶液中：由水电离出的 $c_水(H^+) = c_{总}(OH^-) = \frac{K_w}{c_{总}(H^+)}$
- 碱溶液中：由水电离出的 $c_水(OH^-) = c_{总}(H^+)$
:::

### 模型三：水解盐溶液中——“水解促电离”
在 $25^\circ\text{C}$ 下，$pH = 5$ 的 $NH_4Cl$ 溶液中：
- 弱碱阳离子 $NH_4^+$ 与水电离产生的 $OH^-$ 结合生成弱电解质一水合氨：
  $$NH_4^+ + H_2O \rightleftharpoons NH_3\cdot H_2O + H^+$$
- 水电离出的 $OH^-$ 不断被掳走消耗，导致水的电离平衡向正反应方向移动（被大大促进！）。
- 留在溶液中的 $H^+$ 完好无损地代表了水总共电离出的数量：
  $$c_水(H^+) = c_{总}(H^+) = 1.0 \times 10^{-5}\text{ mol/L} > 1.0 \times 10^{-7}\text{ mol/L}$$
- 同时被水解结合掉的 $OH^-$ 浓度：$c(NH_3\cdot H_2O) \approx 10^{-5}\text{ mol/L}$。

### 模型四：能与水反应的活泼金属（如 Na）
向水中投入金属钠：$2Na + 2H_2O = 2NaOH + H_2\uparrow$
- 反应直接消耗水电离出的 $H^+$ 生成氢气逸出，促使水的电离平衡急剧右移。
- 这一过程**极大促进**了水的电离！

---

## 四种典型溶液中水的电离程度横向对比表（$25^\circ\text{C}$）

| 溶液类型 | 典型代表 | 溶液中的 $c_{总}(H^+)$ | 由水电离出的 $c_水(H^+)$ | 对水电离平衡的影响 |
| :--- | :--- | :--- | :--- | :--- |
| **纯水** | 纯水 | $10^{-7}\text{ mol/L}$ | **$10^{-7}\text{ mol/L}$** | 基准点 |
| **外加酸** | $0.01\text{ mol/L HCl}$ | $10^{-2}\text{ mol/L}$ | **$10^{-12}\text{ mol/L}$** | 强烈**抑制** |
| **外加碱** | $pH = 12\text{ NaOH}$ | $10^{-12}\text{ mol/L}$ | **$10^{-12}\text{ mol/L}$** | 强烈**抑制** |
| **水解呈酸性盐** | $pH = 5\text{ NH}_4\text{Cl}$ | $10^{-5}\text{ mol/L}$ | **$10^{-5}\text{ mol/L}$** | 显著**促进** |
| **水解呈碱性盐** | $pH = 9\text{ CH}_3\text{COONa}$| $10^{-9}\text{ mol/L}$ | **$10^{-5}\text{ mol/L}$** | 显著**促进** |

::: tip 基础补给包 · 前置概念补给包：多元强酸的氢离子计算
硫酸是二元强酸，完全电离方程式为 $H_2SO_4 = 2H^+ + SO_4^{2-}$。
对于 $0.05\text{ mol/L } H_2SO_4$ 溶液：
- $c_{总}(H^+) = 0.05 \times 2 = 0.1\text{ mol/L} = 10^{-1}\text{ mol/L}$
- 此时 $c_水(H^+) = \frac{10^{-14}}{10^{-1}} = 10^{-13}\text{ mol/L}$，切勿忘记乘以酸的元数！
:::

::: info 压轴拔高 · 高考培优压轴：酸式盐中的水电离博弈
- **$NaHSO_4$（强酸酸式盐）**：在水溶液中完全电离为 $Na^+ + H^+ + SO_4^{2-}$，完全等同于一元强酸，**强烈抑制**水的电离。
- **$NaHCO_3$（弱酸酸式盐）**：$HCO_3^-$ 既存在电离 $HCO_3^- \rightleftharpoons H^+ + CO_3^{2-}$（抑制），又存在水解 $HCO_3^- + H_2O \rightleftharpoons H_2CO_3 + OH^-$（促进）。由于 $HCO_3^-$ 水解程度大于电离程度（常温溶液显碱性），综合效果表现为**促进**水的电离！
:::

---

## 随堂巩固与自测


<QuizCard
  id="外界条件对水电离平衡的影响与计算-1"
  question="常温下（25℃），在 0.05 mol/L 的稀硫酸溶液中，由水电离出的 c_水(H⁺) 为？"
  :options='["0.1 mol/L", "1.0 × 10⁻¹² mol/L", "1.0 × 10⁻¹³ mol/L", "1.0 × 10⁻⁷ mol/L"]'
  answer="C"
  category="外界条件对水电离平衡的影响与计算"
  explanation="0.05 mol/L H₂SO₄ 为二元强酸，溶液中总 c(H⁺) = 0.05 × 2 = 0.1 mol/L = 10⁻¹ mol/L。酸溶液中所有的 OH⁻ 都只能来自于水的电离，因此 c_水(H⁺) = c_水(OH⁻) = c_总(OH⁻) = Kw / c_总(H⁺) = 10⁻¹⁴ / 10⁻¹ = 10⁻¹³ mol/L。"
/>

<StepScoreCard id="外界条件对水电离平衡的影响与计算-2" :criteria='[{"desc": "正确写出 ① 中 c_水(H⁺) = 10⁻¹² mol/L", "points": 2}, {"desc": "正确写出 ② 中 c_水(H⁺) = 10⁻¹² mol/L", "points": 2}, {"desc": "正确写出 ③ 中 c_水(H⁺) = 10⁻⁵ mol/L 并说明水解促进电离", "points": 2}, {"desc": "得出大小关系 ③ > ① = ②，等号漏掉或不等扣 1 分）", "points": 2}]'>
  <template #question>
【高考经典大题采分】常温下，有三种溶液：① pH=2 的盐酸；② pH=12 的 Ba(OH)₂ 溶液；③ pH=5 的 NH₄Cl 溶液。
(1) 试分别写出三种溶液中由水电离出的 c_水(H⁺) 大小；
(2) 比较三种溶液中水的电离程度大小（用序号 ①②③ 与 '>'、'=' 连接）。
  </template>
  <template #solution>
解：
(1) 
① pH=2 的盐酸：c_总(H⁺) = 10⁻² mol/L。由水电离出的 c_水(H⁺) = c_总(OH⁻) = Kw / c_总(H⁺) = 10⁻¹⁴ / 10⁻² = 1.0 × 10⁻¹² mol/L。
② pH=12 的 Ba(OH)₂ 溶液：c_总(H⁺) = 10⁻¹² mol/L。溶液中的 H⁺ 全部由水电离产生，故 c_水(H⁺) = 1.0 × 10⁻¹² mol/L。
③ pH=5 的 NH₄Cl 溶液：NH₄⁺ 水解消耗 OH⁻ 促进水电离，溶液中留存的 H⁺ 均由水电离产生，故 c_水(H⁺) = c_总(H⁺) = 1.0 × 10⁻⁵ mol/L。

(2) 水的电离程度大小关系为：③ > ① = ②。
  </template>
  <template #pitfall>
【高考踩分要点】
① 正确写出 ① 中 c_水(H⁺) = 10⁻¹² mol/L（得 2 分）；
② 正确写出 ② 中 c_水(H⁺) = 10⁻¹² mol/L（得 2 分）；
③ 正确写出 ③ 中 c_水(H⁺) = 10⁻⁵ mol/L 并说明水解促进电离（得 2 分）；
④ 得出大小关系 ③ > ① = ②（得 2 分，等号漏掉或不等扣 1 分）。
  </template>
</StepScoreCard>
