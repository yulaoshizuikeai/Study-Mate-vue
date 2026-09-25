import { useState } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────
const IconSun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
)
const IconMoon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
const IconChevronRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
)
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
)
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
)
const IconZap = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IconTarget = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
)
const IconBrain = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
)
const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const IconAI = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3" fill="currentColor" stroke="none"/>
  </svg>
)
const IconCompass = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
)
const IconRadar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const IconBook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)
const IconFlask = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6l1 6H8L9 3z"/><path d="M8 9l-4 11h16L16 9"/>
  </svg>
)
const IconFunction = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4c-1.7 0-3 1.3-3 3v3H5v2h2v3c0 1.7-1.3 3-3 3"/><path d="M14 4c1.7 0 3 1.3 3 3v3h2v2h-2v3c0 1.7 1.3 3 3 3"/>
  </svg>
)
const IconGlobe = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

// ── Progress Ring ──────────────────────────────────────────────────────────
function ProgressRing({ pct, size = 52, stroke = 4, color = '#2563EB' }: {
  pct: number; size?: number; stroke?: number; color?: string
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s ease' }}/>
    </svg>
  )
}

// ── Mini Bar ───────────────────────────────────────────────────────────────
function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.4s ease' }}/>
    </div>
  )
}

// ── Radar Chart (SVG hexagon) ──────────────────────────────────────────────
function RadarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const cx = 80, cy = 80, r = 60
  const n = data.length
  const pts = (scale: number) => data.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return [cx + Math.cos(a) * r * scale, cy + Math.sin(a) * r * scale]
  })
  const grid = [0.25, 0.5, 0.75, 1]
  const toSVGPath = (points: number[][]) => points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + 'Z'
  const dataPoints = pts(1).map((p, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    const v = data[i].value / 100
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v]
  })
  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      {grid.map(s => (
        <polygon key={s} points={pts(s).map(p => p.join(',')).join(' ')}
          fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.6"/>
      ))}
      {pts(1).map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p[0]} y2={p[1]}
          stroke="var(--border)" strokeWidth="1" opacity="0.4"/>
      ))}
      <path d={toSVGPath(dataPoints)}
        fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={data[i].color} stroke="var(--card)" strokeWidth="1.5"/>
      ))}
      {pts(1).map((p, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2
        const lx = cx + Math.cos(a) * (r + 14)
        const ly = cy + Math.sin(a) * (r + 14)
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fill="var(--muted-foreground)" fontFamily="Inter, sans-serif">
            {data[i].label}
          </text>
        )
      })}
    </svg>
  )
}

