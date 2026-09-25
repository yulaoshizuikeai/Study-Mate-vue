#!/usr/bin/env python3
"""StudyMate-HighSchool 错题艾宾浩斯靶向复盘调度器。

用法：
    python scripts/spaced_review.py [--subject <slug>] [--workspace <目录>] [--check-today]

功能：
    - 读取各学科 misconceptions.yaml 错题档案
    - 基于艾宾浩斯记忆遗忘曲线（1天、2天、4天、7天、15天）扫描到期需要拦截复测的错因
    - 为每个薄弱点生成针对性的 Prompt 模板，在学习新课前进行 2 分钟顿悟自检
    - 更新复盘进度与掌握状态
"""
import argparse
import datetime
import os
import sys

try:
    import yaml
except ImportError:
    yaml = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INTERVALS = [1, 2, 4, 7, 15, 30]


def find_workspace(specified=None):
    if specified and os.path.isdir(specified):
        return os.path.abspath(specified)
    local_ws = os.path.join(ROOT, 'workspace')
    if os.path.isdir(local_ws):
        return local_ws
    return ROOT


def load_misconceptions(subject_dir):
    misc_file = os.path.join(subject_dir, 'misconceptions.yaml')
    if not os.path.isfile(misc_file) or not yaml:
        return []
    try:
        with open(misc_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f) or []
            return data if isinstance(data, list) else []
    except Exception:
        return []


def main():
    if sys.platform == 'win32':
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    parser = argparse.ArgumentParser(description='Spaced Repetition & Misconceptions Review Engine')
    parser.add_argument('--subject', type=str, default=None, help='指定学科 slug，默认扫描全部')
    parser.add_argument('--workspace', type=str, default=None, help='学习工作区路径')
    parser.add_argument('--check-today', action='store_true', help='检查今日需要复盘的项目')
    parser.add_argument('--export-md', type=str, default=None, help='导出错题集为 Markdown 活页闪卡文件路径')
    args = parser.parse_args()

    ws = find_workspace(args.workspace)
    subjects_dir = os.path.join(ws, '.learning', 'subjects')
    if not os.path.isdir(subjects_dir):
        print(f"提示：工作区不存在科目目录：{subjects_dir}")
        return 0

    today = datetime.date.today().strftime('%Y-%m-%d')
    targets = [args.subject] if args.subject else os.listdir(subjects_dir)

    due_items = []
    for slug in targets:
        s_dir = os.path.join(subjects_dir, slug)
        if not os.path.isdir(s_dir):
            continue
        items = load_misconceptions(s_dir)
        for it in items:
            review_date = it.get('next_review_date', '1970-01-01')
            status = it.get('status', '待攻坚')
            if review_date <= today and status != '已掌握':
                it['_subject'] = slug
                due_items.append(it)

    print("=" * 60)
    print(f"🎯 StudyMate-HighSchool 今日艾宾浩斯靶向复盘扫描 (日期: {today})")
    print("=" * 60)

    if not due_items:
        print("🎉 今日暂无到期薄弱错题！你的各学科知识架构运转良好，可全力进入新课学习。")
        return 0

    print(f"⚠️ 发现 {len(due_items)} 处需要今日拦截复测的高中认知薄弱点：\n")
    for idx, item in enumerate(due_items, 1):
        print(f"{idx}. 【{item.get('taxonomy', '未知错因')}】{item.get('topic', '未命名考点')}")
        print(f"   · 所属学科: {item['_subject']}")
        print(f"   · 错因症状: {item.get('trigger_summary', '无')}")
        if item.get('wrong_equation'):
            print(f"   · 历史错解: {item.get('wrong_equation')}")
        print(f"   · 顿悟突破: {item.get('correct_thought', '暂无突破要点')}")
        print(f"   · 下次复盘: {item.get('next_review_date')}")
        print("-" * 50)

    if args.export_md:
        out_path = os.path.abspath(args.export_md)
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        lines = [
            f"# 高中学霸错题与艾宾浩斯复盘活页本",
            f"> 生成时间：{today} | 包含学科：{args.subject or '全学科'}\n",
        ]
        for it in due_items:
            lines.append(f"## 错题卡片 · {it.get('topic', '未命名')}（{it.get('taxonomy', '未归因')}）")
            lines.append(f"- **所属模块**：`{it.get('node', '')}`")
            lines.append(f"- **易错诱因**：{it.get('trigger_summary', '')}")
            if it.get('wrong_equation'):
                lines.append(f"- **历史错误方程/思路**：\n```text\n{it.get('wrong_equation')}\n```")
            lines.append(f"### 💡 正确物理/数理图景与解题通法（点击翻转）\n{it.get('correct_thought', '')}\n")
            lines.append("---\n")
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        print(f"\n📁 错题已成功导出为双面复习卡片: {out_path}")

    print("\n💡 建议在开始新一课前，将以上错题发给 AI 主教练，要求做 1 道变式题拦截回测！")
    return 0


if __name__ == '__main__':
    sys.exit(main())
