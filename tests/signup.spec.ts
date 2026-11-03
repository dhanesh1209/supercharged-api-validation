import { test, expect } from '@playwright/test';

test('API rejects a bad email even if the form would have blocked it', async ({ request }) => {
  const response = await request.post('/api/signup', {
    data: { email: 'not-an-email' },
  });
  expect(response.status()).toBe(400);
});
