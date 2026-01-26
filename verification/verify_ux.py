from playwright.sync_api import sync_playwright, expect

def verify_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the local dev server
        page.goto("http://localhost:3001")

        # Wait for the Mission Brief modal to appear
        expect(page.get_by_role("heading", name="Mission Brief")).to_be_visible()

        # Take a screenshot of the modal
        page.screenshot(path="verification/1_guide_modal.png")

        # Click ENGAGE to start game
        page.get_by_role("button", name="ENGAGE").click()

        # Wait a bit
        page.wait_for_timeout(1000)

        # Take a screenshot of the game active
        page.screenshot(path="verification/2_game_active.png")

        browser.close()

if __name__ == "__main__":
    verify_ux()
