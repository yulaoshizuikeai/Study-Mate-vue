---
description: 查看当前科目的知识图谱路线图与掌握进度。用法: /roadmap [科目]
---

你现在正在执行 StudyMate-HighSchool 的 `/roadmap` 指令。
用户输入参数: `$ARGUMENTS`

请执行路线图展示流程：
1. 读取该学科的 `curriculum.yaml` 与 `progress.yaml`。
2. 总结当前科目的知识树结构、各节点掌握度百分比与当前正在学的考点。
3. 运行 `py -3 scripts/gen_home.py` 确保 Web 路线图为最新状态。
4. 提供本地 Web 知识库的绝对路径与访问链接，方便学生直接在浏览器查看。
