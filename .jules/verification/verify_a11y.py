from playwright.sync_api import Page, expect, sync_playwright

def verify_accessibility_attributes(page: Page):
    # 1. Arrange: Go to the app
    page.goto("http://localhost:3000")

    # 2. Assert: Check Mission Brief Modal attributes
    mission_brief = page.get_by_role("dialog", name="Mission Brief")
    expect(mission_brief).to_be_visible()

    # Check if it has aria-labelledby pointing to the title
    title_id = mission_brief.get_attribute("aria-labelledby")
    assert title_id == "mission-brief-title"

    title = page.locator(f"#{title_id}")
    expect(title).to_have_text("Mission Brief")

    # 3. Act: Close the modal to see the canvas
    page.get_by_role("button", name="ENGAGE").click()

    # 4. Assert: Check Canvas attributes
    # The canvas should now be visible and have role="img"
    canvas = page.get_by_role("img", name="Space shooter game canvas")
    expect(canvas).to_be_visible()

    # 5. Screenshot
    page.screenshot(path=".jules/verification/a11y-verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_accessibility_attributes(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path=".jules/verification/failure.png")
            raise
        finally:
            browser.close()
