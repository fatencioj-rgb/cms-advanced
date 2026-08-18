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
      <aside className="w-[240px] fixed top-0 left-0 h-screen border-r border-border flex flex-col bg-paper">
        <div className="p-5 flex items-center gap-3">
          <img src="/cms-advanced/logo.png" alt="CMS" className="w-7 h-7 object-contain rounded-full" />
          <div>
            <p className="text-[13px] text-ink font-medium leading-tight">CMS Advanced</p>
            <p className="text-[11px] text-ink-3">Fiorella Atencio</p>
          </div>
        </div>

        <div className="px-3 flex-1">
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => { setView('home'); setTopic(null); }}
              className={`w-full px-3 py-[9px] rounded-[var(--radius-sm)] text-[13px] text-left cursor-pointer transition-all duration-[var(--dur-fast)] ${
                view === 'home'
                  ? 'bg-surface-hover text-ink font-medium'
                  : 'text-ink-2 hover:bg-surface hover:text-ink'
              }`}
            >
              Overview
            </button>

            <div className="h-[1px] bg-border my-2"></div>

            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setView(item.key); setTopic(null); }}
                className={`w-full px-3 py-[9px] rounded-[var(--radius-sm)] text-[13px] text-left cursor-pointer transition-all duration-[var(--dur-fast)] ${
                  view === item.key
                    ? 'bg-surface-hover text-ink font-medium'
                    : 'text-ink-2 hover:bg-surface hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 border-t border-border">
          <p className="text-[10px] text-ink-3">Court of Master Sommeliers Europe</p>
          <p className="text-[10px] text-text-muted">Syllabus 2026 / 2027</p>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-[240px] flex-1 min-h-screen">
        <div className="max-w-[680px] px-10 py-12">
          {view === 'home' && !topic && <HomeView />}
          {view !== 'home' && !topic && (
            <SectionView section={syllabus[view]} onSelectTopic={setTopic} />
          )}
          {topic && <TopicDetail topic={topic} onBack={() => setTopic(null)} />}
        </div>
      </main>
    </div>
  )
}

function HomeView() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-[32px] text-ink font-semibold tracking-tight leading-tight mb-2">
          Advanced Sommelier
        </h1>
        <p className="text-[15px] text-ink-2 max-w-[500px]">
          Study log for the Court of Master Sommeliers Europe Advanced examination.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(syllabus).map(([key, section]) => (
          <div key={key} className="bg-surface border border-border rounded-[var(--radius-md)] p-5 hover:bg-surface-hover hover:border-border-light transition-all duration-[var(--dur-normal)] cursor-default group">
            <h3 className="text-[14px] font-medium text-ink mb-1.5 group-hover:text-accent transition-colors duration-[var(--dur-fast)]">{section.title}</h3>
            <p className="text-[12px] text-ink-3">{section.groups.length} sections · {section.groups.reduce((acc, g) => acc + g.topics.length, 0)} topics</p>
            <div className="mt-3 h-1 bg-paper-3 rounded-full overflow-hidden">
              <div className="h-full bg-accent/30 rounded-full" style={{width: '0%'}}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function SectionView({ section, onSelectTopic }) {
  return (
    <>
      <h1 className="text-[26px] text-ink font-semibold tracking-tight mb-1">{section.title}</h1>
      <p className="text-[13px] text-ink-3 mb-8">{section.groups.reduce((acc, g) => acc + g.topics.length, 0)} topics across {section.groups.length} sections</p>

      <div className="flex flex-col gap-8">
        {section.groups.map((group) => (
          <div key={group.label}>
            <h3 className="text-[11px] text-ink-3 tracking-[1.5px] uppercase font-medium mb-2 px-1">{group.label}</h3>
            <div className="bg-surface border border-border rounded-[var(--radius-md)] overflow-hidden divide-y divide-border">
              {group.topics.map((t) => (
                <button
                  key={t.name}
                  onClick={() => onSelectTopic(t)}
                  className="w-full flex items-center justify-between py-3 px-4 text-[13px] text-ink-2 hover:bg-surface-hover hover:text-ink cursor-pointer text-left transition-all duration-[var(--dur-fast)] group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform duration-[var(--dur-fast)]">{t.name}</span>
                  <span className="text-[11px] text-text-muted group-hover:text-ink-3 transition-colors">→</span>
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
      <button onClick={onBack} className="text-[12px] text-ink-3 hover:text-ink transition-colors duration-[var(--dur-fast)] mb-6 cursor-pointer flex items-center gap-1.5">
        <span>←</span> <span>Back</span>
      </button>
      <h1 className="text-[24px] text-ink font-semibold tracking-tight mb-2">{topic.name}</h1>
      <p className="text-[13px] text-ink-3 mb-8">Syllabus breakdown · Context + Advanced focus</p>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-ink-3"></div>
          <h3 className="text-[11px] text-ink-3 tracking-[1.5px] uppercase font-medium">Context · Intro + Certified</h3>
        </div>
        <div className="bg-surface border border-border rounded-[var(--radius-md)] p-5">
          <div className="flex flex-col gap-3">
            {topic.context.map((item, i) => (
              <p key={i} className="text-[13px] text-ink-2 leading-relaxed">{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <h3 className="text-[11px] text-accent tracking-[1.5px] uppercase font-medium">Advanced · Study Focus</h3>
        </div>
        <div className="bg-surface border border-accent/20 rounded-[var(--radius-md)] p-5">
          <div className="flex flex-col gap-3">
            {topic.advanced.map((item, i) => (
              <p key={i} className="text-[13px] text-ink leading-relaxed">{item}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
