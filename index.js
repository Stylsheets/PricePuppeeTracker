import { getAkakcePrice } from './akakce.js';
import { getCimriPrice } from './cimri.js';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  getAkakcePrice();
  getCimriPrice();
}

main();
