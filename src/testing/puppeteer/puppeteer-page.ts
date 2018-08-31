import * as d from '../../declarations';
import * as pd from './puppeteer-declarations';
import { FindTestElement } from './puppeteer-utils';
import { initPageEvents } from './puppeteer-events';
import { initTestPageScreenshot } from './puppeteer-screenshot';
import * as puppeteer from 'puppeteer';
import { closePage } from './puppeteer-browser';


declare const global: d.JestEnvironmentGlobal;


export async function newTestPage(opts: pd.NewTestPageOptions = {}) {
  if (!global.__NEW_TEST_PAGE__) {
    console.error(`invalid jest environment for stencil puppeteer testing`);
    return null;
  }

  const page: pd.TestPage = await global.__NEW_TEST_PAGE__();

  await setPageEmulate(page);

  await page.setCacheEnabled(false);

  await initPageEvents(page);

  initTestPageScreenshot(page);

  page.find = (lightDomSelector) => new FindTestElement(page, lightDomSelector);

  page.waitForQueue = waitForQueue.bind(null, page);

  page.on('console', consoleMessage);
  page.on('pageerror', pageError);
  page.on('requestfailed', requestFailed);

  if (typeof opts.html === 'string') {
    await setTestContent(page, opts.html);

  } else if (typeof opts.url === 'string') {
    await gotoTest(page, opts.url);

  } else {
    page.gotoTest = gotoTest.bind(null, page);
    page.setTestContent = setTestContent.bind(null, page);
  }

  return page;
}


async function gotoTest(page: pd.TestPage, url: string) {
  if (page.isClosed()) {
    console.error('gotoTest unavailable: page already closed');
    return;
  }

  if (typeof url !== 'string') {
    console.error('invalid gotoTest() url');
    await closePage(page);
    return;
  }

  if (!url.startsWith('/')) {
    console.error('gotoTest() url must start with /');
    await closePage(page);
    return;
  }

  const browserUrl = (process.env as d.E2EProcessEnv).__STENCIL_BROWSER_URL__;
  if (typeof browserUrl !== 'string') {
    console.error('invalid gotoTest() browser url');
    await closePage(page);
    return;
  }

  // resolves once the stencil app has finished loading
  const appLoaded = page.waitForFunction('window.stencilAppLoaded');

  const fullUrl = browserUrl + url.substring(1);

  let timedOut = false;
  try {
    await page.goto(fullUrl, {
      waitUntil: 'load'
    });

    const tmr = setTimeout(async () => {
      timedOut = true;
      console.error(`App did not load in allowed time. Please ensure the url ${url} loads a stencil application.`);
      await closePage(page);
    }, 4500);

    await appLoaded;

    clearTimeout(tmr);

  } catch (e) {
    if (!timedOut) {
      console.error(`error goto: ${url}, ${e}`);
      await closePage(page);
    }
  }
}


async function setTestContent(page: pd.TestPage, html: string) {
  if (page.isClosed()) {
    console.error('setTestContent unavailable: page already closed');
    return;
  }

  if (typeof html !== 'string') {
    console.error('invalid setTestContent() html');
    await closePage(page);
    return;
  }

  const loaderUrl = (process.env as d.E2EProcessEnv).__STENCIL_LOADER_SCRIPT_URL__;
  if (typeof loaderUrl !== 'string') {
    console.error('invalid setTestContent() loader script url');
    await closePage(page);
    return;
  }

  const url = [
    `data:text/html;charset=UTF-8,`,
    `<script src="${loaderUrl}"></script>`,
    html
  ];

  try {
    // resolves once the stencil app has finished loading
    const appLoaded = page.waitForFunction('window.stencilAppLoaded');

    await page.goto(url.join(''), {
      waitUntil: 'load'
    });

    await appLoaded;

  } catch (e) {
    console.error(`setTestContent: ${e}`);
    await closePage(page);
  }
}


async function setPageEmulate(page: pd.TestPage) {
  try {
    if (page.isClosed()) {
      return;
    }
  } catch (e) {}

  const env = (process.env) as d.E2EProcessEnv;

  const emulateJsonContent = env.__STENCIL_EMULATE__;
  if (!emulateJsonContent) {
    return;
  }

  try {
    const screenshotEmulate = JSON.parse(emulateJsonContent) as d.ScreenshotEmulate;

    const emulateOptions: puppeteer.EmulateOptions = {
      viewport: {
        width: screenshotEmulate.width,
        height: screenshotEmulate.height,
        deviceScaleFactor: screenshotEmulate.deviceScaleFactor,
        isMobile: screenshotEmulate.isMobile,
        hasTouch: screenshotEmulate.hasTouch,
        isLandscape: screenshotEmulate.isLandscape
      },
      userAgent: screenshotEmulate.userAgent
    };

    await page.emulate(emulateOptions);

    if (screenshotEmulate.mediaType) {
      await page.emulateMedia(screenshotEmulate.mediaType);
    }

  } catch (e) {
    console.error('setPageEmulate', e);
    await closePage(page);
  }
}


async function waitForQueue(page: pd.TestPage) {
  try {
    if (page.isClosed()) {
      return;
    }
  } catch (e) {}

  await page.evaluate(() => {
    return new Promise(resolve => window.requestAnimationFrame(resolve));
  });
}


function consoleMessage(c: puppeteer.ConsoleMessage) {
  const type = c.type();
  if (typeof (console as any)[type] === 'function') {
    (console as any)[type](c.text());
  } else {
    console.log(type, c.text());
  }
}


function pageError(msg: string) {
  console.error('pageerror', msg);
}


function requestFailed(req: puppeteer.Request) {
  console.error('requestfailed', req.url());
}
