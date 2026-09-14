/**
 * CHARDONNAY — Regional Profiles for Deductive Tasting Flash Mode
 * Sources: GuildSomm, Jancis Robinson, Decanter, BIVB, regional bodies
 * Last updated: 2026-09-07
 *
 * Each region has:
 *  - profile: the sensory description written in narrative study language
 *  - clues: the 3–4 most distinctive markers that point TO this region
 *  - eliminations: why you can rule out the other regions
 *  - examTip: the one thing to remember under exam pressure
 */

export const chardonnay = {
  grape: 'Chardonnay',
  type: 'white',
  intro: `Chardonnay is the ultimate chameleon. The grape itself is almost neutral — what you\'re really tasting is climate, soil, and winemaking decisions. That\'s what makes it both the most important white grape for the Advanced exam and the most instructive one to study. Master Chardonnay and you understand the whole spectrum from austere minerality to opulent richness.`,

  regions: [
    {
      id: 'chablis',
      name: 'Chablis',
      country: 'France',
      subregion: 'Burgundy — Yonne',
      difficulty: 'medium',

      profile: {
        sight: `Pale lemon, almost water-white with green highlights. This is the palest you\'ll see Chardonnay anywhere in the world. No gold, no depth of colour — Chablis is a cool-climate wine and the colour tells you that before you even smell it.`,
        nose: `The first thing that hits you is that flinty, almost wet-stone quality — what the French call "goût de pierre à fusil" (gunflint). Then comes green apple, lemon zest, white flowers. Here\'s something important for 2026: modern Chablis, especially Premier and Grand Cru, increasingly sees some oak — but it\'s subtle and very different from Meursault. Think used barrels or large-format foudres, not new 228L barriques. The result is a faint spice or light vanilla note underneath the minerality, never buttery. Producers like Raveneau, Dauvissat, and William Fèvre use wood precisely this way. In older vintages you might also get petrol, wax, or lanolin — classic aged Chablis signatures.`,
        palate: `High, almost aggressive acidity — this is what Chablis is always famous for. The body is light to medium. Bone dry. The fruit is restrained: green apple, unripe pear, citrus. The finish has that characteristic oyster-shell or chalk mineral quality that lingers. If there was subtle oak in the wine, you might feel very slight texture on the mid-palate, but it\'s nothing like the creamy viscosity of Meursault. Low to moderate alcohol, around 12–13%.`,
      },

      clues: [
        'Palest colour of all Chardonnays — water-white to pale lemon with green tints',
        'Gunflint / wet stone minerality dominates — this is always the primary signature',
        'Very high acidity, steely, with an oyster-shell or saline finish',
        'Oak is subtle at most — faint spice underneath the mineral core, never butter or vanilla',
        'Lower alcohol than Côte de Beaune (≈12–13%)',
      ],

      eliminations: [
        { region: 'Meursault / Côte de Beaune', reason: 'In Meursault the oak is front and centre — butter, hazelnut, cream. In Chablis the mineral core always dominates and any oak is a background note, not a feature.' },
        { region: 'Mâconnais', reason: 'Mâcon is fruitier and softer — rounder acidity, no flint, no oyster shell. It\'s the friendlier, less intense face of Burgundy.' },
        { region: 'Sonoma / California', reason: 'California Chardonnay will be fuller, riper (peach, mango, pineapple) with obvious new oak. Nothing like the tension and restraint of Chablis.' },
        { region: 'Australia', reason: 'Australian Chardonnay is broader and riper. The stone fruit warmth gives it away — Chablis always stays in the green apple and citrus zone.' },
        { region: 'Champagne base wine', reason: 'Champagne Blanc de Blancs is even leaner with chalky minerality and autolytic biscuit notes. The bubbles and autolysis are the separating factors.' },
      ],

      whyThisRegion: `Chablis sits at the northern edge of what\'s climatically possible for Chardonnay. The Kimmeridgian limestone-and-chalk soils are full of ancient oyster fossils — which is literally why you taste that oyster-shell minerality. No other Chardonnay region in the world has this specific soil type at this latitude. The modern shift toward subtle oak use (used barrels, foudres) at Premier and Grand Cru level adds complexity without masking that signature mineral identity.`,

      producers: [
        {
          name: 'Domaine Raveneau',
          notes: 'The undisputed benchmark — impossibly small production, Grand Crus (Blanchot, Clos, Valmur) that age 20+ years. Partly uses old oak for Grand Cru, stainless for village. The mineral tension is unlike anything else in white wine.',
        },
        {
          name: 'Domaine René & Vincent Dauvissat',
          notes: 'Raveneau\'s only real rival. Uses barriques but carefully — the wines feel dense and mineral, not oaky. Les Clos and Les Preuses Grand Crus are reference points. Dauvissat proves oak can serve Chablis without dominating it.',
        },
        {
          name: 'Domaine William Fèvre',
          notes: 'Largest Grand Cru holder in Chablis (15+ ha). More consistent availability than Raveneau/Dauvissat. Uses some new oak on the Grands Crus but with restraint. Their Bougros "Côte Bouguerots" is a benchmark for terroir expression.',
        },
        {
          name: 'Domaine Patrick Piuze',
          notes: 'Modern minimalist approach — no new oak, extended ageing on lees. Incredibly pure mineral expression. One of the more accessible top producers to find on a list.',
        },
        {
          name: 'La Chablisienne (co-op)',
          notes: 'The region\'s largest co-op and a reliable benchmark for the style at all levels — especially useful for understanding appellation character without the scarcity premium.',
        },
      ],

      examTip: `The gunflint minerality and steely acidity are always the dominant signatures in Chablis — oak may be present in modern wines (especially 1er and Grand Cru) but it\'s a whisper, not a statement. If you\'re getting butter or hazelnut as primary notes, you\'ve crossed into the Côte de Beaune.`,
    },

    {
      id: 'meursault',
      name: 'Meursault / Côte de Beaune',
      country: 'France',
      subregion: 'Burgundy — Côte d\'Or',
      difficulty: 'medium',

      profile: {
        sight: `Medium gold, sometimes deep gold with age. Noticeably richer in colour than Chablis. With age, Meursault moves into amber-gold territory. The colour alone tells you there\'s texture here.`,
        nose: `This is where Burgundy Chardonnay gets serious. Butter, toasted hazelnut, brioche, cream — these are the oak and lees-ageing signatures. Under that richness you\'ll find ripe apple, white peach, lemon curd. The oak is French and usually well-integrated — you smell it as spice and toast rather than raw wood. With age: truffle, honey, beeswax, and that famous Burgundian "noisette" (hazelnut) quality.`,
        palate: `Medium to full body. The acidity is there but it\'s softer than Chablis — Kimmeridgian soil gives way to limestone and clay here, which rounds things out. There\'s texture — almost a creamy, viscous quality from extended lees contact (bâtonnage). Dry, but the fruit feels generous: ripe pear, peach, butter. Long finish with spice and toasty oak. Alcohol around 13–13.5%.`,
      },

      clues: [
        'Butter and hazelnut on the nose — the most reliable Meursault signature',
        'Creamy, textured palate from bâtonnage (lees stirring)',
        'Ripe stone fruit: peach, pear, apple — warmer expression than Chablis',
        'French oak influence — toast, spice, vanilla but integrated, not aggressive',
        'Fuller body with softer acidity than Chablis',
      ],

      eliminations: [
        { region: 'Chablis', reason: 'Chablis is steely, mineral, zero oak. Meursault is the opposite — rich, textured, and oak-influenced.' },
        { region: 'Mâconnais', reason: 'Mâcon is simpler and less oak-influenced. Meursault has layers of complexity — truffle, hazelnut, spice — that Mâcon doesn\'t reach.' },
        { region: 'Sonoma', reason: 'Sonoma will be riper (tropical fruit, vanilla) and the oak often more obvious or American-inflected. Meursault is more restrained and savoury.' },
        { region: 'Champagne', reason: 'Champagne base wine is lean and high-acid. Meursault is broad and textured.' },
      ],

      whyThisRegion: `The villages of the Côte de Beaune — Meursault, Puligny-Montrachet, Chassagne-Montrachet — sit on a precise band of Bathonian and Oxfordian limestone at mid-slope altitude. The combination of slope aspect, soil depth, and the tradition of barrel fermentation with bâtonnage produces that signature hazelnut-butter-cream complexity. Something important is happening in 2026: there\'s a generational shift toward a more tense, energetic style. A new wave of producers is pulling back on new oak and bâtonnage, making wines with more freshness and mineral definition while keeping the textural richness. Both styles exist — know both.`,

      producers: [
        {
          name: 'Domaine Coche-Dury (Meursault)',
          notes: 'The most mythologised domaine in white Burgundy. Jean-François Coche\'s style is tension under richness — the wines feel simultaneously mineral and opulent. Their Meursault village is more sought-after than most Premier Crus. His son Raphaël continues the style.',
        },
        {
          name: 'Domaine Roulot (Meursault)',
          notes: 'Jean-Marc Roulot represents the "bright and balanced" modern Meursault style — less butter-forward than the old paradigm, with more nervous energy and mineral precision. His single-vineyard Meursaults (Les Tessons, Charmes, Perrières) are benchmarks. One of the most respected producers in Burgundy today.',
        },
        {
          name: 'Domaine Leflaive (Puligny-Montrachet)',
          notes: 'The reference house for Puligny. Biodynamic. Their style is more tense and mineral than Meursault — Puligny is always described as more "vertical" where Meursault is "horizontal." Chevalier-Montrachet and Bâtard-Montrachet are the pinnacle.',
        },
        {
          name: 'Domaine Ramonet (Chassagne-Montrachet)',
          notes: 'Chassagne benchmark — more structured and less immediately giving than Meursault. Ramonet\'s Premier Crus (Les Ruchottes, Morgeot) combine power and mineral precision. Chassagne whites are often underrated compared to Puligny.',
        },
        {
          name: 'Domaine Comte Lafon (Meursault)',
          notes: 'Dominique Lafon makes some of the most complete Meursaults — the Perrières 1er Cru is a reference point for the appellation\'s balance of richness, minerality and longevity. Biodynamic since the 1990s.',
        },
      ],

      examTip: `Butter + hazelnut + cream = classic Côte de Beaune. But in 2026 the best Meursaults are moving toward more tension and mineral energy without losing the textural richness. The key differentiator from Chablis remains: in Meursault the oak is a feature, in Chablis it\'s a whisper.`,
    },

    {
      id: 'maconnais',
      name: 'Mâconnais (Pouilly-Fuissé / Mâcon-Villages)',
      country: 'France',
      subregion: 'Burgundy — Southern',
      difficulty: 'hard',

      profile: {
        sight: `Light to medium lemon-gold. Similar to Chablis in paleness but with just a touch more warmth in the colour — the slightly warmer climate is already showing.`,
        nose: `Think of this as Chardonnay without the drama. Fresh, clean, friendly. Green apple, ripe pear, a hint of white flower, maybe some light citrus. Little to no oak in most Mâcon-Villages. Pouilly-Fuissé from a top producer can have some barrel influence but it remains much more fruit-forward and less complex than Meursault.`,
        palate: `Light to medium body. Good acidity but not the steely aggression of Chablis. Dry. The fruit is uncomplicated — pear, apple, light citrus. Clean, fresh finish. This is the kind of wine you understand immediately, unlike the layers of Meursault. Alcohol around 12.5–13%.`,
      },

      clues: [
        'Fresh, clean, simple fruit — no oak, no butter, no complexity trying to emerge',
        'Good acidity but rounder and less aggressive than Chablis',
        'Light body — feels almost like a "entry-level Burgundy" profile',
        'No particular mineral signature — fruit-forward without being tropical',
      ],

      eliminations: [
        { region: 'Chablis', reason: 'Chablis has that distinctive gunflint minerality and more aggressive acidity. Mâcon is softer and fruitier.' },
        { region: 'Meursault', reason: 'Meursault has layers — butter, hazelnut, oak spice. Mâcon doesn\'t have that complexity or texture.' },
        { region: 'Sonoma / New World', reason: 'Even Mâcon is more restrained than New World Chardonnay. No tropical fruit, no obvious oak, no weight.' },
      ],

      whyThisRegion: `The Mâconnais is where Burgundy meets the south. The climate is a touch warmer, the winemaking less interventionist, and the price point more accessible. But in 2020 something important happened: Pouilly-Fuissé received its first Premier Cru vineyards — 22 of them. This was overdue recognition for terroirs like La Croix, En France, and Vers Cras that had been producing wines of genuine complexity for years. Pouilly-Loché and Pouilly-Vinzelles followed with Premier Crus in 2025. The Mâconnais is no longer just "affordable Burgundy" — it\'s a serious appellation in its own right.`,

      producers: [
        {
          name: 'Domaine Guffens-Heynen (Pouilly-Fuissé)',
          notes: 'Jean-Marie Guffens was the person who proved the Mâconnais could produce world-class Chardonnay. His wines from Pierreclos have extraordinary concentration and longevity — nothing like the fresh, simple style of generic Mâcon. His négociant label Verget sources from across the Mâconnais and beyond.',
        },
        {
          name: 'Château Fuissé (Pouilly-Fuissé)',
          notes: 'The most important domaine in the appellation by volume and reputation. Their Tête de Cuvée is the reference point for what Pouilly-Fuissé can achieve with oak and terroir. More structured and complex than most of the appellation.',
        },
        {
          name: 'Domaine Valette (Pouilly-Fuissé)',
          notes: 'Tiny, biodynamic, profound. Their wines can age 15–20 years and are among the most terroir-transparent in the Mâconnais. Hard to find but important to know.',
        },
        {
          name: 'Domaine de la Soufrandière / Bret Brothers',
          notes: 'The Bret Brothers brought international attention to Pouilly-Vinzelles and Mâcon-Vinzelles. Organic, elegant, terroir-focused. A good accessible reference for the modern style.',
        },
      ],

      examTip: `Mâcon is what Chardonnay looks like without the theatre. If the wine is Burgundian in feel but lacks both the Chablis mineral edge and the Meursault richness, you\'re in the Mâconnais. But if it has more complexity than expected, think Pouilly-Fuissé Premier Cru — the classification since 2020 is genuinely raising the ceiling.`,
    },

    {
      id: 'champagne-blanc-de-blancs',
      name: 'Champagne (Blanc de Blancs)',
      country: 'France',
      subregion: 'Champagne — Côte des Blancs',
      difficulty: 'easy',

      profile: {
        sight: `Pale straw with persistent fine bubbles forming a continuous stream (if served as sparkling). As a still wine base: very pale, almost Chablis-like. The effervescence itself is a clue — fine, persistent, mousse-like.`,
        nose: `Green apple, lemon, chalk, brioche (from autolytic ageing on the lees — that yeasty, bread dough character). With NV: fresh and citrus-driven. With vintage or prestige cuvées: toasty, honeyed, more complex. The key differentiator from still Chardonnay is that autolytic character — biscuit, toast, pastry — which comes from extended lees contact in bottle.`,
        palate: `High acidity — possibly the highest you\'ll encounter in any Chardonnay. Bone dry (Brut) or close to it. Light body. That persistent fizz makes the acidity feel even more pronounced. Clean, precise fruit. Long, chalky finish. The bubbles carry flavour differently than still wine — everything feels lifted and tense.`,
      },

      clues: [
        'Bubbles — fine, persistent, mousse-like (the biggest clue)',
        'Autolytic character: biscuit, brioche, toast from lees ageing',
        'Very high acidity even for Chardonnay',
        'Chalk and citrus minerality from the Côte des Blancs chalk soils',
        'Clean, precise, no heavy oak',
      ],

      eliminations: [
        { region: 'Chablis (still)', reason: 'No bubbles, and Chablis lacks the autolytic brioche character. Chablis is stony/mineral, Champagne is chalky/biscuity.' },
        { region: 'Meursault', reason: 'Meursault is still, fuller-bodied, richer. Zero bubbles, zero autolytic character.' },
        { region: 'New World sparkling', reason: 'New World sparkling (Tasmania, NZ, Franciacorta) may mimic the profile but often shows riper fruit. Champagne is the benchmark for tension and precision.' },
      ],

      whyThisRegion: `The Côte des Blancs is almost pure chalk — Belemnita quadrata chalk specifically, which drains perfectly and reflects heat onto the vine. Chardonnay here never fully ripens in the traditional sense, which is exactly what you want for sparkling wine: high acid, moderate alcohol, tension. The magic happens in the bottle during extended lees ageing (15 months minimum for NV, 3 years for vintage). The most important Blanc de Blancs addresses are Le Mesnil-sur-Oger, Avize, Cramant, and Oger — all Grand Cru villages on the Côte des Blancs.`,

      producers: [
        {
          name: 'Salon (Le Mesnil-sur-Oger)',
          notes: 'The most iconic Blanc de Blancs in existence. Single vineyard, single village (Le Mesnil), single varietal, vintage only — and only declared in the best years (~36 times since 1905). The 2013 and 2012 are the current releases. Tense, precise, almost austere in youth, transcendent with age.',
        },
        {
          name: 'Delamotte (Le Mesnil-sur-Oger)',
          notes: 'Sister house to Salon, and the more accessible entry point to the same terroir. Their NV Blanc de Blancs from Grand Cru Chardonnay is made entirely in stainless — pure, chalk-mineral, citrus-driven. The reference for the "pure" unoaked style.',
        },
        {
          name: 'Pierre Péters (Le Mesnil-sur-Oger)',
          notes: 'Family grower whose Cuvée de Réserve and Blanc de Millénaires are reference Blanc de Blancs. More texture and weight than Delamotte, still firmly mineral. Very consistent quality.',
        },
        {
          name: 'Krug',
          notes: 'Not a traditional Blanc de Blancs house but their Grande Cuvée and Clos du Mesnil (single vineyard Blanc de Blancs from Le Mesnil) show what happens when extraordinary lees ageing meets the Côte des Blancs. Edition 171 is the current NV. The biscuit and hazelnut complexity from extended ageing is unmistakable.',
        },
        {
          name: 'Jacques Selosse (Avize)',
          notes: 'The most controversial and influential producer in Champagne. Anselme Selosse uses Burgundian winemaking (barrel fermentation, oxidative ageing, no fining) in Champagne — the results are polarising but important to know. His wines look nothing like conventional Champagne — more hazelnut, wax, and oxidative depth. Knowing Selosse means understanding the spectrum of what Blanc de Blancs can be.',
        },
      ],

      examTip: `Bubbles + biscuit/brioche + very high acid + chalk mineral = Blanc de Blancs Champagne. The autolytic signature (biscuit, bread dough, pastry) is the result of extended time on lees in bottle — it\'s what separates Champagne from any still Chardonnay. Le Mesnil-sur-Oger is the most important village to know by name for the Advanced.`,
    },

    {
      id: 'sonoma',
      name: 'Sonoma Coast / Russian River Valley',
      country: 'USA',
      subregion: 'California',
      difficulty: 'medium',

      profile: {
        sight: `Medium to deep gold. Noticeably richer colour than any French Chardonnay except perhaps an aged Meursault. The golden warmth tells you there\'s more ripeness and possibly more new oak here.`,
        nose: `Ripe peach, mango, pineapple — the fruit profile shifts decisively tropical in warmer sites. In cooler Sonoma Coast or Russian River: more restrained, apple and pear with citrus, closer to Burgundy but never quite the same. Vanilla and butterscotch from new French or American oak. Often a creamy, almost caramel note from malolactic fermentation. More expressive, more generous than Burgundy.`,
        palate: `Medium to full body. The acidity is good — especially in Russian River and Sonoma Coast where morning fog keeps things fresh — but it feels softer and more generous than Burgundy. Rich texture. Ripe, generous fruit. Often a buttery finish from full malolactic conversion. Alcohol typically higher: 13.5–14.5%.`,
      },

      clues: [
        'Deeper gold colour — more colour than French Chardonnay of the same age',
        'Ripe to tropical fruit: peach, mango, pineapple (especially warmer AVAs)',
        'Vanilla and butterscotch from new oak — more obvious than Burgundy',
        'Full malolactic = buttery, creamy finish',
        'Higher alcohol (13.5–14.5%) — the climate tells',
      ],

      eliminations: [
        { region: 'Chablis', reason: 'Chablis has zero oak, zero butter, maximum mineral tension. Sonoma is the opposite.' },
        { region: 'Meursault', reason: 'Meursault oak is more integrated and savoury. Sonoma oak is more obvious — vanilla, butterscotch. Burgundy feels more mineral; California feels more fruity.' },
        { region: 'Australia', reason: 'Older-style Australian Chardonnay (Barossa) goes even bigger and more overtly oaked. Cooler Australian regions like Yarra Valley or Adelaide Hills can actually be confused with Sonoma Coast — both elegant but Australian tends more citrus-driven.' },
      ],

      whyThisRegion: `Russian River Valley and Sonoma Coast are cooled by the Pacific Ocean fog that rolls through the Petaluma Gap each morning. Without that fog, this would be too warm for elegant Chardonnay. The two AVAs have different personalities: Russian River is more lush and creamy, Sonoma Coast (especially the True Sonoma Coast along the cliffs) is cooler, more saline, and can genuinely challenge white Burgundy in complexity. The generational shift in California is real — new-wave producers are pulling back on new oak and full malolactic, making leaner, more mineral wines. But the fruit register always stays riper than Burgundy.`,

      producers: [
        {
          name: 'Kistler Vineyards (Russian River Valley)',
          notes: 'The defining name in California Chardonnay for 40 years. Their single-vineyard wines (McCrea, Vine Hill, Trout Gulch) are rich and textured but not heavy — orchard fruit, a strong acid spine, and carefully integrated oak. The benchmark for the classic California style done with precision.',
        },
        {
          name: 'Williams Selyem (Russian River Valley)',
          notes: 'One of the original "cult" producers. Their Chardonnays — Drake Estate, Heintz Vineyard — show Meyer lemon, chamomile, and stone fruit with well-judged oak. Consistent vintage to vintage. Their 2024 Heintz is a current benchmark.',
        },
        {
          name: 'DuMOL (Russian River Valley / Sonoma Coast)',
          notes: 'Winemaker Andy Smith makes some of the most Burgundy-like Chardonnays in California — focused, mineral, with elegant oak. Their Estate Chardonnay from Sonoma Coast shows how close California can get to white Burgundy without quite getting there. Important to know for the Advanced.',
        },
        {
          name: 'Flowers Vineyard (Sonoma Coast)',
          notes: 'True Sonoma Coast — perched on the cliffs above the Pacific. Their Camp Meeting Ridge Chardonnay is almost startling in its lean, saline, mineral intensity. This is the cool end of California Chardonnay, the style that challenges assumptions.',
        },
        {
          name: 'Aubert Wines (Sonoma)',
          notes: 'Mark Aubert makes some of California\'s most sought-after single-vineyard Chardonnays — Lauren Vineyard is consistently ranked among the best. Richer and more full-throttle than DuMOL or Flowers, but with extraordinary precision. The most-wanted California Chardonnay in 2026 according to Wine-Searcher.',
        },
      ],

      examTip: `Tropical or ripe stone fruit + vanilla/butterscotch from oak + higher alcohol + generous texture = California. The cool sites (Sonoma Coast, True Sonoma Coast) will be leaner and more mineral but always retain that riper fruit register that gives away the New World origin. DuMOL and Flowers are the producers most likely to confuse you in a blind — they\'re genuinely Burgundy-like but the fruit always tips the hand.`,
    },

    {
      id: 'australia',
      name: 'Australia (Margaret River / Yarra Valley)',
      country: 'Australia',
      subregion: 'Western Australia / Victoria',
      difficulty: 'hard',

      profile: {
        sight: `Margaret River: medium gold, clean. Yarra Valley: lighter, almost Burgundian in colour. Older style (Hunter Valley, Barossa): deep gold, sometimes amber with age. Australian Chardonnay has evolved enormously — the modern style is much more restrained than it was 20 years ago.`,
        nose: `Margaret River: nectarine, white peach, citrus, subtle French oak — elegant, almost Burgundian but with a distinct tropical warmth underneath. Yarra Valley: more citrus-driven, lighter, higher acid, can genuinely challenge cool-climate Burgundy. Hunter Valley (aged): remarkable toasty, petrol-like quality — like a very waxy, aged white Burgundy but more overtly tropical. The tell is always a touch more warmth and ripeness than equivalent French wines.`,
        palate: `The modern Australian style is medium-bodied, well-balanced, with good acid retention. Margaret River in particular has gravelly soils and maritime influence that keeps freshness. The fruit is rounder and riper than Burgundy — stone fruit rather than green apple. Less minerality, more fruit weight. Alcohol: 13–14%.`,
      },

      clues: [
        'Stone fruit ripeness (nectarine, peach) even in cool-climate styles',
        'Less mineral tension than Burgundy — the fruit is rounder',
        'Margaret River: subtle oak, elegant, but tropical warmth lurking underneath',
        'Yarra Valley: can look like Burgundy but lacks the gunflint/hazelnut complexity',
        'Hunter Valley aged: petrol + tropical + waxy = distinctly Australian',
      ],

      eliminations: [
        { region: 'Chablis', reason: 'Australian Chardonnay will always show more fruit weight and less aggressive mineral acidity.' },
        { region: 'Meursault', reason: 'Meursault has hazelnut and truffle. Australian Chardonnay has stone fruit and nectarine — different fruit register entirely.' },
        { region: 'Sonoma', reason: 'Sonoma is the most similar comparison. Australian tends to be slightly less oaky and more citrus-forward in the modern style; the two can be genuinely confusable.' },
      ],

      whyThisRegion: `Australia transformed its Chardonnay style dramatically — from the "oaky monster" era of the 1990s to the restrained, elegant current style. Margaret River benefits from the Indian Ocean influence and free-draining gravelly loam soils; Yarra Valley from altitude and cool Continental climate; Giaconda in Beechworth (Victoria) from granitic soils and artisanal low-yield winemaking that produces something almost Burgundian. In 2024, Decanter\'s Margaret River vintage report called for "firm structure, energy, fruit clarity and bright natural acidity" — the modern benchmark is precision, not power.`,

      producers: [
        {
          name: 'Leeuwin Estate Art Series (Margaret River)',
          notes: 'The Australian Chardonnay that established the country\'s fine wine reputation internationally — ranked top of a global Chardonnay blind tasting by Decanter in the 1980s, and still at the top. The Art Series shows nectarine, citrus, subtle French oak, and remarkable ageing potential (15–20 years). The most important Margaret River Chardonnay to know.',
        },
        {
          name: 'Cullen Diana Madeline / Kevin John (Margaret River)',
          notes: 'Vanya Cullen makes biodynamic, precise Chardonnay that sits alongside Leeuwin at the pinnacle of Margaret River. The Kevin John is more textured and Burgundian; both show why Margaret River is a serious contender at the global level.',
        },
        {
          name: 'Giaconda (Beechworth, Victoria)',
          notes: 'The most Burgundian Chardonnay in Australia — made by Rick Kinzbrunner from granitic soils in the high country of Victoria. The Estate Vineyard Chardonnay has hazelnut, stone fruit, and mineral complexity that in a blind tasting could genuinely pass for a Côte de Beaune. Very small production, hard to find, essential to know.',
        },
        {
          name: 'Bass Phillip (Gippsland, Victoria)',
          notes: 'Phillip Jones makes extraordinarily fine Pinot Noir and Chardonnay in the maritime cool of Gippsland. The Chardonnay is tense, linear, with bright citrus and chalk — as far from the "big Australian" stereotype as it\'s possible to get.',
        },
        {
          name: 'Grosset (Clare Valley, SA) / Shaw + Smith (Adelaide Hills)',
          notes: 'Shaw + Smith M3 Chardonnay from Adelaide Hills is a benchmark for the cool-climate SA style — citrus-driven, refined, subtle French oak. Accessible and consistent. Grosset\'s Piccadilly is from the high Adelaide Hills and shows extraordinary tension for Australia.',
        },
      ],

      examTip: `Modern Australian Chardonnay can fool you. Margaret River and Giaconda in particular can look like Burgundy in a blind. The tell is always a slightly riper fruit register — nectarine and white peach rather than the green apple-lemon of Chablis or the hazelnut-apple of Meursault. If it feels like Burgundy but the fruit is warmer and rounder, think Australia.`,
    },
  ],

  // ─── Flash Mode Cards ───────────────────────────────────────────
  // Each card is a standalone tasting scenario used in the quiz.
  // 'answer' is the region id. 'options' always includes the answer + 3 distractors.

  flashCards: [
    {
      id: 'chard-01',
      difficulty: 'easy',
      clueLevel: 'full',
      scenario: {
        sight: 'Pale lemon, almost water-white. Green highlights. No depth of colour whatsoever.',
        nose: 'Immediate hit of wet stone and flint. Green apple, lemon zest, white flower. A very faint spice note in the background — barely there, just enough to suggest a used barrel. But the mineral core dominates completely.',
        palate: 'Very high, almost aggressive acidity. Bone dry. Light to medium body. Oyster shell and chalk on the finish. Clean, precise, tense.',
        abv: '≈ 12.5%',
        oak: 'Subtle — used barrels or foudre, never new oak. Mineral always dominates.',
      },
      answer: 'chablis',
      options: ['chablis', 'maconnais', 'meursault', 'sonoma'],
      explanation: `This is Chablis. The gunflint minerality, steely acidity, and oyster-shell finish are the defining markers. Note the faint background spice — modern Chablis, especially Premier and Grand Cru, often sees some oak contact in used barrels or large-format foudres. It adds a whisper of texture without ever becoming buttery. The mineral core always stays in charge. Kimmeridgian soil, ancient oyster fossils, the northern limit of Chardonnay — that\'s what you\'re tasting.`,
      notTheOthers: [
        { region: 'Mâconnais', reason: 'Mâcon is fruitier and softer — rounder acidity, no flint, no oyster shell. More approachable, less tension.' },
        { region: 'Meursault', reason: 'In Meursault the oak is a feature — butter, hazelnut, cream upfront. Here the oak is a background whisper and the mineral leads.' },
        { region: 'Sonoma', reason: 'Sonoma would be deeper in colour, riper in fruit (peach, mango), with obvious vanilla from new oak. Completely different register.' },
      ],
    },
    {
      id: 'chard-02',
      difficulty: 'easy',
      clueLevel: 'full',
      scenario: {
        sight: 'Medium gold with warm highlights. Richer than you\'d expect for a young wine.',
        nose: 'Butter, toasted hazelnut, brioche. Under that: ripe apple, white peach, lemon curd. Subtle spice from integrated French oak.',
        palate: 'Medium to full body. Creamy, viscous texture. Dry but generous. Ripe pear and stone fruit. Long finish with hazelnut and spice.',
        abv: '≈ 13.5%',
        oak: 'French oak, well-integrated — barrel fermented + bâtonnage',
      },
      answer: 'meursault',
      options: ['meursault', 'chablis', 'sonoma', 'australia'],
      explanation: `This is Meursault / Côte de Beaune white Burgundy. The butter-hazelnut signature is the most reliable marker of classic white Burgundy from the Côte d'Or. The texture — that creamy, viscous quality — comes from bâtonnage (stirring the lees), which is a Burgundian winemaking tradition. The oak is French and integrated, giving spice rather than vanilla. This is more complex and savoury than California Chardonnay, and utterly different from Chablis.`,
      notTheOthers: [
        { region: 'Chablis', reason: 'Chablis is pale, steely, and mineral — no butter, no hazelnut, no texture. The opposite profile.' },
        { region: 'Sonoma', reason: 'Sonoma shows more obvious vanilla and butterscotch from American or new French oak, and tropical fruit. Meursault is more savoury and mineral underneath the richness.' },
        { region: 'Australia', reason: 'Australian Chardonnay leans stone fruit (nectarine/peach) rather than the hazelnut-butter register of Burgundy. Less minerality, more straight fruit.' },
      ],
    },
    {
      id: 'chard-03',
      difficulty: 'medium',
      clueLevel: 'partial',
      scenario: {
        sight: 'Medium gold, warm tones.',
        nose: 'Ripe peach, pineapple, mango. Obvious vanilla and butterscotch. Buttery note underneath.',
        palate: 'Full body. Rich and generous. Buttery finish. Good acidity but soft — doesn\'t cut. Ripe tropical fruit dominates.',
        abv: '≈ 14%',
        oak: 'New French oak, quite evident',
      },
      answer: 'sonoma',
      options: ['sonoma', 'meursault', 'australia', 'maconnais'],
      explanation: `This is California Chardonnay, most likely Sonoma or Napa. The tropical fruit profile (pineapple, mango), obvious vanilla-butterscotch from new oak, and buttery richness from full malolactic fermentation are the New World signatures. The higher alcohol and generous, round body confirm a warmer growing season. Burgundy never gets this tropical or this overtly oaky. `,
      notTheOthers: [
        { region: 'Meursault', reason: 'Meursault\'s oak is integrated and shows as hazelnut/spice, not butterscotch. The fruit register is stone fruit and apple, not tropical.' },
        { region: 'Australia', reason: 'Modern Australian Chardonnay is actually more restrained than this. If it\'s this overtly oaky and tropical, California is more likely.' },
        { region: 'Mâconnais', reason: 'Mâcon is light-bodied, low-oak, simple fruit. Nothing like this richness.' },
      ],
    },
    {
      id: 'chard-04',
      difficulty: 'hard',
      clueLevel: 'partial',
      scenario: {
        sight: 'Light to medium lemon-gold.',
        nose: 'Fresh pear, green apple, light citrus. Clean and uncomplicated. A hint of white flower. No oak, no butter.',
        palate: 'Light to medium body. Good fresh acidity but soft compared to Chablis. Dry. Simple, clean fruit. Short to medium finish.',
        abv: '≈ 12.5%',
        oak: 'None',
      },
      answer: 'maconnais',
      options: ['maconnais', 'chablis', 'meursault', 'champagne-blanc-de-blancs'],
      explanation: `This is Mâconnais — the honest, uncomplicated face of Burgundy Chardonnay. It shares the lack of oak with Chablis, but without Chablis\'s intensity: softer acidity, no gunflint, no oyster shell, simpler fruit. Think of it as Chablis with the drama removed and the volume turned down. The Mâconnais produces fresh, direct wines that are easy to drink but don\'t have the minerality of Chablis or the complexity of the Côte d'Or.`,
      notTheOthers: [
        { region: 'Chablis', reason: 'Chablis has that unmistakable gunflint/wet stone hit and much more aggressive acidity. Mâcon is rounder and friendlier.' },
        { region: 'Meursault', reason: 'Meursault has butter, hazelnut, and texture. This wine is clean and simple — none of those layers are present.' },
        { region: 'Champagne', reason: 'Champagne Blanc de Blancs would have bubbles (as sparkling) or, as a still base, would be even leaner and more acidic with chalky mineral character.' },
      ],
    },
    {
      id: 'chard-05',
      difficulty: 'medium',
      clueLevel: 'full',
      scenario: {
        sight: 'Pale straw. Very fine, persistent bubbles streaming from the bottom of the glass.',
        nose: 'Lemon, green apple, chalk. Brioche and biscuit from autolysis — that bread-dough, yeasty quality. Very precise and tense.',
        palate: 'Very high acidity — the highest in this flight. Bone dry. Light body. Citrus and green apple. Long, chalky mineral finish. The bubbles amplify everything.',
        abv: '≈ 12%',
        oak: 'Little to none',
      },
      answer: 'champagne-blanc-de-blancs',
      options: ['champagne-blanc-de-blancs', 'chablis', 'maconnais', 'sonoma'],
      explanation: `Blanc de Blancs Champagne. The bubbles give it away first, but the key sensory markers are the autolytic character (brioche, biscuit from extended lees ageing in bottle) and the extraordinary acidity from the Côte des Blancs chalk soils. This is Chardonnay at its most tense and precise — designed for sparkling wine production, grown at the northern limit of ripeness. No other Chardonnay region in the world shows this combination of chalk minerality, biscuity autolysis, and fine persistent mousse.`,
      notTheOthers: [
        { region: 'Chablis', reason: 'Chablis is still, not sparkling. And its minerality is flint/oyster-shell, not chalk/biscuit. Different mineral signature entirely.' },
        { region: 'Mâconnais', reason: 'Mâcon is still, fresh, simple fruit — no bubbles, no autolytic complexity, much softer acidity.' },
        { region: 'Sonoma', reason: 'California Chardonnay is still, richer, fruitier, and oaked. The opposite of this lean, autolytic profile.' },
      ],
    },
    {
      id: 'chard-06',
      difficulty: 'hard',
      clueLevel: 'minimal',
      scenario: {
        sight: 'Medium gold.',
        nose: 'Nectarine, white peach, light citrus. Subtle French oak — spice and light vanilla but restrained. Clean and precise.',
        palate: 'Medium body. Good fresh acidity. Stone fruit. Slightly rounder and riper than Burgundy but far from tropical. Well-balanced.',
        abv: '≈ 13.5%',
        oak: 'Subtle French oak',
      },
      answer: 'australia',
      options: ['australia', 'meursault', 'sonoma', 'maconnais'],
      explanation: `This is modern cool-climate Australian Chardonnay — most likely Margaret River or Yarra Valley. The stone fruit ripeness (nectarine, white peach) is the tell: you won\'t find that exact fruit register in Burgundy, which sits in the apple-pear zone, or in California, which goes more tropical. The subtle, integrated oak and good acidity tell you this isn\'t the old-school oaky-monster style. Modern Australia has found restraint — but it can\'t hide that slightly warmer, riper fruit. That nectarine note is the marker.`,
      notTheOthers: [
        { region: 'Meursault', reason: 'Meursault has hazelnut, butter, and truffle — savoury complexity that Australian Chardonnay doesn\'t reach. Meursault\'s fruit is apple and lemon, not nectarine.' },
        { region: 'Sonoma', reason: 'This wine is more restrained than typical Sonoma — less tropical, less obvious oak. Sonoma goes bigger.' },
        { region: 'Mâconnais', reason: 'Mâcon is lighter and has no real stone fruit ripeness. This wine has more weight and fruit intensity.' },
      ],
    },
  ],
}
