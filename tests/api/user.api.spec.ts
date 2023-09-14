import test, { expect } from '@playwright/test';

test.describe('My test [123]', async () => {
	test('User one [124]', () => {
		expect(true).toBeTruthy();
	});

	test('User two [125]', () => {
		expect(true).toBeTruthy();
	});

	test('User three [126]', () => {
		expect(true).toBeTruthy();
	});
});
