import { useState, useEffect, useRef } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent } from './components/ui/card'

const CORRECT_PASSWORD = 'lirui'

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
      name: '钉钉宜搭交付体系',
      tech: '钉钉宜搭 + 低代码平台',
      description: '从 0 到 1 搭建钉钉宜搭交付体系，完成霍迹寻踪与钉钉宜搭核心代理建立，实现企业级应用快速交付。',
      link: '',
    },
    {
      name: '客户成功管理体系',
      tech: 'Spring Boot + MySQL + Redis',
      description: '搭建交付、运维、续费一体化闭环链路，打通客户全生命周期管理，任职期间续费率显著提升。',
      link: '',
    },
    {
      name: '线上线下一体化餐饮方案',
      tech: '收银系统 + 美团 API 集成',
      description: '为餐饮商家定制线上线下一体化方案，整合收银、点餐、外卖全流程，提升商家运营效率。',
      link: '',
    },
  ],
}

function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
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

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0f1e 0%, #111827 40%, #0f172a 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-6 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #7c3aed 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="w-full max-w-xs relative z-10">
        <Card
          className="border border-white/10 shadow-2xl"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <CardContent className="pt-6 pb-6 px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium tracking-wider uppercase">
                  访问密钥
                </label>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    type={showPw ? 'text' : 'password'}
                    placeholder="输入密钥"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`
                      pr-16 bg-white/[0.06] border-white/10 text-white placeholder:text-slate-600
                      rounded-xl h-12 text-sm
                      focus-visible:ring-2 focus-visible:ring-blue-500/40
                      transition-all duration-300
                      ${error ? 'ring-1 ring-red-500/60 focus:ring-red-500/40' : ''}
                      ${autoLogging ? 'opacity-70' : ''}
                    `}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 hover:text-slate-300 transition-colors tracking-wide"
                  >
                    {showPw ? '隐藏' : '显示'}
                  </button>
                </div>

                {error && (
                  <p className="text-[11px] text-center text-red-400 font-medium tracking-wide animate-pulse">
                    密钥错误，请重新输入
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!password || loading || autoLogging}
                className="w-full h-11 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50"
                style={
                  password && !loading && !autoLogging
                    ? {
                        background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.35)',
                      }
                    : { background: 'rgba(255,255,255,0.06)' }
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

        <p className="text-center text-[11px] text-slate-700 mt-6 tracking-wide">
          仅限授权访客 · 请勿分享
        </p>
      </div>
    </div>
  )
}

function ResumeContent() {
  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #0f1c2e 0%, #080e1a 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-start gap-5">
          {resumeData.name && (
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 12px 40px rgba(59,130,246,0.3)',
              }}
            >
              <span className="text-white text-3xl font-bold">{resumeData.name[0]}</span>
            </div>
          )}
          <div>
            {resumeData.name && <h1 className="text-3xl font-bold text-white">{resumeData.name}</h1>}
            {resumeData.title && <p className="text-slate-400 mt-1">{resumeData.title}</p>}
            {(resumeData.email || resumeData.github || resumeData.location) && (
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
                {resumeData.email && <span>{resumeData.email}</span>}
                {resumeData.email && resumeData.github && <span>·</span>}
                {resumeData.github && <span>{resumeData.github}</span>}
                {(resumeData.email || resumeData.github) && resumeData.location && <span>·</span>}
                {resumeData.location && <span>{resumeData.location}</span>}
              </div>
            )}
          </div>
        </div>

        {/* About */}
        {resumeData.about && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span
                className="w-1 h-5 rounded-full inline-block"
                style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }}
              />
              关于我
            </h2>
            <p className="text-slate-400 leading-relaxed">{resumeData.about}</p>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span
                className="w-1 h-5 rounded-full inline-block"
                style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }}
              />
              技能清单
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {resumeData.skills.map((skill) => (
                <div
                  key={skill.category}
                  className="rounded-xl p-4 border"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <p className="text-xs font-medium text-slate-500 mb-2">{skill.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2 py-0.5 rounded-md text-slate-300"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
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
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span
                className="w-1 h-5 rounded-full inline-block"
                style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }}
              />
              工作经历
            </h2>
            <div className="space-y-3">
              {resumeData.experience.map((exp, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">{exp.company}</p>
                      <p className="text-sm text-slate-400">{exp.role}</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span
                className="w-1 h-5 rounded-full inline-block"
                style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }}
              />
              项目经历
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl p-5 border"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-white">{project.name}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline"
                      >
                        查看源码 ↗
                      </a>
                    )}
                  </div>
                  {project.tech && <p className="text-xs text-slate-500 mb-2">{project.tech}</p>}
                  <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center text-xs text-slate-600 pt-4">
          © {new Date().getFullYear()} {resumeData.name} · Built with React + Tailwind CSS
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  return unlocked ? <ResumeContent /> : <PasswordScreen onUnlock={() => setUnlocked(true)} />
}
