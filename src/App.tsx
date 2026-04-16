import { useState, useEffect, useRef } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent } from './components/ui/card'

const CORRECT_PASSWORD='navcoo'

type Theme = 'light' | 'dark'

// ── Resume data (bilingual) ────────────────────────────────────────
const resumeData = {
  name: '李睿',
  nameEn: 'Li Rui',
  title: '技术经理 · 8年经验',
  titleEn: 'Technical Manager · 8 Years Experience',
  email: '78080114@qq.com',
  github: 'lir-navcoo',
  location: '合肥',
  locationEn: 'Hefei',

  education: [
    { school: '江西师范大学', degree: '本科', major: '计算机科学与技术', period: '2019.09 – 2022.06',
      schoolEn: 'Jiangxi Normal University', degreeEn: "Bachelor's", majorEn: 'Computer Science & Technology' },
    { school: '徽商职业学院', degree: '大专', major: '软件技术', period: '2015.09 – 2018.06',
      schoolEn: 'Huishang Vocational College', degreeEn: 'Associate Degree', majorEn: 'Software Technology' },
  ],

  companies: [
    {
      name: '安徽霍迹寻踪科技有限公司',
      nameEn: 'Anhui HuoJi XunZong Technology Co., Ltd.',
      tags: [],
      roles: [
        {
          period: '2024.10 – 至今',
          periodEn: 'Oct 2024 – Present',
          role: '大客户 CSM',
          roleEn: 'Key Account CSM',
          description: '负责大客户客户成功管理，涵盖服务交付、续费管理及客户关系维护，服务阳光电源、丽豪清能、立方制药、济川药业、天准科技、卓郎智能等多家企业。',
          descriptionEn: 'Responsible for key account customer success management, covering service delivery, renewal management, and customer relationship maintenance. Serving Sungrow Power, Lihao Qingneng, Lifang Pharma, Jichuan Pharma, Tianzhun Tech, Zhuolang Intelligence, and other enterprises.',
          achievement: '',
          achievementEn: '',
        },
        {
          period: '2022.10 – 2024.09',
          periodEn: 'Oct 2022 – Sep 2024',
          role: '解决方案中心经理',
          roleEn: 'Solutions Center Manager',
          description: '从 0 到 1 建立霍迹寻踪解决方案体系，主导技术架构设计，负责售前咨询与客户需求梳理，带领团队完成多个大型项目交付（其中阳光电源接待服务平台 1-4 期即为任期内主导签约落地）。负责客户成功全链路管理。',
          descriptionEn: 'Built the HuoJi XunZong solutions system from scratch, led technical architecture design, managed pre-sales consulting and customer requirements. Delivered multiple large-scale projects (including Sungrow Power Reception Platform Phases 1-4, signed and delivered during tenure). Oversaw full customer success lifecycle.',
          achievement: '2023年1月获公司合伙人荣誉。',
          achievementEn: 'Awarded Company Partner Honor in January 2023.',
        },
        {
          period: '2021.06 – 2022.10',
          periodEn: 'Jun 2021 – Oct 2022',
          role: '客户成功部经理',
          roleEn: 'Customer Success Manager',
          description: '1、负责客户成功部日常事物安排。2、制定客户交付、售后、续费等相关规则制定。3、分析制定每个员工的业绩。4、帮助员工提高交付质量，提升续费率。',
          descriptionEn: '1、负责客户成功部日常事物安排。2、制定客户交付、售后、续费等相关规则制定。3、分析制定每个员工的业绩。4、帮助员工提高交付质量，提升续费率。',
          itemsEn: ['Responsible for daily operations of Customer Success Department', 'Established customer delivery, after-sales, and renewal policies', 'Set and analyzed performance metrics for each employee', 'Helped team improve delivery quality and renewal rates'],
          achievement: '担任客户成功部负责人，完成霍迹寻踪客户成功体系建设，构建交付、运维一体化闭环链路，任职期间完成钉钉宜搭交付体系从 0 到 1 建设，完成霍迹寻踪与钉钉宜搭核心代理的建立。',
          achievementEn: 'Led customer success system building, constructed integrated delivery and operations closed-loop. Completed DingTalk Yida delivery system from scratch and established core DingTalk Yida agency partnership.',
        },
      ],
    },
    {
      name: '天津汉博信息技术有限公司',
      nameEn: 'Tianjin Hanbo Information Technology Co., Ltd.',
      tags: ['美团'],
      tagsEn: ['Meituan'],
      roles: [
        {
          period: '2020.09 – 2021.05',
          periodEn: 'Sep 2020 – May 2021',
          role: '客户成功经理',
          roleEn: 'Customer Success Manager',
          description: '1、负责执行公司整体客户策略。2、负责存量客户的续费指标，相关业绩完成。3、负责服务支持，做好管理、培训等。4、负责存量 VIP 客户的服务支持、续约等工作。',
          descriptionEn: '1、负责执行公司整体客户策略。2、负责存量客户的续费指标，相关业绩完成。3、负责服务支持，做好管理、培训等。4、负责存量 VIP 客户的服务支持、续约等工作。',
          itemsEn: ['Executed overall company customer strategy', 'Managed renewal targets for existing customers, achieving related performance goals', 'Oversaw service support, management, and training', 'Managed VIP customer service support and contract renewals'],
          achievement: '获美团收银事业部三星分享师称号，全国排名第二。',
          achievementEn: 'Awarded Meituan Cashier Division Three-Star Sharing Expert, ranked 2nd nationwide.',
        },
        {
          period: '2018.09 – 2020.09',
          periodEn: 'Sep 2018 – Sep 2020',
          role: 'IT技术支持',
          roleEn: 'IT Technical Support',
          description: '1、日常负责合肥及周边城市的收银系统的安装和培训以及存量收银系统商家收银系统的售后维护。2、为商家定制打造线上线下一体化餐厅。3、留存活跃商家和高质量商家。',
          descriptionEn: '1、日常负责合肥及周边城市的收银系统的安装和培训以及存量收银系统商家收银系统的售后维护。2、为商家定制打造线上线下一体化餐厅。3、留存活跃商家和高质量商家。',
          itemsEn: ['Responsible for cashier system installation, training, and after-sales maintenance for merchants in Hefei and surrounding cities', 'Customized and built integrated online-offline restaurant solutions for merchants', 'Retained active and high-quality merchants'],
          achievement: '任职期间参与美团点评繁星计划（M0 培训）获第三名，优秀学员称号。',
          achievementEn: 'Participated in Meituan Dianping Star Program (M0 Training), ranked 3rd and named Outstanding Trainee.',
        },
      ],
    },
  ],

  experience: [
    {
      company: '安徽七禾田餐饮管理有限公司',
      companyEn: 'Anhui Qihe Tian Catering Management Co., Ltd.',
      period: '2018.04 – 2018.09',
      periodEn: 'Apr 2018 – Sep 2018',
      role: 'IT技术支持',
      roleEn: 'IT Technical Support',
      description: '负责集团总部计算机维护、网络维护、服务器管理及资产信息化管理。主导搬迁新办公环境的网络及设备验收工作，建立资产信息化管理系统与多媒体信息化办公体系。',
      descriptionEn: 'Responsible for group headquarters computer maintenance, network management, server administration, and asset informatization. Led network and equipment acceptance for new office relocation, established asset management and multimedia office systems.',
      tags: [],
    },
    {
      company: '马鞍山天禧科技有限公司',
      companyEn: "Ma'anshan Tianxi Technology Co., Ltd.",
      period: '2017.09 – 2018.04',
      periodEn: 'Sep 2017 – Apr 2018',
      role: '运维工程师',
      roleEn: 'Operations Engineer',
      description: '甲方为阳光雨露信息技术服务有限公司，日常负责海尔工业园合肥园区的计算机维护、服务器管理、机房管理、网络管理、资产管理等技术支持。',
      descriptionEn: 'Client: Sunshine Rainfall Information Technology Service Co., Ltd. Daily responsible for computer maintenance, server management, machine room operations, network management, and asset management at Haier Industrial Park Hefei campus.',
      tags: [],
    },
  ],

  about: '擅长 React 与 Spring Boot 技术栈，作为技术经理带领过 10 人以上研发交付团队，擅长从需求出发设计高可用技术方案，具备较强的逻辑思维与学习能力。',
  aboutEn: 'Proficient in React and Spring Boot. As a Technical Manager, led R&D delivery teams of 10+ members. Skilled at designing high-availability systems from requirements. Strong logical thinking and learning ability.',

  skills: [
    { category: '前端技术', categoryEn: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Shadcn/UI', 'AliLowCodeEngine'] },
    { category: '后端技术', categoryEn: 'Backend', items: ['Spring Boot', 'Spring Cloud', 'Java', 'Node.js', 'MySQL', 'Redis'] },
    { category: '架构 & 管理', categoryEn: 'Architecture & Management', items: ['系统架构设计', '团队管理', '需求分析', '技术方案设计'], itemsEn: ['System Architecture Design', 'Team Management', 'Requirements Analysis', 'Technical Solution Design'] },
    { category: '认证资质', categoryEn: 'Certifications', items: ['美团高级认证工程师', '钉钉培训中心认证讲师', '宜搭高级认证讲师', '高级低代码开发师'], itemsEn: ['Meituan Senior Certified Engineer', 'DingTalk Training Center Certified Instructor', 'Yida Senior Certified Instructor', 'Senior Low-Code Developer'] },
  ],

  projects: [
    { name: '阳光电源接待服务平台（1-4期）', nameEn: 'Sungrow Power Reception Service Platform (Phases 1-4)',
      tech: '钉钉宜搭（低代码平台）', techEn: 'DingTalk Yida (Low-Code Platform)',
      description: '基于钉钉宜搭全量闭环阳光电源接待部门日常业务，涵盖会议、用餐、展厅接待等场景，打通公众号实现协议酒店、餐厅等商户在线化管理。',
      descriptionEn: 'Built a full-cycle reception management system on DingTalk Yida for Sungrow Power, covering meeting, dining, and exhibition reception scenarios. Integrated with WeChat Official Account for online management of partner hotels and restaurants.',
      link: '' },
    { name: '阳光电源访客中心平台（1-3期）', nameEn: 'Sungrow Power Visitor Center Platform (Phases 1-3)',
      tech: '钉钉宜搭 + 微信小程序 + Exchange', techEn: 'DingTalk Yida + WeChat Mini Program + Exchange',
      description: '基于钉钉宜搭构建阳光电源个性化访客管理体系，微信小程序承载访客端自主认证，接入 Exchange Server 实现外国访客邮件邀请与线上预约全流程。',
      descriptionEn: 'Built personalized visitor management system on DingTalk Yida for Sungrow Power. WeChat Mini Program handles visitor self-authentication. Integrated with Exchange Server for international visitor email invitations and online booking.',
      link: '' },
    { name: '安徽财经大学低代码微专业', nameEn: 'AHUFE Low-Code Micro-Major',
      tech: '钉钉宜搭 + 教学', techEn: 'DingTalk Yida + Teaching',
      description: '受邀担任安徽财经大学外聘讲师，主讲低代码微专业核心课程，授课成果获校方认可，该微专业于次年获批国家级微专业。',
      descriptionEn: 'Invited as External Lecturer at Anhui University of Finance and Economics, lecturing core low-code courses. Teaching outcomes recognized by the university. The micro-major was approved as a National Micro-Major in the following year.',
      link: '' },
  ],

  githubProjects: [
    { name: 'navcoo-blog', nameEn: 'navcoo-blog',
      tech: 'React + Spring Boot + TypeScript', techEn: 'React + Spring Boot + TypeScript',
      description: '现代化全栈个人博客系统，支持分类筛选、暗色模式、响应式布局，无需登录即可浏览所有已发布文章。',
      descriptionEn: 'Modern full-stack personal blog system with category filtering, dark mode, and responsive layout. All published articles viewable without login.',
      link: 'https://github.com/lir-navcoo/navcoo-bolg' },
    { name: 'tool-box', nameEn: 'tool-box',
      tech: 'React + TypeScript + Tailwind CSS', techEn: 'React + TypeScript + Tailwind CSS',
      description: '简洁高效的在线工具箱，支持 JSON 格式化、加密解密、二维码生成、图片格式转换、颜色工具、个税计算器等实用功能。',
      descriptionEn: 'Clean and efficient online toolkit supporting JSON formatting, encryption/decryption, QR code generation, image conversion, color tools, tax calculator, and more.',
      link: 'https://github.com/lir-navcoo/tool-box' },
    { name: 'coin-flip', nameEn: 'coin-flip',
      tech: 'React + TypeScript + Vite', techEn: 'React + TypeScript + Vite',
      description: '为选择困难症患者打造的在线掷硬币工具，快速做出艰难决定，支持自定义选项。',
      descriptionEn: 'Online coin flip tool for indecisive people. Make tough decisions instantly, with support for custom options.',
      link: 'https://github.com/lir-navcoo/coin-flip' },
    { name: 'resume', nameEn: 'resume',
      tech: 'React + TypeScript + Tailwind CSS', techEn: 'React + TypeScript + Tailwind CSS',
      description: '个人简历介绍页面，支持亮色/暗黑模式切换、密码保护解锁查看。',
      descriptionEn: 'Personal resume page with light/dark mode toggle and password-protected view.',
      link: 'https://github.com/lir-navcoo/resume' },
    { name: 'yida-add-tampermonkey', nameEn: 'yida-add-tampermonkey',
      tech: 'Tampermonkey + 宜搭 API', techEn: 'Tampermonkey + Yida API',
      description: '宜搭效率升级工具油猴脚本，增强宜搭应用功能，提升表单填写和数据处理效率。',
      descriptionEn: 'Tampermonkey script that enhances DingTalk Yida app functionality, improving form filling and data processing efficiency.',
      link: 'https://github.com/lir-navcoo/yida-add-tampermonkey' },
  ],
}

// ── Labels ────────────────────────────────────────────────────────
const labels = {
  name: '姓名', title: '职位', email: '邮箱', github: 'GitHub', phone: '电话', location: '坐标',
  about: '关于我', skills: '技能清单', experience: '工作经历', projects: '项目经历',
  githubProjects: 'GitHub 开源项目', education: '教育背景',
  downloadPdf: '下载 PDF', language: 'EN', switchLang: 'EN', hotKey: 'Ctrl+P',
  printTip: '为增强效果，请打印时勾选"打印背景"',
  printTipTitle: '打印提示',
} as const

const labelsEn = {
  name: 'Name', title: 'Title', email: 'Email', github: 'GitHub', phone: 'Phone', location: 'Location',
  about: 'About Me', skills: 'Skills', experience: 'Experience', projects: 'Projects',
  githubProjects: 'Open Source Projects', education: 'Education',
  downloadPdf: 'Download PDF', language: '中', switchLang: '中文', hotKey: '⌘+P',
  printTip: 'For best results, enable "Print backgrounds" in print settings.',
  printTipTitle: 'Print Tip',
} as const

const i18n = (lang: 'zh' | 'en') => lang === 'en' ? labelsEn : labels

// ── Theme toggle ──────────────────────────────────────────────────
function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={theme === 'dark' ? '切换亮色模式 / Switch to Light' : '切换暗黑模式 / Switch to Dark'}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      style={
        theme === 'dark'
          ? { background: 'rgba(255,255,255,0.1)', color: '#f1f5f9' }
          : { background: 'rgba(0,0,0,0.06)', color: '#475569' }
      }
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

// ── Login screen ──────────────────────────────────────────────────
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
  const bg = isDark ? 'linear-gradient(135deg, #0a0f1e 0%, #111827 40%, #0f172a 100%)' : 'linear-gradient(135deg, #f0f4ff 0%, #e8edf5 50%, #f5f7fa 100%)'
  const cardBg = isDark ? 'rgba(15,23,42,0.75)' : 'rgba(255,255,255,0.85)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
  const textPrimary = isDark ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDark ? '#94a3b8' : '#475569'
  const textMuted = isDark ? '#64748b' : '#94a3b8'
  const inputClass = isDark ? 'bg-white/[0.10] border-white/10 text-slate-100 placeholder:text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400'

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl" style={{ background: isDark ? 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' : 'radial-gradient(ellipse, #93c5fd 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl" style={{ background: isDark ? 'radial-gradient(ellipse, #7c3aed 0%, transparent 70%)' : 'radial-gradient(ellipse, #c4b5fd 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="w-full max-w-xs relative z-10">
        <Card className="border shadow-2xl" style={{ background: cardBg, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderColor: cardBorder }}>
          <CardContent className="pt-7 pb-7 px-7">
            <div className="flex justify-end mb-4">
              <ThemeToggle theme={theme} onToggle={onTheme} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="password-input" className="block text-xs font-medium tracking-widest uppercase" style={{ color: textMuted }}>
                  访问密钥 / Access Key
                </label>
                <div className="relative">
                  <Input
                    id="password-input"
                    ref={inputRef}
                    type={showPw ? 'text' : 'password'}
                    placeholder="输入密钥解锁 / Enter key to unlock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}
                    className={`pr-14 rounded-xl h-12 text-sm border focus-visible:ring-2 transition-all duration-300 ${inputClass} ${error ? 'ring-2 ring-red-500/60' : isDark ? 'focus-visible:ring-blue-500/50' : 'focus-visible:ring-blue-400/50'} ${autoLogging ? 'opacity-60' : ''}`}
                    autoFocus
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] tracking-wide transition-colors" style={{ color: textSecondary }}>
                    {showPw ? '隐藏' : '显示'}
                  </button>
                </div>
                {error && <p className="text-[11px] text-center text-red-500 font-medium tracking-wide animate-pulse">密钥错误，请重新输入 / Wrong key, please retry</p>}
              </div>
              <Button
                type="submit"
                disabled={!password || loading || autoLogging}
                className="w-full h-11 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-40"
                style={password && !loading && !autoLogging ? { background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)', color: '#fff', boxShadow: '0 4px 20px rgba(59,130,246,0.35)' } : { background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: textSecondary }}
              >
                {autoLogging ? (<span className="flex items-center gap-2.5"><span className="w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />验证中...</span>)
                  : loading ? (<span className="flex items-center gap-2.5"><span className="w-3.5 h-3.5 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />解锁中...</span>)
                  : '解锁简历 / Unlock Resume'}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-[11px] mt-5 tracking-wide" style={{ color: textMuted }}>仅限授权访客 · Please do not share</p>
      </div>
    </div>
  )
}

// ── Resume content ────────────────────────────────────────────────
type Lang = 'zh' | 'en'
type Labels = Record<string, string>

function ResumeContent({ theme, onTheme, lang, t, onLang }: { theme: Theme; onTheme: () => void; lang: Lang; t: Labels; onLang: () => void }) {
  const isDark = theme === 'dark'
  const bg = isDark ? 'radial-gradient(ellipse at 50% 0%, #0f1c2e 0%, #080e1a 100%)' : 'radial-gradient(ellipse at 50% 0%, #f0f4ff 0%, #e8edf5 50%, #ffffff 100%)'
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
  const textPrimary = isDark ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDark ? '#94a3b8' : '#475569'
  const textMuted = isDark ? '#64748b' : '#94a3b8'
  const badgeBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
  const sectionAccent = isDark ? 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' : 'linear-gradient(to bottom, #3b82f6, #6366f1)'
  const tagMeituan = isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-50 text-orange-600'

  const L = (zh: string, en: string) => lang === 'en' ? en : zh
  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen py-10 px-4 relative" style={{ background: bg }}>
      {/* Top toolbar */}
      <div className="flex items-center justify-end gap-2 mb-6 pr-4 print:hidden">
        <button onClick={onLang} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-xs font-bold" style={isDark ? { background: 'rgba(255,255,255,0.1)', color: '#e2e8f0' } : { background: 'rgba(0,0,0,0.06)', color: '#475569' }} title={L('切换语言', 'Switch Language')}>
          {t.language}
        </button>
        <div className="relative group">
          <button onClick={handlePrint} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95" style={isDark ? { background: 'rgba(255,255,255,0.1)', color: '#e2e8f0' } : { background: 'rgba(0,0,0,0.06)', color: '#475569' }} title={L('下载 PDF / 快捷键 ' + t.hotKey, 'Download PDF / Hotkey ' + t.hotKey)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          <div className="absolute right-0 top-full mt-2 w-64 px-3 py-2.5 rounded-xl border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" style={{ background: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)', borderColor: cardBorder, color: textSecondary, fontSize: '11px', lineHeight: '1.6', backdropFilter: 'blur(12px)' }}>
            <p className="font-medium mb-1" style={{ color: textPrimary }}>{L('📌 ' + t.printTipTitle, '📌 ' + t.printTipTitle)}</p>
            <p>{L('为增强效果，请打印时勾选"打印背景"', t.printTip)}</p>
            <p className="mt-1" style={{ color: textMuted }}>{L('快捷键: ' + t.hotKey, 'Hotkey: ' + t.hotKey)}</p>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onTheme} />
      </div>

      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center gap-6">
          {resumeData.name && (
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 12px 40px rgba(59,130,246,0.3)' }}>
              <img src="https://static.dingtalk.com/media/lADPDhmOzuuAPhjNAt3NAtw_732_733.jpg" alt={resumeData.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold" style={{ color: textPrimary }}>{L(resumeData.name, resumeData.nameEn)}</h1>
            <p className="mt-1" style={{ color: textSecondary }}>{L(resumeData.title, resumeData.titleEn)}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm" style={{ color: textMuted }}>
              <span>{resumeData.email}</span>
              <span>·</span>
              <span>{L(resumeData.location, resumeData.locationEn)}</span>
              <a href={`https://github.com/${resumeData.github}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-200 hover:opacity-80" style={{ background: badgeBg, borderColor: cardBorder, color: textSecondary }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                {resumeData.github}
              </a>
            </div>
          </div>
        </div>

              {/* About */}
        {resumeData.about && (
          <p className="leading-relaxed" style={{ color: textSecondary }}>{L(resumeData.about, resumeData.aboutEn)}</p>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {resumeData.skills.map((skill, i) => (
              <div key={i} className="rounded-xl p-4 border" style={{ background: cardBg, borderColor: cardBorder }}>
                <p className="text-xs font-medium mb-2" style={{ color: textMuted }}>{L(skill.category, skill.categoryEn || skill.category)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(skill as any).itemsEn
                    ? (skill as any).itemsEn.map((itemEn: string, idx: number) => (
                        <span key={itemEn} className="text-xs px-2 py-0.5 rounded-md" style={{ background: badgeBg, color: textSecondary }}>{L(skill.items[idx], itemEn)}</span>
                      ))
                    : skill.items.map((item: string) => (
                        <span key={item} className="text-xs px-2 py-0.5 rounded-md" style={{ background: badgeBg, color: textSecondary }}>{item}</span>
                      ))
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience - all companies */}
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
            <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
            {L('工作经历', 'Experience')}
          </h2>
          <div className="space-y-4">

            {/* Multi-role companies */}
            {resumeData.companies.map((company, ci) => (
              <div key={'co-' + ci} className="rounded-xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                <div className="px-5 py-3 border-b flex items-center" style={{ borderColor: cardBorder }}>
                  <p className="font-medium" style={{ color: textPrimary }}>{L(company.name, company.nameEn)}</p>
                  {(company.tags || []).map(tag => (
                    <span key={tag} className={`ml-2 text-[10px] px-1.5 py-0.5 rounded font-medium ${tagMeituan}`}>{L(tag, tag === '美团' ? 'Meituan' : tag)}</span>
                  ))}
                </div>
                <div className="divide-y" style={{ borderColor: cardBorder }}>
                  {company.roles.map((role, ri) => (
                    <div key={'role-' + ri} className="p-5">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <p className="font-medium text-sm" style={{ color: textSecondary }}>{L(role.role, role.roleEn)}</p>
                        <span className="text-xs whitespace-nowrap mt-0.5" style={{ color: textMuted }}>{L(role.period, role.periodEn)}</span>
                      </div>
                      {role.description.includes('。') && role.description.match(/^[0-9]、/) ? (
                        <ol className="mt-2 space-y-1 list-decimal list-inside text-sm" style={{ color: textSecondary }}>
                          {role.description.split(/(?=[0-9]、)/).filter(s => s.trim()).map((item, idx) => (
                            <li key={idx} className="leading-relaxed">{L(item.replace(/^[0-9}、]+/, '').trim(), (role as any).itemsEn?.[idx] || item.replace(/^[0-9}、]+/, '').trim())}</li>
                          ))}
                        </ol>
                      ) : (
                        <p className="text-sm mt-1 leading-relaxed" style={{ color: textSecondary }}>{L(role.description, role.descriptionEn)}</p>
                      )}
                      {role.achievement && (
                        <div className="mt-3 px-3 py-2 rounded-lg border" style={{ background: isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.06)', borderColor: isDark ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)' }}>
                          <p className="text-xs font-medium" style={{ color: isDark ? '#93c5fd' : '#3b82f6' }}>{L('优秀成果', 'Achievement')}: {L(role.achievement, role.achievementEn)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Single-role companies - same card style */}
            {resumeData.experience.map((exp, i) => (
              <div key={'exp-' + i} className="rounded-xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                <div className="px-5 py-3 border-b flex items-center" style={{ borderColor: cardBorder }}>
                  <p className="font-medium" style={{ color: textPrimary }}>{L(exp.company, exp.companyEn)}</p>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <p className="font-medium text-sm" style={{ color: textSecondary }}>{L(exp.role, exp.roleEn)}</p>
                    <span className="text-xs whitespace-nowrap mt-0.5" style={{ color: textMuted }}>{L(exp.period, exp.periodEn)}</span>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: textSecondary }}>{L(exp.description, exp.descriptionEn)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Original Projects */}
        {resumeData.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
              {L('项目经历', 'Projects')}
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((project, i) => (
                <div key={i} className="rounded-xl p-5 border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium" style={{ color: textPrimary }}>{L(project.name, project.nameEn)}</p>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: '#60a5fa' }}>↗</a>}
                  </div>
                  {project.tech && <p className="text-xs mb-2" style={{ color: textMuted }}>{L(project.tech, project.techEn)}</p>}
                  <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>{L(project.description, project.descriptionEn)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GitHub Projects */}
        {resumeData.githubProjects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
              {L('GitHub 开源项目', 'Open Source Projects')}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {resumeData.githubProjects.map((project) => (
                <div key={project.name} className="rounded-xl p-5 border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm" style={{ color: textPrimary }}>{L(project.name, project.nameEn)}</p>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: '#60a5fa' }}>↗</a>}
                  </div>
                  {project.tech && <p className="text-[11px] mb-2" style={{ color: textMuted }}>{L(project.tech, project.techEn)}</p>}
                  <p className="text-xs leading-relaxed" style={{ color: textSecondary }}>{L(project.description, project.descriptionEn)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

  
{/* Education */}
        {resumeData.education.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: textPrimary }}>
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: sectionAccent }} />
              {L('教育背景', 'Education')}
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, i) => (
                <div key={i} className="rounded-xl p-5 border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium" style={{ color: textPrimary }}>{L(edu.school, edu.schoolEn)}</p>
                      <p className="text-sm mt-0.5" style={{ color: textSecondary }}>{L(edu.degree, edu.degreeEn)} · {L(edu.major, edu.majorEn)}</p>
                    </div>
                    <span className="text-xs whitespace-nowrap mt-0.5" style={{ color: textMuted }}>{edu.period}</span>
                  </div>
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

// ── Root App ─────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'light')
  const [lang, setLang] = useState<'zh' | 'en'>((localStorage.getItem('lang') as 'zh' | 'en') || 'zh')
  const toggleTheme = () => setTheme((t) => { const next = t === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', next); return next })
  const toggleLang = () => setLang((l) => { const next = l === 'zh' ? 'en' : 'zh'; localStorage.setItem('lang', next); return next })
  const t = i18n(lang) as Labels
  return unlocked ? <ResumeContent theme={theme} onTheme={toggleTheme} lang={lang} t={t} onLang={toggleLang} /> : <PasswordScreen onUnlock={() => setUnlocked(true)} theme={theme} onTheme={toggleTheme} />
}
