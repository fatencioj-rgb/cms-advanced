(function(){
'use strict';
/* Study notes site. Topic content lives in data.js (t.notes). Personal notes are stored locally. */
var KEY='cmsAdvanced.v2';
var GROUPS=window.CMS_GROUPS, TOPICS=window.CMS_TOPICS;
var app=document.getElementById('app'), qEl=document.getElementById('q');

function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
var S=load(); S.n=S.n||{};
var tm;function save(){clearTimeout(tm);tm=setTimeout(function(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}},150)}

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
/* inline: **bold** and *italic* */
function inl(s){return esc(s).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<i>$1</i>')}
function groupOf(id){return GROUPS.filter(function(g){return g.id===id})[0]}
function topicById(id){return TOPICS.filter(function(t){return t.id===id})[0]}
function num(n){return n<10?'0'+n:''+n}
function hasNotes(t){return t.notes&&t.notes.length>0}
function hl(text,q){var i=text.toLowerCase().indexOf(q);if(i<0)return esc(text);return esc(text.slice(0,i))+'<mark>'+esc(text.slice(i,i+q.length))+'</mark>'+esc(text.slice(i+q.length))}

/* ---- note blocks ----
 {h:'Heading'} {p:'Paragraph'} {list:[..]} {note:'Keep in mind...'} {btw:'By the way...'} {table:{head:[..],rows:[[..]]}}\n {img:'images/bordeaux/map.jpg',cap:'Caption'}  {imgs:[{img,cap},{img,cap}]} (side by side) */
var ADV_RE=/^\(A\)\s*/;
function chip(l){return '<span class="chip c'+l+'" title="'+({I:'Introductory',C:'Certified',A:'Advanced'})[l]+'">'+l+'</span>'}
function li(x){var t=typeof x==='string'?x:x.t,sub=typeof x==='string'?null:x.sub,a=ADV_RE.test(t);if(a)t=t.replace(ADV_RE,'');
  return '<li'+(a?' class="lvA"':'')+'>'+(a?chip('A'):'')+inl(t)+(sub&&sub.length?'<ul class="ul">'+sub.map(li).join('')+'</ul>':'')+'</li>'}
/* level of a section, read from its heading: "(A) Title" = Advanced; "Title (Introductory and Certified)" = foundation */
function secInfo(txt){var lv='N',chips='',t=txt,m;
  if(ADV_RE.test(t)){lv='A';chips=chip('A');t=t.replace(ADV_RE,'')}
  else if((m=t.match(/\s*\(([^()]*(?:Introductory|Certified)[^()]*)\)\s*$/))){var lab=m[1];t=t.slice(0,m.index);
    if(/Introductory/.test(lab))chips+=chip('I');if(/Certified/.test(lab))chips+=chip('C');
    if(/Advanced/.test(lab)){chips+=chip('A');lv='N'}else lv='F'}
  return {lv:lv,chips:chips,title:t}}
function block(b){
  if(b.h)return b.lvl===3?'<h4>'+inl(b.h)+'</h4>':b.lvl>=4?'<h5>'+inl(b.h)+'</h5>':'<h3>'+inl(b.h)+'</h3>';
  if(b.hr)return '<hr>';
  if(b.p)return '<p>'+inl(b.p)+'</p>';
  if(b.list)return '<ul class="ul">'+b.list.map(li).join('')+'</ul>';
  if(b.ol)return '<ol class="ul">'+b.ol.map(li).join('')+'</ol>';
  if(b.note)return '<aside class="callout key"><b>Keep in mind</b><p>'+inl(b.note)+'</p></aside>';
  if(b.btw)return '<aside class="callout btw"><b>By the way</b><p>'+inl(b.btw)+'</p></aside>';
  if(b.trap)return '<aside class="callout trap"><b>Exam trap</b><p>'+inl(b.trap)+'</p></aside>';
  if(b.quote)return '<blockquote>'+b.quote.map(function(x){return '<p>'+inl(x)+'</p>'}).join('')+'</blockquote>';
  if(b.img)return '<figure class="fig'+(b.side?' side '+b.side:'')+'"><img src="'+esc(b.img)+'" alt="'+esc(b.cap||'')+'" loading="lazy" data-zoom>'+(b.cap?'<figcaption>'+inl(b.cap)+'</figcaption>':'')+'</figure>';
  if(b.imgs)return '<div class="figs">'+b.imgs.map(function(x){return '<figure class="fig"><img src="'+esc(x.img)+'" alt="'+esc(x.cap||'')+'" loading="lazy" data-zoom>'+(x.cap?'<figcaption>'+inl(x.cap)+'</figcaption>':'')+'</figure>'}).join('')+'</div>';
  if(b.table)return '<div class="tw"><table><thead><tr>'+b.table.head.map(function(c){return '<th>'+inl(c)+'</th>'}).join('')+'</tr></thead><tbody>'+
    b.table.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+inl(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>';
  return '';
}
function flat(v){return typeof v==='string'?v:Array.isArray(v)?v.map(flat).join(' '):(v&&typeof v==='object')?Object.keys(v).map(function(k){return k==='lvl'||k==='img'?'':flat(v[k])}).join(' '):''}
function blockText(b){return flat(b).replace(/\*+/g,'').replace(/\s+/g,' ').trim()}

/* ---- Markdown notes: notes/<topic id>.md  ->  blocks ----
   Supported: ## / ### headings, paragraphs, - lists (one nested level), 1. lists, | tables |,
   > KEEP IN MIND: / > BY THE WAY: / > EXAM TRAP: callouts, ![caption](images/..) , [text](https://..), **bold**, *italic*, --- */
function parseMd(src){
  var L=src.replace(/\r/g,'').split('\n'),out=[],i=0,m;
  function sep(l){return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l)}
  function cells(l){l=l.trim();if(l[0]==='|')l=l.slice(1);if(l[l.length-1]==='|')l=l.slice(0,-1);return l.split('|').map(function(c){return c.trim()})}
  function special(l,n){return !l.trim()||/^#{1,4}\s/.test(l)||/^\s*---+\s*$/.test(l)||/^>/.test(l)||/^\s*([-*]|\d+[.)])\s+/.test(l)||/^!\[/.test(l)||(l.indexOf('|')>-1&&n!==undefined&&sep(n))}
  while(i<L.length){
    var l=L[i];
    if(!l.trim()){i++;continue}
    if(/^\s*---+\s*$/.test(l)){out.push({hr:1});i++;continue}
    if((m=l.match(/^(#{1,4})\s+(.*)$/))){if(m[1].length>1)out.push({h:m[2].trim(),lvl:m[1].length});i++;continue}
    if(l.indexOf('|')>-1&&i+1<L.length&&sep(L[i+1])){
      var head=cells(l),rows=[];i+=2;
      while(i<L.length&&L[i].trim()&&L[i].indexOf('|')>-1){rows.push(cells(L[i]));i++}
      out.push({table:{head:head,rows:rows}});continue}
    if(/^>/.test(l)){
      var q=[];while(i<L.length&&/^>/.test(L[i])){q.push(L[i].replace(/^>\s?/,''));i++}
      var paras=[],cur=[];q.forEach(function(x){if(x.trim())cur.push(x.trim());else if(cur.length){paras.push(cur.join(' '));cur=[]}});if(cur.length)paras.push(cur.join(' '));
      var first=paras[0]||'',k=first.match(/^\**\s*(KEEP IN MIND|BY THE WAY|EXAM TRAP)\s*:?\s*\**\s*:?\s*/i);
      if(k){var key=k[1].toUpperCase(),txt=[first.slice(k[0].length)].concat(paras.slice(1)).filter(Boolean).join(' ');
        out.push(key==='KEEP IN MIND'?{note:txt}:key==='BY THE WAY'?{btw:txt}:{trap:txt})}
      else out.push({quote:paras});
      continue}
    if(/^\s*([-*]|\d+[.)])\s+/.test(l)){
      var ordered=/^\s*\d+[.)]/.test(l),items=[];
      while(i<L.length&&(/^\s*([-*]|\d+[.)])\s+/.test(L[i])||(/^\s+\S/.test(L[i])&&items.length))){
        var mm=L[i].match(/^(\s*)([-*]|\d+[.)])\s+(.*)$/);
        if(mm){var it={t:mm[3].trim(),sub:[]};if(mm[1].length>=2&&items.length)items[items.length-1].sub.push(it);else items.push(it)}
        else{var tgt=items[items.length-1];if(tgt.sub.length)tgt.sub[tgt.sub.length-1].t+=' '+L[i].trim();else tgt.t+=' '+L[i].trim()}
        i++}
      out.push(ordered?{ol:items}:{list:items});continue}
    if(/^!\[/.test(l)){
      var imgs=[];
      while(i<L.length&&(m=L[i].match(/^!\[(.*?)\]\((\S+?)\)(?:\{(right|left)\})?\s*$/))){if(/^(images\/|https:\/\/)/.test(m[2]))imgs.push({img:m[2],cap:m[1],side:m[3]||''});i++}
      if(imgs.length===1)out.push(imgs[0]);else if(imgs.length)out.push({imgs:imgs});
      if(!imgs.length)i++;continue}
    var p=[l.trim()];i++;
    while(i<L.length&&!special(L[i],L[i+1])){p.push(L[i].trim());i++}
    out.push({p:p.join(' ')})
  }
  return out}

/* topic notes live in notes/<id>.md; notes/index.json lists which ids exist */
var notesLoaded=false;
function loadNotes(){
  return fetch('notes/index.json?'+Date.now()).then(function(r){return r.ok?r.json():[]}).catch(function(){return []}).then(function(ids){
    return Promise.all((Array.isArray(ids)?ids:[]).map(function(id){var t=topicById(id);if(!t)return;
      return fetch('notes/'+id+'.md?'+Date.now()).then(function(r){return r.ok?r.text():null}).then(function(x){if(x){t.notes=parseMd(x);t.raw=x}}).catch(function(){})}))
  }).then(function(){notesLoaded=true})}

/* ---- views ---- */
function card(t){
  var g=groupOf(t.group);
  return '<a class="card" style="--h:'+g.hue+'" href="#/t/'+t.id+'"><span class="num">'+num(t.n)+'</span>'+
    '<span class="c-body"><h3>'+esc(t.name)+'</h3></span>'+
    (hasNotes(t)?'<span class="tag ready">Notes</span>':'<span class="tag">Outline</span>')+'</a>';
}

function home(){document.body.classList.remove('adv-only');
  var ready=TOPICS.filter(hasNotes).length,h='';
  h+='<section class="intro"><p class="eyebrow">Court of Master Sommeliers Europe · 2026/27</p><h1>Advanced Sommelier</h1>'+
     '<p>My study notes, organised by syllabus section. Each topic has what the syllabus asks for at Advanced level and, once researched, my notes on it.</p>'+
     '<p class="count">'+TOPICS.length+' sections · '+ready+' with notes written</p></section>';
  GROUPS.forEach(function(g){
    var list=TOPICS.filter(function(t){return t.group===g.id});
    h+='<section class="group" style="--h:'+g.hue+'"><div class="group-head"><h2>'+esc(g.name)+'</h2><p>'+esc(g.blurb)+'</p></div><div class="grid">'+list.map(card).join('')+'</div></section>';
  });
  app.innerHTML=h;
}

/* ---- long topics: blocks (## headings), levels and my own editable notes ---- */
function splitBlocks(notes){
  var pre=[],blocks=[],src=null,cur=null;
  notes.forEach(function(b){
    if(b.h&&b.lvl===2){
      if(/^sources$/i.test(b.h.trim())){cur=null;src=[];return}
      cur={title:b.h,items:[]};blocks.push(cur);src=null;return}
    if(b.hr)return;
    if(src){src.push(b);return}
    if(cur)cur.items.push(b);else pre.push(b)});
  return {pre:pre,blocks:blocks,src:src||[]}}

/* sections = what comes under each ### heading; returns the html and how many foundation sections the "Advanced only" view hides */
function sectionsHTML(items){
  var secs=[],cur={h:null,items:[]},hidden=0,c=0;secs.push(cur);
  items.forEach(function(b){
    if(b.hr)return;
    if(b.h&&b.lvl===3){cur={h:b.h,items:[]};secs.push(cur);return}
    cur.items.push(b)});
  var html=secs.filter(function(s){return s.h||s.items.length}).map(function(s){
    var info=s.h?secInfo(s.h):{lv:'N',chips:'',title:''},recap=!!s.h&&/^In short/i.test(s.h);
    var hasA=s.items.some(function(b){return b.list&&b.list.some(function(x){return ADV_RE.test(typeof x==='string'?x:x.t)})});
    if(info.lv==='F'&&!hasA)hidden++;
    var id=s.h?' id="s'+(c++)+'"':'';
    return '<section class="sec lv'+info.lv+(hasA?' has-a':'')+(recap?' recap':'')+'"'+id+'>'+
      (s.h?'<h4 class="sh">'+(recap?'Remember':info.chips+inl(info.title))+'</h4>':'')+s.items.map(block).join('')+'</section>'}).join('');
  return {html:html,hidden:hidden}}

function sideHTML(id,sp,bi,items){
  var h='<div class="side-t">'+esc(topicById(id).name)+'</div>';
  sp.blocks.forEach(function(b,i){
    h+='<a class="si'+(i===bi?' on':'')+'" href="#/t/'+id+'/'+(i+1)+'">'+esc(b.title)+'</a>';
    if(i===bi){var k=0;h+='<div class="subs">';
      items.forEach(function(x){if(x.h&&x.lvl===3){var inf=secInfo(x.h),rc=/^In short/i.test(x.h);h+='<a class="ss" href="#" data-go="s'+(k++)+'">'+(inf.lv==='A'?chip('A'):'')+esc(rc?'Remember':inf.title)+'</a>'}});
      h+='<a class="ss mine" href="#" data-go="ed-sum">My summary</a></div>'}});
  return h}

var ED_TOOLS=[['Heading','\n### ','Heading',0],['(A) heading','\n### (A) ','Advanced heading',0],['Bold','**','text',1],['Bullets','\n- ','point',0],['(A) point','\n- (A) ','advanced point',0],
  ['Table','\n| Column | Column |\n|---|---|\n| | |\n','',0],['Remember','\n> KEEP IN MIND: ','',0],['Exam trap','\n> EXAM TRAP: ','',0]];
function editorHTML(key,label,hint,rows,domId){
  return '<section class="myed" data-key="'+esc(key)+'"'+(domId?' id="'+domId+'"':'')+'><div class="ed-head"><h4 class="sh">'+esc(label)+'</h4><span class="ed-tabs"><button type="button" data-m="edit">Write</button><button type="button" data-m="view">Preview</button></span></div>'+
  (hint?'<p class="fine">'+hint+'</p>':'')+
  '<div class="ed-tools">'+ED_TOOLS.map(function(x,i){return '<button type="button" data-t="'+i+'">'+esc(x[0])+'</button>'}).join('')+
  '<label class="edimg">Image<input type="file" class="ed-img" accept="image/*" hidden></label><label class="edimg">Map beside the text<input type="file" class="ed-img" data-side="right" accept="image/*" hidden></label></div>'+
  '<textarea class="ed-ta" rows="'+(rows||8)+'" spellcheck="true" placeholder="Write here, in the same format as the notes: ### headings, - lists, tables, > KEEP IN MIND: ..."></textarea><div class="ed-view notes-body"></div><p class="fine ed-st"></p></section>'}

function fixLocalImgs(c){
  var imgs=[].filter.call(c.querySelectorAll('img'),function(i){return /^images\/uploads\//.test(i.getAttribute('src')||'')});if(!imgs.length)return;
  dbAll().then(function(loc){var m={};loc.forEach(function(l){m[l.id]=l});
    imgs.forEach(function(im){var mm=(im.getAttribute('src')||'').match(/\/([^\/]+)\.jpg$/);if(mm&&m[mm[1]])im.src=URL.createObjectURL(m[mm[1]].blob)})}).catch(function(){})}
function setMode(ed,m){
  var ta=ed.querySelector('.ed-ta'),v=ed.querySelector('.ed-view'),tools=ed.querySelector('.ed-tools');ed.dataset.mode=m;
  ed.querySelectorAll('.ed-tabs button').forEach(function(b){b.classList.toggle('on',b.dataset.m===m)});
  if(m==='edit'){ta.hidden=false;tools.hidden=false;v.hidden=true}
  else{ta.hidden=true;tools.hidden=true;v.hidden=false;
    v.innerHTML=ta.value.trim()?sectionsHTML(parseMd(ta.value)).html:'<p class="soon">Nothing written yet. Press Write to add your own notes.</p>';fixLocalImgs(v)}}
function edStatus(ed){var key=ed.dataset.key,el=ed.querySelector('.ed-st');if(!el)return;
  if(!GH){el.textContent='Saved on this device only. Connect GitHub in the “⋯” menu to sync with your other devices.';return}
  if(noteErr&&S.d[key]){el.textContent='Saved on this device. Not synced yet ('+noteErr+'); it will retry automatically.';return}
  el.textContent=S.d[key]?'Saving…':'Synced with GitHub · same on all your devices.'}
function refreshEditors(){document.querySelectorAll('.myed').forEach(function(ed){var key=ed.dataset.key,ta=ed.querySelector('.ed-ta');
  if(!ta||S.d[key]||document.activeElement===ta)return;var v=S.n[key]||'';
  if(ta.value!==v){ta.value=v;if(ed.dataset.mode==='view')setMode(ed,'view')}edStatus(ed)})}
function insertAt(ta,pre,ph,wrap){var s0=ta.selectionStart,e0=ta.selectionEnd,sel=ta.value.slice(s0,e0)||ph;
  ta.setRangeText(wrap?pre+sel+pre:pre+sel,s0,e0,'end');ta.focus();ta.dispatchEvent(new Event('input'))}
function bindEditors(){
  var topic=curTopic();
  document.querySelectorAll('.myed').forEach(function(ed){
    var key=ed.dataset.key,ta=ed.querySelector('.ed-ta');
    ta.value=S.n[key]||'';setMode(ed,ta.value.trim()?'view':'edit');
    ed.querySelectorAll('.ed-tabs button').forEach(function(b){b.onclick=function(){setMode(ed,b.dataset.m)}});
    ed.querySelectorAll('.ed-tools button[data-t]').forEach(function(b){b.onclick=function(){var x=ED_TOOLS[+b.dataset.t];insertAt(ta,x[1],x[2],x[3])}});
    ed.querySelectorAll('.ed-img').forEach(function(inp){inp.onchange=function(e){var side=inp.dataset.side||'';
      addFiles(topic,e.target.files).then(function(ids){ids.forEach(function(id){insertAt(ta,'\n![Caption](images/uploads/'+topic+'/'+id+'.jpg)'+(side?'{'+side+'}':'')+'\n','',0)})});e.target.value=''}});
    ta.oninput=function(){S.n[key]=ta.value;S.d[key]=1;save();edStatus(ed);clearTimeout(noteTimer);noteTimer=setTimeout(pushNotes,2000)};
    ta.onblur=function(){if(S.d[key]){clearTimeout(noteTimer);pushNotes()}};
    edStatus(ed)});
  if(document.querySelector('.myed'))pullNotes().then(function(){if(GH)pushNotes()})}

/* ---- edit mode: every block can be changed, moved, deleted, extended, with photos dragged in ----
   My version of a block is stored as Markdown in S.n[<topic>:<n>:doc] (plus a fingerprint of the original in ...:docbase).
   The researched notes in notes/*.md are never touched; "Revert to original" just removes my version. */
function hash(s){var h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)}
function rawBlocks(raw){var out=[],cur=null,skip=false;
  raw.replace(/\r/g,'').split('\n').forEach(function(l){var m=l.match(/^##\s+(.*)$/);
    if(m){if(/^sources$/i.test(m[1].trim())){cur=null;skip=true}else{cur=[];out.push(cur);skip=false}return}
    if(cur&&!skip)cur.push(l)});
  return out.map(function(a){return a.join('\n').trim()})}
function chunksOf(body){return body.replace(/\r/g,'').split(/\n[ \t]*\n/).map(function(x){return x.trim()}).filter(function(x){return x&&!/^-{3,}$/.test(x)})}
function chunkHTML(md){
  return parseMd(md).map(function(b){
    if(b.h&&b.lvl===3){var i=secInfo(b.h);return '<h4 class="sh">'+i.chips+inl(i.title)+'</h4>'}
    if(b.h&&b.lvl===2)return '<h3 class="sh">'+inl(b.h)+'</h3>';
    return block(b)}).join('')||'<p class="soon">(empty)</p>'}

var E=null;
var NEW_TPL={text:'Write here.',heading:'### New heading',aheading:'### (A) New heading',bullets:'- Point one\n- Point two',abullets:'- (A) Advanced point\n- (A) Another advanced point',
  table:'| Column | Column |\n|---|---|\n| | |',remember:'> KEEP IN MIND: ',trap:'> EXAM TRAP: '};
var ADD_MENU=[['text','Text'],['heading','Heading'],['aheading','(A) Heading'],['bullets','Bullets'],['abullets','(A) Bullets'],['table','Table'],['remember','Remember'],['trap','Exam trap'],['photo','Photo'],['photoside','Photo beside text']];
function gapHTML(i){return '<div class="gap" data-g="'+i+'"><button type="button" class="gap-add" data-a="gap">+ Add here</button><div class="gap-menu" hidden>'+ADD_MENU.map(function(x){return '<button type="button" data-a="add" data-k="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div></div>'}
function edCommit(){if(!E)return;var k=E.key,b=E.key+'base';
  S.n[k]=E.chunks.join('\n\n');S.n[b]=E.baseHash;S.d[k]=1;S.d[b]=1;save();clearTimeout(noteTimer);noteTimer=setTimeout(pushNotes,1500);edSt()}
function edSt(){var el=document.getElementById('edSt');if(!el||!E)return;
  el.textContent=!GH?'Saved on this device only. Connect GitHub in the “⋯” menu to sync with your other devices.':(noteErr&&S.d[E.key]?'Saved on this device. Not synced yet ('+noteErr+').':(S.d[E.key]?'Saving…':'Saved.'))}
function renderEdit(){
  var box=document.getElementById('editzone');if(!box||!E)return;
  var h='<div class="editbar"><b>Editing this block</b><span class="fine">Drag the ⠿ handle to move a piece, or use ↑ ↓. Drop photos between pieces. It saves by itself.</span><span class="eb-r"><button type="button" id="edRevert" data-a="revert">Revert to original</button><button type="button" class="primary" data-a="done">Done</button></span></div><p class="fine" id="edSt"></p>';
  h+=gapHTML(0);
  E.chunks.forEach(function(c,i){
    var single=/^!\[[^\]]*\]\(\S+?\)(\{(?:right|left)\})?$/.test(c);
    h+='<div class="ck" data-i="'+i+'"><div class="ck-tools"><span class="grab" draggable="true" title="Drag to move">⠿</span>'+
       '<button type="button" data-a="up" title="Move up">↑</button><button type="button" data-a="down" title="Move down">↓</button>'+
       '<button type="button" data-a="edit">Edit</button>'+(single?'<button type="button" data-a="side">Beside text</button>':'')+'<button type="button" data-a="del" class="del">Delete</button></div>';
    if(E.open===i)h+='<textarea class="ck-ta" rows="'+Math.max(3,Math.min(14,c.split('\n').length+1))+'" spellcheck="true"></textarea><div class="ck-actions"><button type="button" class="primary" data-a="save">Save</button><button type="button" data-a="cancel">Cancel</button></div>';
    else h+='<div class="ck-body notes-body">'+chunkHTML(c)+'</div>';
    h+='</div>'+gapHTML(i+1)});
  if(!E.chunks.length)h+='<p class="soon">This block is empty. Use “+ Add here”.</p>';
  h+='<input type="file" id="edFile" accept="image/*" multiple hidden>';
  box.innerHTML=h;fixLocalImgs(box);edSt();
  if(E.open!=null){var ta=box.querySelector('.ck-ta');if(ta){ta.value=E.chunks[E.open];ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length)}}}
function edInsert(idx,arr,open){E.chunks.splice.apply(E.chunks,[idx,0].concat(arr));E.open=open==null?null:open;edCommit();renderEdit()}
function edPhotos(files,idx,side){
  addFiles(E.topic,files).then(function(ids){if(!E||!ids.length)return;
    edInsert(idx,ids.map(function(id){return '![Photo](images/uploads/'+E.topic+'/'+id+'.jpg)'+(side?'{right}':'')}),null)})}
function edMove(from,to){if(to<0||to>E.chunks.length)return;var c=E.chunks.splice(from,1)[0];if(from<to)to--;E.chunks.splice(to,0,c);E.open=null;edCommit();renderEdit()}
function startEdit(id,bi,rawBody,ov){
  var y=window.scrollY;
  E={topic:id,bi:bi,key:id+':'+(bi+1)+':doc',baseHash:hash(rawBody),chunks:chunksOf(ov||rawBody),open:null,drag:null,pendIdx:0,pendSide:false};
  document.body.classList.add('editing');
  document.getElementById('edBtn').hidden=true;
  renderEdit();
  var box=document.getElementById('editzone');
  box.onclick=function(e){var b=e.target.closest('button[data-a]');if(!b||!E)return;var a=b.dataset.a,ck=b.closest('.ck'),i=ck?+ck.dataset.i:-1;
    if(a==='gap'){var m=b.parentNode.querySelector('.gap-menu');m.hidden=!m.hidden;return}
    if(a==='add'){var g=+b.closest('.gap').dataset.g,k=b.dataset.k;
      if(k==='photo'||k==='photoside'){E.pendIdx=g;E.pendSide=k==='photoside';document.getElementById('edFile').click();return}
      edInsert(g,[NEW_TPL[k]],g);return}
    if(a==='up')edMove(i,i-1);
    else if(a==='down')edMove(i,i+2);
    else if(a==='edit'){E.open=i;renderEdit()}
    else if(a==='cancel'){E.open=null;renderEdit()}
    else if(a==='save'){var v=ck.querySelector('.ck-ta').value.trim();var parts=chunksOf(v);E.chunks.splice.apply(E.chunks,[i,1].concat(parts));E.open=null;edCommit();renderEdit()}
    else if(a==='del'){if(confirm('Delete this piece?')){E.chunks.splice(i,1);E.open=null;edCommit();renderEdit()}}
    else if(a==='side'){var c=E.chunks[i],m2=c.match(/^(!\[[^\]]*\]\(\S+?\))(?:\{(right|left)\})?$/);
      var nx={'':'{right}',right:'{left}',left:''}[m2[2]||''];E.chunks[i]=m2[1]+nx;edCommit();renderEdit()}
    else if(a==='revert'){if(confirm('Remove my changes to this block and go back to the researched version?')){S.n[E.key]='';S.n[E.key+'base']='';S.d[E.key]=1;S.d[E.key+'base']=1;save();clearTimeout(noteTimer);pushNotes();finishEdit(y)}}
    else if(a==='done')finishEdit(y)};
  box.onchange=function(e){if(E&&e.target&&e.target.id==='edFile'){edPhotos(e.target.files,E.pendIdx,E.pendSide);e.target.value=''}};
  /* drag and drop: pieces by their handle, photos from the computer */
  var tgt=function(e){var el=e.target.closest&&e.target.closest('.ck,.gap');if(!el)return -1;
    if(el.classList.contains('gap'))return +el.dataset.g;var r=el.getBoundingClientRect(),i=+el.dataset.i;return e.clientY>r.top+r.height/2?i+1:i};
  var mark=function(idx){box.querySelectorAll('.gap').forEach(function(g){g.classList.toggle('on',+g.dataset.g===idx)})};
  box.ondragstart=function(e){var gr=e.target.closest&&e.target.closest('.grab');if(!gr){return}var ck=gr.closest('.ck');E.drag=+ck.dataset.i;
    e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','ck');try{e.dataTransfer.setDragImage(ck,20,20)}catch(x){}};
  box.ondragover=function(e){var files=e.dataTransfer&&[].indexOf.call(e.dataTransfer.types||[],'Files')>-1;if(E.drag==null&&!files)return;e.preventDefault();mark(tgt(e))};
  box.ondragleave=function(e){if(!box.contains(e.relatedTarget))mark(-9)};
  box.ondragend=function(){E.drag=null;mark(-9)};
  box.ondrop=function(e){var idx=tgt(e);mark(-9);var fs=e.dataTransfer?[].filter.call(e.dataTransfer.files,isImg):[];
    if(fs.length){e.preventDefault();e.stopPropagation();edPhotos(fs,idx<0?E.chunks.length:idx,false);return}
    if(E.drag!=null&&idx>=0){e.preventDefault();e.stopPropagation();var f=E.drag;E.drag=null;edMove(f,idx)}};
  window.scrollTo(0,y)}
function finishEdit(y){var id=E.topic,bi=E.bi;E=null;document.body.classList.remove('editing');topic(id,bi);if(y!=null)window.scrollTo(0,y)}


function topic(id,bi){E=null;document.body.classList.remove('editing');
  var t=topicById(id); if(!t){location.hash='#/';return}
  bi=bi||0;
  var g=groupOf(t.group),idx=TOPICS.indexOf(t),h='';
  var pv=TOPICS[idx-1],nx=TOPICS[idx+1];
  var sp=hasNotes(t)?splitBlocks(t.notes):null,nb=sp?sp.blocks.length:0;
  if(nb&&(bi<0||bi>=nb))bi=0;
  document.body.classList.toggle('adv-only',!!nb&&S.lvl==='A');
  h+='<a class="back" href="#/">← All sections</a>';
  h+='<header class="t-head" style="--h:'+g.hue+'"><span class="num big">'+num(t.n)+'</span><div><div class="crumb">'+esc(g.name)+'</div><h1>'+esc(t.name)+'</h1></div></header>';
  if(t.note)h+='<aside class="callout key"><b>Exam format</b><p>'+esc(t.note)+'</p></aside>';
  var syl='<ul class="ul">'+t.adv.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>'+
     '<details class="found"><summary>Foundation: Introductory + Certified</summary><ul class="ul">'+t.found.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></details>';

  if(nb){
    var cur=sp.blocks[bi],rawBody=(t.raw?rawBlocks(t.raw)[bi]:'')||'',docKey=id+':'+(bi+1)+':doc',ov=(S.n[docKey]||'').trim(),
        items=ov?parseMd(ov):cur.items,sec=sectionsHTML(items),changed=ov&&S.n[docKey+'base']&&S.n[docKey+'base']!==hash(rawBody);
    h+='<div class="tlayout"><aside class="tside">'+sideHTML(id,sp,bi,items)+'</aside><div class="tmain">';
    h+='<select class="blksel" id="blkSel" aria-label="Block">'+sp.blocks.map(function(b,i){return '<option value="'+(i+1)+'"'+(i===bi?' selected':'')+'>'+esc(b.title)+'</option>'}).join('')+'</select>';
    h+='<div class="lvbar"><div class="lvsw" role="group" aria-label="Level filter"><button type="button" data-lv="all">All levels</button><button type="button" data-lv="A">Advanced only</button></div>'+
       '<span class="lvkey">'+chip('I')+'Introductory '+chip('C')+'Certified '+chip('A')+'Advanced</span><button type="button" class="edbtn" id="edBtn">✎ Edit this block</button></div>';
    if(sec.hidden)h+='<div class="foldnote"><span>Foundation hidden: '+sec.hidden+' section'+(sec.hidden>1?'s':'')+' you should already know.</span><button type="button" id="showAll">Show all levels</button></div>';
    if(sp.pre.length)h+='<details class="howto"><summary>How to read this page</summary>'+sp.pre.map(block).join('')+'</details>';
    if(ov)h+='<div class="foldnote mineon"><span>This is my edited version of the block.</span></div>';
    if(changed)h+='<details class="howto origchg"><summary>The researched notes for this block were updated after I edited it. See the updated original</summary>'+sectionsHTML(cur.items).html+'<p><button type="button" id="useOrig" class="edbtn">Use the updated original (discard my edits)</button></p></details>';
    h+='<article class="panel notes-body blk"><h2 class="btitle">'+inl(cur.title)+'</h2><div id="editzone">'+sec.html+'</div>'+
       editorHTML(id+':'+(bi+1)+':sum','My summary','Two or three lines in your own words.',3,'ed-sum')+'</article>';
    if(sp.src.length)h+='<details class="srcs panel"><summary>Sources</summary><div class="notes-body">'+sp.src.map(block).join('')+'</div></details>';
    h+='<nav class="pager bp">'+(bi>0?'<a href="#/t/'+id+'/'+bi+'">← Previous block<b>'+esc(sp.blocks[bi-1].title)+'</b></a>':'<span></span>')+(bi<nb-1?'<a href="#/t/'+id+'/'+(bi+2)+'">Next block →<b>'+esc(sp.blocks[bi+1].title)+'</b></a>':'')+'</nav>';
    h+='<details class="panel syl"><summary>What the syllabus asks (Advanced)</summary>'+syl+'</details>';
    h+='</div></div>';
  }else{
    h+='<section class="panel"><div class="panel-head"><h2>What the syllabus asks (Advanced)</h2></div>'+syl+'</section>';
    h+='<section class="panel notes-body"><div class="panel-head"><h2>Study notes</h2></div>';
    h+=hasNotes(t)?t.notes.map(block).join(''):'<p class="soon">'+(notesLoaded?'Not written yet. You can write your own notes below, and we will research this section in depth later.':'Loading notes…')+'</p>';
    h+=editorHTML(id+':notes','My notes','Your own theory for this topic. Same format as the other notes.',8,'ed-notes')+'</section>';
  }
  h+='<section class="panel"><div class="panel-head"><h2>My images</h2></div><div id="myimgs"></div></section>';
  h+='<section class="panel"><div class="panel-head"><h2>My own additions</h2></div><textarea class="notes" id="mine" placeholder="Anything I want to remember or fix later…">'+esc(S.n[id]||'')+'</textarea><p class="fine" id="mineSt"></p></section>';
  h+='<nav class="pager">'+(pv?'<a href="#/t/'+pv.id+'">← Previous<b>'+esc(pv.name)+'</b></a>':'<span></span>')+(nx?'<a href="#/t/'+nx.id+'">Next →<b>'+esc(nx.name)+'</b></a>':'')+'</nav>';
  app.innerHTML=h;window.scrollTo(0,0);
  if(nb){
    var setLv=function(v){S.lvl=v==='A'?'A':'all';save();document.body.classList.toggle('adv-only',S.lvl==='A');
      app.querySelectorAll('.lvsw button').forEach(function(b){b.classList.toggle('on',b.dataset.lv===S.lvl)})};
    setLv(S.lvl==='A'?'A':'all');
    app.querySelectorAll('.lvsw button').forEach(function(b){b.onclick=function(){setLv(b.dataset.lv)}});
    var sa=document.getElementById('showAll');if(sa)sa.onclick=function(){setLv('all')};
    document.getElementById('blkSel').onchange=function(e){location.hash='#/t/'+id+'/'+e.target.value};
    fixLocalImgs(document.getElementById('editzone'));
    document.getElementById('edBtn').onclick=function(){startEdit(id,bi,rawBody,ov)};
    var uo=document.getElementById('useOrig');if(uo)uo.onclick=function(){if(confirm('Discard my edits and use the updated original?')){S.n[docKey]='';S.n[docKey+'base']='';S.d[docKey]=1;S.d[docKey+'base']=1;save();pushNotes();topic(id,bi)}};
    app.querySelectorAll('.tside .ss').forEach(function(a){a.onclick=function(e){e.preventDefault();var el=document.getElementById(a.dataset.go);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}});
  }
  bindNotes(id);
  bindEditors();
  renderImages(id);
}

function search(q){
  q=q.trim().toLowerCase();if(!q){route();return}
  var h='<a class="back" href="#/" id="clr">← All sections</a><section class="panel"><div class="panel-head"><h2>Results for “'+esc(q)+'”</h2></div>',n=0;
  TOPICS.forEach(function(t){
    var hits=[];
    t.adv.forEach(function(x){if(x.toLowerCase().indexOf(q)>-1)hits.push(['Syllabus',x])});
    (t.notes||[]).forEach(function(b){var s=blockText(b);if(s.toLowerCase().indexOf(q)>-1)hits.push(['Notes',s.slice(0,160)])});
    if(t.name.toLowerCase().indexOf(q)>-1||hits.length){n++;
      h+='<a class="hit" href="#/t/'+t.id+'"><b>'+hl(t.name,q)+'</b>'+hits.slice(0,4).map(function(x){return '<br><small>'+x[0]+': '+hl(x[1],q)+'</small>'}).join('')+'</a>'}
  });
  if(!n)h+='<div class="empty">Nothing found.</div>';
  app.innerHTML=h+'</section>';
  document.getElementById('clr').onclick=function(e){e.preventDefault();qEl.value='';location.hash='#/';route()};
}

function route(){var m=location.hash.match(/^#\/t\/([\w-]+)(?:\/(\d+))?/);if(m){qEl.value='';topic(m[1],m[2]?+m[2]-1:0)}else{home();window.scrollTo(0,0)}}
window.addEventListener('hashchange',route);
qEl.addEventListener('input',function(){search(qEl.value)});

/* ---- backup of my own additions ---- */
var sheet=document.getElementById('sheet'),msg=document.getElementById('sheetMsg');
function closeSheet(){sheet.hidden=true}
document.getElementById('menuBtn').onclick=function(){msg.textContent='';sheet.hidden=false};
document.getElementById('sheetClose').onclick=closeSheet;
sheet.addEventListener('click',function(e){if(e.target===sheet)closeSheet()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!sheet.hidden)closeSheet()});
document.getElementById('exportBtn').onclick=function(){
  var b=new Blob([JSON.stringify(S,null,1)],{type:'application/json'}),a=document.createElement('a');
  a.href=URL.createObjectURL(b);a.download='cms-advanced-notes-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(a.href)},2000);msg.textContent='Backup downloaded.';
};
document.getElementById('importFile').onchange=function(e){
  var f=e.target.files[0];if(!f)return;var r=new FileReader();
  r.onload=function(){try{var d=JSON.parse(r.result);if(!d||typeof d.n!=='object')throw 0;S=d;S.d={};Object.keys(S.n).forEach(function(k){S.d[k]=1});pushNotes();localStorage.setItem(KEY,JSON.stringify(S));msg.textContent='Backup restored.';route()}catch(x){msg.textContent='That file is not a valid backup.'}};
  r.readAsText(f);e.target.value='';
};
document.getElementById('resetBtn').onclick=function(){
  if(confirm('Delete the copy of my own additions stored on this device? Anything already synced stays on GitHub.')){S={n:{},d:{}};localStorage.removeItem(KEY);msg.textContent='Cleared on this device.';route()}
};
/* ---- my images: stored on this device (IndexedDB) and synced to the GitHub repo ---- */
var GHK='cmsAdvanced.gh';
var GH=(function(){try{return JSON.parse(localStorage.getItem(GHK))}catch(e){return null}})();
if(GH&&!(GH.repo&&GH.token))GH=null;
var remote=[],dbp,syncQ=Promise.resolve();
function idb(){return dbp||(dbp=new Promise(function(ok,no){var r=indexedDB.open('cmsAdvancedImgs',1);r.onupgradeneeded=function(){r.result.createObjectStore('img',{keyPath:'id'})};r.onsuccess=function(){ok(r.result)};r.onerror=function(){no(r.error)}}))}
function tx(mode,fn){return idb().then(function(d){return new Promise(function(ok,no){var q=fn(d.transaction('img',mode).objectStore('img'));q.onsuccess=function(){ok(q.result)};q.onerror=function(){no(q.error)}})})}
function dbAll(){return tx('readonly',function(s){return s.getAll()})}
function dbPut(o){return tx('readwrite',function(s){return s.put(o)})}
function dbDel(id){return tx('readwrite',function(s){return s['delete'](id)})}
function loadRemote(){return fetch('uploads.json?'+Date.now()).then(function(r){return r.ok?r.json():[]}).then(function(j){remote=Array.isArray(j)?j:[]}).catch(function(){})}
function isImg(f){return /^image\//.test(f.type)}
function curTopic(){var m=location.hash.match(/^#\/t\/([\w-]+)/);return m&&m[1]}

function shrink(f){return new Promise(function(ok,no){var u=URL.createObjectURL(f),im=new Image();
  im.onload=function(){var M=2600,s=Math.min(1,M/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
    var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(function(b){b?ok(b):no()},'image/jpeg',.88)};
  im.onerror=function(){no()};im.src=u})}

function imgItems(topic){return dbAll().then(function(loc){var m={};
  remote.forEach(function(r){if(r.topic===topic)m[r.id]={id:r.id,cap:r.cap||'',t:r.t,src:'images/uploads/'+r.topic+'/'+r.id+'.jpg',synced:true}});
  loc.forEach(function(l){if(l.topic===topic)m[l.id]={id:l.id,cap:l.cap||'',t:l.t,src:URL.createObjectURL(l.blob),synced:!!l.synced,local:true}});
  return Object.keys(m).map(function(k){return m[k]}).sort(function(a,b){return a.t-b.t})})}

/* GitHub contents API */
function api(path,opt){opt=opt||{};opt.headers={Authorization:'Bearer '+GH.token,Accept:'application/vnd.github+json'};return fetch('https://api.github.com/repos/'+GH.repo+'/contents/'+path,opt)}
function b64(blob){return new Promise(function(ok){var r=new FileReader();r.onload=function(){ok(r.result.split(',')[1])};r.readAsDataURL(blob)})}
function chk(r){if(!r.ok)throw new Error('GitHub '+r.status);return r}
function getMan(){return api('uploads.json?t='+Date.now()).then(function(r){if(r.status===404)return{list:[],sha:null};chk(r);return r.json().then(function(j){return{list:JSON.parse(decodeURIComponent(escape(atob(j.content.replace(/\n/g,''))))),sha:j.sha}})})}
function mutateMan(fn,msg,again){return getMan().then(function(m){var b={message:msg,content:btoa(unescape(encodeURIComponent(JSON.stringify(fn(m.list),null,1))))};if(m.sha)b.sha=m.sha;
  return api('uploads.json',{method:'PUT',body:JSON.stringify(b)}).then(function(r){if((r.status===409||r.status===422)&&!again)return mutateMan(fn,msg,true);chk(r)})}).then(loadRemote)}
function syncAll(){if(!GH)return Promise.resolve();
  syncQ=syncQ.then(function(){return dbAll()}).then(function(loc){var pend=loc.filter(function(l){return !l.synced});if(!pend.length)return;
    return pend.reduce(function(p,l){return p.then(function(){return b64(l.blob).then(function(c){return api('images/uploads/'+l.topic+'/'+l.id+'.jpg',{method:'PUT',body:JSON.stringify({message:'Add image',content:c})})}).then(function(r){if(r.status!==422)chk(r)})})},Promise.resolve())
    .then(function(){return mutateMan(function(list){pend.forEach(function(l){list=list.filter(function(x){return x.id!==l.id});list.push({id:l.id,topic:l.topic,cap:l.cap,t:l.t})});return list},'Update image list')})
    .then(function(){return Promise.all(pend.map(function(l){l.synced=true;return dbPut(l)}))})})
  .then(function(){var t=curTopic();if(t)renderImages(t)},function(e){flash('Could not sync: '+e.message+'. Images are kept on this device.')});
  return syncQ}
function flash(m){var el=document.getElementById('imgmsg');if(el)el.textContent=m;msg.textContent=m}

function storeFiles(topic,files){var list=[].filter.call(files,isImg);if(!list.length)return Promise.resolve([]);var now=Date.now();
  return Promise.all(list.map(function(f,i){return shrink(f).then(function(bl){var id=(now+i).toString(36)+Math.random().toString(36).slice(2,5);return dbPut({id:id,topic:topic,cap:'',blob:bl,synced:false,t:now+i}).then(function(){return id})})}))}
function addFiles(topic,files){return storeFiles(topic,files).then(function(ids){if(!ids.length)return ids;return renderImages(topic).then(function(){return syncAll()}).then(function(){return ids})},function(){flash('That file could not be read as an image.');return []})}

var renderSeq=0;
function renderImages(topic){var box=document.getElementById('myimgs');if(!box)return Promise.resolve();var my=++renderSeq;
  return imgItems(topic).then(function(items){if(my!==renderSeq||curTopic()!==topic)return;box=document.getElementById('myimgs');if(!box)return;
    var h='<div class="drop"><label class="btn small">Add images<input type="file" id="pick" accept="image/*" multiple hidden></label><span>Or paste with Ctrl+V, or drop them anywhere on this page.</span></div>';
    if(!GH)h+='<p class="fine">Saved on this device only. To see them on your phone too, connect GitHub in the “⋯” menu.</p>';
    h+='<p class="fine" id="imgmsg"></p><div class="figs">'+items.map(function(x){return '<figure class="fig" data-id="'+x.id+'"><img src="'+esc(x.src)+'" alt="" data-zoom><figcaption><input class="cap" value="'+esc(x.cap)+'" placeholder="Add a caption" aria-label="Caption"><span class="st">'+(x.synced?'On GitHub':'This device only')+'</span><button class="x" type="button">Delete</button></figcaption></figure>'}).join('')+'</div>';
    box.innerHTML=h;
    document.getElementById('pick').onchange=function(e){addFiles(topic,e.target.files);e.target.value=''};
    var byId={};items.forEach(function(x){byId[x.id]=x});
    box.querySelectorAll('.fig').forEach(function(fg){var it=byId[fg.dataset.id];
      fg.querySelector('.cap').onchange=function(e){var v=e.target.value;
        (it.local?dbAll().then(function(a){var r=a.filter(function(z){return z.id===it.id})[0];r.cap=v;return dbPut(r)}):Promise.resolve())
        .then(function(){if(it.synced){if(!GH){flash('Connect GitHub to edit captions of synced images.');return}return mutateMan(function(l){l.forEach(function(z){if(z.id===it.id)z.cap=v});return l},'Edit caption')}}).catch(function(er){flash(er.message)})};
      fg.querySelector('.x').onclick=function(){
        if(it.synced&&!GH){flash('Connect GitHub in the “⋯” menu to delete synced images.');return}
        if(!confirm('Delete this image?'))return;
        var p=Promise.resolve();
        if(it.synced)p=api('images/uploads/'+topic+'/'+it.id+'.jpg').then(function(r){return r.ok?r.json():null}).then(function(j){if(j)return api('images/uploads/'+topic+'/'+it.id+'.jpg',{method:'DELETE',body:JSON.stringify({message:'Delete image',sha:j.sha})}).then(chk)}).then(function(){return mutateMan(function(l){return l.filter(function(z){return z.id!==it.id})},'Remove image')});
        p.then(function(){return dbDel(it.id)}).then(function(){return renderImages(topic)}).catch(function(er){flash(er.message)})}})})}

document.addEventListener('paste',function(e){var t=curTopic();if(!t||!e.clipboardData)return;var fs=[].filter.call(e.clipboardData.files,isImg);if(fs.length){e.preventDefault();if(E)edPhotos(fs,E.chunks.length,false);else addFiles(t,fs)}});
document.addEventListener('dragover',function(e){if(curTopic())e.preventDefault()});
document.addEventListener('drop',function(e){var t=curTopic();if(!t)return;e.preventDefault();addFiles(t,e.dataTransfer.files)});
loadRemote().then(function(){var t=curTopic();if(t)renderImages(t)});

/* GitHub connection form (in the menu) */
var ghRepo=document.getElementById('ghRepo'),ghTok=document.getElementById('ghTok');
ghRepo.value=(GH&&GH.repo)||'fatencioj-rgb/cms-advanced';ghTok.value=(GH&&GH.token)||'';
document.getElementById('ghSave').onclick=function(){var r=ghRepo.value.trim(),t=ghTok.value.trim();
  if(!r||!t){GH=null;localStorage.removeItem(GHK);msg.textContent='GitHub disconnected.';return}
  GH={repo:r,token:t};msg.textContent='Checking…';
  fetch('https://api.github.com/repos/'+r,{headers:{Authorization:'Bearer '+t,Accept:'application/vnd.github+json'}}).then(function(x){
    if(!x.ok){GH=null;msg.textContent='GitHub refused it ('+x.status+'). Check the repository name and the token.';return}
    return x.json().then(function(j){if(!(j.permissions&&j.permissions.push)){GH=null;msg.textContent='This token cannot write to the repository. Give it Contents: Read and write.';return}
      localStorage.setItem(GHK,JSON.stringify(GH));msg.textContent='Connected. Syncing…';var tp=curTopic();if(tp)renderImages(tp);
      return Promise.all([syncAll(),pullNotes().then(pushNotes)]).then(function(){msg.textContent='Connected and synced.';var tp=curTopic();if(tp)bindNotes(tp)})})}).catch(function(){GH=null;msg.textContent='Could not reach GitHub.'})};

/* ---- "My own additions": saved on this device and synced to mynotes.json in the repo ----
   S.n = text per topic, S.d = topics edited here and not yet on GitHub. */
S.d=S.d||{};
var NF='mynotes.json',noteTimer=null,notePush=null,noteErr='';
function getNotesFile(){return api(NF+'?t='+Date.now()).then(function(r){if(r.status===404)return{data:{},sha:null};chk(r);
  return r.json().then(function(j){var d={};try{d=JSON.parse(decodeURIComponent(escape(atob(j.content.replace(/\n/g,'')))))||{}}catch(e){}return{data:d,sha:j.sha}})})}
function applyRemote(data){Object.keys(data).forEach(function(k){if(!S.d[k])S.n[k]=data[k]});save()}
/* read: with GitHub connected use the API (always fresh); otherwise the published copy (read only, may lag a minute) */
function pullNotes(){
  var p=GH?getNotesFile().then(function(f){return f.data}):fetch(NF+'?'+Date.now()).then(function(r){return r.ok?r.json():{}});
  return p.then(function(d){applyRemote(d||{});noteErr='';refreshEditors()},function(e){noteErr=e.message||'offline'})}
function pushNotes(again){
  if(!GH||!Object.keys(S.d).length)return Promise.resolve();
  if(notePush)return notePush;
  var sending={};Object.keys(S.d).forEach(function(k){sending[k]=S.n[k]||''});
  notePush=getNotesFile().then(function(f){var d=f.data;
      Object.keys(sending).forEach(function(k){if(sending[k])d[k]=sending[k];else delete d[k]});
      var b={message:'Update my notes',content:btoa(unescape(encodeURIComponent(JSON.stringify(d,null,1))))};if(f.sha)b.sha=f.sha;
      return api(NF,{method:'PUT',body:JSON.stringify(b)}).then(function(r){
        if((r.status===409||r.status===422)&&!again){notePush=null;return pushNotes(true)}
        chk(r);Object.keys(sending).forEach(function(k){if((S.n[k]||'')===sending[k])delete S.d[k]});save();noteErr=''})})
    .catch(function(e){noteErr=e.message||'offline'})
    .then(function(){notePush=null;noteStatus();if(Object.keys(S.d).length&&!noteErr)return pushNotes()});
  return notePush}
function noteStatus(){document.querySelectorAll('.myed').forEach(edStatus);var el=document.getElementById('mineSt'),t=curTopic();if(!el||!t)return;
  if(!GH){el.textContent='Saved on this device only. Connect GitHub in the “⋯” menu to sync with your other devices.';return}
  if(noteErr&&S.d[t]){el.textContent='Saved on this device. Not synced yet ('+noteErr+'); it will retry automatically.';return}
  el.textContent=S.d[t]?'Saving…':'Synced with GitHub · same on all your devices.'}
function bindNotes(id){var n=document.getElementById('mine');if(!n)return;
  noteStatus();
  n.oninput=function(){S.n[id]=n.value;S.d[id]=1;save();noteStatus();clearTimeout(noteTimer);noteTimer=setTimeout(pushNotes,2000)};
  n.onblur=function(){if(S.d[id]){clearTimeout(noteTimer);pushNotes()}};
  /* bring in changes made on another device, unless I am typing here */
  pullNotes().then(function(){if(curTopic()!==id)return;var el=document.getElementById('mine');
    if(el&&document.activeElement!==el&&!S.d[id]&&el.value!==(S.n[id]||''))el.value=S.n[id]||'';noteStatus();if(GH)pushNotes()})}
/* send pending edits when leaving the page or switching apps */
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden'){clearTimeout(noteTimer);pushNotes()}else{var t=curTopic();if(t)bindNotes(t)}});
window.addEventListener('online',function(){pushNotes()});

/* ---- image zoom ---- */
var lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.innerHTML='<button class="lb-x" aria-label="Close">✕</button><div class="lb-s"><img alt=""></div>';document.body.appendChild(lb);
var lbi=lb.querySelector('img');
document.addEventListener('click',function(e){var im=e.target.closest&&e.target.closest('img[data-zoom]');if(im){lbi.src=im.src;lbi.className='';lb.hidden=false;document.body.style.overflow='hidden'}});
lbi.onclick=function(){lbi.classList.toggle('big')};
function closeLb(){lb.hidden=true;document.body.style.overflow=''}
lb.addEventListener('click',function(e){if(e.target===lb||e.target.className==='lb-x'||e.target.className==='lb-s')closeLb()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)closeLb()});
route();
/* load the written notes, then redraw once (keeping the scroll position, and not while typing) */
loadNotes().then(function(){
  var a=document.activeElement,typing=a&&(a.tagName==='TEXTAREA'||a.tagName==='INPUT');
  if(typing)return;
  var y=window.scrollY;route();window.scrollTo(0,y)});
})();
