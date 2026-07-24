import { useState } from 'react'
import { syllabus } from './data/syllabus'

const tabs = [
  { key: 'home', label: 'Home' },
  { key: 'wine', label: 'Wine' },
  { key: 'spirits', label: 'Spirits' },
  { key: 'viticulture', label: 'Viticulture' },
  { key: 'service', label: 'Service' },
  { key: 'tasting', label: 'Tasting' },
]

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [topic, setTopic] = useState(null)

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/cms-advance/Adv-badge.png" alt="CMS Advanced" className="w-8 h-8 object-contain" />
            <div className="flex flex-col">
              <span className="text-[12px] text-gold tracking-[2px] uppercase" style={{fontFamily: 'Cinzel, serif'}}>Court of Master Sommeliers Advance</span>
              <span className="text-[10px] text-text-dim tracking-wide">Study log made by Fiorella Atencio</span>
            </div>
          </div>
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setTopic(null); }}
                className={`px-4 py-2 text-[11px] uppercase tracking-[1.5px] font-medium rounded-md transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-gold bg-gold/10'
                    : 'text-text-dim hover:text-cream hover:bg-surface/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        {activeTab === 'home' && !topic && <Hero />}
        {activeTab !== 'home' && !topic && (
          <SectionView section={syllabus[activeTab]} onSelectTopic={setTopic} />
        )}
        {topic && <TopicDetail topic={topic} onBack={() => setTopic(null)} />}
      </main>
    </div>
  )
}

function Hero() {
  return null
}

function SectionView({ section, onSelectTopic }) {
  return (
    <div className="max-w-[700px] mx-auto px-6 py-12">
      <h2 className="text-[13px] text-gold font-medium tracking-[3px] uppercase mb-10 text-center">{section.title}</h2>
      <div className="flex flex-col gap-8">
        {section.groups.map((group) => (
          <div key={group.label}>
            <h3 className="text-[10px] text-text-muted tracking-[2px] uppercase mb-3">{group.label}</h3>
            <div className="flex flex-col gap-2">
              {group.topics.map((t) => (
                <button
                  key={t.name}
                  onClick={() => onSelectTopic(t)}
                  className="flex items-center justify-between py-3.5 px-5 bg-surface/40 border border-border rounded-lg text-cream text-[13px] transition-all duration-200 hover:bg-gold/5 hover:border-gold-dim hover:text-gold cursor-pointer text-left"
                >
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

function TopicDetail({ topic, onBack }) {
  return (
    <div className="max-w-[700px] mx-auto px-6 py-12">
      <button onClick={onBack} className="text-[12px] text-gold-dim hover:text-gold transition-colors mb-8 cursor-pointer">
        ← Back
      </button>
      <h2 className="text-[20px] text-gold font-medium tracking-wide mb-10">{topic.name}</h2>

      <div className="mb-10">
        <h3 className="text-[10px] text-text-muted tracking-[2px] uppercase mb-4">Context (Intro + Certified)</h3>
        <ul className="flex flex-col gap-2.5">
          {topic.context.map((item, i) => (
            <li key={i} className="text-[12px] text-text-dim leading-relaxed pl-4 border-l-2 border-border">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-[10px] text-gold-dim tracking-[2px] uppercase mb-4">🎯 Advanced — Study Focus</h3>
        <ul className="flex flex-col gap-2.5">
          {topic.advanced.map((item, i) => (
            <li key={i} className="text-[13px] text-cream leading-relaxed pl-4 border-l-2 border-gold-dim">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
