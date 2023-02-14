import puppeteer from 'puppeteer';
import { setTimeout } from 'timers/promises';

export async function getCimriPrice() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');

  await page.goto('https://www.cimri.com/islemci/en-ucuz-amd-ryzen-5-5600x-3-7-ghz-soket-am4-32-mb-cache-65-w-islemci-fiyatlari,670190923', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scr/cimri-screenshot1.png' });
  console.log('page loaded');

  let url = page.url();
  await setTimeout(250);

  let [price] = await page.evaluate(() => {
    let price = parseFloat(document.querySelectorAll('.dekHBg')[2].textContent.split(' ')[0].replaceAll('.', ''));
    return [price];
  })
  console.log('cimri price', price);

  await page.screenshot({ path: 'scr/cimri-screenshot4.png' });
  console.log('SUCCESS');

  await browser.close();
}
