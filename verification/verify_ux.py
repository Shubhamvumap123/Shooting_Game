
from playwright.sync_api import sync_playwright

def verify_ux(page):
    page.goto('http://localhost:3000')

    # Wait for the guide modal
    page.wait_for_selector('div[role="dialog"]')

    # Take screenshot of the initial modal
    page.screenshot(path='verification/1_guide_modal.png')

    # Check for aria attributes on the modal
    modal = page.locator('div[role="dialog"]')
    print('Modal role:', modal.get_attribute('role'))
    print('Modal aria-modal:', modal.get_attribute('aria-modal'))
    print('Modal aria-labelledby:', modal.get_attribute('aria-labelledby'))

    # Check button contrast/class
    button = page.get_by_text('Start Game')
    print('Button class:', button.get_attribute('class'))

    # Click start
    button.click()

    # Wait for game canvas
    page.wait_for_selector('canvas[role="img"]')

    # Check canvas attributes
    canvas = page.locator('canvas')
    print('Canvas role:', canvas.get_attribute('role'))
    print('Canvas aria-label:', canvas.get_attribute('aria-label'))

    # Screenshot game area
    page.screenshot(path='verification/2_game_active.png')

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
        verify_ux(page)
    except Exception as e:
        print(f'Error: {e}')
    finally:
        browser.close()
