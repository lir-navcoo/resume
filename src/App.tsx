import { useState, useEffect, useRef } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent } from './components/ui/card'

const CORRECT_PASSWORD='***'

type Theme = 'light' | 'dark'

const resumeData: {
  name: string
  title: string
  email: string
  github: string
  phone: string
  location: string
  about: string
  skills: { category: string; items: string[] }[]
  experience: { company: string; period: string; role: string; description: string }[]
  projects: { name: string; tech: string; description: string; link: string }[]
} = {
  name: '李睿',
  title: '技术经理 · 8年经验',
  email: '',
  github: 'lir-navcoo',
  phone: '',
  location: '合肥',

  about: `擅长 React 与 Spring Boot 技术栈，作为技术经理带领过 10 人以上研发交付团队，擅长从需求出发设计高可用技术方案，具备较强的逻辑思维与学习能力。`,

  skills: [
    { category: '前端技术', items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS'] },
    { category: '后端技术', items: ['Spring Boot', 'Java', 'Node.js', 'MySQL', 'Redis'] },
    { category: '架构 & 管理', items: ['系统架构设计', '团队管理', '需求分析', '技术方案设计'] },
    { category: '认证资质', items: ['美团高级认证工程师', '钉钉培训中心认证讲师', '宜搭高级认证讲师', '高级低代码开发师'] },
  ],

  experience: [
    {
      company: '安徽霍迹寻踪科技有限公司',
      period: '2022.10 – 至今',
      role: '解决方案中心经理',
      description: '从 0 到 1 建立霍迹寻踪解决方案体系，主导技术架构设计，带领团队完成多个大型项目交付，负责客户成功全链路管理。',
    },
    {
      company: '安徽霍迹寻踪科技有限公司',
      period: '2021.06 – 2022.10',
      role: '客户成功部经理',
      description: '负责客户成功部日常管理，制定交付、售后、续费规则，搭建交付与运维一体化闭环链路。完成钉钉宜搭交付体系从 0 到 1 建设，建立霍迹寻踪与钉钉宜搭核心代理体系。',
    },
    {
      company: '天津汉博信息技术有限公司',
      period: '2020.09 – 2021.05',
      role: '客户成功经理',
      description: '执行公司整体客户策略，负责存量客户续费指标、服务支持与管理培训，推进 VIP 客户续约工作。',
    },
    {
      company: '天津汉博信息技术有限公司',
      period: '2018.09 – 2020.09',
      role: 'IT技术支持',
      description: '负责合肥及周边城市收银系统安装培训与售后维护，为商家打造线上线下一体化餐饮方案，留存活跃商家。参与美团点评繁星计划（M0 培训）获第三名及优秀学员称号。',
    },
    {
      company: '安徽七禾田餐饮管理有限公司',
      period: '2017.09 – 2018.09',
      role: 'IT技术支持',
      description: '负责集团总部计算机维护、网络维护、服务器管理及资产信息化管理。主导搬迁新办公环境的网络及设备验收工作，建立资产信息化管理系统与多媒体信息化办公体系。',
    },
  ],

  projects: [
    {
      name: 'navcoo-blog',
      tech: 'React + Spring Boot + TypeScript',
      description: '现代化全栈个人博客系统，支持分类筛选、暗色模式、响应式布局，无需登录即可浏览所有已发布文章。',
      link: 'https://github.com/lir-navcoo/navcoo-bolg',
    },
    {
      name: 'tool-box',
      tech: 'React + TypeScript + Tailwind CSS',
      description: '简洁高效的在线工具箱，支持 JSON 格式化、加密解密、二维码生成、图片格式转换、颜色工具、个税计算器等实用功能。',
      link: 'https://github.com/lir-navcoo/tool-box',
    },
    {
      name: 'coin-flip',
      tech: 'React + TypeScript + Vite',
      description: '为选择困难症患者打造的在线掷硬币工具，快速做出艰难决定，支持自定义选项。',
      link: 'https://github.com/lir-navcoo/coin-flip',
    },
    {
      name: 'resume',
      tech: 'React + TypeScript + Tailwind CSS',
      description: '个人简历介绍页面，支持亮色/暗黑模式切换、密码保护解锁查看。',
      link: 'https://github.com/lir-navcoo/resume',
    },
  ],
}

// ── Theme toggle button ────────────────────────────────────────────
function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={theme === 'dark' ? '切换亮色模式' : '切换暗黑模式'}
      className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      style={
        theme === 'dark'
          ? { background: 'rgba(255,255,255,0.1)', color: '#f1f5f9' }
          : { background: 'rgba(0,0,0,0.06)', color: '#475569' }
      }
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

// ── Login / Password screen ────────────────────────────────────────
function PasswordScreen({ onUnlock, theme, onTheme }: { onUnlock: () => void; theme: Theme; onTheme: () => void }) {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [autoLogging, setAutoLogging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pwdParam = params.get('pwd')
    if (pwdParam) {
      if (pwdParam === CORRECT_PASSWORD) {
        setAutoLogging(true)
        setTimeout(onUnlock, 600)
      } else {
        setPassword(pwdParam)
        setError(true)
        setTimeout(() => setError(false), 2000)
      }
    }
  }, [onUnlock])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || loading) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    if (password === CORRECT_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setLoading(false)
      setTimeout(() => setError(false), 1500)
    }
  }

  const isDark = theme === 'dark'
  const bg = isDark
    ? 'linear-gradient(135deg, #0a0f1e 0%, #111827 40%, #0f172a 100%)'
    : 'linear-gradient(135deg, #f0f4ff 0%, #e8edf5 50%, #f5f7fa 100%)'
  const cardBg = isDark ? 'rgba(15,23,42,0.75)' : 'rgba(255,255,255,0.85)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
  const textPrimary = isDark ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDark ? '#94a3b8' : '#475569'
  const textMuted = isDark ? '#64748b' : '#94a3b8'
  const inputClass = isDark
    ? 'bg-white/[0.06] border-white/10 text-white placeholder:text-slate-600'
    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400'
  const labelClass = isDark ? 'text-slate-400' : 'text-slate-500'
  const hintClass = isDark ? 'text-slate-700' : 'text-slate-400'

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: bg }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: isDark ? 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' : 'radial-gradient(ellipse, #93c5fd 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{ background: isDark ? 'radial-gradient(ellipse, #7c3aed 0%, transparent 70%)' : 'radial-gradient(ellipse, #c4b5fd 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Theme toggle */}
      <ThemeToggle theme={theme} onToggle={onTheme} />

      <div className="w-full max-w-xs relative z-10">
        <Card
          className="border shadow-2xl"
          style={{ background: cardBg, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderColor: cardBorder }}
        >
          <CardContent className="pt-7 pb-7 px-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Label + Input as a tight group */}
              <div className="space-y-3">
                <label
                  htmlFor="password-input"
                  className="block text-xs font-medium tracking-widest uppercase"
                  style={{ color: textMuted }}
                >
                  访问密钥
                </label>
                <div className="relative">
                  <Input
                    id="password-input"
                    ref={inputRef}
                    type={showPw ? 'text' : 'password'}
                    placeholder="输入密钥解锁"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`
                      pr-14 rounded-xl h-12 text-sm
                      border focus-visible:ring-2
                      transition-all duration-300
                      ${inputClass}
                      ${error ? 'ring-2 ring-red-500/60' : isDark ? 'focus-visible:ring-blue-500/50' : 'focus-visible:ring-blue-400/50'}
                      ${autoLogging ? 'opacity-60' : ''}
                    `}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] tracking-wide transition-colors"
                    style={{ color: textSecondary }}
                  >
                    {showPw ? '隐藏' : '显示'}
                  </button>
                </div>

                {error && (
                  <p className="text-[11px] text-center text-red-500 font-medium tracking-wide animate-pulse">
                    密钥错误，请重新输入
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!password || loading || autoLogging}
                className="w-full h-11 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-40"
                style={
                  password && !loading && !autoLogging
                    ? { background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)', color: '#fff', boxShadow: '0 4px 20px rgba(59,130,246,0.35)' }
                    : { background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: textSecondary }
                }
              >
                {autoLogging ? (
                  <span className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />
                    验证中
                  </span>
                ) : loading ? (
                  <span className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />
                    解锁中
                  </span>
                ) : (
                  '解锁简历'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-[11px] mt-5 tracking-wide" style={{ color: textMuted }}>
          仅限授权访客 · 请勿分享
        </p>
      </div>
    </div>
  )
}

// ── Resume content ──────────────────────────────────────────────────
function ResumeContent({ theme, onTheme }: { theme: Theme; onTheme: () => void }) {
  const isDark = theme === 'dark'
  const bg = isDark
    ? 'radial-gradient(ellipse at 50% 0%, #0f1c2e 0%, #080e1a 100%)'
    : 'radial-gradient(ellipse at 50% 0%, #f0f4ff 0%, #e8edf5 50%, #ffffff 100%)'
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
  const textPrimary = isDark ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDark ? '#94a3b8' : '#475569'
  const textMuted = isDark ? '#64748b' : '#94a3b8'
  const badgeBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
  const sectionAccent = isDark ? 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' : 'linear-gradient(to bottom, #3b82f6, #6366f1)'

  return (
    <div className="min-h-screen py-10 px-4 relative" style={{ background: bg }}>
      {/* Theme toggle */}
      <ThemeToggle theme={theme} onToggle={onTheme} />

      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-start gap-5">
          {resumeData.name && (
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 12px 40px rgba(59,130,246,0.3)' }}
            >
              <span className="text-white text-3xl font-bold">{resumeData.name[0]}</span>
            </div>
          )}
          <div>
            {resumeData.name && <h1 className="text-3xl font-bold" style={{ color: textPrimary }}>{resumeData.name}</h1>}
            {resumeData.title && <p className="mt-1" style={{ color: textSecondary }}>{resumeData.title}</p>}
            <div className="flex flex-wrap gap-3 mt-3 text-sm" style={{ color: textMuted }}>
              {resumeData.email && <span>{resumeData.email}</span>}
              {resumeData.email && resumeData.github && <span>·</span>}
              {resumeData.github && <span>{resumeData.github}</span>}
              {(resumeData.email || resumeData.github) && resumeData.location && <span>·</span>}
              {resumeData.location && <span>{resumeData.location}</span>}
            </div>
          </div>
        </div>

        {/* About */}
        {resumeData.about && (
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
              关于我
            </h2>
            <p className="leading-relaxed" style={{ color: textSecondary }}>{resumeData.about}</p>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
              技能清单
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {resumeData.skills.map((skill) => (
                <div
                  key={skill.category}
                  className="rounded-xl p-4 border"
                  style={{ background: cardBg, borderColor: cardBorder }}
                >
                  <p className="text-xs font-medium mb-2" style={{ color: textMuted }}>{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: badgeBg, color: textSecondary }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
              工作经历
            </h2>
            <div className="space-y-3">
              {resumeData.experience.map((exp, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border"
                  style={{ background: cardBg, borderColor: cardBorder }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium" style={{ color: textPrimary }}>{exp.company}</p>
                      <p className="text-sm mt-0.5" style={{ color: textSecondary }}>{exp.role}</p>
                    </div>
                    <span className="text-xs whitespace-nowrap mt-0.5" style={{ color: textMuted }}>{exp.period}</span>
                  </div>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: textSecondary }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
              项目经历
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl p-5 border"
                  style={{ background: cardBg, borderColor: cardBorder }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium" style={{ color: textPrimary }}>{project.name}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs"
                        style={{ color: '#60a5fa' }}
                      >
                        查看源码 ↗
                      </a>
                    )}
                  </div>
                  {project.tech && <p className="text-xs mb-2" style={{ color: textMuted }}>{project.tech}</p>}
                  <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center text-xs pt-4" style={{ color: textMuted }}>
          © {new Date().getFullYear()} {resumeData.name} · Built with React + Tailwind CSS
        </footer>
      </div>
    </div>
  )
}

// ── Root App ───────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return unlocked
    ? <ResumeContent theme={theme} onTheme={toggleTheme} />
    : <PasswordScreen onUnlock={() => setUnlocked(true)} theme={theme} onTheme={toggleTheme} />
}