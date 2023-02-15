import puppeteer from 'puppeteer';
import pupOpts from './pup-opts.js';
import { setTimeout } from 'timers/promises';

export async function getAkakcePrice(url) {
  const browser = await puppeteer.launch(pupOpts);
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scr/akakce-screenshot1.png' });

  await setTimeout(250);

  await page.waitForSelector('.pt_v8');

  let [price] = await page.evaluate(() => {
    let price = parseFloat(document.querySelector('.pt_v8').textContent.split(' ')[1].replaceAll('.', '').replaceAll(',', '.'));
    return [price];
  })

  await page.screenshot({ path: 'scr/akakce-screenshot4.png' });

  await browser.close();
  return { price };
}

export default getAkakcePrice;
