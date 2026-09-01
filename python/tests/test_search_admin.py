from pages.login_page import LoginPage
from pages.admin_page import AdminPage


def test_search_admin_users_by_role(login_page: LoginPage, admin_page: AdminPage, credentials: dict):
    login_page.goto()
    login_page.login(credentials['username'], credentials['password'])

    admin_page.goto()
    admin_page.filter_by_role('Admin')
    admin_page.search()
    admin_page.verify_results_found()
