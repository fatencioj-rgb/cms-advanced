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
function inl(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\*(.+?)\*/g,'<i>$1</i>')}
function groupOf(id){return GROUPS.filter(function(g){return g.id===id})[0]}
function topicById(id){return TOPICS.filter(function(t){return t.id===id})[0]}
function num(n){return n<10?'0'+n:''+n}
function hasNotes(t){return t.notes&&t.notes.length>0}
function hl(text,q){var i=text.toLowerCase().indexOf(q);if(i<0)return esc(text);return esc(text.slice(0,i))+'<mark>'+esc(text.slice(i,i+q.length))+'</mark>'+esc(text.slice(i+q.length))}

/* ---- note blocks ----
 {h:'Heading'} {p:'Paragraph'} {list:[..]} {note:'Keep in mind...'} {btw:'By the way...'} {table:{head:[..],rows:[[..]]}}\n {img:'images/bordeaux/map.jpg',cap:'Caption'}  {imgs:[{img,cap},{img,cap}]} (side by side) */
function block(b){
  if(b.h)return '<h3>'+inl(b.h)+'</h3>';
  if(b.p)return '<p>'+inl(b.p)+'</p>';
  if(b.list)return '<ul class="ul">'+b.list.map(function(x){return '<li>'+inl(x)+'</li>'}).join('')+'</ul>';
  if(b.note)return '<aside class="callout key"><b>Keep in mind</b><p>'+inl(b.note)+'</p></aside>';
  if(b.btw)return '<aside class="callout btw"><b>By the way</b><p>'+inl(b.btw)+'</p></aside>';
  if(b.img)return '<figure class="fig"><img src="'+esc(b.img)+'" alt="'+esc(b.cap||'')+'" loading="lazy" data-zoom>'+(b.cap?'<figcaption>'+inl(b.cap)+'</figcaption>':'')+'</figure>';
  if(b.imgs)return '<div class="figs">'+b.imgs.map(function(x){return '<figure class="fig"><img src="'+esc(x.img)+'" alt="'+esc(x.cap||'')+'" loading="lazy" data-zoom>'+(x.cap?'<figcaption>'+inl(x.cap)+'</figcaption>':'')+'</figure>'}).join('')+'</div>';
  if(b.table)return '<div class="tw"><table><thead><tr>'+b.table.head.map(function(c){return '<th>'+inl(c)+'</th>'}).join('')+'</tr></thead><tbody>'+
    b.table.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+inl(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>';
  return '';
}
function blockText(b){return (b.h||b.p||b.note||b.btw||(b.list&&b.list.join(' '))||(b.table&&b.table.rows.join(' '))||'')+''}

/* ---- views ---- */
function card(t){
  var g=groupOf(t.group);
  return '<a class="card" style="--h:'+g.hue+'" href="#/t/'+t.id+'"><span class="num">'+num(t.n)+'</span>'+
    '<span class="c-body"><h3>'+esc(t.name)+'</h3></span>'+
    (hasNotes(t)?'<span class="tag ready">Notes</span>':'<span class="tag">Outline</span>')+'</a>';
}

function home(){
  var ready=TOPICS.filter(hasNotes).length,h='';
  h+='<section class="intro"><p class="eyebrow">Court of Master Sommeliers Europe · 2026/27</p><h1>Advanced Sommelier</h1>'+
     '<p>My study notes, organised by syllabus section. Each topic has what the syllabus asks for at Advanced level and, once researched, my notes on it.</p>'+
     '<p class="count">'+TOPICS.length+' sections · '+ready+' with notes written</p></section>';
  h+='<div class="g-tools"><button class="linkbtn" type="button" id="gAll">Expand all</button><button class="linkbtn" type="button" id="gNone">Collapse all</button></div>';
  GROUPS.forEach(function(g){
    var list=TOPICS.filter(function(t){return t.group===g.id}),open=!!openG[g.id],ready=list.filter(hasNotes).length;
    h+='<section class="group acc'+(open?' open':'')+'" style="--h:'+g.hue+'" data-g="'+g.id+'">'+
       '<button class="group-head" type="button" aria-expanded="'+open+'"><span class="g-text"><h2>'+esc(g.name)+'</h2><p>'+esc(g.blurb)+'</p></span>'+
       '<span class="g-count">'+list.length+(list.length===1?' topic':' topics')+(ready?' · '+ready+' with notes':'')+'</span>'+
       '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'+
       '<div class="grid"'+(open?'':' hidden')+'>'+list.map(card).join('')+'</div></section>';
  });
  app.innerHTML=h;
  function setG(sec,open){var id=sec.dataset.g;if(open)openG[id]=1;else delete openG[id];
    sec.classList.toggle('open',open);sec.querySelector('.group-head').setAttribute('aria-expanded',open);sec.querySelector('.grid').hidden=!open}
  var secs=app.querySelectorAll('.group.acc');
  secs.forEach(function(sec){sec.querySelector('.group-head').onclick=function(){setG(sec,!sec.classList.contains('open'));saveG()}});
  document.getElementById('gAll').onclick=function(){secs.forEach(function(s){setG(s,true)});saveG()};
  document.getElementById('gNone').onclick=function(){secs.forEach(function(s){setG(s,false)});saveG()};
}
/* which groups are open: remembered on this device */
var GK='cmsAdvanced.groups';
var openG=(function(){try{var v=JSON.parse(localStorage.getItem(GK));if(v)return v}catch(e){}return {france:1}})();
function saveG(){try{localStorage.setItem(GK,JSON.stringify(openG))}catch(e){}}

function topic(id){
  var t=topicById(id); if(!t){location.hash='#/';return}
  var g=groupOf(t.group),idx=TOPICS.indexOf(t),h='';
  var pv=TOPICS[idx-1],nx=TOPICS[idx+1];
  h+='<a class="back" href="#/">← All sections</a>';
  h+='<header class="t-head" style="--h:'+g.hue+'"><span class="num big">'+num(t.n)+'</span><div><div class="crumb">'+esc(g.name)+'</div><h1>'+esc(t.name)+'</h1></div></header>';
  if(t.note)h+='<aside class="callout key"><b>Exam format</b><p>'+esc(t.note)+'</p></aside>';

  h+='<section class="panel"><div class="panel-head"><h2>What the syllabus asks (Advanced)</h2></div><ul class="ul">'+t.adv.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>'+
     '<details class="found"><summary>Foundation: Introductory + Certified</summary><ul class="ul">'+t.found.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></details></section>';

  h+='<section class="panel notes-body"><div class="panel-head"><h2>Study notes</h2></div>';
  h+=hasNotes(t)?t.notes.map(block).join(''):'<p class="soon">Not written yet. We will research this section in depth and add the notes here.</p>';
  h+='</section>';

  h+='<section class="panel"><div class="panel-head"><h2>My images</h2></div><div id="myimgs"></div></section>';
  h+='<section class="panel"><div class="panel-head"><h2>My own additions</h2></div><textarea class="notes" id="mine" placeholder="Anything I want to remember or fix later…">'+esc(S.n[id]||'')+'</textarea><p class="fine">Saved on this device only.</p></section>';
  h+='<nav class="pager">'+(pv?'<a href="#/t/'+pv.id+'">← Previous<b>'+esc(pv.name)+'</b></a>':'<span></span>')+(nx?'<a href="#/t/'+nx.id+'">Next →<b>'+esc(nx.name)+'</b></a>':'')+'</nav>';
  app.innerHTML=h;window.scrollTo(0,0);
  var n=document.getElementById('mine');n.oninput=function(){S.n[id]=n.value;save()};
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

function route(){var m=location.hash.match(/^#\/t\/([\w-]+)/);if(m){qEl.value='';topic(m[1])}else{home();window.scrollTo(0,0)}}
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
  r.onload=function(){try{var d=JSON.parse(r.result);if(!d||typeof d.n!=='object')throw 0;S=d;localStorage.setItem(KEY,JSON.stringify(S));msg.textContent='Backup restored.';route()}catch(x){msg.textContent='That file is not a valid backup.'}};
  r.readAsText(f);e.target.value='';
};
document.getElementById('resetBtn').onclick=function(){
  if(confirm('Delete my own additions on this device? This cannot be undone.')){S={n:{}};localStorage.removeItem(KEY);msg.textContent='Cleared.';route()}
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

function addFiles(topic,files){var list=[].filter.call(files,isImg);if(!list.length)return;
  var now=Date.now();
  Promise.all(list.map(function(f,i){return shrink(f).then(function(b){return dbPut({id:(now+i).toString(36)+Math.random().toString(36).slice(2,5),topic:topic,cap:'',blob:b,synced:false,t:now+i})})}))
  .then(function(){return renderImages(topic)}).then(function(){return syncAll()},function(){flash('That file could not be read as an image.')})}

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

document.addEventListener('paste',function(e){var t=curTopic();if(!t||!e.clipboardData)return;var fs=[].filter.call(e.clipboardData.files,isImg);if(fs.length){e.preventDefault();addFiles(t,fs)}});
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
      return syncAll().then(function(){msg.textContent='Connected and synced.'})})}).catch(function(){GH=null;msg.textContent='Could not reach GitHub.'})};

/* ---- image zoom ---- */
var lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.innerHTML='<button class="lb-x" aria-label="Close">✕</button><div class="lb-s"><img alt=""></div>';document.body.appendChild(lb);
var lbi=lb.querySelector('img');
document.addEventListener('click',function(e){var im=e.target.closest&&e.target.closest('img[data-zoom]');if(im){lbi.src=im.src;lbi.className='';lb.hidden=false;document.body.style.overflow='hidden'}});
lbi.onclick=function(){lbi.classList.toggle('big')};
function closeLb(){lb.hidden=true;document.body.style.overflow=''}
lb.addEventListener('click',function(e){if(e.target===lb||e.target.className==='lb-x'||e.target.className==='lb-s')closeLb()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)closeLb()});
route();
})();
