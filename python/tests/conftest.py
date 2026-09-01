import os
from pathlib import Path

import pytest
from dotenv import load_dotenv
from playwright.sync_api import Page

from pages.login_page import LoginPage
from pages.admin_page import AdminPage

load_dotenv(Path(__file__).parent.parent.parent / '.env')


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise EnvironmentError(f"Required environment variable not defined: {name}")
    return value


@pytest.fixture
def credentials() -> dict:
    return {
        'username': require_env('ADMIN_USERNAME'),
        'password': require_env('ADMIN_PASSWORD'),
    }


@pytest.fixture
def login_page(page: Page) -> LoginPage:
    return LoginPage(page)


@pytest.fixture
def admin_page(page: Page) -> AdminPage:
    return AdminPage(page)
