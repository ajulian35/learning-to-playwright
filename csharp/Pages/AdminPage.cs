using Microsoft.Playwright;

namespace PlaywrightComparison.Pages;

public class AdminPage
{
    private readonly IPage _page;

    public AdminPage(IPage page) => _page = page;

    private ILocator RoleDropdown => _page.Locator(".oxd-select-text--after").First;
    private ILocator SearchButton => _page.GetByRole(AriaRole.Button, new() { Name = "Search" });
    private ILocator ResultsContainer => _page.Locator("#app");

    public async Task GotoAsync() =>
        await _page.GetByRole(AriaRole.Link, new() { Name = "Admin" }).ClickAsync();

    public async Task FilterByRoleAsync(string role)
    {
        await RoleDropdown.ClickAsync();
        await _page.GetByRole(AriaRole.Option, new() { Name = role }).ClickAsync();
    }

    public async Task SearchAsync() =>
        await SearchButton.ClickAsync();

    public async Task VerifyResultsFoundAsync() =>
        await Assertions.Expect(ResultsContainer).ToContainTextAsync(new System.Text.RegularExpressions.Regex("Records? Found"));
}
