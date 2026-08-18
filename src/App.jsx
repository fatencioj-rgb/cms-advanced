import { useState } from 'react'
import { syllabus } from './data/syllabus'

const navItems = [
  { key: 'wine', label: 'Wine' },
  { key: 'spirits', label: 'Spirits' },
  { key: 'viticulture', label: 'Viticulture' },
  { key: 'tasting', label: 'Tasting' },
  { key: 'service', label: 'Service' },
]

function App() {
  const [view, setView] = useState('home')
  const [topic, setTopic] = useState(null)

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[220px] fixed top-0 left-0 h-screen border-r border-rule flex flex-col justify-between py-6 px-4 bg-paper">
        <div>
          <div className="flex items-center gap-2.5 px-2 mb-8">
            <img src="/cms-advanced/logo.png" alt="CMS" className="w-7 h-7 object-contain opacity-80" />
            <span className="text-[11px] text-ink-3 tracking-wide">Fiorella Atencio</span>
          </div>

          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => { setView('home'); setTopic(null); }}
              className={`px-3 py-2 rounded-[var(--radius-sm)] text-[13px] text-left cursor-pointer transition-all duration-[var(--dur-fast)] ${
                view === 'home' ? 'bg-accent-surface text-accent font-medium' : 'text-ink-2 hover:bg-paper-2'
              }`}
            >
              Overview
            </button>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setView(item.key); setTopic(null); }}
                className={`px-3 py-2 rounded-[var(--radius-sm)] text-[13px] text-left cursor-pointer transition-all duration-[var(--dur-fast)] ${
                  view === item.key ? 'bg-accent-surface text-accent font-medium' : 'text-ink-2 hover:bg-paper-2'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-2 text-[10px] text-ink-3 leading-relaxed">
          CMS Europe<br/>Advanced Sommelier<br/>2026 / 2027
        </div>
      </aside>

      {/* Main */}
      <main className="ml-[220px] flex-1 min-h-screen px-12 py-10 max-w-[740px]">
        {view === 'home' && !topic && <HomeView />}
        {view !== 'home' && !topic && (
          <SectionView section={syllabus[view]} onSelectTopic={setTopic} />
        )}
        {topic && <TopicDetail topic={topic} onBack={() => setTopic(null)} />}
      </main>
    </div>
  )
}

function HomeView() {
  return (
    <>
      <h1 className="font-serif text-[var(--text-display)] text-ink font-normal tracking-tight leading-[1.15] mb-3">
        Advanced Sommelier
      </h1>
      <p className="text-[var(--text-base)] text-ink-2 mb-10 max-w-[480px]">
        Study log for the Court of Master Sommeliers Europe examination. Five pillars, structured by the 2026/2027 syllabus.
      </p>
      <div className="h-[1px] bg-rule mb-10"></div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(syllabus).map(([key, section]) => (
          <div key={key} className="border border-rule rounded-[var(--radius-md)] p-5 hover:border-accent/30 transition-colors duration-[var(--dur-normal)]">
            <h3 className="text-[var(--text-sm)] font-medium text-ink mb-1">{section.title}</h3>
            <p className="text-[var(--text-xs)] text-ink-3">{section.groups.length} sections · {section.groups.reduce((acc, g) => acc + g.topics.length, 0)} topics</p>
          </div>
        ))}
      </div>
    </>
  )
}

function SectionView({ section, onSelectTopic }) {
  return (
    <>
      <h1 className="font-serif text-[var(--text-2xl)] text-ink font-normal tracking-tight mb-8">{section.title}</h1>
      <div className="flex flex-col gap-10">
        {section.groups.map((group) => (
          <div key={group.label}>
            <h3 className="text-[var(--text-xs)] text-ink-3 tracking-[1.5px] uppercase font-medium mb-3">{group.label}</h3>
            <div className="flex flex-col">
              {group.topics.map((t) => (
                <button
                  key={t.name}
                  onClick={() => onSelectTopic(t)}
                  className="flex items-center justify-between py-3 px-1 border-b border-rule text-[var(--text-sm)] text-ink-2 hover:text-accent cursor-pointer text-left transition-colors duration-[var(--dur-fast)] group"
                >
                  <span>{t.name}</span>
                  <span className="text-[10px] text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--dur-fast)]">→</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function TopicDetail({ topic, onBack }) {
  return (
    <>
      <button onClick={onBack} className="text-[var(--text-xs)] text-ink-3 hover:text-accent transition-colors duration-[var(--dur-fast)] mb-8 cursor-pointer">
        ← Back
      </button>
      <h1 className="font-serif text-[var(--text-xl)] text-ink font-normal tracking-tight mb-10">{topic.name}</h1>

      <section className="mb-10">
        <h3 className="text-[var(--text-xs)] text-ink-3 tracking-[1.5px] uppercase font-medium mb-4">Context · Intro + Certified</h3>
        <div className="flex flex-col gap-2.5">
          {topic.context.map((item, i) => (
            <p key={i} className="text-[var(--text-sm)] text-ink-2 leading-relaxed pl-4 border-l border-rule">{item}</p>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[var(--text-xs)] text-accent tracking-[1.5px] uppercase font-medium mb-4">Advanced · Study Focus</h3>
        <div className="flex flex-col gap-2.5">
          {topic.advanced.map((item, i) => (
            <p key={i} className="text-[var(--text-sm)] text-ink leading-relaxed pl-4 border-l-2 border-accent">{item}</p>
          ))}
        </div>
      </section>
    </>
  )
}

export default App
