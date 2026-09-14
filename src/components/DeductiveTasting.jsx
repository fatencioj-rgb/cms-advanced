import { useState } from 'react'
import { chardonnay } from '../data/tasting/chardonnay'

const allGrapes = [chardonnay]

const regionLabels = {
  'chablis':                   'Chablis',
  'meursault':                 'Meursault / Côte de Beaune',
  'maconnais':                 'Mâconnais',
  'champagne-blanc-de-blancs': 'Champagne Blanc de Blancs',
  'sonoma':                    'Sonoma / California',
  'australia':                 'Australia',
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function DeductiveTasting() {
  const [mode, setMode]           = useState('home')
  const [selectedGrape, setGrape] = useState(null)
  const [shuffledCards, setCards] = useState([])
  const [cardIndex, setCardIndex] = useState(0)
  const [phase, setPhase]         = useState('question')
  const [chosen, setChosen]       = useState(null)
  const [score, setScore]         = useState({ correct: 0, total: 0 })
  const [shuffledOpts, setOpts]   = useState([])

  function startFlash(grape) {
    const cards = shuffle(grape.flashCards)
    setGrape(grape); setCards(cards); setCardIndex(0)
    setPhase('question'); setChosen(null)
    setScore({ correct: 0, total: 0 })
    setOpts(shuffle(cards[0].options))
    setMode('flash')
  }

  function handleAnswer(opt) {
    if (phase === 'revealed') return
    setChosen(opt)
    setPhase('revealed')
    setScore(s => ({
      correct: s.correct + (opt === shuffledCards[cardIndex].answer ? 1 : 0),
      total: s.total + 1,
    }))
  }

  function nextCard() {
    const next = cardIndex + 1
    if (next >= shuffledCards.length) { setMode('results'); return }
    setCardIndex(next); setPhase('question'); setChosen(null)
    setOpts(shuffle(shuffledCards[next].options))
  }

  if (mode === 'flash') return (
    <FlashCard
      card={shuffledCards[cardIndex]} options={shuffledOpts}
      phase={phase} chosen={chosen} onAnswer={handleAnswer} onNext={nextCard}
      index={cardIndex} total={shuffledCards.length} score={score}
      grape={selectedGrape} onBack={() => setMode('home')}
    />
  )
  if (mode === 'results') return (
    <Results score={score} grape={selectedGrape}
      onRestart={() => startFlash(selectedGrape)} onBack={() => setMode('home')} />
  )
  if (mode === 'profile') return (
    <GrapeProfile grape={selectedGrape}
      onBack={() => setMode('home')} onFlash={() => startFlash(selectedGrape)} />
  )
  return (
    <HomeScreen grapes={allGrapes} onStart={startFlash}
      onProfile={g => { setGrape(g); setMode('profile') }} />
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOME SCREEN
═══════════════════════════════════════════════════════════════ */
function HomeScreen({ grapes, onStart, onProfile }) {
  return (
    <div>
      {/* Page header */}
      <div className="topic-header">
        <h1>Deductive Tasting</h1>
        <span className="topic-group">Flash Cards · Regional Identification · Advanced Level</span>
      </div>

      <p style={{ marginBottom: 20, color: 'var(--color-text-light)', fontSize: '0.95rem', lineHeight: 1.7 }}>
        Each card presents a sensory profile — sight, nose, palate — without revealing the grape or region.
        Your job is to identify where the wine is from using deductive reasoning.
        Study the regional profiles first, then test yourself in Flash Mode.
      </p>

      <div className="exam-tip">
        <p><strong>🎯 How to use this tool:</strong> Click <em>Study Profiles</em> to read the regional differences in detail before attempting the flash cards.
        The "Why not the others" explanations after each card are the most valuable part — that's the deductive logic the exam tests.</p>
      </div>

      <hr className="section-divider" />

      {/* Grape cards */}
      {grapes.map(grape => (
        <div key={grape.grape} className="topic-section">
          <h2 className="doc-h2">{grape.grape}</h2>
          <p style={{ marginBottom: 16, color: 'var(--color-text-light)', fontSize: '0.93rem', lineHeight: 1.7 }}>
            {grape.intro}
          </p>

          {/* Regions table */}
          <div className="doc-table-wrap" style={{ marginBottom: 16 }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Country / Sub-region</th>
                  <th>Difficulty to identify</th>
                </tr>
              </thead>
              <tbody>
                {grape.regions.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td style={{ color: 'var(--color-text-light)' }}>{r.subregion} · {r.country}</td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: 4,
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: r.difficulty === 'easy' ? '#d4edda' : r.difficulty === 'medium' ? '#fff3cd' : '#f8d7da',
                        color: r.difficulty === 'easy' ? '#155724' : r.difficulty === 'medium' ? '#856404' : '#721c24',
                      }}>
                        {r.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => onStart(grape)}
              style={{
                background: 'var(--color-green-dark)',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-green-mid)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-green-dark)'}
            >
              Flash Mode ({grape.flashCards.length} cards) →
            </button>
            <button
              onClick={() => onProfile(grape)}
              style={{
                background: 'var(--color-gold-light)',
                color: 'var(--color-gold)',
                border: '1px solid var(--color-gold)',
                padding: '10px 24px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#faefc8'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-gold-light)'}
            >
              Study Profiles
            </button>
          </div>
        </div>
      ))}

      {/* Coming soon */}
      <div style={{
        padding: '16px 20px',
        background: 'var(--color-green-light)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.88rem',
        color: 'var(--color-green-mid)',
      }}>
        <strong>Coming soon:</strong> Pinot Noir · Riesling · Sauvignon Blanc · Chenin Blanc · Cabernet Sauvignon · Syrah / Shiraz
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FLASH CARD
═══════════════════════════════════════════════════════════════ */
function FlashCard({ card, options, phase, chosen, onAnswer, onNext, index, total, score, grape, onBack }) {
  const isCorrect = chosen === card.answer

  return (
    <div>
      {/* Back + progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'var(--color-green-dark)', fontSize: '0.88rem', cursor: 'pointer', textDecoration: 'underline' }}
        >
          ← Exit Flash Mode
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '0.88rem', color: 'var(--color-text-light)' }}>
            Card {index + 1} of {total}
          </span>
          <span style={{
            fontSize: '0.85rem', fontWeight: 'bold',
            padding: '3px 12px', borderRadius: 4,
            background: 'var(--color-green-light)', color: 'var(--color-green-dark)',
          }}>
            {score.correct}/{score.total} correct
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: 'var(--color-border-light)', borderRadius: 99, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: 'var(--color-green-dark)',
          width: `${(index / total) * 100}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Card header */}
      <div className="topic-header" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.3rem' }}>Identify the Region — {grape.grape}</h1>
            <span className="topic-group">Deductive Tasting · Flash Mode</span>
          </div>
          <DifficultyBadge level={card.difficulty} />
        </div>
      </div>

      {/* Sensory profile */}
      <div className="doc-table-wrap" style={{ marginBottom: 20 }}>
        <table className="doc-table">
          <tbody>
            <tr>
              <td style={{ width: 100, fontWeight: 'bold', color: 'var(--color-green-dark)', background: 'var(--color-green-light)', whiteSpace: 'nowrap' }}>
                👁 Sight
              </td>
              <td>{card.scenario.sight}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', color: 'var(--color-green-dark)', background: 'var(--color-green-light)', whiteSpace: 'nowrap' }}>
                👃 Nose
              </td>
              <td>{card.scenario.nose}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', color: 'var(--color-green-dark)', background: 'var(--color-green-light)', whiteSpace: 'nowrap' }}>
                👅 Palate
              </td>
              <td>{card.scenario.palate}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', color: 'var(--color-green-dark)', background: 'var(--color-green-light)' }}>ABV</td>
              <td>{card.scenario.abv}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', color: 'var(--color-green-dark)', background: 'var(--color-green-light)' }}>Oak</td>
              <td>{card.scenario.oak}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Options */}
      {phase === 'question' && (
        <div>
          <p style={{ fontSize: '0.92rem', fontWeight: 'bold', color: 'var(--color-green-dark)', marginBottom: 10 }}>
            Which region is this wine from?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => onAnswer(opt)}
                style={{
                  textAlign: 'left',
                  padding: '10px 16px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'white',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  color: 'var(--color-text)',
                  transition: 'all var(--dur-fast)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--color-green-light)'
                  e.currentTarget.style.borderColor = 'var(--color-green-dark)'
                  e.currentTarget.style.color = 'var(--color-green-dark)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.color = 'var(--color-text)'
                }}
              >
                {regionLabels[opt] || opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Revealed */}
      {phase === 'revealed' && (
        <div>
          {/* Result banner */}
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: 16,
            background: isCorrect ? '#d4edda' : '#f8d7da',
            border: `1px solid ${isCorrect ? '#c3e6cb' : '#f5c6cb'}`,
          }}>
            <p style={{ fontWeight: 'bold', fontSize: '1rem', color: isCorrect ? '#155724' : '#721c24', marginBottom: 2 }}>
              {isCorrect ? '✓ Correct' : '✗ Not quite'}
            </p>
            <p style={{ fontSize: '0.9rem', color: isCorrect ? '#155724' : '#721c24' }}>
              {isCorrect
                ? `Yes — this is ${regionLabels[card.answer]}`
                : `This is ${regionLabels[card.answer]}${chosen ? ` — not ${regionLabels[chosen]}` : ''}`
              }
            </p>
          </div>

          {/* Explanation */}
          <div className="topic-section">
            <h3 className="doc-h3">Why {regionLabels[card.answer]}?</h3>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
              {card.explanation}
            </p>
          </div>

          {/* Why not the others */}
          <div className="topic-section">
            <h3 className="doc-h3">Why not the others?</h3>
            <div className="doc-table-wrap">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Region</th>
                    <th>Why it's not this</th>
                  </tr>
                </thead>
                <tbody>
                  {card.notTheOthers.map((item, i) => (
                    <tr key={i}>
                      <td><strong>{item.region}</strong></td>
                      <td>{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={onNext}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              background: 'var(--color-green-dark)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: 8,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-green-mid)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-green-dark)'}
          >
            Next Card →
          </button>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   RESULTS
═══════════════════════════════════════════════════════════════ */
function Results({ score, grape, onRestart, onBack }) {
  const pct = Math.round((score.correct / score.total) * 100)
  const grade = pct >= 80 ? { label: 'Excellent', bg: '#d4edda', color: '#155724' }
    : pct >= 60 ? { label: 'Good', bg: '#fff3cd', color: '#856404' }
    : { label: 'Keep Studying', bg: '#f8d7da', color: '#721c24' }

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: 'var(--color-green-dark)', fontSize: '0.88rem', cursor: 'pointer', textDecoration: 'underline', marginBottom: 20 }}
      >
        ← Back to Deductive Tasting
      </button>

      <div className="topic-header" style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'white', lineHeight: 1 }}>{pct}%</div>
        <div style={{ fontSize: '1.1rem', marginTop: 8 }}>{grape.grape} — Flash Mode</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-green-text)', marginTop: 4 }}>
          {score.correct} correct out of {score.total} cards
        </div>
      </div>

      <div style={{
        padding: '16px 20px',
        background: grade.bg,
        border: `1px solid ${grade.color}44`,
        borderRadius: 'var(--radius-md)',
        marginBottom: 24,
        textAlign: 'center',
      }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: grade.color }}>{grade.label}</p>
        <p style={{ fontSize: '0.9rem', color: grade.color, marginTop: 6 }}>
          {pct >= 80
            ? 'Strong work. Review the profile notes to lock in the specific markers, especially for the harder cards.'
            : pct >= 60
            ? "Getting there. Focus on the 'Why not the others' explanations — that's where the exam points are."
            : 'Go back to Study Profiles and read the regional differences carefully before retrying.'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onRestart}
          style={{
            flex: 1, padding: '12px', background: 'var(--color-green-dark)', color: 'white',
            border: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.95rem',
            fontWeight: 'bold', cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-green-mid)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-green-dark)'}
        >
          Try Again
        </button>
        <button
          onClick={onBack}
          style={{
            flex: 1, padding: '12px', background: 'var(--color-gold-light)', color: 'var(--color-gold)',
            border: '1px solid var(--color-gold)', borderRadius: 'var(--radius-md)',
            fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer',
          }}
        >
          Choose Another Grape
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   GRAPE PROFILE — Study Mode
═══════════════════════════════════════════════════════════════ */
function GrapeProfile({ grape, onBack, onFlash }) {
  const [activeId, setActive] = useState(grape.regions[0].id)
  const region = grape.regions.find(r => r.id === activeId)

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'var(--color-green-dark)', fontSize: '0.88rem', cursor: 'pointer', textDecoration: 'underline' }}
        >
          ← Back
        </button>
        <button
          onClick={onFlash}
          style={{
            background: 'var(--color-green-dark)', color: 'white', border: 'none',
            padding: '8px 20px', borderRadius: 'var(--radius-md)', fontSize: '0.88rem',
            fontWeight: 'bold', cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-green-mid)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-green-dark)'}
        >
          Flash Mode →
        </button>
      </div>

      {/* Header */}
      <div className="topic-header">
        <h1>{grape.grape} — Regional Profiles</h1>
        <span className="topic-group">Study Mode · {grape.regions.length} regions</span>
      </div>

      <p style={{ marginBottom: 20, color: 'var(--color-text-light)', fontSize: '0.93rem', lineHeight: 1.7 }}>
        {grape.intro}
      </p>

      {/* Region tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24, borderBottom: '2px solid var(--color-green-light)', paddingBottom: 12 }}>
        {grape.regions.map(r => (
          <button
            key={r.id}
            onClick={() => setActive(r.id)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-sm)',
              border: activeId === r.id ? '2px solid var(--color-green-dark)' : '1px solid var(--color-border)',
              background: activeId === r.id ? 'var(--color-green-dark)' : 'white',
              color: activeId === r.id ? 'white' : 'var(--color-text)',
              fontSize: '0.88rem',
              fontWeight: activeId === r.id ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all var(--dur-fast)',
            }}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Region detail */}
      <div key={activeId}>
        {/* Region header */}
        <div style={{
          background: 'var(--color-green-light)',
          border: '1px solid var(--color-green-mid)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <h2 style={{ color: 'var(--color-green-dark)', fontSize: '1.2rem', marginBottom: 2 }}>{region.name}</h2>
            <p style={{ color: 'var(--color-green-mid)', fontSize: '0.88rem' }}>{region.subregion} · {region.country}</p>
          </div>
          <DifficultyBadge level={region.difficulty} label="to identify" />
        </div>

        <p style={{ marginBottom: 20, lineHeight: 1.75, color: 'var(--color-text)' }}>
          {region.whyThisRegion}
        </p>

        {/* Sensory profile */}
        <h2 className="doc-h2">Sensory Profile</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <tbody>
              {[
                ['👁  Sight',  region.profile.sight],
                ['👃  Nose',   region.profile.nose],
                ['👅  Palate', region.profile.palate],
              ].map(([label, text]) => (
                <tr key={label}>
                  <td style={{ width: 100, fontWeight: 'bold', color: 'var(--color-green-dark)', background: 'var(--color-green-light)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {label}
                  </td>
                  <td style={{ lineHeight: 1.7 }}>{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Clues */}
        <h2 className="doc-h2">Key Identification Clues</h2>
        <ul className="doc-ul">
          {region.clues.map((clue, i) => (
            <li key={i} style={{ marginBottom: 6, lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-green-dark)' }}>·</strong> {clue}
            </li>
          ))}
        </ul>

        {/* Why not the others */}
        <h2 className="doc-h2">Why It's Not the Others</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Region</th>
                <th>Key Differentiator</th>
              </tr>
            </thead>
            <tbody>
              {region.eliminations.map((e, i) => (
                <tr key={i}>
                  <td><strong>{e.region}</strong></td>
                  <td>{e.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exam tip */}
        <div className="exam-tip" style={{ marginTop: 20 }}>
          <p><strong>🎯 Exam Tip — {region.name}</strong></p>
          <p>{region.examTip}</p>
        </div>

        {/* Producers */}
        {region.producers && (
          <>
            <h2 className="doc-h2">Key Producers to Know</h2>
            <div className="doc-table-wrap">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Producer</th>
                    <th>Style &amp; Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {region.producers.map((p, i) => (
                    <tr key={i}>
                      <td><strong style={{ color: 'var(--color-green-dark)' }}>{p.name}</strong></td>
                      <td style={{ lineHeight: 1.65 }}>{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Shared: difficulty badge ───────────────────────────────── */
function DifficultyBadge({ level, label = '' }) {
  const styles = {
    easy:   { bg: '#d4edda', color: '#155724' },
    medium: { bg: '#fff3cd', color: '#856404' },
    hard:   { bg: '#f8d7da', color: '#721c24' },
  }
  const s = styles[level] || styles.medium
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 12px',
      borderRadius: 4,
      fontSize: '0.82rem',
      fontWeight: 'bold',
      background: s.bg,
      color: s.color,
      whiteSpace: 'nowrap',
    }}>
      {level}{label ? ` ${label}` : ''}
    </span>
  )
}
