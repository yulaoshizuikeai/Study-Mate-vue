---
title: 规范受力分析
goal: 掌握隔离法与受力画图原则，规范画出斜面滑块矢量图，不漏力、不多力。
---

## 真实情景与问题引入

一辆重卡停在倾斜的盘山公路上，司机拉起手刹后车辆保持静止。直觉上，重卡之所以没有顺着斜坡滑下去，是因为路面给它施加了一个向上的托力与摩擦力。

但在物理学中，要计算卡车轮胎与地面之间的最大安全倾角，或者求解滑块沿斜面下滑的加速度，第一步永远是**画出规范的受力分析图**。高考阅卷统计表明，力学大题失分超过 60% 的根源不是后面的代数计算，而是在一开始受力分析时出现了**漏力**、**多力**或**正压力方向判断错误**。

本节我们将学习高中物理最核心的基本功：如何对研究对象进行规范受力分析。

## 隔离法与一重二弹三摩

受力分析的黄金法则是**一重、二弹、三摩擦、四外力**，并严格遵守**隔离法**。

1. **确定研究对象（隔离体）**：用假想的闭合虚线把所要研究的物体从周围环境中剥离出来，只分析周围物体对它的作用力，绝不画它对外界施加的力。
2. **第一步·重力**：一切地面附近的物体均受重力 $G = mg$，方向严格**竖直向下**（垂直于水平面，而不是垂直于接触面）。
3. **第二步·弹力/支持力**：检查接触面。只要有挤压形变，就必定存在支持力 $F_N$。方向严格**垂直于接触面并指向受力物体**。
4. **第三步·摩擦力**：检查接触面是否粗糙且存在相对运动或相对运动趋势。
  - 若相对静止，存在静摩擦力 $f_静$，方向与相对运动趋势相反；
  - 若发生滑动，存在滑动摩擦力 $f_动 = \mu F_N$，方向与相对运动方向相反。
5. **第四步·外加力或场力**：检查是否存在外力推力 $F$、电场力 $qE$ 或洛伦兹力 $qvB$。

## 规范受力矢量图解

我们以经典物理模型「放置在粗糙斜面上的滑块」为例。

::: svg
<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" style="max-width:100%; height:auto;">
  <defs>
    <marker id="arrow-force" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
    </marker>
  </defs>
  <!-- 斜面体 -->
  <polygon points="100,260 480,260 480,70" fill="rgba(148, 163, 184, 0.12)" stroke="#64748b" stroke-width="2"/>
  <!-- 倾角 θ 标注 -->
  <path d="M 160,260 A 60 60 0 0 0 151,232" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="172" y="252" fill="#94a3b8" font-size="14" font-family="serif">θ</text>
  <!-- 水平地面与阴影剖面线 -->
  <line x1="70" y1="260" x2="520" y2="260" stroke="#64748b" stroke-width="2"/>
  <!-- 斜面滑块 (x=310, y=155, 倾角 26.5度) -->
  <g transform="translate(310,155) rotate(-26.56)">
    <rect x="-35" y="-30" width="70" height="30" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
    <circle cx="0" cy="-15" r="3.5" fill="#ef4444"/>
    <!-- 支持力 F_N (垂直斜面向上) -->
    <line x1="0" y1="-15" x2="0" y2="-85" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrow-force)"/>
    <text x="8" y="-72" fill="#ef4444" font-size="15" font-weight="bold">F_N</text>
    <!-- 静摩擦力 f (沿斜面向上) -->
    <line x1="0" y1="-15" x2="-70" y2="-15" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrow-force)"/>
    <text x="-75" y="-23" fill="#ef4444" font-size="15" font-weight="bold">f_静</text>
  </g>
  <!-- 重力 G (竖直向下，非旋转坐标系) -->
  <g transform="translate(310, 155)">
    <line x1="0" y1="-15" x2="0" y2="80" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrow-force)"/>
    <text x="8" y="70" fill="#ef4444" font-size="15" font-weight="bold">G = mg</text>
    <!-- 重力分解辅助虚线: Gx 和 Gy -->
    <line x1="0" y1="-15" x2="-40" y2="5" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
    <line x1="0" y1="-15" x2="40" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
  </g>
</svg>
:::

## 正交分解与列式规范

在倾角为 $\theta$ 的斜面上，建立直角坐标系的最佳原则是：**沿斜面方向为 x 轴，垂直斜面方向为 y 轴**。

将竖直向下的重力 $G$ 正交分解：
- 沿斜面向下的分力：$G_x = mg \sin\theta$
- 垂直斜面向下的分力：$G_y = mg \cos\theta$

在垂直斜面方向，由于物块没有离开斜面，合力为零：
$$F_N = mg \cos\theta$$

在沿斜面方向：
- 若物块静止，由共点力平衡可知：$f_静 = mg \sin\theta$
- 若物块加速下滑，由牛顿第二定律可知：$mg \sin\theta - f_动 = ma$

::: tip 二级结论：斜面静止临界角
若斜面与滑块间的静摩擦因数为 $\mu$，当倾角 $\theta$ 缓慢增大时，滑块恰好要开始下滑的临界状态满足：
$$\mu mg \cos\theta = mg \sin\theta \implies \tan\theta = \mu$$
即临界角 $\theta = \arctan\mu$。无论物体质量多大，只要 $\tan\theta \le \mu$，物体放在斜面上必保持静止！
:::

::: warn 易错警示：下滑力陷阱
**考场死穴**：很多考生在做受力分析时，顺着感觉画上一个“沿斜面向下的力 $F_{下滑}$”，导致物体多受了一个力。
切记：任何力都必须找得到具体的**施力物体**。重力的施力物体是地球，支持力与摩擦力的施力物体是斜面。所谓“下滑力”，本质就是重力沿斜面的分力 $mg \sin\theta$，绝不是额外存在的力！
:::

## 随堂巩固与自测

::: quiz 概念理解 锚点：斜面滑块受力辨析
:::
