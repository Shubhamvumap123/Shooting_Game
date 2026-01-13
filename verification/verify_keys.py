import time
from playwright.sync_api import sync_playwright

def verify_keys_style():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Go to app
            page.goto("http://localhost:3000")

            # Wait for Mission Brief modal to appear
            # It has a heading "Mission Brief"
            page.wait_for_selector("text=Mission Brief", state="visible")

            # Wait a bit for animations to settle
            time.sleep(1)

            # Take screenshot of the modal
            # We can find the modal container. It has aria-labelledby="mission-brief-title"
            modal = page.locator('[aria-labelledby="mission-brief-title"]')

            if modal.is_visible():
                modal.screenshot(path="verification/keys_style.png")
                print("Screenshot taken: verification/keys_style.png")
            else:
                # Fallback to full page if modal locator fails (shouldn't happen)
                page.screenshot(path="verification/full_page_fallback.png")
                print("Modal not found, full page screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_keys_style()
