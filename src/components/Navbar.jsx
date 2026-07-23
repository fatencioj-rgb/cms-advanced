function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border px-8 py-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-full border-2 border-rose flex items-center justify-center bg-rose-glow">
          <span className="font-serif text-[12px] text-rose font-bold">CMS</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-[2.5px] text-text-muted">Court of Master Sommeliers Europe</span>
          <span className="text-[15px] font-semibold text-cream tracking-wide">SOMMELIER · STUDY</span>
        </div>
      </div>
      <div className="flex gap-7">
        <a href="#" className="text-[11px] font-medium uppercase tracking-wider text-cream border-b-2 border-rose pb-0.5">Home</a>
        <a href="#topics" className="text-[11px] font-medium uppercase tracking-wider text-text-dim hover:text-cream transition-colors">Topics</a>
        <a href="#skills" className="text-[11px] font-medium uppercase tracking-wider text-text-dim hover:text-cream transition-colors">Skills</a>
      </div>
      <div>
        <input type="text" placeholder="Search..." className="bg-bg border border-border rounded-lg px-3.5 py-2 text-xs text-text w-[170px] outline-none focus:border-rose focus:ring-1 focus:ring-rose/20 transition-all placeholder:text-text-muted" />
      </div>
    </nav>
  )
}

export default Navbar
