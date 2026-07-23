const topics = {
  France: [
    { id: '01', name: 'Alsace', desc: 'Grand Cru villages, soil diversity, plantings' },
    { id: '02', name: 'Bordeaux', desc: 'All classifications, 30yr vintages, 2nd labels' },
    { id: '03', name: 'Burgundy', desc: 'GC/1er Cru, Clos sites, producers, 30yr vintages' },
    { id: '04', name: 'Champagne', desc: 'All GC/1er Cru, Special Club, 30yr vintages' },
    { id: '05', name: 'Loire', desc: 'Muscadet Crus, soils Sancerre, Layon villages' },
    { id: '06', name: 'Rhône Valley', desc: 'Village names, blends, climats, geography' },
    { id: '07', name: 'South of France', desc: 'Languedoc Crus, Jura, Savoie, Provence' },
    { id: '08', name: 'Sparkling (Global)', desc: 'Maturation, VDP Sekt, producers worldwide' },
  ],
  Europe: [
    { id: '09', name: 'Spain', desc: 'Pagos, Corpinat, Canary Islands, smaller DOs' },
    { id: '10', name: 'Portugal', desc: 'Grape synonyms, sub-regions, Azores, Douro' },
    { id: '11', name: 'Italy', desc: 'Sub-districts, Southern grapes, 20yr DOCG vintages' },
    { id: '12', name: 'Germany', desc: 'All Anbaugebiet, VDP, Oechsle, Monopole sites' },
    { id: '13', name: 'Austria', desc: 'Erste Lage, Sekt hierarchy, native varieties' },
    { id: '14', name: 'Greece & Eastern Europe', desc: 'Santorini, Tokaji, Switzerland, England' },
  ],
  'New World': [
    { id: '15', name: 'Australia', desc: 'Geography, soils, sub-regions, Tasmania' },
    { id: '16', name: 'New Zealand', desc: 'GI system, all sub-districts, producers' },
    { id: '17', name: 'USA & Canada', desc: 'AVAs by district, Ontario VQA, Ice Wine' },
    { id: '18', name: 'South America', desc: 'Altitude, DO areas, Criollas, prestige labels' },
    { id: '19', name: 'South Africa', desc: 'All WO wards, producers, 10yr vintages' },
    { id: '20', name: 'Other Countries', desc: 'China, Japan, Israel, Turkey, Cyprus' },
  ],
  'Fortified · Spirits · Beverages': [
    { id: '21', name: 'Fortified Wines', desc: 'Sherry, Port, Madeira, VDN, Vermouths' },
    { id: '22', name: 'Spirits', desc: 'Distilleries, production, regulations, brands' },
    { id: '23', name: 'Liqueurs & Aperitifs', desc: 'Types, brands, cocktails, service' },
    { id: '24', name: 'Beers & Ciders', desc: 'Malts, hops, Lambic, Rauchbier, Gueuze' },
    { id: '25', name: 'Saké', desc: 'Brewing terms, types, production areas' },
  ],
  'Professional Skills': [
    { id: '26', name: 'Viticulture & Vinification', desc: 'Diseases, soils, organic, techniques' },
    { id: '27', name: 'Food & Wine Pairing', desc: 'Vintages, producers, matching vs contrasting' },
    { id: '28', name: 'Business Aspects', desc: 'Inventory, purchasing, wine lists, training' },
    { id: '29', name: 'Practical Service', desc: '45-min exam: cocktails, decanting, selling' },
    { id: '30', name: 'Deductive Tasting', desc: '6 wines · 25 min · oral · Court format' },
  ],
}

function TopicGrid() {
  return (
    <section id="topics">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-serif text-[24px] text-wine-deep font-semibold tracking-tight">The Syllabus — 30 topics</h2>
        <span className="text-[11px] text-text-muted">CMS Europe 2026/2027</span>
      </div>

      {Object.entries(topics).map(([section, items]) => (
        <div key={section} className="mb-8">
          <h3 className="text-[10px] uppercase tracking-[2.5px] text-rose-dim font-semibold mb-3">{section}</h3>
          <div className="grid grid-cols-4 gap-3">
            {items.map(topic => (
              <a
                key={topic.id}
                href="#"
                className="group bg-surface border border-border rounded-2xl p-5 no-underline flex flex-col transition-all duration-200 shadow-sm hover:shadow-md hover:border-rose/30 hover:-translate-y-1"
              >
                <span className="font-serif text-[32px] text-border-light leading-none mb-2 group-hover:text-rose transition-colors">{topic.id}</span>
                <span className="text-[14px] text-cream font-semibold mb-1.5">{topic.name}</span>
                <span className="text-[11px] text-text-muted leading-snug">{topic.desc}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default TopicGrid
