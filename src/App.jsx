import { useState, useEffect, useRef } from 'react'
import { syllabus } from './data/syllabus'
import { getResearch } from './data/research'
import DeductiveTasting from './components/DeductiveTasting'

/* ─── Sidebar nav config ─────────────────────────────────────── */
const navGroups = [
  {
    label: 'WINE',
    items: [
      { key: 'home',       label: 'Overview' },
      { key: 'wine',       label: 'Wine' },
      { key: 'spirits',    label: 'Spirits & Beverages' },
      { key: 'viticulture',label: 'Viticulture' },
    ],
  },
  {
    label: 'EXAMS',
    items: [
      { key: 'tasting',    label: 'Tasting' },
      { key: 'service',    label: 'Service' },
    ],
  },
  {
    label: 'TASTING TOOLS',
    items: [
      { key: 'deductive',  label: '🍷 Deductive Tasting' },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView]         = useState('home')
  const [topic, setTopic]       = useState(null)
  const [sidebarOpen, setSidebar] = useState(false)

  function navigate(key) {
    setView(key)
    setTopic(null)
    setSidebar(false)
    window.scrollTo(0, 0)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

      {/* ── Sticky header ─────────────────────────────────── */}
      <header
        id="cms-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--color-green-dark)',
          color: 'white',
          padding: '0 24px',
          height: 'var(--header-h)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="/cms-advanced/logo.png"
            alt="CMS"
            style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'contain', border: '2px solid rgba(255,255,255,0.3)' }}
          />
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 'normal', letterSpacing: '0.04em' }}>
              CMS Europe — Advanced Sommelier
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-green-text)', marginTop: 2 }}>
              Fiorella Atencio &nbsp;|&nbsp; Syllabus 2026/2027
            </div>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setSidebar(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.4)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
          className="mobile-menu-btn"
        >
          ☰ Menu
        </button>
      </header>

      {/* ── Layout: sidebar + content ─────────────────────── */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--header-h))' }}>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <nav
          id="cms-sidebar"
          className={sidebarOpen ? 'open' : ''}
          style={{
            width: 'var(--sidebar-w)',
            minWidth: 'var(--sidebar-w)',
            background: 'white',
            borderRight: '1px solid var(--color-border)',
            position: 'sticky',
            top: 'var(--header-h)',
            height: 'calc(100vh - var(--header-h))',
            overflowY: 'auto',
            padding: '12px 0',
            flexShrink: 0,
          }}
        >
          {navGroups.map(group => (
            <div key={group.label} style={{ marginBottom: 8 }}>
              {/* Group label */}
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-green-dark)',
                padding: '8px 16px 4px',
                borderTop: '1px solid var(--color-green-light)',
                marginTop: 4,
              }}>
                {group.label}
              </div>

              {/* Items */}
              <ul style={{ listStyle: 'none' }}>
                {group.items.map(item => {
                  const isActive = view === item.key && !topic
                  return (
                    <li key={item.key}>
                      <button
                        onClick={() => navigate(item.key)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '6px 16px 6px 24px',
                          fontSize: '0.88rem',
                          background: isActive ? 'var(--color-green-light)' : 'transparent',
                          borderLeft: isActive
                            ? '3px solid var(--color-gold)'
                            : '3px solid transparent',
                          color: isActive ? 'var(--color-green-dark)' : 'var(--color-text)',
                          fontWeight: isActive ? 'bold' : 'normal',
                          cursor: 'pointer',
                          border: 'none',
                          borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                          transition: 'all var(--dur-fast)',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'var(--color-green-light)'
                            e.currentTarget.style.borderLeft = '3px solid var(--color-green-dark)'
                            e.currentTarget.style.color = 'var(--color-green-dark)'
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.borderLeft = '3px solid transparent'
                            e.currentTarget.style.color = 'var(--color-text)'
                          }
                        }}
                      >
                        {item.label}
                      </button>

                      {/* Sub-topics when inside a section */}
                      {view === item.key && syllabus[item.key] && !topic && (
                        <SidebarSubNav
                          section={syllabus[item.key]}
                          onSelectTopic={setTopic}
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Bottom label */}
          <div style={{
            padding: '16px',
            marginTop: 8,
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}>
            Court of Master Sommeliers Europe<br />
            Advanced Examination
          </div>
        </nav>

        {/* ── Main content ─────────────────────────────────── */}
        <main
          id="cms-content"
          style={{
            flex: 1,
            maxWidth: 'var(--content-max)',
            padding: '32px 40px',
            margin: '0 auto',
          }}
        >
          {view === 'home'      && !topic && <HomeView onNavigate={navigate} />}
          {view === 'deductive' && !topic && <DeductiveTasting />}
          {view !== 'home' && view !== 'deductive' && !topic && syllabus[view] && (
            <SectionView
              section={syllabus[view]}
              sectionKey={view}
              onSelectTopic={setTopic}
            />
          )}
          {topic && (
            <TopicDetail
              topic={topic}
              onBack={() => { setTopic(null); window.scrollTo(0,0) }}
            />
          )}
        </main>
      </div>
    </div>
  )
}

/* ─── Sidebar sub-nav (topics within active section) ─────────── */
function SidebarSubNav({ section, onSelectTopic }) {
  return (
    <ul style={{ listStyle: 'none' }}>
      {section.groups.map(group => (
        <li key={group.label}>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-gold)',
            padding: '4px 16px 2px 28px',
          }}>
            {group.label}
          </div>
          {group.topics.map(t => (
            <button
              key={t.name}
              onClick={() => onSelectTopic(t)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '3px 16px 3px 36px',
                fontSize: '0.82rem',
                background: 'transparent',
                border: 'none',
                borderLeft: '3px solid transparent',
                color: 'var(--color-text-light)',
                cursor: 'pointer',
                transition: 'all var(--dur-fast)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-green-light)'
                e.currentTarget.style.borderLeft = '3px solid var(--color-green-dark)'
                e.currentTarget.style.color = 'var(--color-green-dark)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderLeft = '3px solid transparent'
                e.currentTarget.style.color = 'var(--color-text-light)'
              }}
            >
              {t.name}
            </button>
          ))}
        </li>
      ))}
    </ul>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOME VIEW
