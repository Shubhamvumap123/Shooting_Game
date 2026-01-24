from playwright.sync_api import sync_playwright

def verify_stars():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3001")

            # Wait for canvas to be present
            page.wait_for_selector("canvas")

            # Wait for "ENGAGE" button to ensure app is loaded
            page.wait_for_selector("text=ENGAGE")

            # Take a screenshot
            page.screenshot(path="verification/stars_verification.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_stars()
