/* Syllabus data - Court of Master Sommeliers Europe 2026/2027.
   adv   = items listed at ADVANCED level (the exam focus)
   found = Introductory + Certified items (assumed foundation, shown collapsed)
   Source: cms-official-materials/CMS-Europe-Examination-Syllabus-2026-2027.pdf */
window.CMS_GROUPS = [
  { id: 'france',  name: 'France',          hue: 340, blurb: 'Seven regions, the heart of the exam' },
  { id: 'europe',  name: 'Rest of Europe',  hue: 215, blurb: 'Iberia, Italy, Germany, Austria and more' },
  { id: 'newworld',name: 'New World & Others', hue: 165, blurb: 'Southern hemisphere, Americas, Asia' },
  { id: 'styles',  name: 'Styles & Craft',  hue: 35,  blurb: 'Sparkling, fortified, vineyard and cellar' },
  { id: 'beyond',  name: 'Beyond Wine',     hue: 265, blurb: 'Spirits, liqueurs, beer, cider and saké' },
  { id: 'skills',  name: 'Exam Skills',     hue: 10,  blurb: 'Tasting, pairing, service and business' }
];

/* Home layout. Countries with several topics expand to show their regions. */
window.CMS_LAYOUT = {
  countries: [
    { area: 'Old World', list: [
      { id:'france',   name:'France',   topics:['alsace','bordeaux','burgundy','champagne','loire','rhone','southfrance'] },
      { id:'italy',    name:'Italy',    topics:['italy'] },
      { id:'spain',    name:'Spain',    topics:['spain'] },
      { id:'portugal', name:'Portugal', topics:['portugal'] },
      { id:'germany',  name:'Germany',  topics:['germany'] },
      { id:'austria',  name:'Austria',  topics:['austria'] },
      { id:'greece',   name:'Greece',   topics:['greece'] },
      { id:'europe-other', name:'Central & Eastern Europe, Switzerland, England & Wales', topics:['europe-other'] }
    ]},
    { area: 'New World & Others', list: [
      { id:'usa-canada',   name:'United States & Canada', topics:['usa-canada'] },
      { id:'southamerica', name:'South America', topics:['southamerica'] },
      { id:'australia',    name:'Australia',    topics:['australia'] },
      { id:'newzealand',   name:'New Zealand',  topics:['newzealand'] },
      { id:'southafrica',  name:'South Africa', topics:['southafrica'] },
      { id:'other-wines',  name:'Other Wines: China, Lebanon, Cyprus, Corsica', topics:['other-wines'] }
    ]}
  ],
  themes: [
    { name:'Wine styles & craft', topics:['sparkling','fortified','viticulture'] },
    { name:'Beyond wine',        topics:['spirits','liqueurs','beer','sake'] },
    { name:'Exam skills',        topics:['tasting','pairing','service','business'] }
  ]
};