═══════════════════════════════════════════════════════════════ */
function HomeView({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: '1.8rem',
          color: 'var(--color-green-dark)',
          fontWeight: 'bold',
          marginBottom: 6,
        }}>
          Advanced Sommelier — Study Hub
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-light)', maxWidth: 560 }}>
          Structured study notes for the Court of Master Sommeliers Europe Advanced examination.
          Theory · Tasting · Service · Syllabus 2026/2027.
        </p>
      </div>

      <hr className="section-divider" />

      {/* Exam info */}
      <h2 className="doc-h2">Examination Overview</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Format</th>
              <th>Pass Mark</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Theory</strong></td>
              <td>Written exam</td>
              <td>60%</td>
              <td>All sections must be passed simultaneously</td>
            </tr>
            <tr>
              <td><strong>Tasting</strong></td>
              <td>2 wines blind (1 white + 1 red)</td>
              <td>60%</td>
              <td>CMS deductive tasting grid; grape + region + vintage</td>
            </tr>
            <tr>
              <td><strong>Service</strong></td>
              <td>Practical service exam</td>
              <td>60%</td>
              <td>Restaurant scenario with panel of examiners</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="exam-tip">
        <p><strong>🎯 Key Rule:</strong> All three sections must be passed in the same sitting — a 90% in Theory cannot compensate for a 55% in Service. You pass or fail as a whole.</p>
      </div>

      {/* Deductive tasting call-out */}
      <h2 className="doc-h2">Deductive Tasting Flash Cards</h2>
      <p style={{ marginBottom: 12, color: 'var(--color-text-light)', fontSize: '0.93rem' }}>
        New tool for blind tasting practice. Each card presents a sensory profile — you identify grape and region.
        Includes Study Profiles with regional comparisons and key producers updated to 2026.
      </p>
      <button
        onClick={() => onNavigate('deductive')}
        style={{
          display: 'inline-block',
          background: 'var(--color-gold)',
          color: 'white',
          border: 'none',
          padding: '10px 24px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.95rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-gold-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-gold)'}
      >
        Start Deductive Tasting →
      </button>

      <hr className="section-divider" style={{ marginTop: 32 }} />

      {/* Syllabus sections */}
      <h2 className="doc-h2">Syllabus Sections</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Groups</th>
              <th>Topics</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(syllabus).map(([key, section]) => (
              <tr key={key}>
                <td>
                  <button
                    onClick={() => onNavigate(key)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-green-dark)',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline',
                      padding: 0,
                    }}
                  >
                    {section.title}
                  </button>
                </td>
                <td>{section.groups.length}</td>
                <td>{section.groups.reduce((a, g) => a + g.topics.length, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION VIEW — lists all topics in a section
═══════════════════════════════════════════════════════════════ */
function SectionView({ section, sectionKey, onSelectTopic }) {
  const total = section.groups.reduce((a, g) => a + g.topics.length, 0)

  return (
    <div>
      {/* Section header */}
      <div className="topic-header">
        <h1>{section.title}</h1>
        <span className="topic-group">
          Advanced Sommelier · {total} topics across {section.groups.length} sections
        </span>
      </div>

      {section.groups.map(group => (
        <div key={group.label} className="topic-section">
          <h2 className="doc-h2">{group.label}</h2>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Topic</th>
                  <th>Advanced Study Focus (excerpt)</th>
                </tr>
              </thead>
              <tbody>
                {group.topics.map(t => (
                  <tr key={t.name}>
                    <td>
                      <button
                        onClick={() => onSelectTopic(t)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-green-dark)',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          textDecoration: 'underline',
                          padding: 0,
                          textAlign: 'left',
                        }}
                      >
                        {t.name}
                      </button>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                      {t.advanced.slice(0, 2).join(' · ')}
                      {t.advanced.length > 2 && ` · +${t.advanced.length - 2} more`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC DETAIL — full document view for one topic
═══════════════════════════════════════════════════════════════ */
function TopicDetail({ topic, onBack }) {
  const [showResearch, setShowResearch] = useState(false)
  const research = getResearch(topic.name)

  return (
    <div>
      {/* Back link */}
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-green-dark)',
          fontSize: '0.88rem',
          cursor: 'pointer',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          textDecoration: 'underline',
        }}
      >
        ← Back
      </button>

      {/* Topic header banner */}
      <div className="topic-header">
        <h1>{topic.name}</h1>
        <span className="topic-group">Advanced Sommelier · Syllabus 2026/2027</span>
      </div>

      {/* Research toggle */}
      {research && (
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => setShowResearch(!showResearch)}
            style={{
              background: showResearch ? 'var(--color-green-dark)' : 'var(--color-gold-light)',
              color: showResearch ? 'white' : 'var(--color-gold)',
              border: `1px solid ${showResearch ? 'var(--color-green-dark)' : 'var(--color-gold)'}`,
              padding: '8px 20px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {showResearch ? '← Back to Syllabus' : '📖 View Research Notes'}
          </button>
        </div>
      )}

      {!showResearch && (
        <>
          {/* Context section */}
          <div className="topic-section">
            <hr className="section-divider" />
            <h2 className="doc-h2">Context · Introductory + Certified</h2>
            <ul className="doc-ul">
              {topic.context.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Advanced section */}
          <div className="topic-section">
            <h2 className="doc-h2" style={{ borderBottomColor: 'var(--color-green-dark)' }}>
              Advanced · Study Focus
            </h2>
            <ul className="doc-ul">
              {topic.advanced.map((item, i) => (
                <li key={i} style={{ color: 'var(--color-text)' }}>{item}</li>
              ))}
            </ul>

            <div className="exam-tip" style={{ marginTop: 20 }}>
              <p><strong>🎯 Advanced Exam Note:</strong> The above points represent what the CMS Europe Advanced exam specifically targets for this topic. Each point is examinable in detail — not just the concept, but specific data, producers, classifications, and vintages.</p>
            </div>
          </div>
        </>
      )}

      {showResearch && research && <ResearchView data={research} />}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   RESEARCH VIEW — detailed notes per topic
═══════════════════════════════════════════════════════════════ */
function ResearchView({ data }) {
  return (
    <div>
      {/* Sources */}
      {data.sources && (
        <p className="doc-note" style={{ marginBottom: 20 }}>
          <strong>Sources:</strong> {data.sources.join(' · ')}
        </p>
      )}

      {/* Climate */}
      {data.climate && (
        <div className="topic-section">
          <h2 className="doc-h2">Climate &amp; Geography</h2>
          <p style={{ marginBottom: 8 }}><strong>Type:</strong> {data.climate.type}</p>
          <p style={{ marginBottom: 12 }}><strong>Rainfall:</strong> {data.climate.rainfall}</p>
          <ul className="doc-ul">
            {data.climate.keyFactors.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          {data.climate.biodynamic && (
            <p className="doc-note" style={{ marginTop: 12 }}>{data.climate.biodynamic}</p>
          )}
        </div>
      )}

      {/* Plantings */}
      {data.plantings && (
        <div className="topic-section">
          <h2 className="doc-h2">Grape Variety Plantings</h2>
          <p className="doc-note" style={{ marginBottom: 8 }}>{data.plantings.note}</p>
          <p style={{ marginBottom: 12, color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '0.9rem' }}>
            {data.plantings.aocBreakdown}
          </p>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr><th>Grape</th><th>%</th><th>Trend</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {data.plantings.varieties.map((v, i) => (
                  <tr key={i}>
                    <td><strong>{v.grape}</strong></td>
                    <td>{v.pct}</td>
                    <td>{v.trend}</td>
                    <td>{v.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Soils */}
      {data.soils && (
        <div className="topic-section">
          <h2 className="doc-h2">Soil Diversity</h2>
          <p style={{ marginBottom: 16, color: 'var(--color-text-light)' }}>{data.soils.overview}</p>
          {data.soils.types.map((s, i) => (
            <div key={i} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: '3px solid var(--color-green-light)' }}>
              <strong style={{ color: 'var(--color-green-dark)' }}>{s.soil}</strong>
              <span style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}> — {s.location}</span>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginTop: 2 }}>{s.character}</p>
            </div>
          ))}
        </div>
      )}

      {/* Appellations */}
      {data.appellations && (
        <div className="topic-section">
          <h2 className="doc-h2">Appellation Hierarchy</h2>
          {data.appellations.hierarchy.map((a, i) => (
            <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: '3px solid var(--color-gold)' }}>
              <strong style={{ color: 'var(--color-green-dark)' }}>{a.level}</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginTop: 2 }}>{a.details}</p>
            </div>
          ))}
          {data.appellations.communales && (
            <div style={{ marginTop: 16 }}>
              <h3 className="doc-h3">11 Appellations Communales</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                {data.appellations.communales.join(' · ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Grand Cru */}
      {data.grandCru && (
        <div className="topic-section">
          <h2 className="doc-h2">Grand Cru Sites (51)</h2>
          <p style={{ marginBottom: 4 }}>{data.grandCru.overview}</p>
          <p style={{ marginBottom: 16, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{data.grandCru.sizeRange}</p>
          <h3 className="doc-h3">Exceptions to 4-noble-variety rule</h3>
          <ul className="doc-ul" style={{ marginBottom: 16 }}>
            {data.grandCru.exceptions.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
          <div className="doc-table-wrap">
            <table className="doc-table" style={{ fontSize: '0.83rem' }}>
              <thead>
                <tr><th>Grand Cru</th><th>Commune</th><th>Ha</th><th>Soil</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {data.grandCru.sites.map((s, i) => (
                  <tr key={i}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.commune}</td>
                    <td>{s.ha}</td>
                    <td>{s.soil}</td>
                    <td>{s.noted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.grandCru.closSites && (
            <>
              <h3 className="doc-h3">Notable Clos Sites</h3>
              {data.grandCru.closSites.map((c, i) => (
                <div key={i} style={{ marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid var(--color-border)' }}>
                  <strong>{c.name}</strong> <span style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>— {c.producer}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{c.commune} · {c.grape}</p>
                  <p style={{ fontSize: '0.85rem' }}>{c.notes}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Yields */}
      {data.yields && (
        <div className="topic-section">
          <h2 className="doc-h2">Yields by Quality Level</h2>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr><th>Appellation</th><th>Max Yield</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {data.yields.levels.map((y, i) => (
                  <tr key={i}>
                    <td><strong>{y.appellation}</strong></td>
                    <td>{y.maxYield}</td>
                    <td>{y.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VT & SGN */}
      {data.vtSgn && (
        <div className="topic-section">
          <h2 className="doc-h2">Vendange Tardive &amp; SGN Requirements</h2>
          <p style={{ marginBottom: 12, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{data.vtSgn.note}</p>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr><th>Designation</th><th>Riesling / Muscat</th><th>Gewurz / Pinot Gris</th></tr>
              </thead>
              <tbody>
                {data.vtSgn.requirements.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r.designation}</strong></td>
                    <td>{r.rieslingMuscat}</td>
                    <td>{r.gewurzPinotGris}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="doc-ul" style={{ marginTop: 12 }}>
            {data.vtSgn.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {/* Crémant */}
      {data.cremant && (
        <div className="topic-section">
          <h2 className="doc-h2">Crémant d'Alsace</h2>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <tbody>
                <tr><td><strong>Method</strong></td><td>{data.cremant.method}</td><td><strong>Ageing</strong></td><td>{data.cremant.ageing}</td></tr>
                <tr><td><strong>Grapes</strong></td><td colSpan={3}>{data.cremant.grapes}</td></tr>
                <tr><td><strong>Rosé</strong></td><td>{data.cremant.rose}</td><td><strong>Production</strong></td><td>{data.cremant.production}</td></tr>
              </tbody>
            </table>
          </div>
          {data.cremant.notes && <p className="doc-note" style={{ marginTop: 8 }}>{data.cremant.notes}</p>}
        </div>
      )}

      {/* Vintages */}
      {data.vintages && (
        <div className="topic-section">
          <h2 className="doc-h2">Vintages</h2>
          <p className="doc-note" style={{ marginBottom: 12 }}>{data.vintages.note}</p>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr><th>Year</th><th>Rating</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {data.vintages.chart.map((v, i) => (
                  <tr key={i}>
                    <td><strong>{v.year}</strong></td>
                    <td style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>{v.rating}</td>
                    <td>{v.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Producers */}
      {data.producers && (
        <div className="topic-section">
          <h2 className="doc-h2">Principal Producers</h2>
          {data.producers.note && (
            <p className="doc-note" style={{ marginBottom: 12 }}>{data.producers.note}</p>
          )}
          {data.producers.top && (
            <>
              <h3 className="doc-h3">Top Producers</h3>
              {data.producers.top.map((p, i) => (
                <div key={i} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: '3px solid var(--color-gold)' }}>
                  <strong style={{ color: 'var(--color-green-dark)' }}>{p.name}</strong>
                  <span style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}> — {p.commune}</span>
                  <p style={{ fontSize: '0.9rem', margin: '2px 0' }}>{p.style}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Key wines: {p.keyWines}</p>
                  {p.notes && <p className="doc-note">{p.notes}</p>}
                </div>
              ))}
            </>
          )}
          {data.producers.notable && (
            <>
              <h3 className="doc-h3">Notable Producers</h3>
              <div className="doc-table-wrap">
                <table className="doc-table">
                  <thead><tr><th>Producer</th><th>Commune</th><th>Notes</th></tr></thead>
                  <tbody>
                    {data.producers.notable.map((p, i) => (
                      <tr key={i}>
                        <td><strong>{p.name}</strong></td>
                        <td>{p.commune}</td>
                        <td>{p.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {data.producers.cooperatives && (
            <>
              <h3 className="doc-h3">Cooperatives</h3>
              <ul className="doc-ul">
                {data.producers.cooperatives.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Food & Wine */}
      {data.pairings && (
        <div className="topic-section">
          <h2 className="doc-h2">Food &amp; Wine Pairings</h2>
          <p style={{ marginBottom: 12 }}>{data.pairings.overview}</p>
          <h3 className="doc-h3">Pairing Principles</h3>
          <ul className="doc-ul" style={{ marginBottom: 16 }}>
            {data.pairings.principles.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          {data.pairings.byVariety.map((v, i) => (
            <div key={i} style={{ marginBottom: 16, padding: '12px 16px', background: '#f8f8f6', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ color: 'var(--color-green-dark)' }}>{v.grape}</strong>
              <p className="doc-note" style={{ marginBottom: 8 }}>{v.profile}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', fontSize: '0.85rem' }}>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: 4 }}>Classic:</p>
                  {v.classicPairings.map((cp, j) => <p key={j} style={{ color: 'var(--color-text-light)' }}>· {cp}</p>)}
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: 4 }}>Advanced:</p>
                  {v.advancedPairings.map((ap, j) => <p key={j} style={{ color: 'var(--color-text-light)' }}>· {ap}</p>)}
                </div>
              </div>
              {v.sommNotes && (
                <p style={{ marginTop: 8, fontSize: '0.85rem', color: 'var(--color-gold)', borderTop: '1px solid var(--color-border)', paddingTop: 8 }}>
                  💡 {v.sommNotes}
                </p>
              )}
            </div>
          ))}
          {data.pairings.examTips && (
            <div className="exam-tip">
              <p><strong>🎯 Exam Tips — Pairing</strong></p>
              <ul className="doc-ul" style={{ marginTop: 4 }}>
                {data.pairings.examTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Latest Developments */}
      {data.latestDevelopments && (
        <div className="topic-section">
          <h2 className="doc-h2">Latest Developments &amp; Updates</h2>
          {data.latestDevelopments.items.map((group, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <h3 className="doc-h3">{group.year}</h3>
              <ul className="doc-ul">
                {group.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
