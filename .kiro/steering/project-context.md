# CMS Advanced — Project Context

## Examination Body
- **Court of Master Sommeliers EUROPE** (courtofmastersommeliers.org)
- NOT CMS Americas (mastersommeliers.org) — different organisation, different format
- 5-day course, final 2.5 days are exams
- Pass mark: 60% in each of 3 sections (Theory, Tasting, Service), all must be passed together

## Project Structure
- **Framework:** React + Vite + Tailwind CSS
- **Repo:** github.com/fatencioj-rgb/cms-advanced (public)
- **Live URL:** https://fatencioj-rgb.github.io/cms-advanced/
- **Local folder:** `c:\Users\fiore\OneDrive - Le Cordon Bleu International BV\CMS 206\cms-advance`
- **Syllabus source:** `Syllabus-202627.pdf` in project root

## Key Files
- `src/App.jsx` — main app with sidebar navigation + views
- `src/data/syllabus.js` — syllabus breakdown (context + advanced) for all topics
- `src/data/research/` — folder for detailed research content per topic
- `src/index.css` — Tailwind + theme tokens (dark mode, zinc palette, green accent)
- `public/logo.png` — CMS logo
- `public/Adv-badge.png` — Advanced Sommelier pin

## Research Standards

### Priority Sources (always use these first)
1. **GuildSomm** (guildsomm.com) — Fiorella has an active account
2. **Jancis Robinson** / Oxford Companion to Wine (jancisrobinson.com)
3. **Decanter** (decanter.com)
4. **Official regional/country pages** — examples:
   - France: CIVB (Bordeaux), BIVB (Burgundy), Comité Champagne, Vins d'Alsace, InterRhône
   - Italy: Consorzios (Barolo, Chianti, Brunello, etc.)
   - Spain: DOCa Rioja, DO Priorat, Consejo Regulador
   - Germany: Wines of Germany, VDP
   - Australia: Wine Australia
   - New Zealand: New Zealand Wine
   - South Africa: WOSA / Wines of South Africa
   - Portugal: Wines of Portugal, IVDP (Port & Douro)
5. **courtofmastersommeliers.org** (CMS Europe official resources, syllabus, toolbox)

### Sources to AVOID
- Random blogs without credentials
- AI-generated content without verification
- CMS Americas materials (mastersommeliers.org) — different syllabus/standards
- Outdated textbooks (pre-2020) unless cross-referenced with current data

### Research Approach
- Cross-reference minimum 2 sources for factual claims
- Always note when information may have changed recently
- Prefer primary sources over secondary
- Note vintage of information (wine laws and classifications change)

## Data Structure for Research
Research files go in `src/data/research/`. Each topic gets its own .js file exporting an object:

```javascript
export const alsace = {
  name: 'Alsace',
  lastUpdated: '2026-08-18',
  sources: ['GuildSomm', 'Vins d\'Alsace official', 'Jancis Robinson'],
  content: {
    overview: '...',
    climate: '...',
    soils: '...',
    grapes: '...',
    appellations: '...',
    classifications: '...',
    producers: '...',
    vintages: '...',
    // etc.
  }
}
```

## Design System (current)
- Dark mode (zinc-950 background)
- Accent: green (#22c55e) from Advanced pin
- Font: SF Pro / system sans-serif
- Cards with borders, hover states
- Sidebar navigation with 5 sections: Wine, Spirits, Viticulture, Tasting, Service

## Deploy Process
```
cd "c:\Users\fiore\OneDrive - Le Cordon Bleu International BV\CMS 206\cms-advance"
git add .
git commit -m "message"
git push
npm run build
npx gh-pages -d dist
```
