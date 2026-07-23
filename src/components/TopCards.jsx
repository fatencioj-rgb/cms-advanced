function TopCards() {
  return (
    <section className="mb-11">
      {/* Featured Row */}
      <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-4 mb-4">
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-border-light transition-all duration-200 hover:-translate-y-0.5 border-l-4 border-l-yellow">
          <span className="text-[9px] uppercase tracking-[1.5px] font-semibold text-accent block mb-3">Read Next</span>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-[24px] text-wine-deep font-semibold mb-1">Bordeaux</h3>
              <p className="text-xs text-text-dim mb-2.5">Topic 2 — Classifications & Châteaux</p>
              <a href="#" className="text-xs text-rose font-semibold hover:text-wine transition-colors">BEGIN →</a>
            </div>
            <div className="text-right">
              <div className="w-[100px] h-1.5 bg-border rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-yellow rounded-full" style={{width: '62%'}}></div>
              </div>
              <span className="text-[10px] text-text-muted">5/8 topics</span>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-border-light transition-all duration-200 hover:-translate-y-0.5">
          <span className="text-[9px] uppercase tracking-[1.5px] font-semibold text-purple block mb-3">Test Yourself</span>
          <h3 className="font-serif text-[22px] text-wine-deep font-semibold mb-1">Full Quiz</h3>
          <p className="text-xs text-text-dim mb-2.5">800+ questions — all topics</p>
          <a href="#" className="text-xs text-rose font-semibold hover:text-wine transition-colors">START →</a>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-border-light transition-all duration-200 hover:-translate-y-0.5">
          <span className="text-[9px] uppercase tracking-[1.5px] font-semibold text-green block mb-3">Daily Review</span>
          <h3 className="font-serif text-[22px] text-wine-deep font-semibold mb-1">All Clear</h3>
          <p className="text-xs text-text-dim mb-2.5">No cards due today</p>
          <span className="text-xs text-text-muted">✓ Up to date</span>
        </div>
      </div>

      {/* Utility Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Look It Up', title: 'Quick Reference', desc: '30 topics — maps, tables', action: 'OPEN' },
          { label: 'Core Terms', title: 'Glossary', desc: 'Key terms — A–Z', action: 'OPEN' },
          { label: 'Find Anything', title: 'Search', desc: 'The whole bank — 100%', action: 'SEARCH' },
          { label: 'By Region', title: 'Topic Quizzes', desc: 'Test per chapter', action: 'START' },
        ].map((card) => (
          <div key={card.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-border-light transition-all duration-200 hover:-translate-y-0.5">
            <span className="text-[9px] uppercase tracking-[1.5px] text-text-muted block mb-2">{card.label}</span>
            <h4 className="text-[15px] text-cream font-semibold mb-1">{card.title}</h4>
            <p className="text-[11px] text-text-dim mb-2.5">{card.desc}</p>
            <a href="#" className="text-[11px] text-rose font-semibold hover:text-wine transition-colors">{card.action} →</a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopCards
