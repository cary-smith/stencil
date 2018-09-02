import * as d from '../../declarations';
import * as pd from './puppeteer-declarations';
import { getE2EElement } from './puppeteer-element';
import { initPageEvents } from './puppeteer-events';
import { initTestPageScreenshot } from './puppeteer-screenshot';
import * as puppeteer from 'puppeteer';
import { closePage } from './puppeteer-browser';


declare const global: d.JestEnvironmentGlobal;


export async function newE2EPage(opts: pd.NewE2EPageOptions = {}) {
  if (!global.__NEW_TEST_PAGE__) {
    throw new Error(`newE2EPage() is only available from E2E tests, and ran with the --e2e cmd line flag.`);
  }

  const page: pd.E2EPageInternal = await global.__NEW_TEST_PAGE__();

  page.e2eElements = [];

  await setPageEmulate(page);

  await page.setCacheEnabled(false);

  await initPageEvents(page);

  initTestPageScreenshot(page);

  page.find = async (lightDomSelector) => {
    return await getE2EElement(page, lightDomSelector);
  };

  page.waitForQueue = waitForQueue.bind(null, page);

  page.on('console', consoleMessage);
  page.on('pageerror', pageError);
  page.on('requestfailed', requestFailed);

  if (typeof opts.html === 'string') {
    await e2eSetContent(page, opts.html);

  } else if (typeof opts.url === 'string') {
    await e2eGoTo(page, opts.url);

  } else {
    page.e2eGoTo = e2eGoTo.bind(null, page);
    page.e2eSetContent = e2eSetContent.bind(null, page);
  }

  return page;
}


async function e2eGoTo(page: pd.E2EPage, url: string) {
  try {
    if (page.isClosed()) {
      console.error('e2eGoTo unavailable: page already closed');
      return;
    }
  } catch (e) {
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


async function e2eSetContent(page: pd.E2EPage, html: string) {
  try {
    if (page.isClosed()) {
      console.error('e2eSetContent unavailable: page already closed');
      return;
    }
  } catch (e) {
    return;
  }

  if (typeof html !== 'string') {
    console.error('invalid e2eSetContent() html');
    await closePage(page);
    return;
  }

  const loaderUrl = (process.env as d.E2EProcessEnv).__STENCIL_LOADER_URL__;
  if (typeof loaderUrl !== 'string') {
    console.error('invalid e2eSetContent() loader script url');
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
    console.error(`e2eSetContent: ${e}`);
    await closePage(page);
  }
}


async function setPageEmulate(page: pd.E2EPage) {
  try {
    if (page.isClosed()) {
      return;
    }
  } catch (e) {
    return;
  }

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


async function waitForQueue(page: pd.E2EPageInternal) {
  try {
    if (page.isClosed()) {
      return;
    }
  } catch (e) {
    return;
  }

  await updateE2EElements(page);

  await page.evaluate(() => {
    return new Promise(resolve => window.requestAnimationFrame(resolve));
  });
}


async function updateE2EElements(page: pd.E2EPageInternal) {
  await Promise.all(page.e2eElements.map(async elm => {
    await elm.e2eUpdate();
  }));
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
