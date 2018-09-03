import * as pd from './puppeteer-declarations';


export async function initE2EPageEvents(page: pd.E2EPageInternal) {
  page._events = [];
  page._eventIds = 0;

  await page.exposeFunction('stencilOnEvent', (browserEvent: pd.BrowserContextEvent) => {
    // NODE CONTEXT
    nodeContextEvents(page._events, browserEvent);
  });

  page.waitForEvent = (selector, eventName, opts = {}) => {
    // NODE CONTEXT
    return waitForEvent(page, selector, eventName, opts);
  };

  await page.evaluateOnNewDocument(browserContextEvents);

  page.spyOnEvent = spyOnEvent.bind(page, page);

}


async function spyOnEvent(page: pd.E2EPageInternal, selector: string, eventName: string) {
  const mockFn = jest.fn();

  await addE2EListener(page, selector, eventName, (ev: CustomEvent) => {
    mockFn(ev.detail);
  });

  return mockFn;
}


export function waitForEvent(page: pd.E2EPageInternal, selector: string, eventName: string, opts: pd.WaitForEventOptions) {
  // NODE CONTEXT
  return new Promise<any>(async (resolve, reject) => {
    const timeout = (typeof opts.timeout === 'number' ? opts.timeout : 30000);

    const cancelRejectId = setTimeout(reject, timeout);

    addE2EListener(page, selector, eventName, resolve, cancelRejectId);
  });
}


export async function addE2EListener(page: pd.E2EPageInternal, selector: string, eventName: string, resolve: (ev: any) => void, cancelRejectId?: any) {
  // NODE CONTEXT
  const id = page._eventIds++;

  page._events.push({
    id: id,
    eventName: eventName,
    resolve: resolve,
    cancelRejectId: cancelRejectId
  });

  if (selector === 'window' || selector === 'document') {
    // add window or document event listener
    await page.evaluate((id, selector, eventName) => {
      // BROWSER CONTEXT
      (selector === 'document' ? document : window).addEventListener(eventName, (ev: any) => {
        (window as pd.BrowserWindow).stencilOnEvent({
          id: id,
          event: (window as pd.BrowserWindow).stencilSerializeEvent(ev)
        });
      });
    }, id, selector, eventName);

  } else {
    // add element event listener
    await page.$eval(selector, (elm: any, id, eventName) => {
      // BROWSER CONTEXT
      elm.addEventListener(eventName, (ev: any) => {
        (window as pd.BrowserWindow).stencilOnEvent({
          id: id,
          event: (window as pd.BrowserWindow).stencilSerializeEvent(ev)
        });
      });
    }, id, eventName);
  }
}


function nodeContextEvents(waitForEvents: pd.WaitForEvent[], browserEvent: pd.BrowserContextEvent) {
  // NODE CONTEXT
  const waitForEventData = waitForEvents.find(waitData => {
    return waitData.id === browserEvent.id;
  });

  if (waitForEventData) {
    if (waitForEventData.cancelRejectId != null) {
      clearTimeout(waitForEventData.cancelRejectId);
    }

    waitForEventData.resolve(browserEvent.event);
  }
}


function browserContextEvents() {
  // BROWSER CONTEXT

  window.addEventListener('appload', () => {
    // BROWSER CONTEXT
    (window as pd.BrowserWindow).stencilAppLoaded = true;
  });

  (window as pd.BrowserWindow).stencilSerializeEventTarget = (target: any) => {
    // BROWSER CONTEXT
    if (!target) {
      return null;
    }
    if (target === window) {
      return { serializedWindow: true };
    }
    if (target === document) {
      return { serializedDocument: true };
    }
    if (target.tagName) {
      return {
        tagName: target.tagName,
        serializedElement: true
      };
    }
    return null;
  };

  (window as pd.BrowserWindow).stencilSerializeEvent = (orgEv: any) => {
    // BROWSER CONTEXT
    return {
      bubbles: orgEv.bubbles,
      cancelBubble: orgEv.cancelBubble,
      cancelable: orgEv.cancelable,
      composed: orgEv.composed,
      currentTarget: (window as pd.BrowserWindow).stencilSerializeEventTarget(orgEv.currentTarget),
      defaultPrevented: orgEv.defaultPrevented,
      detail: orgEv.detail,
      eventPhase: orgEv.eventPhase,
      isTrusted: orgEv.isTrusted,
      returnValue: orgEv.returnValue,
      srcElement: (window as pd.BrowserWindow).stencilSerializeEventTarget(orgEv.srcElement),
      target: (window as pd.BrowserWindow).stencilSerializeEventTarget(orgEv.target),
      timeStamp: orgEv.timeStamp,
      type: orgEv.type
    };
  };
}
