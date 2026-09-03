using Microsoft.Playwright;

namespace PlaywrightComparison.Pages;

public class LoginPage
{
    private readonly IPage _page;
    private readonly ILocator _usernameInput;
    private readonly ILocator _passwordInput;
    private readonly ILocator _loginButton;

    public LoginPage(IPage page)
    {
        _page          = page;
        _usernameInput = page.GetByRole(AriaRole.Textbox, new() { Name = "Username" });
        _passwordInput = page.GetByRole(AriaRole.Textbox, new() { Name = "Password" });
        _loginButton   = page.GetByRole(AriaRole.Button,  new() { Name = "Login" });
    }

    public async Task GotoAsync() =>
        await _page.GotoAsync("/web/index.php/auth/login");

    public async Task LoginAsync(string username, string password)
    {
        await _usernameInput.FillAsync(username);
        await _passwordInput.FillAsync(password);
        await _loginButton.ClickAsync();
    }
}
