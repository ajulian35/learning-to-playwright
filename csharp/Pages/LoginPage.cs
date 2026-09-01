using Microsoft.Playwright;

namespace PlaywrightComparison.Pages;

public class LoginPage
{
    private readonly IPage _page;

    public LoginPage(IPage page) => _page = page;

    private ILocator UsernameInput => _page.GetByRole(AriaRole.Textbox, new() { Name = "Username" });
    private ILocator PasswordInput => _page.GetByRole(AriaRole.Textbox, new() { Name = "Password" });
    private ILocator LoginButton => _page.GetByRole(AriaRole.Button, new() { Name = "Login" });

    public async Task GotoAsync() =>
        await _page.GotoAsync("/web/index.php/auth/login");

    public async Task LoginAsync(string username, string password)
    {
        await UsernameInput.FillAsync(username);
        await PasswordInput.FillAsync(password);
        await LoginButton.ClickAsync();
    }
}
