// Isolated browser audit, synthetic data only; all external requests blocked.
const {chromium}=require('playwright');
const {createServer}=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const root=path.resolve(__dirname,'../../..');
(async()=>{
 const server=createServer(async(req,res)=>{try{const p=path.join(root,decodeURIComponent(req.url.split('?')[0]));const data=await fs.readFile(p);res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.html')?'text/html':p.endsWith('.css')?'text/css':'application/octet-stream');res.end(data);}catch{res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
 browser=await chromium.launch();const context=await browser.newContext({serviceWorkers:'block'});
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 const page=await context.newPage();await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
 const result=await page.evaluate(()=>{
   CFG.startingWeights='manual';
   const put=name=>{ST.day='push';ST.exi=0;ST.sd=[{ex:{name,mg:'back',baseW:10,equip:'cable',custom:true,yt:'row'},sets:[{w:10,r:10,t:'x',done:false}],sugDone:true}];renderEx();};
   put("O'Brien row");const handler=document.querySelector('[aria-label="Exercise instructions"]').getAttribute('onclick');let invalid=false;try{new Function(handler);}catch{invalid=true;}
   put('<b id="audit-mark">Row</b>');const htmlInterpreted=!!document.querySelector('#ex-area b#audit-mark');
   ST.sd=[];ST.history=[];ST.badges={};ST.pendingRec={day:'push',dayName:'Push',date:'Oct 16, 2026',dk:'2026-10-16',mk:'2026-10',dur:'1:00',sets:0,exercises:[]};
   localStorage.setItem('gp_wip','{"synthetic":true}');
   const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='gp_h')throw new DOMException('audit','QuotaExceededError');return original.call(this,k,v);};
   submitFeel('good');Storage.prototype.setItem=original;
   return {apostropheBreaksInstructions:invalid,customNameInterpretedAsHTML:htmlInterpreted,failedFinish:{historyInMemory:ST.history.length,historyOnDisk:localStorage.getItem('gp_h'),recoveryOnDisk:localStorage.getItem('gp_wip'),saveAlert:SAVE_FAILED}};
 });
 console.log(JSON.stringify(result,null,2));
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
