---
title: 水的电离平衡与离子积常数Kw
goal: 掌握水的微弱电离过程，深刻理解离子积常数Kw的定义与温度唯一决定性，建立微观自偶电离图景。
---

## 真实情景与问题引入

在日常生活中，我们常说“纯水不导电”。但精密电导实验表明，哪怕是经过数十次蒸馏去除一切杂质离子的“超纯水”，依然存在极其微弱但可测量的导电能力。

这说明纯水中必定存在自由移动的带电离子！这些离子从何而来？水分子之间究竟发生了什么反应？

本节课我们将从微观碰撞出发，揭开水分子自偶电离的神秘面纱，推导高中水溶液化学最核心的平衡常数——**水的离子积常数 $K_w$**。

## 水分子的微观自偶电离

水是一种极弱的电解质。在水液体内部，两个水分子相互碰撞时，一个水分子中的氢氧键发生异裂，脱落下一个质子（$H^+$），该质子立即与另一个水分子氧原子上的孤对电子结合，生成水合氢离子（$H_3O^+$）和氢氧根离子（$OH^-$）：

$$2H_2O \rightleftharpoons H_3O^+ + OH^- \quad \Delta H > 0$$

为书写简便，通常简写为：
$$H_2O \rightleftharpoons H^+ + OH^- \quad \Delta H > 0$$

<SvgViewer>
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" style="max-width:100%; height:auto;">
  <defs>
    <marker id="chem-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
    </marker>
  </defs>

  <!-- 左侧：2个 H2O 分子 -->
  <g transform="translate(60, 50)">
    <circle cx="45" cy="45" r="28" fill="#ef4444" opacity="0.85"/>
    <text x="45" y="52" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">O</text>
    <circle cx="20" cy="22" r="16" fill="#38bdf8"/>
    <text x="20" y="27" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">H</text>
    <circle cx="70" cy="22" r="16" fill="#38bdf8"/>
    <text x="70" y="27" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">H</text>
    <text x="45" y="105" fill="#94a3b8" font-size="14" text-anchor="middle">H₂O 分子</text>
  </g>

  <g transform="translate(170, 50)">
    <circle cx="45" cy="45" r="28" fill="#ef4444" opacity="0.85"/>
    <text x="45" y="52" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">O</text>
    <circle cx="20" cy="22" r="16" fill="#38bdf8"/>
    <text x="20" y="27" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">H</text>
    <circle cx="70" cy="22" r="16" fill="#38bdf8"/>
    <text x="70" y="27" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">H</text>
    <text x="45" y="105" fill="#94a3b8" font-size="14" text-anchor="middle">H₂O 分子</text>
  </g>

  <!-- 中间质子转移与可逆双箭头 -->
  <g transform="translate(290, 85)">
    <line x1="0" y1="-8" x2="45" y2="-8" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#chem-arrow)"/>
    <line x1="45" y1="8" x2="0" y2="8" stroke="#94a3b8" stroke-width="2.5" marker-end="url(#chem-arrow)"/>
    <text x="22" y="-18" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">质子转移 H⁺</text>
    <text x="22" y="32" fill="#f59e0b" font-size="12" text-anchor="middle">ΔH &gt; 0 吸热</text>
  </g>

  <!-- 右侧：H3O+ 与 OH- 离子 -->
  <g transform="translate(370, 50)">
    <circle cx="45" cy="45" r="28" fill="#ef4444" opacity="0.85"/>
    <text x="45" y="52" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">O</text>
    <circle cx="16" cy="24" r="15" fill="#38bdf8"/>
    <text x="16" y="29" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">H</text>
    <circle cx="74" cy="24" r="15" fill="#38bdf8"/>
    <text x="74" y="29" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">H</text>
    <circle cx="45" cy="6" r="15" fill="#38bdf8"/>
    <text x="45" y="11" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">H</text>
    <text x="45" y="105" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">H₃O⁺ (水合氢离子)</text>
  </g>

  <g transform="translate(490, 50)">
    <circle cx="45" cy="45" r="28" fill="#ef4444" opacity="0.85"/>
    <text x="45" y="52" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">O</text>
    <circle cx="20" cy="24" r="15" fill="#38bdf8"/>
    <text x="20" y="29" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">H</text>
    <text x="45" y="105" fill="#ef4444" font-size="14" font-weight="bold" text-anchor="middle">OH⁻ (氢氧根离子)</text>
  </g>
</svg>
</SvgViewer>

## 水的离子积常数 $K_w$

在稀水溶液中，发生电离的水分子极少，$c(H_2O)$ 几乎保持不变（约 $55.6\text{ mol/L}$），视为常数。

我们将电离平衡常数与水浓度合并，定义为**水的离子积常数**（用 $K_w$ 表示）：
$$K_w = c(H^+) \cdot c(OH^-)$$

### 1. $K_w$ 的温度依赖性（勒夏特列原理的体现）
水的电离过程是**吸热过程**（$\Delta H > 0$）。
根据勒夏特列原理：
- **升高温度**：平衡向吸热方向（正反应方向）移动，$c(H^+)$ 与 $c(OH^-)$ 均增大，因此 **$K_w$ 显著增大**！
- **降低温度**：平衡向放热方向（逆反应方向）移动，$K_w$ 减小。

