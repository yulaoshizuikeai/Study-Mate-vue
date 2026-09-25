/* ═══════════════════════════════════════════════════════════════
   StudyMate · 课件题目组件（数据契约的唯一出处）
   ═══════════════════════════════════════════════════════════════
   题目从哪来：出题角色写 `lessons/<序号>-<节点id>.quiz.json`（结构 `{"锚点文本": [题, …]}`，
   键与内容文件里 `::: quiz` 的锚点逐字对应），`scripts/render_lesson.py` 把它渲染成页面里的
   题目块：

     <div class="quiz" data-quiz='[
       {"q":"选择题题干","opts":["选项A","选项B","选项C"],"ans":1,"why":"一句解释"},
       {"q":"开放题题干","answer":"参考答案","criteria":"判分要点（学生据此自评）"}
     ]'></div>
     <script src="../assets/quiz.js" defer></script>

   **属性值怎么转义、`data-quiz` 怎么拼，都是渲染器的事**（每个题目块都由它产出）：作者只交
   上面那种 JSON，不写 HTML、也不用知道实体引号的写法。下面这份契约管的是 **JSON 里写什么
   字段、这些字段进页面长什么样**。

   data-quiz 是 JSON 数组，每项是一道题，**两种题型二选一**（不能同时写两组字段）：

   题型一 · 选择题（页内自动判）
     q     题干（字符串，必填，两种题型都要）
     opts  选项数组（必填，≥2 项）
     ans   正确选项下标，从 0 开始（必填，必须落在 opts 范围内）
     why   答完显示的一句解释（必填：检查会拦，见 scripts/check_lesson.py）

   题型二 · 开放题（学生自评，不贴回会话）
     q         题干（字符串，必填）
     answer    参考答案（必填）
     criteria  判分要点：凭什么算答对了（必填；学生点开对照时看到的就是这两段）

   题面里的代码（`q` / `answer` / `criteria` / `why` 四个字段都适用）：
     多行代码写进**围栏**——起止各占一整行，中间照原样写（**缩进与空格全保留**）：

       {"q":"下面这段为什么死循环？\n\n```cpp\nwhile (i <= 100) {\n    ++cnt;\n}\n```\n\n① 哪里出问题？"}

     围栏行的写法是「行首可有缩进 + 三个反引号 + 语言标签」，语言可省（自动识别），
     写 `text` 表示不上色。渲染结果是真代码块（等宽 + 底色 + 自动上色），
     与课件正文里的代码块同款。
     **多行代码不进围栏就会掉缩进**：没有围栏的多行文本按纯文本渲染，只保留换行，
     浏览器会把行首空格折叠掉——靠缩进提问的题（`else` 对齐、嵌套层次）就废了。
     行内的单个反引号是普通字符，不做解析（shell 题面里合法）。
     围栏没闭合检查会拦（`scripts/check_lesson.py`）。

   渲染约定（字段进页面长什么样——**写的是纯文本，不是 Markdown**）：
     - 四个字段都是纯文本，渲染器只认两样排版：`\n` 换行、``` 围栏代码块。
       **Markdown 与 HTML 标记一律原样显示**：`**加粗**` 会出现星号、`- 列表`/`# 标题`
       不变成列表或标题、行内 `` `code` `` 带反引号、`<b>` 露出尖括号。要强调就用短句
       与空行；要代码就用围栏。检查对这类标记给 WARN（`check_lesson.py`）。
     - 每个字段落在哪：`q` 是题干（一组里多道题时自动加「1. 」序号）；`opts` 按数组顺序
       变成可点按钮；`why` 接在「✓ 对／✗ 再想想」后面同一行；`answer` 与 `criteria` 收在
       「想好了，看参考答案」按钮后面，各带「参考答案」「判分要点」小标题。
     - 空行就是空行；围栏前后的空行会被去掉（间距由样式给，别用它凑留白）。

   行为：
   - 选择题：点选项立刻给反馈（对/错 + why）；选错的标红、正确的标绿；允许改选，计分只算第一次；
     一组里的选择题全部答完后显示"答对 N / M"，并用 Sayo toast 提示一次（M 只数选择题）
   - 开放题：先只显示题干和"想好了，看参考答案"按钮；点开显示参考答案 + 判分要点；再点一次收起
     （方便隔一会儿重答一遍）。开放题不计分、不判定——它是自测
   - 课件没加载 sayo.js 时自动降级为纯内联反馈（不依赖 Sayo）
   - 题目数据不完整时页面显示提示，不静默吞掉

   出题与判分规范在 <root>/.dsh/skills/layered-practice（题目唯一规范）；
   检查 scripts/check_lesson.py 按上面这套字段做结构校验。
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* 开放题答案区的 id 计数器（aria-controls 用，一页内唯一即可） */
  var uid = 0;

  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* Sayo toast 是增强项：没有 sayo.js（或调用失败）就静默跳过 */
  function toast(message, type) {
    if (window.Sayo && window.Sayo.toast && typeof window.Sayo.toast.show === 'function') {
      try { window.Sayo.toast.show(message, { type: type }); return true; } catch (e) { /* 忽略 */ }
    }
    return false;
  }

  function questionBlock(item, index, total) {
    return richBlock('quiz__q', item && item.q || '', total > 1 ? (index + 1) + '. ' : '');
  }

  /* ── 题面/答案里的代码：```lang 围栏渲染成真代码块 ────────────────
     纯文本走 textContent 时，多行代码没有等宽字体、缩进也会被 white-space 折叠掉
     （有的题面恰恰靠缩进提问，学生就看不见了）。围栏里的内容改渲染成 <pre><code>：
     缩进、空格原样保留，底色/边框用 .lesson pre 那套，上色交给 learn-theme.js。
     围栏必须**单独占一行**（行首可缩进）：起一行 ```lang、止一行 ```；行内出现的
     单个反引号是普通字符，不做解析（shell 题面里合法）。语言标签可省（自动识别）。 */
  var FENCE_RE = /^[ \t]*```[ \t]*([A-Za-z0-9+#.-]*)[ \t]*$/;

  function renderRich(el, text) {
    var lines = String(text == null ? '' : text).split(/\r?\n/);
    var prose = [];
    var code = null;

    function flushProse() {
      var body = prose.join('\n').replace(/^\n+|\n+$/g, '');
      if (body) el.appendChild(document.createTextNode(body));
      prose = [];
    }
    function flushCode() {
      var pre = document.createElement('pre');
      pre.className = 'quiz__code';
      if (code.lang) pre.setAttribute('data-lang', code.lang);
      var inner = document.createElement('code');
      inner.textContent = code.lines.join('\n');
      pre.appendChild(inner);
      el.appendChild(pre);
      code = null;
    }

    lines.forEach(function (line) {
      var fence = FENCE_RE.exec(line);
      if (fence) {
        if (code) flushCode();
        else { flushProse(); code = { lang: fence[1], lines: [] }; }
        return;
      }
      (code ? code.lines : prose).push(line);
    });
    if (code) flushCode();          /* 围栏没闭合：照代码块渲染到结尾（检查会拦这种写法） */
    else flushProse();
  }

  /* 建块（div 而非 p：代码块是 <pre>，不能塞进 p 里） */
  function richBlock(className, text, prefix) {
    var el = document.createElement('div');
    el.className = className;
    if (prefix) el.appendChild(document.createTextNode(prefix));
    renderRich(el, text);
    return el;
  }

  /* 上色是增强项：learn-theme.js 的自动扫描在本文件建块**之前**就跑完了
     （它挂在 head、DOMContentLoaded 先注册），所以这里必须显式再扫一遍自己的块 */
  function highlight(block) {
    if (window.LearnTheme && typeof window.LearnTheme.highlight === 'function') {
      try { window.LearnTheme.highlight(block); } catch (e) { /* 忽略 */ }
    }
  }

  function renderMath(el) {
    if (window.renderMathInElement && el) {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\(', display: false},
            {left: '$', right: '$', display: false}
          ],
          ignoredClasses: ['katex', 'lesson-code__copy'],
          throwOnError: false
        });
      } catch (e) { /* 忽略 */ }
    }
  }

  /* ── 选择题：点选项即时反馈 ─────────────────────────────────── */
  function buildChoice(block, item, index, total, state) {
    var question = questionBlock(item, index, total);
    block.appendChild(question);

    var opts = document.createElement('div');
    opts.className = 'quiz__opts';

    var feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.hidden = true;

    var firstAnswer = true;

    (item.opts || []).forEach(function (text, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz__opt';
      /* 选项字母徽标（A/B/C/D…）：扫读定位用，装饰性不进朗读流 */
      var letter = document.createElement('span');
      letter.className = 'quiz__opt-letter';
      letter.setAttribute('aria-hidden', 'true');
      letter.textContent = String.fromCharCode(65 + i);
      btn.appendChild(letter);
      btn.appendChild(document.createTextNode(text));

      btn.addEventListener('click', function () {
        var ok = i === item.ans;

        Array.prototype.forEach.call(opts.children, function (other) {
          other.classList.toggle('is-picked', other === btn);
          other.classList.toggle('is-correct', other === btn && ok);
          other.classList.toggle('is-wrong', other === btn && !ok);
        });

        feedback.hidden = false;
        feedback.className = 'feedback ' + (ok ? 'correct' : 'wrong');
        feedback.textContent = '';
        feedback.appendChild(document.createTextNode((ok ? '✓ 对' : '✗ 再想想') + '　'));
        renderRich(feedback, item.why);

        if (!ok) {
          var askBtn = document.createElement('button');
          askBtn.type = 'button';
          askBtn.className = 'quiz-rubric__taxo-btn';
          if (askBtn.style) askBtn.style.marginLeft = '8px';
          askBtn.textContent = '🤖 为什么错？问问伴学助手';
          askBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var drawer = document.getElementById('tutor-drawer');
            var promptInput = document.getElementById('tutor-prompt-input');
            if (drawer && promptInput) {
              drawer.classList.add('open');
              promptInput.value = '【高中AI伴学·错题求助】\n' +
                '题干：' + (item.q || '') + '\n' +
                '我错选了：' + text + '\n' +
                '参考解析：' + (item.why || '') + '\n\n' +
                '请老师帮我分析：我为什么会误选这个选项？请指出我容易陷入的认知盲区或公式乱套问题。';
            }
          });
          feedback.appendChild(askBtn);
        }

        highlight(feedback);
        renderMath(feedback);

        if (firstAnswer) {
          firstAnswer = false;
          state.answered += 1;
          if (ok) state.correct += 1;
          if (state.answered === state.total) {
            if (state.scoreEl) {
              state.scoreEl.hidden = false;
              state.scoreEl.textContent = '本题组：答对 ' + state.correct + ' / ' + state.total;
            }
            toast(
              state.correct === state.total ? '全部答对（' + state.total + '/' + state.total + '）'
                                            : '答对 ' + state.correct + ' / ' + state.total,
              state.correct === state.total ? 'success' : 'info'
            );
          }
        }
      });

      opts.appendChild(btn);
    });

    block.appendChild(opts);
    block.appendChild(feedback);
  }

  /* ── 开放题：高考大题分步踩分台与错因归因 ── */
  function buildOpen(block, item, index, total) {
    var question = questionBlock(item, index, total);
    block.appendChild(question);

    var wrap = document.createElement('div');
    wrap.className = 'quiz__open';

    // 草稿纸输入区（支持 localStorage 自动存盘与防丢失）
    var draftWrap = document.createElement('div');
    draftWrap.className = 'quiz-rubric__draft';
    var draftHeader = document.createElement('div');
    draftHeader.className = 'quiz-draft__header';
    if (draftHeader.style) {
      draftHeader.style.display = 'flex';
      draftHeader.style.justifyContent = 'space-between';
      draftHeader.style.alignItems = 'center';
      draftHeader.style.marginBottom = '4px';
    }

    var draftTitle = document.createElement('small');
    if (draftTitle.style) draftTitle.style.color = 'var(--syo-fg-muted)';
    draftTitle.textContent = '📝 解题草稿纸（自动本地存盘）';

    var clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'quiz-rubric__taxo-btn';
    if (clearBtn.style) {
      clearBtn.style.padding = '1px 6px';
      clearBtn.style.fontSize = '0.7rem';
    }
    clearBtn.textContent = '清空草稿';

    draftHeader.appendChild(draftTitle);
    draftHeader.appendChild(clearBtn);
    draftWrap.appendChild(draftHeader);

    var draftArea = document.createElement('textarea');
    draftArea.placeholder = '【草稿纸 / 解题列式】在此写下你的步骤（如研究对象、方程组、临界状态），写完后点下方对照高考分步采分点...';

    var locPath = (window.location && window.location.pathname) || 'local';
    var storageKey = 'sm_draft_' + locPath + '_' + index;
    try {
      if (typeof localStorage !== 'undefined') {
        var saved = localStorage.getItem(storageKey);
        if (saved) draftArea.value = saved;
      }
    } catch (e) {}

    draftArea.addEventListener('input', function () {
      try {
        localStorage.setItem(storageKey, draftArea.value);
      } catch (e) {}
    });

    clearBtn.addEventListener('click', function () {
      draftArea.value = '';
      try { localStorage.removeItem(storageKey); } catch (e) {}
      toast('草稿已清空', 'info');
    });

    draftWrap.appendChild(draftArea);
    wrap.appendChild(draftWrap);

    // 物理/理科快捷符号工具栏
    var symBar = document.createElement('div');
    symBar.className = 'quiz-draft__sym-bar';
    var syms = [
      { label: 'F_合', val: 'F_{合}' },
      { label: 'a', val: 'a' },
      { label: 'μ', val: 'μ' },
      { label: 'θ', val: 'θ' },
      { label: 'Δt', val: 'Δt' },
      { label: 'v²', val: 'v^2' },
      { label: 'mg', val: 'mg' },
      { label: 'F_N', val: 'F_N' },
      { label: 'f', val: 'f' },
      { label: 'ω', val: 'ω' },
      { label: 'π', val: 'π' },
      { label: '√', val: '√' }
    ];
    syms.forEach(function (s) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-draft__sym-btn';
      btn.textContent = s.label;
      btn.title = '插入 ' + s.label;
      btn.addEventListener('click', function () {
        var start = draftArea.selectionStart;
        var end = draftArea.selectionEnd;
        var val = draftArea.value;
        draftArea.value = val.substring(0, start) + s.val + val.substring(end);
        draftArea.selectionStart = draftArea.selectionEnd = start + s.val.length;
        draftArea.focus();
        try {
          localStorage.setItem(storageKey, draftArea.value);
        } catch (e) {}
      });
      symBar.appendChild(btn);
    });
    draftWrap.appendChild(symBar);

    var reveal = document.createElement('button');
    reveal.type = 'button';
    reveal.className = 'quiz__reveal';
    reveal.textContent = '想好了，看参考答案';
    /* 展开态对读屏可见：aria-expanded 跟着显隐走 */
    reveal.setAttribute('aria-expanded', 'false');

    var answer = document.createElement('div');
    answer.className = 'quiz__answer';
    answer.hidden = true;
    answer.id = 'quiz-answer-' + (++uid);
    reveal.setAttribute('aria-controls', answer.id);

    var answerLabel = document.createElement('p');
    answerLabel.className = 'quiz__answer-label';
    answerLabel.textContent = '参考答案';
    var answerText = richBlock('quiz__answer-text', item.answer || '');

    var criteriaLabel = document.createElement('p');
    criteriaLabel.className = 'quiz__answer-label';
    criteriaLabel.textContent = '判分要点';

    // 交互式分步采分复选清单
    function parseCriteriaSteps(text) {
      if (!text) return [];
      var lines = text.split('\n');
      var parsed = [];
      lines.forEach(function (line) {
        var trimmed = line.trim();
        if (!trimmed) return;
        if (/^【.*】$/.test(trimmed) && !trimmed.includes('分')) return;
        var ptsMatch = trimmed.match(/(?:得\s*|（|\(|\s)(\d+)\s*分/);
        var pts = ptsMatch ? parseInt(ptsMatch[1], 10) : 1;
        var stepText = trimmed.replace(/^([①-⑩\d\.\-\*、\s]+)/, '').replace(/[；;。]\s*$/, '');
        parsed.push({ text: stepText || trimmed, pts: pts, raw: trimmed });
      });
      return parsed;
    }

    var steps = parseCriteriaSteps(item.criteria || '');
    var rubricChecklist = null;
    if (steps.length > 0) {
      rubricChecklist = document.createElement('div');
      rubricChecklist.className = 'quiz-rubric__checklist';

      var scoreBar = document.createElement('div');
      scoreBar.className = 'quiz-rubric__score-bar';

      var totalPts = steps.reduce(function(acc, s) { return acc + s.pts; }, 0);
      var scoreValSpan = document.createElement('span');
      scoreValSpan.className = 'rubric-score-val';
      scoreValSpan.textContent = '0';

      var totalPtsSpan = document.createElement('span');
      totalPtsSpan.textContent = ' / ' + totalPts + ' 分';

      var tipSpan = document.createElement('span');
      if (tipSpan.style) {
        tipSpan.style.marginLeft = 'auto';
        tipSpan.style.fontSize = '0.75rem';
        tipSpan.style.color = 'var(--syo-fg-muted)';
      }
      tipSpan.textContent = '对照自身草稿勾选踩分点';

      scoreBar.appendChild(document.createTextNode('采分自评：'));
      scoreBar.appendChild(scoreValSpan);
      scoreBar.appendChild(totalPtsSpan);
      scoreBar.appendChild(tipSpan);
      rubricChecklist.appendChild(scoreBar);

      var currentScore = 0;
      steps.forEach(function (step) {
        var itemEl = document.createElement('label');
        itemEl.className = 'quiz-rubric__step-item';

        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'quiz-rubric__step-cb';

        var textSpan = document.createElement('span');
        textSpan.className = 'quiz-rubric__step-text';
        textSpan.textContent = step.text;

        var ptsBadge = document.createElement('span');
        ptsBadge.className = 'quiz-rubric__step-pts';
        ptsBadge.textContent = '+' + step.pts + '分';

        cb.addEventListener('change', function () {
          if (cb.checked) {
            currentScore += step.pts;
            itemEl.classList.add('is-checked');
          } else {
            currentScore -= step.pts;
            itemEl.classList.remove('is-checked');
          }
          scoreValSpan.textContent = currentScore;
          if (currentScore === totalPts) {
            toast('满分通关！步骤规范，逻辑严密！', 'success');
          }
        });

        itemEl.appendChild(cb);
        itemEl.appendChild(textSpan);
        itemEl.appendChild(ptsBadge);
        rubricChecklist.appendChild(itemEl);
      });
    }

    var criteriaText = richBlock('quiz__criteria', item.criteria || '');

    // 错因归因快速面板与错题本实时同步
    var taxoPanel = document.createElement('div');
    taxoPanel.className = 'quiz-rubric__taxonomy-tags';
    var taxoLabel = document.createElement('span');
    if (taxoLabel.style) {
      taxoLabel.style.fontSize = '0.75rem';
      taxoLabel.style.color = 'var(--syo-fg-muted)';
    }
    taxoLabel.textContent = '若有丢分，归因并同步错题本：';
    taxoPanel.appendChild(taxoLabel);

    ['审题遗漏', '概念混淆', '模型套错', '计算失误'].forEach(function(taxo) {
      var tBtn = document.createElement('button');
      tBtn.type = 'button';
      tBtn.className = 'quiz-rubric__taxo-btn';
      tBtn.textContent = '【' + taxo + '】';
      tBtn.addEventListener('click', function() {
        tBtn.classList.toggle('selected');
        toast('已标记错因：' + taxo + '，正在同步学科错题本...', 'info');

        var pathParts = (window.location && window.location.pathname || '').split('/');
        var subj = 'physics-dynamics';
        for (var pi = 0; pi < pathParts.length; pi++) {
          if (pathParts[pi] === 'subjects' && pathParts[pi + 1]) {
            subj = pathParts[pi + 1];
            break;
          }
        }
        var pageNode = (pathParts[pathParts.length - 1] || '').replace(/\.html$/, '');

        fetch('/api/record-misconception', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: subj,
            node: pageNode,
            topic: (item.q || '').substring(0, 30),
            taxonomy: taxo,
            trigger_summary: draftArea.value ? '学生草稿：' + draftArea.value.substring(0, 100) : '未列草稿',
            wrong_equation: draftArea.value ? draftArea.value.substring(0, 80) : '',
            correct_thought: (item.answer || '').substring(0, 80)
          })
        }).then(function(res) {
          return res.json();
        }).then(function(data) {
          if (data && data.status === 'ok') {
            toast('✓ 错题已归档至 misconceptions.yaml，已安排艾宾浩斯复练！', 'success');
          }
        }).catch(function(e) {
          console.warn('Misconception sync offline:', e);
        });

        var drawer = document.getElementById('tutor-drawer');
        var promptInput = document.getElementById('tutor-prompt-input');
        if (drawer && promptInput) {
          drawer.classList.add('open');
          promptInput.value = '【高考大题错因诊断】\n' +
            '题干：' + (item.q || '') + '\n' +
            '学生草稿步骤：\n' + (draftArea.value || '（未输入草稿）') + '\n' +
            '标准采分细则：\n' + (item.criteria || '') + '\n' +
            '自我归因类型：【' + taxo + '】\n\n' +
            '请老师根据我的草稿与错因类型，精确指出我是在哪一步出现了问题，并给出 1 道针对此错因的高考高仿变式题！';
        }
      });
      taxoPanel.appendChild(tBtn);
    });

    answer.appendChild(answerLabel);
    answer.appendChild(answerText);
    answer.appendChild(criteriaLabel);
    if (rubricChecklist) {
      answer.appendChild(rubricChecklist);
    }
    answer.appendChild(criteriaText);
    answer.appendChild(taxoPanel);

    reveal.addEventListener('click', function () {
      answer.hidden = !answer.hidden;
      reveal.textContent = answer.hidden ? '想好了，看参考答案' : '收起，再自己答一遍';
      reveal.setAttribute('aria-expanded', answer.hidden ? 'false' : 'true');
      if (!answer.hidden) renderMath(answer);
    });

    wrap.appendChild(reveal);
    wrap.appendChild(answer);
    block.appendChild(wrap);
  }

  /* ── 数据不完整时的兜底 ─────────────────────────────────────── */
  function buildBroken(block, item, index, total) {
    var question = questionBlock(item, index, total);
    block.appendChild(question);

    var hint = document.createElement('p');
    hint.className = 'feedback wrong';
    hint.textContent = '（这道题的数据不完整：选择题要 opts/ans/why，开放题要 answer/criteria）';
    block.appendChild(hint);
  }

  /* ── 题型判定（与检查、分层规范一致：两组字段只能二选一）──────── */
  function nonEmptyText(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  function isChoiceItem(item) {
    return !!item && typeof item === 'object' && !Array.isArray(item) &&
           nonEmptyText(item.q) && Array.isArray(item.opts) && item.opts.length >= 2 &&
           typeof item.ans === 'number' && item.ans % 1 === 0 &&
           item.ans >= 0 && item.ans < item.opts.length && nonEmptyText(item.why) &&
           !('answer' in item) && !('criteria' in item);
  }

  function isOpenItem(item) {
    return !!item && typeof item === 'object' && !Array.isArray(item) &&
           nonEmptyText(item.q) && nonEmptyText(item.answer) && nonEmptyText(item.criteria) &&
           !('opts' in item) && !('ans' in item);
  }

  whenReady(function () {
    var blocks = document.querySelectorAll('.quiz[data-quiz]');

    Array.prototype.forEach.call(blocks, function (block) {
      var items;
      try {
        items = JSON.parse(block.getAttribute('data-quiz') || '[]');
      } catch (e) {
        block.textContent = '（题目数据解析失败：data-quiz 不是合法 JSON）';
        return;
      }
      if (!Array.isArray(items) || items.length === 0) {
        block.textContent = '（这组题还没有内容）';
        return;
      }

      var choiceCount = items.filter(isChoiceItem).length;

      var state = { answered: 0, correct: 0, total: choiceCount };
      if (choiceCount > 1) {
        state.scoreEl = document.createElement('p');
        state.scoreEl.className = 'quiz__score';
        state.scoreEl.hidden = true;
      }

      items.forEach(function (item, index) {
        if (isChoiceItem(item)) buildChoice(block, item, index, items.length, state);
        else if (isOpenItem(item)) buildOpen(block, item, index, items.length);
        else buildBroken(block, item, index, items.length);
      });

      if (state.scoreEl) block.appendChild(state.scoreEl);

      highlight(block);            /* 围栏渲染出的代码块：建完立刻上色（见 highlight 注释） */
      renderMath(block);
    });
  });
})();
