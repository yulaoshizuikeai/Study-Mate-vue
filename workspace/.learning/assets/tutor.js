/* ═══════════════════════════════════════════════════════════════
   StudyMate-HighSchool · 高中学霸即时伴学与划词助手 (tutor.js)
   ═══════════════════════════════════════════════════════════════
   功能：
   1. 划词即时浮动菜单 (Selection Popover)：
      - 深入讲讲、步骤推导、生活类比、易错陷阱
   2. AI 伴学侧滑抽屉 (Tutor Drawer)：
      - 结构化精准 Prompt 生成
      - 本地 /api/ask 实时通信与优雅降级一键复制
      - 错因记录与弱项一键直达
   ═══════════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  var currentSelection = '';
  var currentSection = '';

  function initTutor() {
    var popover = document.getElementById('selection-popover');
    var drawer = document.getElementById('tutor-drawer');
    var toggleBtn = document.getElementById('tutor-toggle-btn');
    var closeBtn = document.getElementById('tutor-drawer-close');
    var promptInput = document.getElementById('tutor-prompt-input');
    var copyBtn = document.getElementById('tutor-action-btn');
    var drawerBody = document.getElementById('tutor-drawer-body');

    if (!popover || !drawer) return;

    /* ── 抽屉开关（Esc 可关；关时焦点还给呼出按钮） ── */
    function openDrawer() {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }
    function closeDrawer() {
      var focusInside = drawer.contains(document.activeElement);
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      if (focusInside && toggleBtn) toggleBtn.focus();
    }
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (drawer.classList.contains('open')) closeDrawer(); else openDrawer();
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    /* ── 划词气泡定位：贴住选区，且永不越出视口 ── */
    function showPopover(range) {
      popover.classList.add('active');
      var w = popover.offsetWidth;
      var h = popover.offsetHeight;
      var vw = document.documentElement.clientWidth;
      var left = window.scrollX + range.getBoundingClientRect().left + range.getBoundingClientRect().width / 2 - w / 2;
      left = Math.max(window.scrollX + 8, Math.min(left, window.scrollX + vw - w - 8));
      var rect = range.getBoundingClientRect();
      var top = window.scrollY + rect.top - h - 8;
      if (rect.top < h + 8) top = window.scrollY + rect.bottom + 8; /* 顶部空间不够就放下方 */
      popover.style.left = left + 'px';
      popover.style.top = top + 'px';
    }
    function hidePopover() { popover.classList.remove('active'); }

    /* 滚动时气泡位置会失效 → 直接收起（比重新定位更不易误触） */
    window.addEventListener('scroll', function () {
      if (popover.classList.contains('active')) hidePopover();
    }, { passive: true });

    function handleSelection() {
      var sel = window.getSelection();
      var text = sel ? sel.toString().trim() : '';
      if (text.length > 2 && sel.rangeCount > 0) {
        currentSelection = text;
        var range = sel.getRangeAt(0);
        var container = range.commonAncestorContainer;
        var elem = container.nodeType === 1 ? container : container.parentElement;
        var prevH = elem ? elem.previousElementSibling : null;
        while (prevH && !/^H[1-6]$/.test(prevH.tagName)) {
          prevH = prevH.previousElementSibling;
        }
        currentSection = prevH ? prevH.textContent.trim() : document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : '';
        showPopover(range);
      } else {
        hidePopover();
      }
    }

    /* 1. 划词监听：鼠标 + 键盘（Shift+方向键）两条路 */
    document.addEventListener('mouseup', function (e) {
      if (popover.contains(e.target) || drawer.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) {
        return;
      }
      handleSelection();
    });
    document.addEventListener('keyup', function (e) {
      if (drawer.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) return;
      if (!e.shiftKey && e.key.indexOf('Arrow') !== 0) return;
      handleSelection();
    });
    /* 2. 气泡动作按钮 */
    popover.querySelectorAll('.lesson-popover-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openDrawerWithAction(this.getAttribute('data-action'));
        hidePopover();
      });
    });

    function openDrawerWithAction(action) {
      openDrawer();
      var actionLabels = {
        'explain': '深入讲讲核心本质与物理图景',
        'derive': '展示详细的分步数理推导',
        'analogy': '用生活常见实例或实验进行类比',
        'pitfall': '剖析高考考场最易踩的错因与陷阱'
      };
      var label = actionLabels[action] || '深入解析';
      var lessonTitle = document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : '当前课题';

      var prompt = '【高中AI伴学提问】\n' +
        '课题：《' + lessonTitle + '》\n' +
        (currentSection ? '对应小节：' + currentSection + '\n' : '') +
        '原文重点内容：\n> ' + currentSelection + '\n\n' +
        '我想请老师帮我：' + label + '。\n' +
        '请按照高考命题标准，先建立直观图景，再进行逻辑拆解，并告诉我高考大题中针对这里的踩分要点。';

      promptInput.value = prompt;

      // 更新抽屉展示内容
      drawerBody.innerHTML =
        '<div class="tutor-context-card">' +
          '<small>当前选中文本与考点上下文</small>' +
          '<b>' + escapeHtml(currentSelection.slice(0, 100)) + (currentSelection.length > 100 ? '...' : '') + '</b>' +
        '</div>' +
        '<div style="margin: 12px 0; color: var(--syo-fg-muted); font-size: 0.8125rem;">' +
          '已为你生成针对该段落的高考学霸提问 Prompt。你可以一键复制发送到 Antigravity 伴学窗口，随时获得 1v1 深度解答！' +
        '</div>' +
        '<div class="tutor-suggestions">' +
          '<div style="font-weight: 600; font-size: 0.8125rem; margin-bottom: 4px;">你可以继续追问：</div>' +
          '<button class="tutor-suggest-btn" data-q="如果把这里的受力条件改变，结论还成立吗？">🔄 改变物理情景进行变式分析</button>' +
          '<button class="tutor-suggest-btn" data-q="高考大题写步骤时，这里的核心方程怎么规范踩分？">📝 高考大题规范踩分列式</button>' +
          '<button class="tutor-suggest-btn" data-q="这里有没有秒杀选择题的二级结论与极限反例？">⚡ 二级结论与极值检验法</button>' +
        '</div>';

      // 绑定追问建议
      drawerBody.querySelectorAll('.tutor-suggest-btn').forEach(function(sBtn) {
        sBtn.addEventListener('click', function() {
          var followUp = this.getAttribute('data-q');
          promptInput.value = promptInput.value + '\n\n补充追问：' + followUp;
          copyPrompt();
        });
      });
    }

    // 5. 复制 Prompt（clipboard API 失败时退回 execCommand，file:// 下也要能复制）
    function copyPrompt() {
      if (!promptInput || !copyBtn) return;
      var original = copyBtn.textContent;
      function ok() {
        copyBtn.textContent = '✓ 已复制！切回对话框粘贴即可';
        if (window.Sayo && window.Sayo.toast) {
          window.Sayo.toast.show('已复制提问 Prompt，切回 Antigravity 即可即时答疑', { type: 'success' });
        }
        setTimeout(function () { copyBtn.textContent = original; }, 2500);
      }
      function legacy() {
        promptInput.select();
        try { if (document.execCommand('copy')) ok(); else copyBtn.textContent = '请手动全选复制上方文本'; }
        catch (e) { copyBtn.textContent = '请手动全选复制上方文本'; }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(promptInput.value).then(ok, legacy);
      } else { legacy(); }
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', copyPrompt);
    }
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTutor);
  } else {
    initTutor();
  }
})();
