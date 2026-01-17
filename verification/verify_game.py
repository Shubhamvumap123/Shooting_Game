from playwright.sync_api import sync_playwright
import time

def verify_game_render():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app (assuming it's running on port 3000)
        try:
            page.goto("http://localhost:3000")

            # Wait for the "ENGAGE" button to appear (Mission Brief)
            page.wait_for_selector("text=ENGAGE", timeout=10000)
            print("Mission Brief loaded.")

            # Click ENGAGE to start the game
            page.click("text=ENGAGE")

            # Wait a bit for game loop to run and render stars/bullets/targets
            time.sleep(2)

            # Take screenshot of the game in action
            page.screenshot(path="verification/game_verification.png")
            print("Screenshot taken at verification/game_verification.png")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="verification/error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_game_render()
