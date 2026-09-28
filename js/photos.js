// GainPath: progress photos (Climb → Body)
// A plain script (not a module) sharing one global scope with the other
// js/ files; index.html sets the load order. Map: docs/index-section-map.md
// ═══ PROGRESS PHOTOS — on this device only, in their own IndexedDB database ═══
// Photos live in 'gainpath-photos', never in localStorage or the 'gainpath'
// mirror, so they are never in the JSON backup and never uploaded. The card
// says so in plain words wherever photos are added. Each photo is downscaled
// before saving (long edge PH_MAX, plus a PH_THUMB thumbnail for the grid), so
// a year of weekly photos is tens of MB. Stores: 'photos' = metadata + the
// thumbnail, 'full' = id → full image, written and deleted together in one
// transaction; the grid never loads full images. Images are stored as
// ArrayBuffers, not Blobs: WebKit can refuse a Blob in IndexedDB ("Error
// preparing Blob/File data"), which is exactly how a photo could be lost.
// Every failure is shown in #ph-msg: a photo that didn't save must never look
// saved. resetApp() calls photoClear().
const PH_DB='gainpath-photos',PH_MAX=1600,PH_THUMB=400,PH_Q=.82,PH_LOW_MB=100;
let PH=null,PH_LIST=null,PH_URLS={},PH_VIEW=null;
function phOpen(){
  if(PH)return Promise.resolve(PH);
  return new Promise((res,rej)=>{
    const r=window.indexedDB.open(PH_DB,1);
    r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('photos'))d.createObjectStore('photos',{keyPath:'id'});if(!d.objectStoreNames.contains('full'))d.createObjectStore('full');};
    r.onsuccess=()=>{PH=r.result;PH.onversionchange=()=>{PH.close();PH=null;};res(PH);};
    r.onerror=()=>rej(r.error);r.onblocked=()=>rej(new Error('blocked'));
  });
}
// A failed request also fails its transaction, which is what rejects here, so
// the request's own rejection is deliberately swallowed.
function phTx(stores,mode,fn){return phOpen().then(db=>new Promise((res,rej)=>{const tx=db.transaction(stores,mode);let out;Promise.resolve(fn(tx)).then(v=>{out=v;},()=>{});tx.oncomplete=()=>res(out);tx.onerror=()=>rej(tx.error||new Error('write failed'));tx.onabort=()=>rej(tx.error||new Error('aborted'));}));}
const phJpeg=buf=>new Blob([buf],{type:'image/jpeg'});
function phLoad(){return PH_LIST?Promise.resolve(PH_LIST):phTx('photos','readonly',tx=>idbReq(tx.objectStore('photos').getAll())).then(l=>(PH_LIST=l.sort((a,b)=>a.at<b.at?1:a.at>b.at?-1:0)));}
// Room left for this site's storage, or null where the browser won't say.
async function phEstimate(){try{if(navigator.storage&&navigator.storage.estimate){const e=await navigator.storage.estimate();if(e&&e.quota)return Math.max(0,e.quota-(e.usage||0));}}catch(e){}return null;}
function phMB(b){return b>=1073741824?(Math.round(b/107374182.4)/10)+' GB':b>=1048576?(Math.round(b/104857.6)/10)+' MB':Math.max(1,Math.round(b/1024))+' KB';}
function phMsg(text,bad){const el=gid('ph-msg');if(!el)return;el.textContent=text||'';el.style.display=text?'block':'none';el.className='ph-msg'+(bad?' bad':'');}
async function phDecode(file){
  if(window.createImageBitmap){try{return await createImageBitmap(file,{imageOrientation:'from-image'});}catch(e){}}
  return new Promise((res,rej)=>{const u=URL.createObjectURL(file),img=new Image();img.onload=()=>{URL.revokeObjectURL(u);res(img);};img.onerror=()=>{URL.revokeObjectURL(u);rej(new Error('decode'));};img.src=u;});
}
function phScale(src,max){
  const w=src.naturalWidth||src.width,h=src.naturalHeight||src.height,k=Math.min(1,max/Math.max(w,h));
  const c=document.createElement('canvas');c.width=Math.max(1,Math.round(w*k));c.height=Math.max(1,Math.round(h*k));
  c.getContext('2d').drawImage(src,0,0,c.width,c.height);
  return new Promise((res,rej)=>c.toBlob(b=>b?b.arrayBuffer().then(buf=>res({buf,w:c.width,h:c.height}),rej):rej(new Error('encode')),'image/jpeg',PH_Q));
}
async function phAdd(input){
  const files=[...(input.files||[])];input.value='';if(!files.length)return;
  phMsg('');
  if(!window.indexedDB){phMsg(t('ph_unavail'),true);return;}
  const free=await phEstimate();
  if(free!==null&&free<PH_LOW_MB*1048576&&!confirm(t('ph_low_confirm').replace('{free}',phMB(free))))return;
  let ok=0,failed=false,err=null;
  for(const f of files){
    try{
      let img;try{img=await phDecode(f);}catch(e){throw new Error('decode',{cause:e});}
      const full=await phScale(img,PH_MAX),th=await phScale(img,PH_THUMB);if(img.close)img.close();
      const now=new Date();
      const id=now.getTime().toString(36)+Math.random().toString(36).slice(2,7);
      await phTx(['photos','full'],'readwrite',tx=>{tx.objectStore('full').put(full.buf,id);tx.objectStore('photos').put({id,dk:dkey(now),at:now.toISOString(),w:full.w,h:full.h,bytes:full.buf.byteLength+th.buf.byteLength,thumb:th.buf});});
      ok++;
    }catch(e){failed=true;err=e;console.warn('[GainPath] photo not saved:',e&&(e.name+': '+e.message));break;}
  }
  PH_LIST=null;await renderPhotos();
  if(failed)phMsg((err&&err.name==='QuotaExceededError'?t('ph_err_full'):err&&err.message==='decode'?t('ph_err_read'):t('ph_err_save'))+(ok?' '+t('ph_saved_n').replace('{n}',ok):''),true);
  else phMsg(ok>1?t('ph_saved_n').replace('{n}',ok):t('ph_saved'));
}
async function renderPhotos(){
  const grid=gid('ph-grid');if(!grid)return;
  if(!window.indexedDB){grid.innerHTML='';gid('ph-usage').textContent='';phMsg(t('ph_unavail'),true);return;}
  let list;
  try{list=await phLoad();}catch(e){console.warn('[GainPath] photos not loaded:',e&&e.message);phMsg(t('ph_err_load'),true);return;}
  Object.values(PH_URLS).forEach(u=>URL.revokeObjectURL(u));PH_URLS={};
  const free=await phEstimate(),bytes=list.reduce((a,p)=>a+(p.bytes||0),0);
  gid('ph-usage').textContent=list.length?t('ph_usage').replace('{n}',list.length).replace('{size}',phMB(bytes))+(free!==null?' · '+t('ph_free').replace('{free}',phMB(free)):''):'';
  const low=gid('ph-low');low.style.display=free!==null&&free<PH_LOW_MB*1048576?'block':'none';
  if(free!==null)low.textContent=t('ph_low').replace('{free}',phMB(free));
  gid('ph-empty').style.display=list.length?'none':'block';
  grid.innerHTML=list.map(p=>{const u=PH_URLS[p.id]=URL.createObjectURL(phJpeg(p.thumb));return '<button type="button" class="ph-tile" onclick="openPhoto('+jsArg(p.id)+')" aria-label="'+esc(dayLabel(dkDay(p.dk),true))+'"><img src="'+u+'" alt=""><span>'+esc(dayLabel(dkDay(p.dk)))+'</span></button>';}).join('');
}
// The full image is read when the viewer opens, so Save already holds it.
async function openPhoto(id){
  const p=(PH_LIST||[]).find(x=>x.id===id);if(!p)return;
  let buf;try{buf=await phTx('full','readonly',tx=>idbReq(tx.objectStore('full').get(id)));}catch(e){buf=null;}
  if(!buf){phMsg(t('ph_err_load'),true);return;}
  closePhoto();const blob=phJpeg(buf);PH_VIEW={p,blob,url:URL.createObjectURL(blob)};
  gid('ph-view-img').src=PH_VIEW.url;gid('ph-view-date').textContent=dayLabel(dkDay(p.dk),true);
  gid('ph-view').style.display='flex';document.body.style.overflow='hidden';
}
function closePhoto(){if(!PH_VIEW)return;URL.revokeObjectURL(PH_VIEW.url);PH_VIEW=null;gid('ph-view').style.display='none';gid('ph-view-img').removeAttribute('src');document.body.style.overflow='';}
// The share sheet is how a web page reaches the photo library (iPhone: "Save
// Image"); it must start straight from the tap, so nothing is awaited first.
function savePhoto(){
  if(!PH_VIEW)return;
  const p=PH_VIEW.p,name='gainpath-'+p.dk+'.jpg',file=new File([PH_VIEW.blob],name,{type:'image/jpeg'});
  if(isMobileUA()&&navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
    const blob=PH_VIEW.blob;navigator.share({files:[file]}).catch(e=>{if(!e||e.name!=='AbortError')phDownload(blob,name);});
    return;
  }
  phDownload(PH_VIEW.blob,name);
}
function phDownload(blob,name){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
async function deletePhoto(){
  if(!PH_VIEW||!confirm(t('ph_del_confirm')))return;
  const id=PH_VIEW.p.id;
  try{await phTx(['photos','full'],'readwrite',tx=>{tx.objectStore('photos').delete(id);tx.objectStore('full').delete(id);});}catch(e){phMsg(t('ph_err_delete'),true);return;}
  closePhoto();PH_LIST=null;phMsg('');renderPhotos();
}
function photoClear(){
  if(!window.indexedDB)return Promise.resolve();
  if(PH){PH.close();PH=null;}PH_LIST=null;
  return new Promise(res=>{try{const r=window.indexedDB.deleteDatabase(PH_DB);r.onsuccess=r.onerror=r.onblocked=()=>res();}catch(e){res();}});
}
