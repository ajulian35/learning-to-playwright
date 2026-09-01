using NUnit.Framework;
using PlaywrightComparison.Pages;

namespace PlaywrightComparison.Tests;

[TestFixture]
public class SearchAdminTests : BaseTest
{
    [Test]
    public async Task SearchAdminUsersByRole()
    {
        var loginPage = new LoginPage(Page);
        var adminPage = new AdminPage(Page);

        await loginPage.GotoAsync();
        await loginPage.LoginAsync(AdminUsername, AdminPassword);

        await adminPage.GotoAsync();
        await adminPage.FilterByRoleAsync("Admin");
        await adminPage.SearchAsync();
        await adminPage.VerifyResultsFoundAsync();
    }
}
