// Shared Playwright entry point for every test script. Importing chromium /
// webkit from here instead of 'playwright' guarantees that no synthetic test
// run reaches production services: any context or page these browsers create
// answers requests to the analytics worker and EmailJS itself (204), so test
// events never land in the live counters or send real mail. A script can still
// add its own, later-registered route, which takes precedence.
import { chromium, webkit, devices } from 'playwright';

const isProductionService = (url) => {
  try {
    const h = new URL(url).hostname;
    return h.startsWith('gainpath-analytics') || h === 'api.emailjs.com';
  } catch { return false; }
};
const stub = (route) => route.fulfill({ status: 204, body: '' });
export const isolate = (context) => context.route(isProductionService, stub).then(() => context);

for (const type of [chromium, webkit]) {
  if (type.__isolated) continue;
  type.__isolated = true;
  const launch = type.launch.bind(type);
  type.launch = async (...args) => {
    const browser = await launch(...args);
    const newContext = browser.newContext.bind(browser);
    browser.newContext = async (...o) => isolate(await newContext(...o));
    // browser.newPage() makes a private context internally; make it ours instead.
    browser.newPage = async (...o) => (await browser.newContext(...o)).newPage();
    return browser;
  };
}

export { chromium, webkit, devices };
