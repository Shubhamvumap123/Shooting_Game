from playwright.sync_api import sync_playwright

def verify_keys(page):
    page.goto("http://localhost:3000")

    # Wait for the mission brief modal
    page.wait_for_selector('text="Mission Brief"')

    # Take a screenshot of the Mission Brief
    page.screenshot(path="verification/mission_brief_keys.png")

    # Verify some keys exist
    # Since we replaced text with visual keys, we can check for the element or just rely on the screenshot
    # But let's check if the text "W" exists (it's inside the key)
    assert page.get_by_text("W", exact=True).is_visible()

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_keys(page)
        except Exception as e:
            print(e)
        finally:
            browser.close()
