# StudyMate-HighSchool (高中学霸版)

<p align="center">
  <b>你的 AI 高中学霸伴学助手：规划考纲、透彻讲法、矢量图解、母题踩分、错因归因</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v1.0-1c5a40" alt="版本 v1.0">
  <img src="https://img.shields.io/badge/Google-Antigravity-4285F4" alt="Antigravity">
  <img src="https://img.shields.io/badge/OpenCode-Supported-green" alt="OpenCode">
  <img src="https://img.shields.io/badge/DSH-Preset-1c5a40" alt="DSH">
  <img src="https://img.shields.io/badge/python-3.9%2B-3776ab" alt="Python">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

---

## 🌟 为什么做高中版？

原版 [StudyMate](https://github.com/Miaotofu01/Study-Mate) 专为大学与编程自学（高等数学、线性代数、C++、API实操）设计，核心是“写代码跑自动化测试”。然而**高中学段（特别是高考物理、数学、化学等理科）的学习逻辑完全不同**：

| 学习维度 | 原版 (大学/编程版) | StudyMate-HighSchool (高中学霸版) |
| :--- | :--- | :--- |
| **学科侧重** | 编程语言、全栈开发、高数线代 | **高考物理、高中数学、高中化学、生物等全科** |
| **课型体系** | 概念课 / 实操课 (写代码) / 实验课 (项目验收) | **概念基石课** / **经典模型课** / **典型母题课** / **实验探究课** |
| **可视化图解** | 网页图片抓取（理科图经常图不对题或断链） | **精准标准矢量图 (`svg-diagrammer`)**：自研规范受力分析、轨迹、场线、光路矢量图 |
| **公式排版** | 纯文本 / 简陋符号 | **KaTeX 极速公式渲染**：居中大定理与行内物理量教科书级排版 |
| **评估机制** | 运行单元测试跑绿 | **高考大题分步踩分自测** + **四大认知错因归因（审题/概念/模型/计算）** |
| **智能体生态** | 仅绑定 DSH 终端 | **原生支持 Google Antigravity + OpenCode + DSH 三重全平台** |

---

## 🚀 极速上手

### 方式一：在 Google Antigravity 中使用（强烈推荐）

当前界面就是 Antigravity！只需在本项目根目录下运行一键注册脚本：

```powershell
powershell -ExecutionPolicy Bypass -File .\install-antigravity.ps1
```
*(macOS / Linux: `./install-antigravity.sh`)*

**开启学习**：
安装完成后，在 Antigravity 聊天框中直接输入任意你想学的课题即可：
> *“我想学高考物理牛顿第二定律”*
> *“考考我带电粒子在匀强磁场中的圆周偏转”*
> *“复盘一下我昨天的物理错题本”*

💡 **Antigravity 独家体验**：
生成的课件、知识路线图和高清受力分析 SVG 图，会**直接在 Antigravity 右侧 Artifacts（画板）并排实时渲染**，一边聊一边学，体验极其丝滑！

---

### 方式二：在 OpenCode 终端中使用

在项目根目录下一键安装到 OpenCode：

```powershell
powershell -ExecutionPolicy Bypass -File .\install-opencode.ps1
```
*(macOS / Linux: `./install-opencode.sh`)*

**在 OpenCode 中开箱即用的快捷指令**：
- `/study [科目] [考点]`：开启新考点系统性自学（如 `/study 高中物理 动力学两类问题`）
- `/quiz [考点]`：现场生成一道高考母题变式并按踩分点评分
- `/mistakes`：查看错题本并进行靶向变式训练
- `/roadmap`：调阅学科分层依赖知识路线图

---

### 方式三：在 DSH (DeepSeek Harness) 中使用

完全保留原版兼容性，原生支持 `dsh web`：

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
dsh web
```

---

## 🌐 浏览离线 Web 知识库与路线图

无论你使用哪种 Agent 伴学，所有大纲路线图和交互课件都会持久化保存为精美的离线 HTML。随时在项目根目录运行：

```bash
npm run serve
```
*(或者 `py -3 scripts/serve.py`)*

浏览器将自动弹出，带你浏览：
1. **课程总览大厅 (`index.html`)**：透明看板娘、多学科卡片、学习进度罗盘。
2. **学科路线图 (`subject/index.html`)**：分层依赖知识图谱、节点状态动态着色（未开始/学习中/能独立应用/需复习）、点击节点原地展开课件卡片。
3. **互动课件 (`lesson.html`)**：侧边目录 TOC、深浅护眼主题切换、高清 SVG 受力矢量图解、内嵌即时判分选择题与高考大题踩分展开卡。

---

## 📁 项目目录结构

```text
StudyMate-HighSchool/
├── skills/                       # 12 大标准化核心技能 (标准 SKILL.md)
│   ├── learning-system/          # 高中自学系统总控引擎
│   ├── curriculum-designer/      # 高中新课标知识图谱与依赖树架构师
│   ├── lesson-design/            # 高中名师精讲课件设计（含二级结论与避坑警示）
│   ├── svg-diagrammer/           # 高中理科标准矢量图解生成器 (SVG)
│   ├── practice-evaluator/       # 高考母题与大题步骤踩分评估器
│   ├── record-keeping/           # 学情档案与错题漏洞追踪管家
│   ├── evidence-check/           # 数理逻辑严谨性核验
│   └── ...
├── .agents/                      # Google Antigravity 工作区与规则集成
│   ├── rules/
│   │   ├── pedagogy-standards.md # 名师教学与踩分标准规范
│   │   ├── svg-diagrams.md       # 矢量物理图解设计规范
│   │   └── error-taxonomy.md     # 四大认知错因归因体系
│   └── skills/                   # Antigravity 技能链接
├── .opencode/                    # OpenCode 工作区与指令集成
│   ├── commands/                 # /study, /quiz, /mistakes, /roadmap
│   └── skills/
├── templates/                    # 高中学霸课件样式与基础模版 (Sayo UI + KaTeX)
│   ├── home-index.html           # 课程总览主页模板 (看板娘 + 进度条)
│   ├── subject-index.html        # 知识路线图主页模板
│   ├── lesson.html               # 互动式课件模板
│   └── assets/                   # 极简护眼主题、Quiz交互与图标库
├── scripts/                      # 核心脚本
│   ├── render_lesson.py          # 课件渲染器 (Markdown + Quiz -> 交互HTML)
│   ├── gen_home.py               # 主页与大纲知识图谱渲染器
│   └── serve.py                  # 本地极速 Web 预览服务
├── workspace/                    # 你的自学工作区 (学习数据集中营，完全独立)
│   ├── index.html                # 根主页
│   └── .learning/
│       ├── MEMORY.md             # 跨学科共享记忆
│       └── subjects/             # 各学科目录
├── install-antigravity.ps1        # Antigravity 一键安装脚本
├── install-opencode.ps1           # OpenCode 一键安装脚本
├── install.ps1                   # DSH 一键安装脚本
└── package.json
```

---

## 📄 开源许可

本项目遵循 [MIT License](LICENSE)。
部分前端组件与图标来源于 Sayo UI (MIT License)。
