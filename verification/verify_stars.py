from playwright.sync_api import sync_playwright, expect
import time
import os

def test_stars(page):
    page.goto("http://localhost:3001")

    # Wait for the Mission Brief to appear, indicating app is loaded
    expect(page.get_by_text("Mission Brief")).to_be_visible()

    # Wait for canvas to render
    time.sleep(2)

    # Take screenshot
    os.makedirs("/app/verification", exist_ok=True)
    page.screenshot(path="/app/verification/stars_verification.png")
    print("Screenshot taken at /app/verification/stars_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_stars(page)
        finally:
            browser.close()
