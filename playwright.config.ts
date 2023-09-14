import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'dot',
	use: {
		trace: 'on-first-retry',
	},
	grep: process.env.TEST_IDS_TO_RUN ? getGrepRegExp(process.env.TEST_IDS_TO_RUN) : undefined,

	projects: [
		{
			name: 'baseSetup',
			testDir: './setup',
			testMatch: '**/*base.setup.ts',
		},
		{
			name: 'uiSetup',
			testDir: './setup',
			testMatch: '**/*uiSession.setup.ts',
			dependencies: ['baseSetup'],
		},
		{
			name: 'api',
			testDir: './tests/api',
			testMatch: '**.spec.ts',
			dependencies: ['baseSetup'],
			use: {
				trace: 'off',
				screenshot: 'off',
				video: 'off',
			},
		},
		{
			name: 'e2e',
			testDir: './tests/e2e',
			testMatch: '**.spec.ts',
			dependencies: ['uiSetup'],
			use: {
				actionTimeout: 0,
				trace: 'retain-on-failure',
				headless: true,
				storageState: 'storageState.json',
				screenshot: 'only-on-failure',
				viewport: {
					height: 1080,
					width: 1920,
				},
			},
		},
	],
});

function getGrepRegExp(input: string) {
	return input.split(',').map((pattern) => {
		const patternR = `\\\[${pattern.trim()}\\\]`;
		return new RegExp(patternR);
	});
}
