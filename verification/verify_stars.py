
from playwright.sync_api import sync_playwright

def verify_stars(page):
    page.goto("http://localhost:3000")
    # Wait for canvas to be present
    page.wait_for_selector("canvas")
    # Take a screenshot
    page.screenshot(path="verification/stars_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_stars(page)
        finally:
            browser.close()
