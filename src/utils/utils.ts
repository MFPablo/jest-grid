/* eslint-disable no-await-in-loop */
require("dotenv").config();
import { Builder, By, WebDriver, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import "selenium-webdriver/chrome";

//HUB CONFIGURATION
const gridUrl = "http://localhost:30001/";

const defaultTimeout = 5000;
jest.setTimeout(60 * 60 * 1000);

export const createChrome = async () => {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments(
    // "--headless",
    "--disable-gpu",
    "--disable-sync",
    "--disable-dev-shm-usage",
    "--use-fake-device-for-media-stream",
    "--use-fake-ui-for-media-stream"
  );
  chromeOptions.setUserPreferences({
    "profile.managed_default_content_settings.notifications": 1,
  });

  return new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
};

export const createChromeGrid = async () => {
  const chromeOptions = new chrome.Options();

  const capabilities = {
    platform: "linux",
    browserName: "chrome",
    platformName: "linux",
    version: "111.0",
    network: true,
  };

  chromeOptions.addArguments(
    // "--window-size=1920,1080",
    // "--start-maximized",
    // "--headless",
    "--disable-gpu",
    "--disable-sync",
    "--disable-dev-shm-usage",
    "--use-fake-device-for-media-stream",
    "--use-fake-ui-for-media-stream"
  );
  chromeOptions.setUserPreferences({
    "profile.managed_default_content_settings.notifications": 1,
  });

  return new Builder()
    .usingServer(gridUrl)
    .withCapabilities(capabilities)
    .setChromeOptions(chromeOptions)
    .build();
};

export const get = async (
  driver: WebDriver,
  selector: string,
  timeout = defaultTimeout
) => {
  const el = await driver.wait(
    until.elementLocated(By.css(selector)),
    timeout || defaultTimeout
  );
  return driver.wait(until.elementIsVisible(el), timeout || defaultTimeout);
};

export const scroll = async (
  driver: WebDriver,
  selector: string,
  x: number,
  y: number
) => {
  await driver.executeScript(
    `document.querySelector("${selector}").scroll(${x || 0}, ${y || 0})`
  );
};

export const getScroll = async (driver: WebDriver, selector: string) =>
  driver.executeScript(
    `var c = document.querySelector("${selector}"); return {scrollLeft: c.scrollLeft, scrollTop: c.scrollTop}`
  );

export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const click = async (
  driver: WebDriver,
  selector: string,
  timeout = defaultTimeout
) => {
  const found = await get(driver, selector, timeout);
  await found.click();
};

export const getByXPath = async (
  driver: WebDriver,
  xpath: string,
  timeout = defaultTimeout
) =>
  driver.wait(until.elementLocated(By.xpath(xpath)), timeout || defaultTimeout);

export const getByText = async (
  driver: WebDriver,
  text: string,
  timeout = defaultTimeout
) => getByXPath(driver, `//*[normalize-space() = '${text}']`, timeout);

export const clickByText = async (
  driver: WebDriver,
  text: string,
  timeout = defaultTimeout
) => {
  const found = await getByText(driver, text, timeout);
  await found.click();
};

export const clickByXPath = async (
  driver: WebDriver,
  xpath: string,
  timeout = defaultTimeout
) => {
  const found = await getByXPath(driver, xpath, timeout);
  await found.click();
};

export const checkUrlChange = async (driver: WebDriver, url: string, timeout?: number): Promise<boolean> => {
  let c = 0;
  let t = timeout || 10;
  let result = false;
  try {
    const interval = setInterval(async () => {
      if (c < t) {
        if ((await driver.getCurrentUrl()).includes(url) != true) {
          result=true;
          await clearInterval(interval);
        }
        c++
      } else {
        await clearInterval(interval);
      }
    }, 1000)
  } catch {
  }
  return result;
}