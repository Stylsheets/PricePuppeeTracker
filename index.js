import { Client, Events, GatewayIntentBits } from "discord.js";

import { getAkakcePrice } from "./akakce.js";
import { getCimriPrice } from "./cimri.js";
import items from "./items.json" assert { type: "json" };
import dotenv from "dotenv";
import fs from 'fs/promises';
dotenv.config();

const itemsFile = './items.json';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);

async function main() {
  client.on("ready", async () => {
    const items = await getLowestPriceOfAllItems();
    await fs.writeFile(itemsFile, JSON.stringify(items));
    setInterval(async () => {
      const items = await getLowestPriceOfAllItems();
      await fs.writeFile(itemsFile, JSON.stringify(items));
    }, 1000 * 3600);
  });
}

async function getLowestPriceOfAllItems() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`Checking ${item.name}`);
    let price = await getLowestPrice(item).catch(console.log);
    console.log(`Price of ${item.name} is ${price} TL`);

    // if (item.price < item.lowestPrice) {
    //   item.lowestPrice = item.price;
    //   client.channels.fetch(process.env.CHANNEL_ID).then(channel => {
    //     channel.send(`<@319141014755475467> ${item.name} is now ${price} TL`);
    //   });
    // } else {
    //   client.channels.fetch(process.env.CHANNEL_ID).then(channel => {
    //     channel.send(`${item.name} is now ${price} TL`);
    //   });
    // }
    if (price != item.price) {
      item.price = price == 0 ? item.price : price;
      item.lowestPrice = price < item.lowestPrice ? price : item.lowestPrice;
      client.channels.fetch(process.env.CHANNEL_ID).then(channel => {
        channel.send(`<@319141014755475467> lowest price of ${item.name} is now ${item.lowestPrice} and current price is ${price} TL`);
      });
    }
  }
  return items;
}

async function getLowestPrice(item) {
  const { price: akakcePrice } = await getAkakcePrice(item.akakce);
  const { price: cimriPrice } = await getCimriPrice(item.cimri);

  if (isNaN(akakcePrice) || isNaN(cimriPrice)) {
    throw Error('At least one of the prices is null!');
  }

  // Select the lowest
  return Math.min(akakcePrice, cimriPrice);
}

main();
