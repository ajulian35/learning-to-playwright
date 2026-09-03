using Microsoft.Playwright;

namespace PlaywrightComparison.Pages;

public class AdminPage
{
    private readonly IPage _page;
    private readonly ILocator _roleDropdown;
    private readonly ILocator _searchButton;
    private readonly ILocator _resultsContainer;

    public AdminPage(IPage page)
    {
        _page             = page;
        _roleDropdown     = page.Locator(".oxd-select-text--after").First;
        _searchButton     = page.GetByRole(AriaRole.Button, new() { Name = "Search" });
        _resultsContainer = page.Locator("#app");
    }

    public async Task GotoAsync() =>
        await _page.GetByRole(AriaRole.Link, new() { Name = "Admin" }).ClickAsync();

    public async Task FilterByRoleAsync(string role)
    {
        await _roleDropdown.ClickAsync();
        await _page.GetByRole(AriaRole.Option, new() { Name = role }).ClickAsync();
    }

    public async Task SearchAsync() =>
        await _searchButton.ClickAsync();

    public async Task VerifyResultsFoundAsync() =>
        await Assertions.Expect(_resultsContainer).ToContainTextAsync(new System.Text.RegularExpressions.Regex("Records? Found"));
}
