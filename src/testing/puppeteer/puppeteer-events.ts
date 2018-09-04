import * as d from '../../declarations';
import * as pd from './puppeteer-declarations';


export async function initE2EPageEvents(page: pd.E2EPageInternal) {
  page._events = [];
  page._eventIds = 0;

  await page.exposeFunction('stencilOnEvent', (browserEvent: pd.BrowserContextEvent) => {
    // NODE CONTEXT
    nodeContextEvents(page._events, browserEvent);
  });

  await page.evaluateOnNewDocument(browserContextEvents);

  page.spyOnEvent = pageSpyOnEvent.bind(page, page);
}


async function pageSpyOnEvent(page: pd.E2EPageInternal, eventName: string, selector: 'window' | 'document') {
  const eventSpy: d.EventSpy = {
    eventName: eventName,
    events: [],
    isEventSpy: true
  };

  if (selector !== 'document') {
    selector = 'window';
  }

  await addE2EListener(page, selector, eventName, (ev: any) => {
    eventSpy.events.push(ev);
  });

  return eventSpy;
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
