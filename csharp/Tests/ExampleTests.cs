using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightComparison.Tests;

[TestFixture]
public class ExampleTests : PageTest
{
    [Test]
    public async Task TituloPagina()
    {
        await Page.GotoAsync("https://playwright.dev");
        await Expect(Page).ToHaveTitleAsync(new System.Text.RegularExpressions.Regex("Playwright"));
    }

    [Test]
    public async Task NavegarDocs()
    {
        await Page.GotoAsync("https://playwright.dev");
        await Page.GetByRole(AriaRole.Link, new() { Name = "Docs" }).First.ClickAsync();
        Assert.That(Page.Url, Does.Not.EqualTo("https://playwright.dev"));
    }
}