| 实验温度 | $K_w$ 实测值 | 纯水中 $c(H^+)$ 与 $c(OH^-)$ | 纯水 $pH$ |
| :--- | :--- | :--- | :--- |
| **$0^\circ\text{C}$** | $1.14 \times 10^{-15}$ | $3.38 \times 10^{-8}\text{ mol/L}$ | 7.47 |
| **$25^\circ\text{C}$ (常温)** | **$1.0 \times 10^{-14}$** | **$1.0 \times 10^{-7}\text{ mol/L}$** | **7.00** |
| **$100^\circ\text{C}$ (沸水)** | **$1.0 \times 10^{-12}$** | **$1.0 \times 10^{-6}\text{ mol/L}$** | **6.00** |

::: tip 避坑警示：$K_w$ 只与温度有关
无论溶液是酸性（如 $0.1\text{ mol/L HCl}$）、碱性（如 $0.1\text{ mol/L NaOH}$）还是盐溶液，**只要温度不变，$K_w$ 就恒定不变**！
酸碱的加入只会使 $c(H^+)$ 与 $c(OH^-)$ 一个增大一个减小，二者的乘积在同温下恒等于 $K_w$。
:::

## 破除定势：到底什么是“溶液的中性”？

日常生活中很多人认为“$pH = 7$ 就是中性”，在高考化学中，这是最致命的思维定势！

- 溶液呈中性的本质标准：$c(H^+) = c(OH^-)$
- 典型对照验证：
  - 常温 25℃ 纯水：$c(H^+) = c(OH^-) = 1.0 \times 10^{-7}\text{ mol/L} \implies pH = 7$（显中性）。
  - 沸水 100℃ 纯水：$c(H^+) = c(OH^-) = 1.0 \times 10^{-6}\text{ mol/L} \implies pH = 6$（依然是纯中性）。
  - 若在 100℃ 测得某溶液 $pH = 7$，则 $c(H^+) = 1.0 \times 10^{-7}\text{ mol/L}$，而 $c(OH^-) = \frac{10^{-12}}{10^{-7}} = 1.0 \times 10^{-5}\text{ mol/L} > c(H^+)$，该溶液显碱性！

## 随堂巩固与自测


<QuizCard
  id="水的电离与Kw核心辨析-1"
  question="关于纯水的电离平衡 H₂O ⇌ H⁺ + OH⁻（ΔH > 0），下列说法正确的是？"
  :options='["将纯水从 25℃ 加热至 100℃，c(H⁺) 增大，溶液显酸性", "将纯水从 25℃ 加热至 100℃，Kw 增大，但溶液仍呈中性", "向纯水中加入少量稀盐酸，水的电离平衡逆向移动，Kw 减小", "常温下，由水电离出的 c_水(H⁺) 越小，说明溶液的酸性一定越强"]'
  answer="B"
  category="水的电离与Kw核心辨析"
  explanation="水的电离是吸热过程（ΔH > 0），升高温度平衡正向移动，c(H⁺) 与 c(OH⁻) 同等程度增大，Kw 增大；但由于 c(H⁺) 始终等于 c(OH⁻)，因此纯水在任何温度下都呈中性。向水中加入酸，平衡逆向移动，但温度不变 Kw 保持不变；水电离受抑制（c_水(H⁺) 极小）也可能是因为加了强碱。"
/>

<StepScoreCard id="水的电离与Kw核心辨析-2" :criteria='[{"desc": "明确指出该溶液显中性", "points": 2}, {"desc": "正确计算 100℃ 时纯水的 c(H⁺) = c(OH⁻) = 10⁻⁶ mol/L 并得出中性 pH 为 6", "points": 3}, {"desc": "强调判断溶液酸碱性的本质标准是 c(H⁺) 与 c(OH⁻) 的相对大小，而非固守 pH=7", "points": 2}]'>
  <template #question>
【高考经典辨析】100℃ 时水的离子积常数 Kw ≈ 1.0 × 10⁻¹²。若在 100℃ 下测得某稀溶液的 pH = 6，试判断该溶液的酸碱性，并说明判断依据。
  </template>
  <template #solution>
解：
在 100℃ 时，纯水满足 Kw = c(H⁺) · c(OH⁻) = 1.0 × 10⁻¹²。
纯水中 c(H⁺) = c(OH⁻) = √(1.0 × 10⁻¹²) = 1.0 × 10⁻⁶ mol/L，对应的 pH = -lg(1.0 × 10⁻⁶) = 6。
因此，在 100℃ 下，pH = 6 的溶液中 c(H⁺) = c(OH⁻) = 1.0 × 10⁻⁶ mol/L，该溶液显中性（而非酸性）。
  </template>
  <template #pitfall>
【高考踩分要点】
① 明确指出该溶液显中性（得 2 分）；
② 正确计算 100℃ 时纯水的 c(H⁺) = c(OH⁻) = 10⁻⁶ mol/L 并得出中性 pH 为 6（得 3 分）；
③ 强调判断溶液酸碱性的本质标准是 c(H⁺) 与 c(OH⁻) 的相对大小，而非固守 pH=7（得 2 分）。
  </template>
</StepScoreCard>
