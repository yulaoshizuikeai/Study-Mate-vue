#!/usr/bin/env bash
# StudyMate 回归测试：纯 Python / Node，不需要浏览器（默认）。
#   bash scripts/tests/run_tests.sh              # 11 套快测
#   bash scripts/tests/run_tests.sh --browser    # 再加需要 google-chrome 的 2 套（共 13 套）
set -u
cd "$(dirname "$0")/../.." || exit 1

BROWSER=0
[ "${1:-}" = "--browser" ] && BROWSER=1

fail=0
step() {
  printf '\n=== %s ===\n' "$1"
  shift
  "$@" || { fail=1; printf '  ↑ 这一套没全过\n'; }
}

PYTHON=""
if command -v py >/dev/null 2>&1 && py -3 -c 'import yaml' 2>/dev/null; then
  PYTHON="py -3"
elif command -v python3 >/dev/null 2>&1 && python3 -c 'import yaml' 2>/dev/null; then
  PYTHON="python3"
elif command -v python >/dev/null 2>&1 && python -c 'import yaml' 2>/dev/null; then
  PYTHON="python"
fi

if [ -z "$PYTHON" ]; then
  printf '\n缺少 pyyaml：检查读不了 curriculum.yaml（命名与指针那套会失败）。\n'
  printf '先装：python3 -m pip install pyyaml 或 py -3 -m pip install pyyaml\n'
  exit 1
fi

step '安装脚本（沙箱 HOME，39 项）'        $PYTHON scripts/tests/test_install.py
step '题目属性转义（检查，9 例）'          $PYTHON scripts/tests/test_quiz_attr.py
step '题目里的代码围栏（检查，12 例）'     $PYTHON scripts/tests/test_quiz_code.py
step '课件配图（检查，5 例）'              $PYTHON scripts/tests/test_lesson_figure.py
step '命名与上下节课指针（检查，9 例）'    $PYTHON scripts/tests/test_naming_nav.py
step '图片库索引（校验器，6 例）'            $PYTHON scripts/tests/test_pool.py
step '位次重排与 empty_reason（脚本，22 例）'  $PYTHON scripts/tests/test_lesson_scripts.py
step '提示词规则清单（408 条）'            $PYTHON scripts/tests/test_skill_rules.py

if command -v npm >/dev/null 2>&1; then
  step 'VitePress 同步与构建（全站热编译）' npm run build
else
  printf '\n跳过 VitePress 构建测试：没装 npm。\n'
fi

if [ "$BROWSER" = 1 ]; then
  if command -v google-chrome >/dev/null 2>&1; then
    step '代码块高亮（真实 Chrome，29 项）'     node scripts/tests/browser/hl_test.mjs
    step '题目里的代码块（真实 Chrome，11 项）' node scripts/tests/browser/quiz_code_test.mjs
  else
    printf '\n跳过浏览器那几套：没装 google-chrome。\n'
  fi
fi

printf '\n──────────────────────────────\n'
if [ "$fail" = 0 ]; then
  printf '全部通过\n'
else
  printf '有未通过的项目（见上）\n'
fi
exit "$fail"
