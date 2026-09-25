#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""一键将 workspace/.learning/subjects 课件自动转译并同步至 VitePress 站点。"""

import os
import re
import sys
import json
import yaml

if sys.platform == 'win32':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, 'workspace', '.learning', 'subjects')
SITE_DIR = os.path.join(ROOT, 'site')
SUBJECTS_OUT = os.path.join(SITE_DIR, 'subjects')


def sanitize_filename(name: str) -> str:
    """清理文件名，去除 0001- 前缀等，保留干净的英文/拼音标识"""
    clean = re.sub(r'^\d+-', '', name)
    return clean


def transform_markdown(md_content: str, quiz_data: dict = None) -> str:
    """将原版课件语法转换为 VitePress 增强语法"""
    # 1. 替换 SVG 容器为 SvgViewer 组件
    def replace_svg(match):
        svg_code = match.group(1).strip()
        return f'<SvgViewer>\n{svg_code}\n</SvgViewer>'

    text = re.sub(r':::\s*svg\s*\n(.*?)\n:::', replace_svg, md_content, flags=re.DOTALL)

    # 2. 替换 ::: tip / ::: warn 为 VitePress 规范容器
    text = re.sub(r':::\s*warn\b', '::: warning', text)
    text = re.sub(r':::\s*scaffold\s+base\b', '::: tip 基础补给包 ·', text)
    text = re.sub(r':::\s*scaffold\s+advance\b', '::: info 压轴拔高 ·', text)

    # 3. 替换 ::: quiz 占位符
    if quiz_data:
        quiz_blocks = []
        for anchor, questions in quiz_data.items():
            for item in questions:
                # 选择题
                if 'opts' in item:
                    q = item.get('q', '').replace('"', '&quot;')
                    opts_json = json.dumps(item.get('opts', []), ensure_ascii=False)
                    ans_idx = item.get('ans', 0)
                    ans_letter = ['A', 'B', 'C', 'D', 'E'][ans_idx] if isinstance(ans_idx, int) and ans_idx < 5 else 'A'
                    why = item.get('why', '').replace('"', '&quot;')
                    quiz_blocks.append(f"""
<QuizCard
  question="{q}"
  :options='{opts_json}'
  answer="{ans_letter}"
  category="{anchor}"
  explanation="{why}"
/>
""")
                # 高考大题分步踩分自测
                elif 'criteria' in item:
                    q = item.get('q', '')
                    ans = item.get('answer', '')
                    crit = item.get('criteria', '')
                    quiz_blocks.append(f"""
<StepScoreCard>
  <template #question>
{q}
  </template>
  <template #solution>
{ans}
  </template>
  <template #pitfall>
{crit}
  </template>
</StepScoreCard>
""")

        replacement = "\n".join(quiz_blocks)
        text = re.sub(r':::\s*quiz\s*.*?\n:::', replacement, text)

    return text


