---
description: 开启或继续学习一门高中科目（如物理、数学、化学）。用法: /study [科目名] [章节或考点]
---

你现在正在执行 StudyMate-HighSchool 的 `/study` 指令。
用户输入参数: `$ARGUMENTS`

请按以下步骤执行高中伴学流程：
1. 读取 `learning-system` 技能与 `record-keeping`。
2. 检查用户的 `MEMORY.md` 与当前学科目录（默认为高考物理/数学/化学）。
3. 如果是新科目或新考点，询问学生的当前理解基础与目标层次（基础梳理 / 模型进阶 / 冲刺压轴）。
4. 调度 `curriculum-designer` 生成或定位大纲节点。
5. 调度 `lesson-design` 与 `svg-diagrammer` 输出包含生活现象、模型抽象、矢量 SVG 图解与公式推导的精讲内容。
6. 提示学生阅读并准备随堂母题测验。
