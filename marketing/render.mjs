// Renders a marketing HTML graphic to PNG: node marketing/render.mjs <name> <width> <height>
import {chromium} from 'playwright';
import {fileURLToPath} from 'node:url';
const [name,w,h]=process.argv.slice(2),dir=fileURLToPath(new URL('.',import.meta.url));
const b=await chromium.launch(),p=await b.newPage({viewport:{width:+w,height:+h}});
await p.goto('file://'+dir+name+'.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:dir+name+'.png'});await b.close();
