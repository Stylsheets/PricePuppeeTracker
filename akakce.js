import puppeteer from 'puppeteer';
import { setTimeout } from 'timers/promises';

export async function getAkakcePrice() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

  await page.goto('https://www.akakce.com/islemci/en-ucuz-amd-ryzen-5-5600x-alti-cekirdek-3-70-ghz-kutulu-fiyati,920045297.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scr/akakce-screenshot1.png' });
  console.log('page loaded');

  let url = page.url();
  await setTimeout(250);

  let [price] = await page.evaluate(() => {
    let price = parseFloat(document.querySelector('.pt_v8').textContent.split(' ')[1].replaceAll('.', ''));
    return [price];
  })
  console.log('akakce price', price);

  await page.screenshot({ path: 'scr/akakce-screenshot4.png' });
  console.log('SUCCESS');

  await browser.close();
}
