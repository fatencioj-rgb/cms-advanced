function App() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-16">
      {/* Header */}
      <header className="text-center mb-12">
        <img src="/cms-advance/logo.png" alt="Court of Master Sommeliers" className="w-20 h-20 mx-auto mb-6 object-contain" />
        <h1 className="font-serif text-[52px] text-gold font-semibold tracking-tight leading-tight">Fiorella Atencio</h1>
        <p className="text-[13px] text-text-dim mt-2 tracking-[3px] uppercase">CMS Advance</p>
        <div className="w-10 h-[1px] bg-gold-dim mx-auto mt-6 opacity-50"></div>
      </header>

      {/* Navigation Buttons */}
      <nav className="w-full max-w-[420px] flex flex-col gap-3.5">
        <a href="#" className="flex items-center justify-between w-full py-4 px-6 bg-transparent border border-gold-dim/40 rounded-md text-cream text-[14px] font-normal tracking-[1.5px] uppercase no-underline transition-all duration-300 hover:bg-gold/5 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,168,75,0.12)]">
          <span>Wine</span>
          <span className="text-[10px] text-text-dim tracking-normal normal-case">0%</span>
        </a>
        <a href="#" className="flex items-center justify-between w-full py-4 px-6 bg-transparent border border-gold-dim/40 rounded-md text-cream text-[14px] font-normal tracking-[1.5px] uppercase no-underline transition-all duration-300 hover:bg-gold/5 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,168,75,0.12)]">
          <span>Spirits & Beverages</span>
          <span className="text-[10px] text-text-dim tracking-normal normal-case">0%</span>
        </a>
        <a href="#" className="flex items-center justify-between w-full py-4 px-6 bg-transparent border border-gold-dim/40 rounded-md text-cream text-[14px] font-normal tracking-[1.5px] uppercase no-underline transition-all duration-300 hover:bg-gold/5 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,168,75,0.12)]">
          <span>Viticulture & Vinification</span>
          <span className="text-[10px] text-text-dim tracking-normal normal-case">0%</span>
        </a>
        <a href="#" className="flex items-center justify-between w-full py-4 px-6 bg-transparent border border-gold-dim/40 rounded-md text-cream text-[14px] font-normal tracking-[1.5px] uppercase no-underline transition-all duration-300 hover:bg-gold/5 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,168,75,0.12)]">
          <span>Service & Business</span>
          <span className="text-[10px] text-text-dim tracking-normal normal-case">0%</span>
        </a>
        <a href="#" className="flex items-center justify-between w-full py-4 px-6 bg-transparent border border-gold-dim/40 rounded-md text-cream text-[14px] font-normal tracking-[1.5px] uppercase no-underline transition-all duration-300 hover:bg-gold/5 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(200,168,75,0.12)]">
          <span>Deductive Tasting</span>
          <span className="text-[10px] text-text-dim tracking-normal normal-case">0%</span>
        </a>
      </nav>

      {/* Footer */}
      <footer className="mt-14">
      </footer>
    </div>
  )
}

export default App
