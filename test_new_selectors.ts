import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import { SessionManager } from './src/browser/sessionManager';

chromium.use(stealth());

async function run() {
    const sessionManager = new SessionManager();
    const session = await sessionManager.getSession();
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ userAgent: session.userAgent });
    
    if (session.cookies) {
        const cArr = session.cookies.split(';').map((c: string) => {
            const [name, ...rest] = c.split('=');
            return { name: name.trim(), value: rest.join('=').trim(), domain: '.renderz.app', path: '/' };
        });
        await context.addCookies(cArr);
    }
    
    const page = await context.newPage();
    console.log('Navigating to 30913679...');
    await page.goto('https://renderz.app/player/30913679', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
    
    const playstyles = await page.evaluate(() => {
        // The user's provided container class for a playstyle card
        const containers = document.querySelectorAll('.group.relative.flex.items-start.gap-3.overflow-hidden.rounded-lg');
        return Array.from(containers).map(el => {
            const nameEl = el.querySelector('.text-sm.leading-tight.font-semibold.text-white');
            const descEl = el.querySelector('.text-xs.leading-relaxed.text-muted-foreground');
            const levelEl = el.querySelector('.shrink-0.rounded-md.bg-primary\\/15');
            const imgEl = el.querySelector('img');
            
            return {
                name: nameEl?.textContent?.trim() || 'Unknown',
                description: descEl?.textContent?.trim() || '',
                level: levelEl?.textContent?.trim() || '1',
                icon: imgEl?.getAttribute('src') || ''
            };
        });
    });
    
    console.log('FOUND PLAYSTYLES:', JSON.stringify(playstyles, null, 2));
    
    await browser.close();
}

run().catch(console.error);
