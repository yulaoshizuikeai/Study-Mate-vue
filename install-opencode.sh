#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "=========================================================="
echo "🤖 正在安装 StudyMate-HighSchool (高中学霸版) 到 OpenCode..."
echo "=========================================================="

OPENCODE_HOME="$HOME/.config/opencode"
mkdir -p "$OPENCODE_HOME/skills" "$OPENCODE_HOME/commands"

cp -rf "$ROOT/skills"/* "$OPENCODE_HOME/skills/"
echo "✅ 已将高中自学技能安装到 OpenCode 全局目录: $OPENCODE_HOME/skills"

if [ -d "$ROOT/.opencode/commands" ]; then
  cp -rf "$ROOT/.opencode/commands"/* "$OPENCODE_HOME/commands/"
  echo "✅ 已将 /study, /quiz, /mistakes, /roadmap 指令安装到 OpenCode"
fi

echo "=========================================================="
echo "🎉 安装完成！在 OpenCode 终端中可直接使用："
echo "   /study 高中物理 动力学应用"
echo "   /quiz 牛顿第二定律"
echo "   /mistakes"
echo "   /roadmap"
echo "=========================================================="
