import { test } from './fixtures';

test('Search admin users by Admin role', async ({ loginPage, adminPage, credentials }) => {
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);

  await adminPage.goto();
  await adminPage.filterByRole('Admin');
  await adminPage.search();
  await adminPage.verifyResultsFound();
});