def sync():
    if not os.path.exists(SRC_DIR):
        print(f"源目录不存在: {SRC_DIR}")
        return

    os.makedirs(SUBJECTS_OUT, exist_ok=True)
    all_subjects = []

    for sub_id in os.listdir(SRC_DIR):
        sub_path = os.path.join(SRC_DIR, sub_id)
        if not os.path.isdir(sub_path):
            continue

        subj_yaml_path = os.path.join(sub_path, 'subject.yaml')
        subj_name = sub_id
        if os.path.exists(subj_yaml_path):
            with open(subj_yaml_path, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f) or {}
                subj_name = data.get('name', sub_id)

        lessons_dir = os.path.join(sub_path, 'lessons')
        dest_subj_dir = os.path.join(SUBJECTS_OUT, sub_id)
        dest_lessons_dir = os.path.join(dest_subj_dir, 'lessons')
        os.makedirs(dest_lessons_dir, exist_ok=True)

        lesson_items = []

        if os.path.exists(lessons_dir):
            for fname in os.listdir(lessons_dir):
                if fname.endswith('.md'):
                    src_md = os.path.join(lessons_dir, fname)
                    base_name = fname[:-3]
                    src_quiz = os.path.join(lessons_dir, f"{base_name}.quiz.json")

                    quiz_data = None
                    if os.path.exists(src_quiz):
                        with open(src_quiz, 'r', encoding='utf-8') as qf:
                            quiz_data = json.load(qf)

                    with open(src_md, 'r', encoding='utf-8') as mf:
                        content = mf.read()

                    # 提取 title
                    title_match = re.search(r'^title:\s*(.+)$', content, flags=re.MULTILINE)
                    title = title_match.group(1).strip() if title_match else base_name

                    transformed = transform_markdown(content, quiz_data)
                    target_fname = f"{sanitize_filename(base_name)}.md"
                    target_path = os.path.join(dest_lessons_dir, target_fname)

                    with open(target_path, 'w', encoding='utf-8') as out_f:
                        out_f.write(transformed)

                    doc_link = f"/subjects/{sub_id}/lessons/{sanitize_filename(base_name)}"
                    lesson_items.append({'text': title, 'link': doc_link})

        # 读取 curriculum.yaml 完整学习节点
        curriculum_yaml_path = os.path.join(sub_path, 'curriculum.yaml')
        curriculum_nodes = []
        if os.path.exists(curriculum_yaml_path):
            with open(curriculum_yaml_path, 'r', encoding='utf-8') as cf:
                curriculum_data = yaml.safe_load(cf) or {}
                curriculum_nodes = curriculum_data.get('nodes', [])

        # 构建完整的知识节点卡片
        nodes_md_blocks = []
        for idx, n in enumerate(curriculum_nodes):
            nid = n.get('id', '')
            ntitle = n.get('title', nid)
            nkind = n.get('kind', '概念')
            nobj = n.get('objective', '')
            nprob = n.get('problem', '')
            nstatus = n.get('status', '未开始')
            nmastery = int(float(n.get('mastery', 0)) * 100)
            nprereqs = n.get('prerequisites', [])
            prereq_str = ", ".join(nprereqs) if nprereqs else "无"

            # 匹配课件链接
            matched_lesson = None
            for item in lesson_items:
                if nid in item['link'] or sanitize_filename(nid) in item['link']:
                    matched_lesson = item
                    break

            action_link = f"[👉 进入微课学习]({matched_lesson['link']})" if matched_lesson else "_待解锁课件_"

            nodes_md_blocks.append(f"""
### 0{idx+1} · {ntitle}

<div class="highschool-node-card">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
    <div>
      <span class="custom-block-tag" style="background:var(--vp-c-brand-soft); color:var(--vp-c-brand-1); padding:0.15rem 0.5rem; border-radius:4px; font-weight:700; font-size:0.75rem;">{nkind}</span>
      <span style="font-size:0.8rem; color:var(--vp-c-text-2); margin-left:0.5rem;">状态：<b>{nstatus}</b></span>
    </div>
    <div style="font-size:0.8rem; color:var(--vp-c-text-2);">掌握度 <b>{nmastery}%</b></div>
  </div>
  <p style="margin:0.4rem 0; font-size:0.925rem; line-height:1.6;"><b>核心探究：</b>{nprob}</p>
  <p style="margin:0.4rem 0; font-size:0.875rem; color:var(--vp-c-text-2);"><b>通关目标：</b>{nobj}</p>
  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; padding-top:0.6rem; border-top:1px dashed var(--vp-c-divider); font-size:0.8rem;">
    <span>前置知识点：<code>{prereq_str}</code></span>
    <span>{action_link}</span>
  </div>
</div>
""")

        nodes_section = "\n".join(nodes_md_blocks) if nodes_md_blocks else "暂无学习节点数据"

        # 生成该科目的 index.md
        subj_index_path = os.path.join(dest_subj_dir, 'index.md')
        index_content = f"""---
title: {subj_name} · 考纲大纲与学习节点
---

# {subj_name}

> 本学科知识大纲基于高中新课标构建，包含 {len(curriculum_nodes)} 个阶梯考点，支持从模型原理推导到高考母题踩分自测。

---

## 🗺️ 考纲路线图与学习节点清单

{nodes_section}
"""
        with open(subj_index_path, 'w', encoding='utf-8') as sf:
            sf.write(index_content)

        all_subjects.append({
            'id': sub_id,
            'name': subj_name,
            'lessons': lesson_items,
            'nodes': curriculum_nodes
        })
        print(f"✓ 成功同步学科: {subj_name} ({len(curriculum_nodes)} 个知识节点, {len(lesson_items)} 篇课件)")

    export_dashboard_data(all_subjects)
    update_vitepress_config(all_subjects)
    print(f"\n全部同步完毕！共计同步 {len(all_subjects)} 个学科，已更新 VitePress 导航、侧边栏与总览数据源。")