// ── Subject Card ───────────────────────────────────────────────────────────
function SubjectCard({ subject, icon, color, node, pct, timestamp, filter }: {
  subject: string; icon: React.ReactNode; color: string; node: string; pct: number; timestamp: string; filter: string
}) {
  if (filter === '进行中' && pct >= 100) return null
  if (filter === '已掌握' && pct < 100) return null
  return (
    <div className="card subject-card hover-lift" style={{ padding: '18px 20px', cursor: 'pointer', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${color}18`, color: color, flexShrink: 0
          }}>
            {icon}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.3 }}>{subject}</div>
            <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2 }}>{node}</div>
          </div>
        </div>
        <div className="continue-btn" style={{
          display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500,
          color: '#2563EB', whiteSpace: 'nowrap'
        }}>
          继续学习 <IconChevronRight />
        </div>
      </div>
      <MiniBar pct={pct} color={color} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11 }}>
        <span style={{ color: color, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{pct}%</span>
        <span style={{ color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <IconClock />{timestamp}
        </span>
      </div>
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true)
  const [filter, setFilter] = useState('全部')
  const [search, setSearch] = useState('')

  const isDark = dark

  const radarData = [
    { label: '物理(弱)', value: 58, color: '#2563EB' },
    { label: '数学(弱)', value: 62, color: '#0EA5E9' },
    { label: '化学', value: 78, color: '#10B981' },
    { label: '英语', value: 75, color: '#8B5CF6' },
    { label: '语文(弱)', value: 60, color: '#F97316' },
    { label: '生物', value: 82, color: '#06B6D4' },
  ]

  const subjects = [
    { subject: '高考物理·动力学两类问题', icon: <IconZap />, color: '#2563EB', node: '规范受力分析与隔离法', pct: 72, timestamp: '今天 09:14' },
    { subject: '高中化学·水溶液离子平衡', icon: <IconFlask />, color: '#10B981', node: 'Kw与溶液酸碱性判断', pct: 45, timestamp: '昨天 21:30' },
    { subject: '高中数学·导数与极值', icon: <IconFunction />, color: '#8B5CF6', node: '单调性与极值的关系证明', pct: 88, timestamp: '2天前' },
    { subject: '高考英语·阅读理解策略', icon: <IconGlobe />, color: '#F97316', node: '主旨推断题与细节定位', pct: 60, timestamp: '3天前' },
    { subject: '高中生物·基因工程', icon: <IconBrain />, color: '#06B6D4', node: '限制性核酸内切酶原理', pct: 33, timestamp: '4天前' },
    { subject: '高考语文·古诗词鉴赏', icon: <IconBook />, color: '#EC4899', node: '意象分析与情感把握', pct: 55, timestamp: '5天前' },
  ]

  const filteredSubjects = subjects.filter(s => {
    const matchSearch = search === '' || s.subject.includes(search) || s.node.includes(search)
    const matchFilter = filter === '全部' || (filter === '进行中' && s.pct < 100) || (filter === '已掌握' && s.pct >= 100)
    return matchSearch && matchFilter
  })

  // Hour-based greeting
  const hour = new Date().getHours()
  const greeting = hour < 6 ? '夜深了，注意休息' : hour < 12 ? '早自习' : hour < 18 ? '下午好' : '晚自习'
  const greetLine = hour < 6 ? '静夜自习，专注每一刻' : hour < 12 ? '清晨最清醒，攻坚难题正当时' : hour < 18 ? '坚持就是胜利，离目标又近一步' : '晚自习高效时刻，冲刺备考不止步'

  return (
    <div className={isDark ? 'dark' : ''} style={{ minHeight: '100vh', background: 'var(--background)' }}>
      {/* Subtle grid texture */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: isDark
          ? 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,99,235,0.08) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,99,235,0.04) 0%, transparent 70%)'
      }}/>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '0 32px' }}>

        {/* ── HEADER ────────────────────────────────────────────────── */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 0', borderBottom: '1px solid var(--border)', marginBottom: 32
        }}>
          {/* Left: Logo + Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <IconStar />
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
                StudyMate
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted-foreground)', fontSize: 13 }}>
              <span style={{ opacity: 0.5 }}>/</span>
              <span>高中理科</span>
              <IconChevronRight />
              <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>2026 冲刺</span>
            </div>
          </div>

          {/* Right: Countdown + Toggle + User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Countdown capsule */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px',
              borderRadius: 999, background: isDark ? 'rgba(249,115,22,0.1)' : 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.25)'
            }}>
              <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316' }}/>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#F97316', fontFamily: 'JetBrains Mono, monospace' }}>
                距高考 256 天
              </span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="theme-toggle glass"
              style={{
                background: isDark ? 'rgba(37,99,235,0.2)' : 'rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center',
                paddingLeft: isDark ? 22 : 2, paddingRight: isDark ? 2 : 22,
                transition: 'all 0.2s ease'
              }}
              title="切换主题"
            >
              <div className="theme-toggle-thumb" style={{
                left: isDark ? 22 : 2,
                background: isDark ? '#2563EB' : '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isDark ? '#fff' : '#64748B'
              }}>
                {isDark ? <IconMoon /> : <IconSun />}
              </div>
            </button>

            {/* User avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>Elias</div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>高二上学期 · 新高考全国I卷</div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0
              }}>E</div>
            </div>
          </div>
        </header>

        {/* ── HERO & METRICS ──────────────────────────────────────── */}
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
            {/* Greeting */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {greeting}
                </span>
                <div style={{ width: 20, height: 1, background: 'rgba(14,165,233,0.4)' }}/>
                <span style={{ fontSize: 11, color: '#F97316', fontWeight: 600 }}>高二上学期 · 阶段学习</span>
              </div>
              <h1 style={{
                fontSize: 28, fontWeight: 700, color: 'var(--foreground)',
                margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2
              }}>
                早安，Elias 👋
              </h1>
              <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                按计划开始今天的学习 · 重点薄弱科目：<strong style={{ color: '#2563EB' }}>物理</strong>、<strong style={{ color: '#0EA5E9' }}>数学</strong>、<strong style={{ color: '#F97316' }}>语文</strong>
              </p>
            </div>

            {/* Metric cards */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { label: '进行中科目', val: '2', unit: '门', color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
                { label: '待学考点', val: '5', unit: '个', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)' },
                { label: '已练例题', val: '42', unit: '题', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
              ].map(m => (
                <div key={m.label} className="card" style={{
                  padding: '14px 18px', minWidth: 130, textAlign: 'center'
                }}>
                  <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: m.color, lineHeight: 1 }}>
                    {m.val}
                    <span style={{ fontSize: 12, fontWeight: 500, marginLeft: 3, opacity: 0.7 }}>{m.unit}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 6, lineHeight: 1.4 }}>{m.label}</div>
                </div>
              ))}

              {/* Mastery ring card */}
              <div className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ProgressRing pct={68} size={52} stroke={4} color="#8B5CF6" />
                  <span className="mono" style={{
                    position: 'absolute', fontSize: 11, fontWeight: 700, color: '#8B5CF6'
                  }}>68%</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--foreground)' }}>综合掌握度</div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 3 }}>按学习进度统计</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BENTO GRID: Compass + Radar ─────────────────────────── */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>

          {/* Card A: Exam Compass */}
          <div className="card gradient-border hover-lift" style={{ padding: '24px 26px', position: 'relative', overflow: 'hidden' }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute', right: -20, top: -20, width: 160, height: 160,
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}/>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9, background: 'rgba(37,99,235,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB'
                }}>
                  <IconCompass />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>学情备考档案</div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>学习状态与目标</div>
                </div>
              </div>
              <span className="tag" style={{ background: 'rgba(37,99,235,0.12)', color: '#2563EB', border: '1px solid rgba(37,99,235,0.2)' }}>
                已配置
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { icon: <IconTarget />, label: '考区 / 卷型', value: '新高考全国I卷', color: '#2563EB' },
                { icon: <IconStar />, label: '目标档位', value: '目标 85–95 分', color: '#F97316' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '12px 14px', borderRadius: 10,
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: item.color }}>
                    {item.icon}
                    <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--muted-foreground)', letterSpacing: '0.04em' }}>
                      {item.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Cognitive style tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>认知风格</span>
              <span className="tag" style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.2)' }}>
                <IconBrain /> 直观物理图景型
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8,
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                border: '1px solid var(--border)', color: 'var(--foreground)',
                fontSize: 12, fontWeight: 500, cursor: 'pointer'
              }}>
                3题自测
              </button>
            </div>
          </div>

          {/* Card B: Review Radar */}
          <div className="card gradient-border hover-lift" style={{ padding: '24px 26px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', left: -20, bottom: -20, width: 160, height: 160,
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}/>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9, background: 'rgba(249,115,22,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F97316'
                }}>
                  <IconRadar />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>艾宾浩斯复习计划</div>
                  <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>错题统计</div>
                </div>
              </div>
              <span className="tag" style={{ background: 'rgba(249,115,22,0.12)', color: '#F97316', border: '1px solid rgba(249,115,22,0.25)' }}>
                今日待复习 3 题
              </span>
            </div>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {/* Radar chart */}
              <div style={{ flexShrink: 0 }}>
                <RadarChart data={radarData} />
              </div>

              {/* Error distribution */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  错因类型分布
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: '审题遗漏', count: 1, color: '#F97316' },
                    { label: '概念混淆', count: 0, color: '#8B5CF6' },
                    { label: '模型套错', count: 2, color: '#2563EB' },
                    { label: '计算失误', count: 0, color: '#10B981' },
                  ].map(e => (
                    <div key={e.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="tag" style={{
                        background: e.count > 0 ? `${e.color}14` : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        color: e.count > 0 ? e.color : 'var(--muted-foreground)',
                        border: `1px solid ${e.count > 0 ? e.color + '30' : 'var(--border)'}`,
                        fontSize: 11
                      }}>
                        {e.label}
                      </span>
                      <span className="mono" style={{
                        fontSize: 13, fontWeight: 700,
                        color: e.count > 0 ? e.color : 'var(--muted-foreground)'
                      }}>
                        {e.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button style={{
              marginTop: 16, width: '100%', padding: '11px 20px', borderRadius: 10,
              background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
              border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
              transition: 'opacity 0.15s ease, transform 0.15s ease'
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = '0.9'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.opacity = '1'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              开始今日错题复习
              <IconChevronRight size={14} />
            </button>
          </div>
        </section>

        {/* ── SUBJECT LIBRARY ──────────────────────────────────────── */}
        <section style={{ marginBottom: 28 }}>
          {/* Control bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--foreground)' }}>
                学科列表
              </h2>
              {/* Segmented control */}
              <div style={{
                display: 'flex', padding: '3px', borderRadius: 10,
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: '1px solid var(--border)'
              }}>
                {['全部', '进行中', '已掌握'].map(f => (
                  <button key={f} className={`seg-btn${filter === f ? ' active' : ''}`}
                    onClick={() => setFilter(f)}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px',
              borderRadius: 9, background: 'var(--card)', border: '1px solid var(--border)',
              minWidth: 220
            }}>
              <span style={{ color: 'var(--muted-foreground)' }}><IconSearch /></span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索学科、模型、考点..."
                style={{
                  border: 'none', background: 'transparent', outline: 'none',
                  fontSize: 13, color: 'var(--foreground)', flex: 1, minWidth: 0
                }}
              />
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {filteredSubjects.map(s => (
              <SubjectCard key={s.subject} filter={filter} {...s} />
            ))}
            {filteredSubjects.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: 'var(--muted-foreground)', fontSize: 14 }}>
                没有匹配的学科内容
              </div>
            )}
          </div>
        </section>

        {/* ── AI ASSISTANT BAR ─────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
          borderRadius: 12, background: isDark ? 'rgba(37,99,235,0.06)' : 'rgba(37,99,235,0.04)',
          border: '1px solid rgba(37,99,235,0.18)', marginBottom: 32
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0
          }}>
            <IconAI />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#2563EB', marginBottom: 2 }}>
              AI 学习助手 · 随时答疑
            </div>
            <div style={{ fontSize: 13, color: 'var(--foreground)', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              遇到理解困难的知识点，在课件中可随时划词或在右下角呼出助手查看答疑与推导
            </div>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
            borderRadius: 8, background: 'rgba(37,99,235,0.12)',
            border: '1px solid rgba(37,99,235,0.25)', color: '#2563EB',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
            transition: 'background 0.15s ease'
          }}>
            添加新科目 <IconChevronRight />
          </button>
        </div>

      </div>
    </div>
  )
}
