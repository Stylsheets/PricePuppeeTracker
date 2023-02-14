import puppeteer from 'puppeteer';
import { setTimeout } from 'timers/promises';

export async function getCimriPrice(url) {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable' // Linux
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scr/cimri-screenshot1.png' });

  await setTimeout(250);

  await page.waitForSelector('.s1wl91l5-4.cBVHJG');

  let [price] = await page.evaluate(() => {
    let price = parseFloat(document.querySelector('.s1wl91l5-4.cBVHJG').textContent.split(' ')[0].replaceAll('.', '').replaceAll(',', '.'));
    return [price];
  })

  await page.screenshot({ path: 'scr/cimri-screenshot4.png' });

  await browser.close();
  return { price };
}

export default getCimriPrice;
