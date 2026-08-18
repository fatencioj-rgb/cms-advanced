import { useState } from 'react'
import { syllabus } from './data/syllabus'

function App() {
  const [view, setView] = useState('home')
  const [topic, setTopic] = useState(null)

  // Topic detail
  if (topic) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-12">
        <button onClick={() => setTopic(null)} className="self-start max-w-[600px] w-full mx-auto text-[12px] text-text-muted hover:text-cream transition-colors mb-6 cursor-pointer text-left">
          ← Back
        </button>
        <div className="w-full max-w-[600px]">
          <h2 className="text-[18px] text-cream font-medium tracking-wide mb-8">{topic.name}</h2>
          <div className="mb-8">
            <h3 className="text-[10px] text-text-muted tracking-[2px] uppercase mb-3">Context (Intro + Certified)</h3>
            <ul className="flex flex-col gap-2">
              {topic.context.map((item, i) => (
                <li key={i} className="text-[12px] text-text-dim leading-relaxed pl-4 border-l-2 border-border">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] text-text-dim tracking-[2px] uppercase mb-3">🎯 Advanced — Study Focus</h3>
            <ul className="flex flex-col gap-2">
              {topic.advanced.map((item, i) => (
                <li key={i} className="text-[13px] text-cream leading-relaxed pl-4 border-l-2 border-cream">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Section view
  if (view !== 'home') {
    const section = syllabus[view]
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-12">
        <button onClick={() => setView('home')} className="self-start max-w-[500px] w-full mx-auto text-[12px] text-text-muted hover:text-cream transition-colors mb-6 cursor-pointer text-left">
          ← Back
        </button>
        <h2 className="text-[14px] text-cream font-medium tracking-[3px] uppercase mb-10">{section.title}</h2>
        <div className="w-full max-w-[500px] flex flex-col gap-8">
          {section.groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[10px] text-text-muted tracking-[2px] uppercase mb-3">{group.label}</h3>
              <div className="flex flex-col gap-2">
                {group.topics.map((t) => (
                  <button key={t.name} onClick={() => setTopic(t)} className="flex items-center justify-between py-3.5 px-5 border border-border rounded-md text-cream text-[13px] transition-all duration-200 hover:bg-surface hover:border-border-light cursor-pointer text-left">
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

  // Home
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-16">
      <header className="text-center mb-12">
        <p className="text-[13px] text-text-dim mb-6">Study log for Fiorella Atencio</p>
        <p className="text-[11px] text-text-muted mb-4">the Court of Master Sommeliers Advanced Exam</p>
        <img src="/cms-advanced/logo.png" alt="Court of Master Sommeliers" className="w-16 h-16 mx-auto mb-4 object-contain" />
        <p className="text-[12px] text-cream tracking-[3px] uppercase font-medium" style={{fontFamily: 'Cinzel, serif'}}>Advanced Sommelier</p>
      </header>

      <nav className="w-full max-w-[360px] flex flex-col gap-3">
        {['wine', 'spirits', 'viticulture', 'tasting', 'service'].map((key) => (
          <button key={key} onClick={() => setView(key)} className="w-full py-3.5 px-6 border border-border rounded-md text-cream text-[13px] font-medium tracking-[1.5px] uppercase transition-all duration-200 hover:bg-surface hover:border-border-light cursor-pointer">
            {syllabus[key].title}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
