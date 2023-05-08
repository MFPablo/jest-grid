require("dotenv").config();
import { WebDriver } from "selenium-webdriver";
import { createChromeGrid } from "../utils/utils";


const MAX = 40;

let drivers: WebDriver[] = [];

beforeAll(async () => {
  drivers = await Promise.all(
    Array.from({ length: MAX }, () => createChromeGrid())
  );
});

afterAll(async () => {
  if (drivers) {
    await Promise.all(
      drivers.map(async (d) => {
        await d.quit();
      })
    );
  }
});

for (let i = 0; i < MAX; i++) {
  test.concurrent(`Signed ${i}`, async () => {
    await  drivers[i].get(`https://www.google.com.ar/`);
    await  drivers[i].sleep(15000);
  });
}

// for (let i = 0; i < MAX; i++) {
//   test.concurrent(`Stress ${i}`, async () => {
//     let count = 0;
//     do {
//       try {
//         await Signed(drivers[i],URL)
//       } catch {
//         console.log("Test Error");
//       }
//     } while (count < target)
//   });
// }
