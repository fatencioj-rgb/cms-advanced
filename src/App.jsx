import { useState } from 'react'
import { syllabus } from './data/syllabus'
import { getResearch } from './data/research'

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
  const [showResearch, setShowResearch] = useState(false)
  const research = getResearch(topic.name)

  return (
    <>
      <button onClick={onBack} className="text-[12px] text-ink-3 hover:text-ink transition-colors duration-[var(--dur-fast)] mb-6 cursor-pointer flex items-center gap-1.5">
        <span>←</span> <span>Back</span>
      </button>
      <h1 className="text-[24px] text-ink font-semibold tracking-tight mb-2">{topic.name}</h1>
      <p className="text-[13px] text-ink-3 mb-4">Syllabus breakdown · Context + Advanced focus</p>

      {research && (
        <button
          onClick={() => setShowResearch(!showResearch)}
          className="mb-8 px-4 py-2 rounded-[var(--radius-sm)] text-[12px] font-medium cursor-pointer transition-all duration-[var(--dur-fast)] border bg-accent/10 border-accent/30 text-accent hover:bg-accent/20"
        >
          {showResearch ? '← Back to Syllabus' : '📖 View Research Notes'}
        </button>
      )}

      {!showResearch && (
        <>
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
      )}

      {showResearch && research && <ResearchView data={research} />}
    </>
  )
}

