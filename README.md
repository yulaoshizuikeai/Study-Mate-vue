# StudyMate-HighSchool

This project is only for personal use.

这项目最初是从原版 [StudyMate](https://github.com/Miaotofu01/Study-Mate) 改造过来的。


原版主要是给大学自学计算机、写代码跑单元测试用的。但我自己是个高二理科生，拿它来自学高中物理、数学、化学的时候，发现逻辑完全对不上——高中理科哪有那么多代码要跑？高中生平时学理科，核心需求其实就这几样：
1. **看直观图景**：受力分析、运动轨迹、电磁场线、几何模型，图看不清或者图不对题，推导就全白费；
2. **拆解典型模型**：板块模型、传送带、电磁感应双棒、导数切线、离子平衡等高考高频母题套路；
3. **按高考踩分点自测**：大题写了一大堆，到底哪几步给分、哪几步是废话、扣分点在哪；
4. **真实错因复盘**：到底是因为审题看漏条件（比如“光滑”、“恰好”）、概念记混、模型套错，还是单纯计算算错了。

所以趁着这几天，我把原来的架构彻底重构了一遍，去掉了所有无关的古早代码，做成了一个真正适合高中自学的极简伴学系统。

---

## 做了哪些改动

### 1. 彻底干掉旧版 Python HTML 拼接，换成 VitePress + Vue 3
- 原先是用 Python 正则去硬拼一堆静态 HTML 模版，维护起来很痛苦，排版还经常崩。
- 现在直接换成了 **VitePress + Vue 3 交互组件**：
  - 本地跑起来毫秒级热更新，打开 `http://localhost:5173` 就是一个干净纯粹的学习站；
  - 数学物理公式全用 KaTeX 原生渲染，不用再忍受公式乱码或排版错位；
  - 做了个模仿 Bento 风格的简洁总览看板（`<StudyMateDashboard>`），实时汇总我的高二学情画像、当前正在进行的知识点、前置依赖卡片和艾宾浩斯复盘雷达，拒绝花里胡哨的营销词和一堆莫名其妙的 emoji。

### 2. 拒绝找网图，全部现场生成标准矢量图 (`SVG`)
高中理科最怕抓网上的图，要么搜出来的图不对题，要么糊得看不清坐标轴。
现在所有受力分析、光路图、运动轨迹，全由智能体严格按照高中物理几何规范生成标准矢量 SVG 代码。配合自定义的 `<SvgViewer>` 组件，支持防塌陷渲染、点击放大和全屏查看细节。

### 3. 高考大题分步踩分自测与四大错因归因
- **选择题 (`<QuizCard>`)**：做完即时对答案，关键是做错之后能直接勾选你的错因类别：
  - `[审题遗漏]`：漏看关键条件（如轻绳、光滑、恰好、不计重力）；
  - `[概念混淆]`：定理定律适用前提搞混；
  - `[模型套错]`：生搬硬套不符合条件的二级结论；
  - `[计算失误]`：正负号搞反、算错数、漏写单位。
  - 这些错题会自动沉淀到本地 `misconceptions.yaml` 里，后续复盘时按遗忘曲线重新抓出来练。
- **大题踩分卡 (`<StepScoreCard>`)**：还原高考阅卷评分细则，把解答过程拆成具体步骤分，自己逐项勾选采分点，算真实得分率并标出避坑注意点。

---

## 怎么跑起来

### 环境要求
- Node.js (v18+)
- Python (3.9+)

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地伴学页面
```bash
npm run dev
```
打开 `http://localhost:5173` 就能看到学习大厅和所有学科课件。

平时学完新内容、或者让 AI 生成了新课件和大纲后，如果页面没刷新，跑一下这个同步命令就行：
```bash
npm run sync
```

想要打出完整的离线静态 HTML：
```bash
npm run build
```

---

## 怎么搭配智能体学习

本项目原生适配了主流的 AI Agent 环境（Google Antigravity、OpenCode、DSH 等）：

### 在 Google Antigravity 中使用（推荐）
在当前根目录下运行：
```powershell
powershell -ExecutionPolicy Bypass -File .\install-antigravity.ps1
```
然后在聊天框里直接用平时打字的口吻跟它交流就行，比如：
- *“我想学高考物理牛顿运动定律中的滑块木板模型”*
- *“帮我推导一下倾角为 $\theta$ 的斜面受力分析，画个受力图”*
- *“考我一道化学水溶液离子浓度大小排序的典型母题，出完按踩分点评分”*
- *“看下我昨天的错题本，帮我挑两道容易模型套错的变式题练练”*

生成的课件与图解会在右侧实时渲染，同时自动同步进本地 VitePress 站点。

### 在 OpenCode 中使用
```powershell
powershell -ExecutionPolicy Bypass -File .\install-opencode.ps1
```
支持的快捷指令：
- `/study [科目] [考点]`：开启一个新考点的系统性学习
- `/quiz [考点]`：生成一道高考母题变式与踩分测试
- `/mistakes`：查看错题本并进行针对性复盘
- `/roadmap`：查看当前学科的知识点依赖路线图

---

## 目录结构速览

```text
StudyMate-HighSchool/
├── site/                     # VitePress 伴学网站源码
│   ├── .vitepress/           # 站点配置、主题与 Vue 交互组件
│   │   ├── config.mts
│   │   └── theme/
│   │       ├── components/   # QuizCard、StepScoreCard、SvgViewer、StudyMateDashboard
│   │       └── index.ts
│   ├── subjects/             # 各学科同步后的文档与课件
│   └── index.md              # 首页看板
├── workspace/                # 个人学习工作区（数据完全归你本地所有）
│   └── .learning/
│       ├── profile.yaml      # 个人学情档案（年级、考区、薄弱点）
│       ├── MEMORY.md         # 学习习惯与跨学科记忆
│       └── subjects/         # 学科知识大纲 (curriculum.yaml)、题库与错题记录
├── .agents/                  # Google Antigravity 智能体规则与技能配置
├── skills/                   # 各智能体专业技能定义
├── scripts/                  # 轻量辅助脚本
│   ├── sync_to_vitepress.py  # 大纲/课件/题库同步到 VitePress 的数据桥梁
│   ├── check_curriculum.py   # 大纲依赖 DAG 无环性校验
│   └── spaced_review.py      # 艾宾浩斯复盘算法
├── install-antigravity.ps1   # Antigravity 注册脚本
├── install-opencode.ps1      # OpenCode 注册脚本
└── package.json
```

---

## License

MIT License.
