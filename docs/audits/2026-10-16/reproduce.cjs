// Audit probes: run real functions in isolated memory; no browser/user data/network.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path'),root=path.resolve(__dirname,'../../..');
const source=f=>fs.readFileSync(path.join(root,f),'utf8');
const alert={style:{},innerHTML:''},disk=new Map();
const c=vm.createContext({console,CFG:{},ST:{history:[{day:'push'}],prs:{},mw:{},bw:[]},gid:()=>alert,localStorage:{setItem(k,v){if(k==='gp_h')throw Error('quota');disk.set(k,v);},removeItem(k){disk.delete(k);}},window:{}});
vm.runInContext(source('js/storage.js'),c);
vm.runInContext('saveData()',c);assert.equal(vm.runInContext('SAVE_FAILED',c),true);
vm.runInContext('saveCFG()',c);assert.equal(vm.runInContext('SAVE_FAILED',c),false);
assert.equal(disk.has('gp_h'),false);console.log('REPRODUCED: saveCFG clears warning while history remains unsaved');
const d=vm.createContext({console});vm.runInContext(source('js/data-safety.js'),d);
assert.equal(vm.runInContext('validateBackup({cfg:{customProgram:{days:null}},history:[{exercises:"invalid"}]}).history[0].exercises',d),'invalid');
console.log('REPRODUCED: backup validation accepts malformed nested data');
const l=vm.createContext({console,document:{addEventListener(){}},localStorage:{getItem(k){return {gp_cfg:'{"setup":true}',gp_h:'{broken',gp_bw:'[{"w":75}]'}[k]||null;}}});
vm.runInContext(source('js/state.js'),l);vm.runInContext('load()',l);
assert.equal(vm.runInContext('CFG.setup',l),true);assert.equal(vm.runInContext('ST.history.length',l),0);assert.equal(vm.runInContext('ST.bw.length',l),0);
console.log('REPRODUCED: malformed gp_h silently aborts remaining loads and leaves empty history/bodyweight in memory');
// Inspect reset's database transaction through the actual function.
let cleared=[];const r=vm.createContext({console,window:{}});vm.runInContext(source('js/storage.js'),r);
r.capture=s=>cleared.push(...s);vm.runInContext('IDB={};idbTx=async(stores)=>capture(stores)',r);
(async()=>{await vm.runInContext('idbClear()',r);assert.deepEqual(cleared,['kv','meta']);console.log('REPRODUCED: idbClear leaves backups store untouched');})();
