import { useState } from 'react'
import { syllabus } from './data/syllabus'

function App() {
  const [view, setView] = useState('home')
  const [topic, setTopic] = useState(null)

  // Topic detail view
  if (topic) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-12">
        <button onClick={() => setTopic(null)} className="self-start max-w-[600px] w-full mx-auto text-[12px] text-gold-dim hover:text-gold transition-colors mb-6 cursor-pointer text-left">
          ← Back
        </button>
        <div className="w-full max-w-[600px]">
          <h2 className="text-[18px] text-gold font-medium tracking-wide mb-8">{topic.name}</h2>
          
          <div className="mb-8">
            <h3 className="text-[10px] text-text-muted tracking-[2px] uppercase mb-3">Context (Intro + Certified)</h3>
            <ul className="flex flex-col gap-2">
              {topic.context.map((item, i) => (
                <li key={i} className="text-[12px] text-text-dim leading-relaxed pl-4 border-l-2 border-border">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] text-gold-dim tracking-[2px] uppercase mb-3">🎯 Advanced — Study Focus</h3>
            <ul className="flex flex-col gap-2">
              {topic.advanced.map((item, i) => (
                <li key={i} className="text-[13px] text-cream leading-relaxed pl-4 border-l-2 border-gold-dim">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Section view (list of topics)
  if (view !== 'home') {
    const section = syllabus[view]
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-12">
        <button onClick={() => setView('home')} className="self-start max-w-[500px] w-full mx-auto text-[12px] text-gold-dim hover:text-gold transition-colors mb-6 cursor-pointer text-left">
          ← Back
        </button>
        <h2 className="text-[14px] text-gold font-medium tracking-[3px] uppercase mb-10">{section.title}</h2>
        <div className="w-full max-w-[500px] flex flex-col gap-8">
          {section.groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[10px] text-text-muted tracking-[2px] uppercase mb-3">{group.label}</h3>
              <div className="flex flex-col gap-2">
                {group.topics.map((t) => (
                  <button key={t.name} onClick={() => setTopic(t)} className="flex items-center justify-between py-3 px-5 bg-surface/50 border border-border rounded-md text-cream text-[13px] no-underline transition-all duration-200 hover:bg-gold/5 hover:border-gold-dim hover:text-gold cursor-pointer text-left">
                    <span>{t.name}</span>
                    <span className="text-[10px] text-text-muted">→</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Home view
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-16">
      <header className="text-center mb-12">
        <img src="/cms-advance/logo.png" alt="Court of Master Sommeliers" className="w-20 h-20 mx-auto mb-6 object-contain" />
        <h1 className="text-[14px] text-gold font-medium tracking-[3px] uppercase">Study Log for Fiorella Atencio</h1>
        <p className="text-[13px] text-text-dim mt-2 tracking-[3px] uppercase">CMS Advance</p>
        <div className="w-10 h-[1px] bg-gold-dim mx-auto mt-6 opacity-50"></div>
      </header>

      <nav className="w-full max-w-[420px] flex flex-col gap-3.5">
        {Object.entries(syllabus).map(([key, section]) => (
          <button key={key} onClick={() => setView(key)} className="flex items-center justify-between w-full py-4 px-6 bg-transparent border border-gold-dim/40 rounded-md text-cream text-[14px] font-normal tracking-[1.5px] uppercase no-underline transition-all duration-300 hover:bg-gold/5 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,168,75,0.12)] cursor-pointer">
            <span>{section.title}</span>
            <span className="text-[10px] text-text-dim tracking-normal normal-case">0%</span>
          </button>
        ))}
      </nav>

      <footer className="mt-14">
      </footer>
    </div>
  )
}

export default App
