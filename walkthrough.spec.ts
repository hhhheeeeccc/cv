import { test, expect } from '@playwright/test';

test('CV Builder Walkthrough', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.setViewportSize({ width: 1280, height: 1000 });

  // 1. Initial State (English)
  await page.waitForSelector('text=CV Builder');
  await page.screenshot({ path: 'frame_01_initial.png' });

  // 2. Fill Personal Info
  await page.click('button:has-text("Personal")');
  await page.fill('input[placeholder="Full Name"]', 'JULES SENIOR ARCHITECT');
  await page.fill('input[placeholder="Professional Title"]', 'Full Stack Expert');
  await page.fill('textarea', 'Clean Code Specialist.');
  await page.screenshot({ path: 'frame_02_personal_info.png' });

  // 3. Add a Skill
  await page.click('button:has-text("Skills")');
  await page.fill('input[placeholder*="React"]', 'TypeScript');
  await page.press('input[placeholder*="React"]', 'Enter');
  await page.fill('input[placeholder*="React"]', 'React');
  await page.press('input[placeholder*="React"]', 'Enter');
  await page.screenshot({ path: 'frame_03_skills.png' });

  // 4. Switch to Arabic (Testing RTL)
  await page.click('button:has-text("العربية")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'frame_04_arabic_rtl.png' });

  // 5. Modern Template in Arabic
  await page.click('button:has-text("القوالب")');
  await page.click('button:has-text("عصري")');
  await page.screenshot({ path: 'frame_05_arabic_modern.png' });

  // 6. Classic Template in Arabic
  await page.click('button:has-text("كلاسيكي")');
  await page.screenshot({ path: 'frame_06_arabic_classic.png' });

  // 7. Show Export Buttons
  await page.screenshot({ path: 'frame_07_final.png' });

  console.log('Walkthrough screenshots captured.');
});