/* ─── Research View ─────────────────────────────────────────── */
function ResearchView({ data }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="bg-surface border border-accent/20 rounded-[var(--radius-md)] p-5">
        <h2 className="text-[16px] text-ink font-semibold mb-1">{data.name} — Research Notes</h2>
        <p className="text-[11px] text-ink-3">Sources: {data.sources?.join(' · ')}</p>
      </div>

      {/* Climate */}
      {data.climate && (
        <ResearchSection title="Climate & Geography" accent>
          <p className="text-[13px] text-ink-2 mb-3"><span className="text-ink font-medium">Type:</span> {data.climate.type}</p>
          <p className="text-[13px] text-ink-2 mb-3"><span className="text-ink font-medium">Rainfall:</span> {data.climate.rainfall}</p>
          <ul className="flex flex-col gap-2">
            {data.climate.keyFactors.map((f, i) => (
              <li key={i} className="text-[13px] text-ink-2 leading-relaxed pl-3 border-l-2 border-accent/20">{f}</li>
            ))}
          </ul>
          {data.climate.biodynamic && (
            <p className="text-[12px] text-ink-3 mt-4 italic">{data.climate.biodynamic}</p>
          )}
        </ResearchSection>
      )}

      {/* Plantings */}
      {data.plantings && (
        <ResearchSection title="Grape Variety Plantings">
          <p className="text-[12px] text-ink-3 mb-3">{data.plantings.note}</p>
          <p className="text-[12px] text-accent mb-4">{data.plantings.aocBreakdown}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-ink-3 font-medium">Grape</th>
                  <th className="text-left py-2 text-ink-3 font-medium">%</th>
                  <th className="text-left py-2 text-ink-3 font-medium">Trend</th>
                  <th className="text-left py-2 text-ink-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.plantings.varieties.map((v, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 text-ink font-medium">{v.grape}</td>
                    <td className="py-2 text-ink-2">{v.pct}</td>
                    <td className="py-2 text-ink-3">{v.trend}</td>
                    <td className="py-2 text-ink-3">{v.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ResearchSection>
      )}

      {/* Soils */}
      {data.soils && (
        <ResearchSection title="Soil Diversity">
          <p className="text-[12px] text-ink-3 mb-4">{data.soils.overview}</p>
          <div className="flex flex-col gap-3">
            {data.soils.types.map((s, i) => (
              <div key={i} className="pl-3 border-l-2 border-border">
                <p className="text-[13px] text-ink font-medium">{s.soil}</p>
                <p className="text-[12px] text-ink-3">{s.location}</p>
                <p className="text-[12px] text-ink-2 mt-0.5">{s.character}</p>
              </div>
            ))}
          </div>
        </ResearchSection>
      )}

      {/* Appellations */}
      {data.appellations && (
        <ResearchSection title="Appellation Hierarchy">
          <div className="flex flex-col gap-3 mb-4">
            {data.appellations.hierarchy.map((a, i) => (
              <div key={i} className="pl-3 border-l-2 border-accent/30">
                <p className="text-[13px] text-ink font-medium">{a.level}</p>
                <p className="text-[12px] text-ink-2">{a.details}</p>
              </div>
            ))}
          </div>
          {data.appellations.communales && (
            <div className="mt-4">
              <p className="text-[12px] text-ink font-medium mb-2">11 Appellations Communales:</p>
              <p className="text-[12px] text-ink-3">{data.appellations.communales.join(' · ')}</p>
            </div>
          )}
        </ResearchSection>
      )}

      {/* Grand Cru */}
      {data.grandCru && (
        <ResearchSection title="Grand Cru Sites (51)">
          <p className="text-[12px] text-ink-3 mb-2">{data.grandCru.overview}</p>
          <p className="text-[12px] text-ink-3 mb-4">{data.grandCru.sizeRange}</p>

          <div className="mb-4">
            <p className="text-[12px] text-ink font-medium mb-2">Exceptions to 4-noble-variety rule:</p>
            <ul className="flex flex-col gap-1">
              {data.grandCru.exceptions.map((e, i) => (
                <li key={i} className="text-[12px] text-ink-2 pl-3 border-l-2 border-accent/20">{e}</li>
              ))}
            </ul>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-ink-3 font-medium">Grand Cru</th>
                  <th className="text-left py-2 text-ink-3 font-medium">Commune</th>
                  <th className="text-left py-2 text-ink-3 font-medium">Ha</th>
                  <th className="text-left py-2 text-ink-3 font-medium">Soil</th>
                  <th className="text-left py-2 text-ink-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.grandCru.sites.map((s, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-1.5 text-ink font-medium">{s.name}</td>
                    <td className="py-1.5 text-ink-2">{s.commune}</td>
                    <td className="py-1.5 text-ink-3">{s.ha}</td>
                    <td className="py-1.5 text-ink-3">{s.soil}</td>
                    <td className="py-1.5 text-ink-3">{s.noted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.grandCru.closSites && (
            <div className="mt-6">
              <p className="text-[12px] text-ink font-medium mb-3">Notable Clos Sites:</p>
              <div className="flex flex-col gap-3">
                {data.grandCru.closSites.map((c, i) => (
                  <div key={i} className="pl-3 border-l-2 border-border">
                    <p className="text-[12px] text-ink font-medium">{c.name} <span className="text-ink-3 font-normal">— {c.producer}</span></p>
                    <p className="text-[11px] text-ink-3">{c.commune} · {c.grape}</p>
                    <p className="text-[11px] text-ink-2 mt-0.5">{c.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ResearchSection>
      )}

      {/* Yields */}
      {data.yields && (
        <ResearchSection title="Yields by Quality Level">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-ink-3 font-medium">Appellation</th>
                <th className="text-left py-2 text-ink-3 font-medium">Max Yield</th>
                <th className="text-left py-2 text-ink-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.yields.levels.map((y, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 text-ink font-medium">{y.appellation}</td>
                  <td className="py-2 text-ink-2">{y.maxYield}</td>
                  <td className="py-2 text-ink-3">{y.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResearchSection>
      )}

      {/* VT & SGN */}
      {data.vtSgn && (
        <ResearchSection title="Vendange Tardive & SGN Requirements" accent>
          <p className="text-[12px] text-ink-3 mb-4">{data.vtSgn.note}</p>
          <table className="w-full text-[12px] mb-4">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-ink-3 font-medium">Designation</th>
                <th className="text-left py-2 text-ink-3 font-medium">Riesling / Muscat</th>
                <th className="text-left py-2 text-ink-3 font-medium">Gewurz / Pinot Gris</th>
              </tr>
            </thead>
            <tbody>
              {data.vtSgn.requirements.map((r, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 text-ink font-medium">{r.designation}</td>
                  <td className="py-2 text-ink-2">{r.rieslingMuscat}</td>
                  <td className="py-2 text-ink-2">{r.gewurzPinotGris}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="flex flex-col gap-2">
            {data.vtSgn.keyPoints.map((p, i) => (
              <li key={i} className="text-[12px] text-ink-2 pl-3 border-l-2 border-accent/20">{p}</li>
            ))}
          </ul>
        </ResearchSection>
      )}

      {/* Crémant */}
      {data.cremant && (
        <ResearchSection title="Crémant d'Alsace">
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div><span className="text-ink font-medium">Method:</span> <span className="text-ink-2">{data.cremant.method}</span></div>
            <div><span className="text-ink font-medium">Ageing:</span> <span className="text-ink-2">{data.cremant.ageing}</span></div>
            <div className="col-span-2"><span className="text-ink font-medium">Grapes:</span> <span className="text-ink-2">{data.cremant.grapes}</span></div>
            <div><span className="text-ink font-medium">Rosé:</span> <span className="text-ink-2">{data.cremant.rose}</span></div>
            <div><span className="text-ink font-medium">Production:</span> <span className="text-ink-2">{data.cremant.production}</span></div>
          </div>
          <p className="text-[12px] text-ink-3 mt-3 italic">{data.cremant.notes}</p>
        </ResearchSection>
      )}

      {/* Vintages */}
      {data.vintages && (
        <ResearchSection title="Vintages">
          <p className="text-[12px] text-ink-3 mb-4">{data.vintages.note}</p>
          <div className="flex flex-col gap-2">
            {data.vintages.chart.map((v, i) => (
              <div key={i} className="flex gap-3 pl-3 border-l-2 border-border py-1">
                <span className="text-[13px] text-ink font-medium w-10 shrink-0">{v.year}</span>
                <span className="text-[11px] text-accent font-medium w-10 shrink-0">{v.rating}</span>
                <span className="text-[12px] text-ink-2">{v.notes}</span>
              </div>
            ))}
          </div>
        </ResearchSection>
      )}

      {/* Producers */}
      {data.producers && (
        <ResearchSection title="Principal Producers">
          <p className="text-[12px] text-ink-3 mb-4">{data.producers.note}</p>

          <p className="text-[12px] text-ink font-medium mb-3">Top Producers:</p>
          <div className="flex flex-col gap-4 mb-6">
            {data.producers.top.map((p, i) => (
              <div key={i} className="pl-3 border-l-2 border-accent/30">
                <p className="text-[13px] text-ink font-medium">{p.name} <span className="text-ink-3 font-normal text-[11px]">— {p.commune}</span></p>
                <p className="text-[12px] text-ink-2 mt-0.5">{p.style}</p>
                <p className="text-[11px] text-ink-3 mt-0.5"><span className="text-ink-2">Key wines:</span> {p.keyWines}</p>
                {p.notes && <p className="text-[11px] text-ink-3 italic mt-0.5">{p.notes}</p>}
              </div>
            ))}
          </div>

          {data.producers.notable && (
            <>
              <p className="text-[12px] text-ink font-medium mb-3">Notable Producers:</p>
              <div className="grid grid-cols-1 gap-2 mb-4">
                {data.producers.notable.map((p, i) => (
                  <div key={i} className="text-[12px] pl-3 border-l border-border">
                    <span className="text-ink font-medium">{p.name}</span> <span className="text-ink-3">({p.commune})</span> — <span className="text-ink-2">{p.notes}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {data.producers.cooperatives && (
            <>
              <p className="text-[12px] text-ink font-medium mb-2">Cooperatives:</p>
              <ul className="flex flex-col gap-1">
                {data.producers.cooperatives.map((c, i) => (
                  <li key={i} className="text-[12px] text-ink-3">{c}</li>
                ))}
              </ul>
            </>
          )}
        </ResearchSection>
      )}

      {/* Food & Wine Pairings */}
      {data.pairings && (
        <ResearchSection title="Food & Wine Pairings">
          <p className="text-[12px] text-ink-2 mb-4">{data.pairings.overview}</p>

          <div className="mb-4">
            <p className="text-[12px] text-ink font-medium mb-2">Pairing Principles:</p>
            <ul className="flex flex-col gap-2">
              {data.pairings.principles.map((p, i) => (
                <li key={i} className="text-[12px] text-ink-2 pl-3 border-l-2 border-accent/20">{p}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            {data.pairings.byVariety.map((v, i) => (
              <div key={i} className="bg-paper-3 border border-border rounded-[var(--radius-sm)] p-4">
                <p className="text-[13px] text-ink font-medium mb-1">{v.grape}</p>
                <p className="text-[11px] text-ink-3 mb-3 italic">{v.profile}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <div>
                    <p className="text-ink-2 font-medium mb-1">Classic pairings:</p>
                    {v.classicPairings.map((cp, j) => (
                      <p key={j} className="text-ink-3 leading-relaxed">· {cp}</p>
                    ))}
                  </div>
                  <div>
                    <p className="text-ink-2 font-medium mb-1">Advanced pairings:</p>
                    {v.advancedPairings.map((ap, j) => (
                      <p key={j} className="text-ink-3 leading-relaxed">· {ap}</p>
                    ))}
                  </div>
                </div>
                {v.sommNotes && (
                  <p className="text-[11px] text-accent mt-3 border-t border-border pt-2">💡 {v.sommNotes}</p>
                )}
              </div>
            ))}
          </div>

          {data.pairings.regionalCuisine && (
            <div className="mt-6">
              <p className="text-[12px] text-ink font-medium mb-3">Regional Cuisine (Winstub Classics):</p>
              <div className="flex flex-col gap-3">
                {data.pairings.regionalCuisine.dishes.map((d, i) => (
                  <div key={i} className="pl-3 border-l-2 border-border text-[12px]">
                    <p className="text-ink font-medium">{d.dish}</p>
                    <p className="text-ink-3 text-[11px]">{d.description}</p>
                    <p className="text-ink-2 text-[11px] mt-0.5">🍷 {d.wine} {d.alt && <span className="text-ink-3">| Alt: {d.alt}</span>}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.pairings.examTips && (
            <div className="mt-6 bg-accent/5 border border-accent/20 rounded-[var(--radius-sm)] p-4">
              <p className="text-[12px] text-accent font-medium mb-2">🎯 Exam Tips — Pairing</p>
              <ul className="flex flex-col gap-2">
                {data.pairings.examTips.map((t, i) => (
                  <li key={i} className="text-[11px] text-ink-2">{t}</li>
                ))}
              </ul>
            </div>
          )}
        </ResearchSection>
      )}

      {/* Latest Developments */}
      {data.latestDevelopments && (
        <ResearchSection title="Latest Developments & Updates" accent>
          {data.latestDevelopments.items.map((group, i) => (
            <div key={i} className="mb-4">
              <p className="text-[13px] text-ink font-medium mb-2">{group.year}</p>
              <ul className="flex flex-col gap-2">
                {group.items.map((item, j) => (
                  <li key={j} className="text-[12px] text-ink-2 pl-3 border-l-2 border-accent/20">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </ResearchSection>
      )}

      {/* Sources footer */}
      {data.sources && (
        <div className="text-[10px] text-ink-3 border-t border-border pt-4">
          <p className="font-medium mb-1">Sources:</p>
          {data.sources.map((s, i) => <p key={i}>{s}</p>)}
        </div>
      )}
    </div>
  )
}

function ResearchSection({ title, accent, children }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${accent ? 'bg-accent' : 'bg-ink-3'}`}></div>
        <h3 className={`text-[11px] tracking-[1.5px] uppercase font-medium ${accent ? 'text-accent' : 'text-ink-3'}`}>{title}</h3>
      </div>
      <div className={`bg-surface border ${accent ? 'border-accent/20' : 'border-border'} rounded-[var(--radius-md)] p-5`}>
        {children}
      </div>
    </section>
  )
}

export default App
