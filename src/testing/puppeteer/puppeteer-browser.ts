import * as d from '../../declarations';
import * as puppeteer from 'puppeteer';


export async function startPuppeteerBrowser(config: d.Config) {
  if (!config.flags.e2e) {
    return null;
  }

  // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false
  });

  const env: d.E2EProcessEnv = process.env;
  env.__STENCIL_BROWSER_WS_ENDPOINT__ = browser.wsEndpoint();

  config.logger.debug(`puppeteer browser wsEndpoint: ${env.__STENCIL_BROWSER_WS_ENDPOINT__}`);

  return browser;
}


export async function connectBrowser() {
  // the reason we're connecting to the browser from
  // a web socket is because jest probably has us
  // in a different thread, this is also why this
  // uses process.env for data
  const env: d.E2EProcessEnv = process.env;

  const wsEndpoint = env.__STENCIL_BROWSER_WS_ENDPOINT__;
  if (!wsEndpoint) {
    return null;
  }

  const connectOpts: puppeteer.ConnectOptions = {
    browserWSEndpoint: wsEndpoint,
    ignoreHTTPSErrors: true
  };

  return await puppeteer.connect(connectOpts);
}


export async function disconnectBrowser(browser: puppeteer.Browser, pages: puppeteer.Page[]) {
  if (Array.isArray(pages)) {
    await Promise.all(pages.map(closePage));
  }
  if (browser) {
    try {
      browser.disconnect();
    } catch (e) {}
  }
}


export function newBrowserPage(browser: puppeteer.Browser) {
  return browser.newPage();
}


export async function closePage(page: puppeteer.Page) {
  try {
    if (!page.isClosed()) {
      await page.close();
    }
  } catch (e) {}
}
