import { defineConfig } from 'vitepress'
import { katex } from '@mdit/plugin-katex'
import container from 'markdown-it-container'

export default defineConfig({
  lang: 'zh-CN',
  title: 'StudyMate 高中版',
  description: 'AI 高中学霸伴学助手：考纲模型、矢量图解、分步踩分、错因顿悟',
  
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css' }]
  ],

  markdown: {
    config: (md) => {
      md.use(katex, { strict: false })
      md.use(container, 'svg', {
        render: (tokens, idx) => {
          const token = tokens[idx]
          if (token.nesting === 1) {
            const title = token.info.trim().slice(3).trim()
            return `<SvgViewer title="${title || '高中理科标准矢量图解'}">\n`
          } else {
            return '</SvgViewer>\n'
          }
        }
      })
    }
  },

  themeConfig: {
    siteTitle: '⚡ StudyMate 高中版',
    
    nav: [
      {
            "text": "学情大厅",
            "link": "/"
      },
      {
            "text": "学科库",
            "items": [
                  {
                        "text": "高中化学：水的电离平衡与溶液酸碱性",
                        "link": "/subjects/chemistry-water-ionization/"
                  },
                  {
                        "text": "高考物理·牛顿运动定律与动力学应用",
                        "link": "/subjects/physics-dynamics/"
                  }
            ]
      },
      {
            "text": "错题本与归因",
            "link": "/mistakes/"
      }
],

    sidebar: {
      "/subjects/chemistry-water-ionization/": [
            {
                  "text": "高中化学：水的电离平衡与溶液酸碱性",
                  "items": [
                        {
                              "text": "📌 学科总览与考纲",
                              "link": "/subjects/chemistry-water-ionization/"
                        },
                        {
                              "text": "水的电离平衡与离子积常数Kw",
                              "link": "/subjects/chemistry-water-ionization/lessons/water.ionization-kw"
                        }
                  ]
            }
      ],
      "/subjects/physics-dynamics/": [
            {
                  "text": "高考物理·牛顿运动定律与动力学应用",
                  "items": [
                        {
                              "text": "📌 学科总览与考纲",
                              "link": "/subjects/physics-dynamics/"
                        },
                        {
                              "text": "规范受力分析",
                              "link": "/subjects/physics-dynamics/lessons/dynamics.force-analysis"
                        }
                  ]
            }
      ]
},

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索考点、模型与错题',
            buttonAriaLabel: '搜索考点、模型与错题'
          },
          modal: {
            noResultsText: '未找到相关知识点',
            resetButtonTitle: '清除搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3],
      label: '本课要点导航'
    },

    docFooter: {
      prev: '上一节',
      next: '下一节'
    }
  }
})
