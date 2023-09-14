import { test as setup, chromium } from '@playwright/test';

setup('UI setup', async ({}) => {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto('https://github.com/SemenSizov/playwright-grep', { waitUntil: 'networkidle' });
	await page.context().storageState({ path: 'storageState.json' });
	await browser.close();
});
