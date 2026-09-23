#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "=========================================================="
echo "🎓 正在安装 StudyMate-HighSchool (高中学霸版) 到 Antigravity..."
echo "=========================================================="

SKILLS_SRC="$ROOT/skills"
AGY_SKILLS_BASE="$HOME/.gemini/config/skills"
mkdir -p "$AGY_SKILLS_BASE"

for skill in "$SKILLS_SRC"/*; do
  if [ -d "$skill" ]; then
    skill_name="$(basename "$skill")"
    mkdir -p "$AGY_SKILLS_BASE/$skill_name"
    cp -rf "$skill"/* "$AGY_SKILLS_BASE/$skill_name/"
  fi
done
echo "✅ 已将高中自学技能注册到 Antigravity 全局技能库: $AGY_SKILLS_BASE"

WORKSPACE="${WORKSPACE:-$ROOT/workspace}"
mkdir -p "$WORKSPACE/.learning/subjects"
if [ ! -f "$WORKSPACE/.learning/MEMORY.md" ]; then
  cp "$ROOT/templates/MEMORY.md" "$WORKSPACE/.learning/MEMORY.md"
fi

CONFIG_YAML="workspace: \"$WORKSPACE\"\nroot: \"$ROOT\""
mkdir -p "$HOME/.dsh" "$HOME/.gemini/antigravity"
echo -e "$CONFIG_YAML" > "$HOME/.dsh/studymate-config.yaml"
echo -e "$CONFIG_YAML" > "$HOME/.gemini/antigravity/studymate-config.yaml"

mkdir -p "$ROOT/.agents/skills"
cp -rf "$SKILLS_SRC"/* "$ROOT/.agents/skills/"

echo "✅ 学习工作区已就绪: $WORKSPACE"
echo "=========================================================="
echo "🎉 安装完成！在 Antigravity 中开启高中自学的方式："
echo "👉 在对话框中直接说：『我想学高中物理动力学』"
echo "👉 运行 Web 知识库看板：npm run serve"
echo "=========================================================="