window.CMS_TOPICS = [
/* ---------------- FRANCE ---------------- */
{ id:'alsace', n:3, group:'france', name:'Alsace',
  adv:['Yields per hectare for AC Alsace and Grand Cru','Required sugar levels for VT and SGN wines','Principal producers and sites','Crémant production styles and grapes'],
  found:['Factors affecting climate; importance of the Vosges','Sub districts; location of best vineyards and variety of soils','Grape varietals','Appellations: Alsace Grand Cru, Crémant, Communale, Lieu dit','Styles of wine, VT and SGN; labelling terms','Identify Grand Cru varietals and sites'] },

{ id:'bordeaux', n:4, group:'france', name:'Bordeaux',
  adv:['All classified growths and their communes from each AC: Médoc, Sauternes, St Émilion','Wines of smaller districts','St Émilion classification','St Émilion satellites','Pomerol châteaux','Sauternes and Pessac-Léognan: châteaux and communes','Côtes de Bordeaux classification','Bourg / Blaye wines','Characteristics of the wines','Vintages: 30 years and their characteristics','Principal producers and sites','2nd labels from classified sites'],
  found:['Climate, soils, production and ageing techniques; botrytis; barrique','Districts, sub districts and location','1855 classification; top Médoc châteaux','St Émilion classification; "A" category châteaux; top Pomerol','Grape varietals and blending','Quality levels AOP / IGP; labelling; trade structure (en primeur, négociants)','1st to 5th growths of Médoc, Sauternes, St Émilion, Pessac-Léognan','Cru Bourgeois classification','All sub districts (Loupiac, Cadillac, Ste Croix du Mont, Fronsac)','Individual commune names; classic vintages'] },

{ id:'burgundy', n:5, group:'france', name:'Burgundy',
  adv:['Specific climatic influences','Grand Cru / 1er Cru wines from principal ACs','Villages entitled to use certain ACs, e.g. Pouilly-Fuissé','Pouilly-Fuissé crus','Beaujolais villages','Characteristics of the wines','Vintages and their characteristics','Principal producers and sites'],
  found:['Climate, AOP districts and location, permitted varieties, soils','Traditional production and macération carbonique','Quality levels: generic, district, villages','Chablis and its quality levels','Côte d\'Or communes; Premier and Grand Cru wines','Mâcon villages; Côte Chalonnaise; Beaujolais crus','Labelling terms; trade structure','Smaller districts: St Bris, Irancy, Montagny, Bouzeron','Givry, Mercurey, Pouilly-Fuissé, St Véran; Mâcon-Villages','Classic vintages'] },

{ id:'champagne', n:6, group:'france', name:'Champagne',
  adv:['Viticulture: training etc.','Grand Cru villages and locations','Contribution of each varietal','Amounts of dosage in different styles','Bottling terms','Single vineyard Champagnes','Specific factors affecting climate','Characteristics of the wines','Vintages and their characteristics','Principal producers and sites'],
  found:['Climate; Champagne AC and sub districts','Permitted varieties; soils','Production methods; styles; qualities','Labelling terms; bottle sizes and volumes','Yields and extraction amounts','Quality marques from leading producers','Coteaux Champenois','Classic vintages, 10 years'] },

{ id:'loire', n:8, group:'france', name:'Loire',
  adv:['Specific climatic influences','Muscadet crus and ageing requirements','Soil types in Sancerre / Pouilly','Villages in Layon','Characteristics of the wines','Vintages and their characteristics','Principal producers and sites'],
  found:['Climate, soils, districts and sub districts','Principal grapes and wines; styles; AOPs; labelling terms','Coteaux du Layon, Savennières, Central Vineyards, Anjou-Saumur, Touraine, Muscadet','Grape variety synonyms; sur lie ageing requirements','Smaller ACs: St Pourçain, Cheverny, Orléans'] },

{ id:'rhone', n:9, group:'france', name:'Rhône Valley',
  adv:['Climatic influences: the Mistral','Côtes du Rhône village names','Permitted grape blends for principal ACs','Smaller Rhône ACs, e.g. Côtes du Tricastin, Côtes du Luberon','Characteristics of the wines','Cask sizes and ageing','Notable producers and sites'],
  found:['Climate; districts and sub districts','Principal grapes and wines; South Rhône blends','Styles; principal AOPs; labelling terms','VDN and VDL production','Principal estates in Châteauneuf-du-Pape','AOPs of South Rhône: varietals and styles','Principal North Rhône sites (Hermitage, Côte Rôtie)'] },

{ id:'southfrance', n:10, group:'france', name:'South of France',
  adv:['Jura: varietals, wines, production of Vin Jaune / Vin de Paille','Savoie: wines and varietals','Languedoc: major and minor ACs, varietals and styles','Sub districts of principal Languedoc AOPs','Roussillon, Gaillac, Béarn, Jurançon, Irouléguy','Bergerac and the ACs within','Characteristics of the wines','Specific factors affecting climate','Vintages and their characteristics','Notable producers and sites'],
  found:['Climate; Provence, Languedoc, Roussillon, Bergerac, Madiran, Cahors','Varietals, styles and qualities','VDN and VDL wines; Vin de Pays districts','In depth: Bergerac, Monbazillac, Pécharmant, Fitou, Cahors, Madiran, Corbières, Jura, Gaillac','Vin de Paille; Provence sub regions; varietals / blends'] },

/* ---------------- REST OF EUROPE ---------------- */
{ id:'spain', n:11, group:'europe', name:'Spain',
  adv:['Climatic influences','Specific names / locations of Vinos de Pagos','Smaller districts in Southern Spain and wines produced','Factors affecting climate','Specific characteristics of the wines','Vintages and their characteristics','Styles of wine in Toro, Rueda, Montsant, Somontano, Penedès and Castilla-La Mancha','Principal producers and estates'],
  found:['Quality structure: VdlT, DO, DOCa, Vinos de Pago','Wine districts and location; principal varieties and synonyms','Ageing regime and terms; Cava production; labelling terms','Principal wines: Rías Baixas, Navarra, Rioja, Toro, Ribera del Duero, Penedès, Rueda, Priorat, Valdepeñas','Rioja ageing requirements; DOCas; Rioja and Priorat hierarchy','Sub districts of Rías Baixas, Navarra, Penedès, Priorat','Ribera del Duero, Montsant, Toro, Rueda, Bierzo'] },

{ id:'portugal', n:12, group:'europe', name:'Portugal',
  adv:['Garrafeira and Reserva: maturation requirements','Minho sub districts','Transmontano VR: DOCs','Duriense VR: Douro classification and terms','Beiras VR: DOCs','Lisboa VR: DOCs','Alentejo VR: DOCs','Tejo VR and sub districts','Terras do Sado VR and districts','Algarve VR: DOCs','Açores VR','Madeirense DOC','Specific climatic factors','Characteristics of the wines','Vintages and their characteristics','Principal producers and sites'],
  found:['Climate; quality structure; VR and DOC districts and location','Principal grapes','Dão, Minho, Douro, Bairrada, Alentejo, Colares, Setúbal','Labelling terms','Grapes for Douro, Bairrada, Dão, Vinho Verde, Setúbal','Ageing terms and regime'] },

{ id:'italy', n:13, group:'europe', name:'Italy',
  adv:['Specific climatic influences','Production techniques of principal wines: varietals / blends, ageing','Sub districts: Chianti, Barolo, Barbaresco, Soave, Valpolicella etc.','Smaller areas: Liguria, Friuli, Trentino, Maremma, Bolgheri, Marche, Umbria, Lazio, Campania, Basilicata, Puglia, Abruzzo, Molise, Sicilia, Sardegna','Specific factors affecting climate','Characteristics of the wines','Vintages and their characteristics','Principal producers and sites'],
  found:['Quality structure: IGT, DOC, DOCG; districts and location','Principal varietals and regions; wines of each region','Recioto, Ripasso, Amarone, Vin Santo; labelling terms','Prosecco quality levels and production','DOCGs in each region','Ageing terms (Riserva, Superiore) for Barolo, Barbaresco, Chianti, Vino Nobile, Brunello','Sub districts of Chianti'] },

{ id:'germany', n:14, group:'europe', name:'Germany',
  adv:['Climatic influences','In depth study of all Anbaugebiete','Quality structure; A.P. number','Landwein nomenclature','VDP grading of wines and approved varietals','Vine crossings','Required sugar levels (Oechsle) for QmP grades','Principal producers and sites'],
  found:['Climate; Qualitätswein and Prädikatswein; Anbaugebiete and location','Einzellage, Grosslage, Bereich, Ortswein, Sekt, estate bottling','Grapes and crossings; villages of Mosel, Rheingau, Pfalz, Rheinhessen; soils','Trocken, Halbtrocken; intro to VDP','Principal villages and their Anbaugebiet; Classic, Selection','VDP structure: Erste Lage, Grosses Gewächs'] },

{ id:'austria', n:15, group:'europe', name:'Austria',
  adv:['Approved varietals in DAC regions','Principal producers and sites','Traditionsweingüter and Erste Lage sites','Austrian Sekt: production, quality hierarchy and maturation periods'],
  found:['Climate (Pannonian effect)','Qualitätswein and Prädikatswein; Ausbruch / Strohwein','Production regions; DAC structure and levels; Wachau quality terms','Principal grapes and where best grown; labelling terms','DAC districts and location; wines produced; wine terms'] },

{ id:'greece', n:16, group:'europe', name:'Greece',
  adv:['Quality wine system','Detailed knowledge of production areas and grape varietals','Techniques unique to Greece: Retsina, vine training in Santorini','Principal producers and sites (lesser-known districts)','Climatic and soil factors'],
  found:['Climate; quality structure; principal regions on the map','Grape varietals','Naoussa, Slopes of Meliton, Nemea, Mantinia, Patras, Samos, Santorini','Labelling terms; dessert wine production (Samos, Santorini)'] },

{ id:'europe-other', n:17, group:'europe', name:'Central & Eastern Europe, Switzerland, England',
  adv:['Central & Eastern Europe: districts and principal wines of Bulgaria, Romania, Slovenia, Hungary','Grape varietals and native vines','Principal producers and sites','Switzerland: principal areas and varietals (Lake Geneva + sub districts, Neuchâtel, Rhône valley)','Swiss cantons where production areas are located','England & Wales: principal vineyard sites by county'],
  found:['Hungary: production of Tokaji; grape varietals; qualities of Tokaji','Principal wine districts of Bulgaria and Romania','Eastern European grape varieties and where grown'] },

/* ---------------- NEW WORLD & OTHERS ---------------- */
{ id:'australia', n:18, group:'newworld', name:'Australia',
  adv:['Production and blending regimes','Tasmania wine districts','Sub regions within wine zones','Principal producers and sites','Vine classification by age (Barossa)','RS and ageing requirements, Rutherglen Muscats'],
  found:['Climate; states and regions; quality framework','Grapes associated with regions; zones; SE Australia super zone','Zones and regions; principal producers / wines by region'] },

{ id:'newzealand', n:19, group:'newworld', name:'New Zealand',
  adv:['GI system and regions','Sub districts of wine regions','Principal producers and sites'],
  found:['Climate and soils; wine regions','Grapes associated with regions','Appellations: North / South Island'] },

{ id:'usa-canada', n:20, group:'newworld', name:'United States & Canada',
  adv:['Sub districts of wine regions','Principal producers and sites','Specific climatic influences','Ontario regulations (VQA) (DVA)','Canadian regions and sub districts: Niagara Peninsula, British Columbia','Principal varietals of Canada','Ice wine production','Appellation system','AVAs of California by district','Smaller California regions: Mendocino, Lake, Livermore, San Luis Obispo, San Joaquin, South Coast, Central Valley, Sierra Foothills','Major producers in each district and varietals','New York State: Finger Lakes and Long Island'],
  found:['Climate; AVA principles; West Coast climate and topography','California: Napa, Sonoma, SF Bay, Monterey, Santa Barbara, Paso Robles','Oregon: Willamette, Columbia Valley, Walla Walla','Washington: Columbia Valley, Walla Walla, Puget Sound, Yakima Valley','AVAs of Sonoma, Napa, Monterey, Santa Barbara'] },

{ id:'southamerica', n:21, group:'newworld', name:'South America',
  adv:['Uruguay: VCP labelling regulations and terms; regions and varietals','Brazil: districts of production and varietals','Mexico: districts of production and varietals','Principal producers and sites'],
  found:['Climate; Andes–Pacific topographical influence','Chile wine laws; 5 regions and sub districts; Casablanca, Maipo, Rapel','Principal varietals of Chile and Argentina','Sub districts of Chilean regions and of Mendoza','Argentinian native varietals'] },

{ id:'southafrica', n:22, group:'newworld', name:'South Africa',
  adv:['Districts outside WO areas','Wards of principal districts: Stellenbosch, Paarl, Walker Bay, Olifants River, Darling, Swartland, Klein Karoo','Principal producers and sites / wines (Stellenbosch, Elim, Walker Bay, Swartland)','Vin de Constance: grapes, production and styles'],
  found:['Climate (oceans and mountain ranges); WO law and labelling','Structure: regions, districts, wards, estates','Stellenbosch, Franschhoek, Paarl, Constantia, Walker Bay, Elgin; varietals','Coastal, Breede River; Cap Classique, Cape Blend'] },

{ id:'other-wines', n:23, group:'newworld', name:'Other Wines',
  adv:['China: principal districts and location','China: native grape varieties','Middle East: Lebanon, Cyprus, Corsica'],
  found:['No formal requirement at Introductory or Certified level'] },

/* ---------------- STYLES & CRAFT ---------------- */
{ id:'sparkling', n:7, group:'styles', name:'Sparkling Wines',
  adv:['Quality levels of principal sparkling wines, e.g. DOCG, DO, Qualitäts-Sekt','Traditional production methods, e.g. Méthode Dioise, Méthode Ancestrale','Specific factors affecting climate','Characteristics of the wines','Vintages and their characteristics','Maturation periods for all quality levels and types'],
  found:['Methods: Traditional, Charmat, Ancestral','Terms for the Traditional method in other countries','Alternate appellations: Crémant, Cava etc.','Principal sparkling wines of Europe; Australia and New Zealand','Wines and grapes of principal sparkling wines in major wine countries'] },

{ id:'fortified', n:24, group:'styles', name:'Fortified Wines',
  adv:['Sherry: Pagos (Finos)','Detailed production: fortification, sweetening, colouring','Sherry styles and ageing designations','Port viticulture and vinification','Port vineyard rating system','Single quintas of major Port houses','Principal Port vintages, 1970 to date','Madeira producers','Madeira key styles: 3, 5, 10, 15 year, Frasqueira, Colheita','Aromatised wines, e.g. vermouths','Vin de liqueur: Floc, Ratafia, Pineau des Charentes','Vin Doux Naturel ACs and types','Moscatel de Setúbal','Australian Muscats','Commandaria','Montilla: styles, grapes and production'],
  found:['Sherry: location, soils, varietals, production, wine types, non-fortified Sherry','Port: Douro, soils, varietals, production, types, ageing, qualities','Madeira: topography, climate, soils, varietals, production, styles','VOS and VORS; Port sub districts; recent Port vintages','Madeira ageing and designations'] },

{ id:'viticulture', n:27, group:'styles', name:'Viticulture & Vinification',
  adv:['Soil composition of all wine producing regions and its effect','Climate: altitude, fog, sun exposure','Vine diseases and prevention: nematodes, mealybugs, crown gall, bacterial blight, fanleaf, black rot, esca, flavescence dorée, Pierce\'s disease, leaf roll, eutypa','Vine spacing, pruning, trellising','Winemaking procedures and terms: reverse osmosis, de-alcoholisation, fining and filtration','Wine ailments and their effects','Natural, organic and biodynamic winemaking','Barrel sizes and ageing requirements in wood / bottle','Effect of screwcaps on ageing'],
  found:['Climate, aspect, planting; terroir','V. vinifera / labrusca; crossings, clones, hybrids; grafting','Training styles; life cycle; frost prevention; diseases and pests','Harvest: botrytis, passerillage','Fermentation; chaptalisation','Pressing terms: vin de presse, rebêche, vin de goutte; carbonic maceration; MLF','Sur lie; oak; tartrates','French terms: buttage, véraison, mutage, pigeage, remontage'] },

/* ---------------- BEYOND WINE ---------------- */
{ id:'spirits', n:25, group:'beyond', name:'Spirits',
  adv:['Production / qualities of flavoured spirits: Pastis, Ouzo, Raki, Akvavit, flavoured vodkas','Fruit eaux de vie','Marc / Grappa','Mezcals','Principal spirit producers / brands (all types)'],
  found:['Principles of distillation','Scotch, Irish, US whiskey','Cognac, Armagnac, Calvados','Tequila, gin, vodka, rum; production terms','Identify types: Islay, Fine Champagne, Armagnac, Marc/Grappa, Tequila and Mezcal, eau de vie'] },

{ id:'liqueurs', n:26, group:'beyond', name:'Aperitif Wines, Liqueurs & Bitters',
  adv:['Liqueurs by type, colour and flavour','Brands / producers of aperitif wines and bitters','Ability to recommend','Service requirements','Use of liqueurs and aperitif wines in cocktails and mixed drinks'],
  found:['Liqueur production; extraction of flavours','Triple sec, compounding; Frappé','Fruit, citrus, herb, bean and nut, flower, non-classified liqueurs','Aperitif wines and bitters: principal flavours / ingredients'] },

{ id:'beer', n:28, group:'beyond', name:'Beers & Ciders',
  adv:['Malt types and production techniques','Best known hop varieties','Brewing practices: dry hopping, kräusening etc.','Principal beer types worldwide: Lambic, Rauchbier, seasonal beers, Gueuze'],
  found:['Ingredients, methods, equipment (mash tun, copper); wort, liquor','Hops; beer types: ales, lager, stout, porter, weissbier, fruit beers','Conditioning, pasteurisation; cask conditioning terms','Cider production, apple and pear types, cider types','Food and beer pairing; Belgian speciality beers'] },

{ id:'sake', n:29, group:'beyond', name:'Saké',
  adv:['Saké production terms','Saké types and quality levels','Official classification','Saké service and pairings with food','Terms associated with Saké production'],
  found:['Production methods','Labelling terms','Types of Saké'] },

/* ---------------- EXAM SKILLS ---------------- */
{ id:'tasting', n:33, group:'skills', name:'Deductive Tasting',
  adv:['Identify a wide range of grape varietal characteristics','Describe wines orally in both technical and marketing format','Evaluate sight, nose and palate using Court format','Aromas and flavours: primary, secondary, tertiary','Structure (alcohol, acidity, tannin) to a quantitative formula','Comment on age characteristics','Conclusion: style, country and region, quality level, age (vintage)','Wine faults and their causes: Brett, oxidation, reduction, TCA','Methods used in vinification to correct faults'],
  found:['Principles of deductive tasting; sight, nose, palate, structure, conclusion','Identify classic grape varieties by sight, nose, palate','Evaluate structure and finish; identify common faults','Comment on origin and quality level'],
  note:'Exam: written evaluation of 2 wines.' },

{ id:'pairing', n:30, group:'skills', name:'Food & Wine Pairing',
  adv:['Match specific wines to dishes with reasoned choice, including vintages and producers','Effects of flavours: matching or contrasting','Best vintages and off vintages','Pairings with beers, fortified wines, aperitifs','Discuss alternatives and similar wines','Plan staff training and promotion events','Customer skills: complaints, recommendations'],
  found:['Basics and principles of pairing','Varietal characteristics; malolactic and oak effects','Effects of cooking and strong flavours','Difficult pairings: vinegar, chilli, chocolate, caramel','Match wines to dishes and give reasons'] },

{ id:'business', n:31, group:'skills', name:'Business Aspects',
  adv:['Spreadsheet calculations for inventory documentation','Purchasing systems: wholesale and importation of wines and spirits','Sales and promotion techniques','Staff training programmes (theory, practice, tasting)','Rewarding staff performance','Fine wine list structure','Function wine list structure'],
  found:['Bottle sizes and volumes; relate to glassware (ml and fl oz)','Calculate bottles needed for a function','Mark-up and selling price at given gross profit %'],
  note:'Tested in both theory and practical exams.' },

{ id:'service', n:32, group:'skills', name:'Practical Service',
  adv:['Effective customer and selling skills','Handle customer enquiries and complaints','Aperitif and cocktail preparation and service','Wine recommendations for all menus and cuisines','Difficult foods for pairing and alternative beverages','Champagne and sparkling wine service','Professional decanting practice','Digestif service','Equipment maintenance: glassware, decanters, cloths, ice buckets','Profit margins, inventory data, beverage volume requirements','Prepare and lead an effective training programme','Tasting and product identification: describe beverages, quality levels, origins'],
  found:['Recommend beverages; food and wine matching','Still wine service: presentation, opening, glassware, positioning','Pouring; carrying trays','Aperitifs, digestifs, classic cocktails','Spirits and liqueurs service','Sparkling wine service; carrying and clearing glassware'] }
];
