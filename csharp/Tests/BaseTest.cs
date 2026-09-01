using DotNetEnv;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace PlaywrightComparison.Tests;

public abstract class BaseTest : PageTest
{
    protected string AdminUsername { get; private set; } = string.Empty;
    protected string AdminPassword { get; private set; } = string.Empty;

    [OneTimeSetUp]
    public void LoadEnv()
    {
        var envPath = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../../.env"));
        Env.Load(envPath);
        AdminUsername = RequireEnv("ADMIN_USERNAME");
        AdminPassword = RequireEnv("ADMIN_PASSWORD");
    }

    public override BrowserNewContextOptions ContextOptions() => new()
    {
        BaseURL = "https://opensource-demo.orangehrmlive.com",
    };

    private static string RequireEnv(string name) =>
        Environment.GetEnvironmentVariable(name)
        ?? throw new InvalidOperationException($"Required environment variable not defined: {name}");
}