def export_dashboard_data(all_subjects):
    """导出供 Vue 总览看板直接响应式消费的 JSON 数据"""
    profile_path = os.path.join(ROOT, 'workspace', '.learning', 'profile.yaml')
    profile_data = {
        'student_name': 'Elias',
        'grade': '高二上学期',
        'exam_region': '新高考全国I卷',
        'target_score_band': '目标 85-95 分',
        'learning_style': '直观物理图景型',
        'weak_subjects': ['物理', '数学', '语文']
    }
    if os.path.exists(profile_path):
        with open(profile_path, 'r', encoding='utf-8') as pf:
            loaded_prof = yaml.safe_load(pf)
            if loaded_prof:
                profile_data.update(loaded_prof)

    dashboard_subjects = []
    for s in all_subjects:
        nodes = s.get('nodes', [])
        total_nodes = len(nodes)
        completed_nodes = sum(1 for n in nodes if n.get('status') == '能独立应用')
        learning_nodes = sum(1 for n in nodes if n.get('status') == '学习中')
        
        status_text = '进行中' if learning_nodes > 0 or completed_nodes > 0 else '考纲已规划'
        status_key = 'ongoing' if status_text == '进行中' else 'planned'

        # 严谨计算已学掌握度（Learned Mastery）与考纲总达成度（Syllabus Coverage）
        learned_nodes = [n for n in nodes if n.get('status') != '未开始' or float(n.get('mastery', 0)) > 0]
        if learned_nodes:
            learned_mastery_pct = round(sum(float(n.get('mastery', 0)) for n in learned_nodes) / len(learned_nodes) * 100)
        else:
            learned_mastery_pct = 0

        syllabus_mastery_pct = round(sum(float(n.get('mastery', 0)) for n in nodes) / total_nodes * 100) if total_nodes > 0 else 0
        progress_pct = int((completed_nodes + 0.5 * learning_nodes) / total_nodes * 100) if total_nodes > 0 else 0

        # 当前正在学习的节点
        current_node_title = '待开启'
        for n in nodes:
            if n.get('status') == '学习中':
                current_node_title = n.get('title', '')
                break

        # 整理每个节点供前端展示
        formatted_nodes = []
        for n in nodes:
            nid = n.get('id', '')
            matched_lesson_link = ''
            for item in s.get('lessons', []):
                if nid in item['link'] or sanitize_filename(nid) in item['link']:
                    matched_lesson_link = item['link']
                    break

            formatted_nodes.append({
                'id': nid,
                'title': n.get('title', nid),
                'kind': n.get('kind', '概念'),
                'objective': n.get('objective', ''),
                'status': n.get('status', '未开始'),
                'mastery': float(n.get('mastery', 0)),
                'prerequisites': n.get('prerequisites', []),
                'lessonLink': matched_lesson_link
            })

        dashboard_subjects.append({
            'id': s['id'],
            'title': s['name'],
            'category': '高中新课标必修/选必',
            'status': status_key,
            'statusText': status_text,
            'statusClass': f'status-{status_key}',
            'isExpanded': True,
            'progressPercent': progress_pct,
            'masteryPercent': learned_mastery_pct,
            'syllabusMasteryPercent': syllabus_mastery_pct,
            'completedNodes': completed_nodes,
            'currentNode': current_node_title,
            'nodes': formatted_nodes
        })

    out_json_path = os.path.join(SITE_DIR, '.vitepress', 'theme', 'curriculum-data.json')
    data_payload = {
        'profile': profile_data,
        'dueMistakesCount': 1,
        'subjects': dashboard_subjects
    }
    with open(out_json_path, 'w', encoding='utf-8') as jf:
        json.dump(data_payload, jf, ensure_ascii=False, indent=2)
    print(f"✓ 成功导出总览数据源: curriculum-data.json")


def update_vitepress_config(all_subjects):
    config_path = os.path.join(SITE_DIR, '.vitepress', 'config.mts')
    
    # 构建 nav
    subject_nav_items = []
    sidebar_map = {}

    for s in all_subjects:
        subject_nav_items.append({
            'text': s['name'],
            'link': f"/subjects/{s['id']}/"
        })
        
        items = [{'text': '📌 学科总览与考纲', 'link': f"/subjects/{s['id']}/"}]
        for l in s['lessons']:
            items.append({'text': l['text'], 'link': l['link']})
            
        sidebar_map[f"/subjects/{s['id']}/"] = [
            {
                'text': s['name'],
                'items': items
            }
        ]

    nav_json = json.dumps([
        {'text': '学情大厅', 'link': '/'},
        {'text': '学科库', 'items': subject_nav_items},
        {'text': '错题本与归因', 'link': '/mistakes/'}
    ], ensure_ascii=False, indent=6)

    sidebar_json = json.dumps(sidebar_map, ensure_ascii=False, indent=6)

    content = f"""import {{ defineConfig }} from 'vitepress'
import {{ katex }} from '@mdit/plugin-katex'
import container from 'markdown-it-container'

export default defineConfig({{
  lang: 'zh-CN',
  title: 'StudyMate 高中版',
  description: 'AI 高中学霸伴学助手：考纲模型、矢量图解、分步踩分、错因顿悟',
  
  head: [
    ['link', {{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css' }}]
  ],

  markdown: {{
    config: (md) => {{
      md.use(katex, {{ strict: false }})
      md.use(container, 'svg', {{
        render: (tokens, idx) => {{
          const token = tokens[idx]
          if (token.nesting === 1) {{
            const title = token.info.trim().slice(3).trim()
            return `<SvgViewer title="${{title || '高中理科标准矢量图解'}}">\\n`
          }} else {{
            return '</SvgViewer>\\n'
          }}
        }}
      }})
    }}
  }},

  themeConfig: {{
    siteTitle: '⚡ StudyMate 高中版',
    
    nav: {nav_json},

    sidebar: {sidebar_json},

    search: {{
      provider: 'local',
      options: {{
        translations: {{
          button: {{
            buttonText: '搜索考点、模型与错题',
            buttonAriaLabel: '搜索考点、模型与错题'
          }},
          modal: {{
            noResultsText: '未找到相关知识点',
            resetButtonTitle: '清除搜索条件',
            footer: {{
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }}
          }}
        }}
      }}
    }},

    outline: {{
      level: [2, 3],
      label: '本课要点导航'
    }},

    docFooter: {{
      prev: '上一节',
      next: '下一节'
    }}
  }}
}})
"""
    with open(config_path, 'w', encoding='utf-8') as cf:
        cf.write(content)


if __name__ == '__main__':
    sync()
