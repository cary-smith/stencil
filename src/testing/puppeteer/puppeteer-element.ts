import * as pd from './puppeteer-declarations';
import * as puppeteer from 'puppeteer';
import { MockElement } from '../mock-doc/node';
import { parseFragment } from '../parse-html';


export class E2EElement extends MockElement implements pd.E2EElementInternal {
  lightSelector: string;
  shadowSelector: string;
  queuedActions: ElementActions[] = [];

  constructor(private page: pd.E2EPageInternal, selector: string) {
    super(null, null);
    page._elements.push(this);

    const splt = selector.split('>>>');

    this.lightSelector = splt[0].trim();
    this.shadowSelector = (splt.length > 1 ? splt[1].trim() : null);
  }

  async getProperty(propertyName: string) {
    if (this.queuedActions.length) {
      throw new Error(`await page.waitForChanges() must be called before element.getProperty()`);
    }

    const propValue = await this.page.$eval(this.lightSelector, (elm: any, propertyName: string) => {
      return elm[propertyName];
    }, propertyName);

    return propValue;
  }

  setProperty(propertyName: string, value: any) {
    this.queuedActions.push({
      setPropertyName: propertyName,
      setPropertyValue: value
    });
  }

  triggerEvent(eventName: string, eventDetail?: any) {
    this.queuedActions.push({
      eventName: eventName,
      eventDetail: eventDetail
    });
  }

  async click(options?: puppeteer.ClickOptions) {
    const handle = await this.e2eHandle();
    return handle.click(options);
  }

  async focus() {
    const handle = await this.e2eHandle();
    return handle.focus();
  }

  async hover() {
    const handle = await this.e2eHandle();
    return handle.hover();
  }

  async isIntersectingViewport() {
    const handle = await this.e2eHandle();
    return handle.isIntersectingViewport();
  }

  async press(key: string, options?: { text?: string, delay?: number }) {
    const handle = await this.e2eHandle();
    return handle.press(key, options);
  }

  async tap() {
    const handle = await this.e2eHandle();
    return handle.tap();
  }

  async type(text: string, options?: { delay: number }) {
    const handle = await this.e2eHandle();
    return handle.type(text, options);
  }

  private _e2eHandle: puppeteer.ElementHandle;
  private async e2eHandle() {
    if (!this._e2eHandle) {
      this._e2eHandle = await this.page.$(this.lightSelector);
    }
    return this._e2eHandle;
  }

  async e2eRunActions() {
    if (this.queuedActions.length === 0) {
      return;
    }

    await this.page.$eval(this.lightSelector, (elm: HTMLElement, shadowSelector, queuedActions) => {
      let foundElm: HTMLElement;

      if (shadowSelector) {
        if (!elm.shadowRoot) {
          throw new Error(`shadow root not found for: ${elm.tagName.toLowerCase()}`);
        }

        foundElm = elm.shadowRoot.querySelector(shadowSelector);

        if (!foundElm) {
          throw new Error(`selector "${this.shadowSelector}" not found in shadow root of ${elm.tagName.toLowerCase()}`);
        }

      } else {
        foundElm = elm;
      }

      queuedActions.forEach(queuedAction => {
        if (queuedAction.setPropertyName) {
          (foundElm as any)[queuedAction.setPropertyName] = queuedAction.setPropertyValue;

        } else if (queuedAction.eventName) {
          const ev = new CustomEvent(queuedAction.eventName, queuedAction.eventDetail);
          foundElm.dispatchEvent(ev);
        }
      });

    }, this.shadowSelector, this.queuedActions);

    this.queuedActions.length = 0;
  }

  async e2eSync() {
    const outerHTML = await this.page.$eval(this.lightSelector, (elm: HTMLElement, shadowSelector) => {

      let foundElm: HTMLElement;

      if (shadowSelector) {
        if (!elm.shadowRoot) {
          throw new Error(`shadow root not found for: ${elm.tagName.toLowerCase()}`);
        }

        foundElm = elm.shadowRoot.querySelector(shadowSelector);

        if (!foundElm) {
          throw new Error(`selector "${this.shadowSelector}" not found in shadow root of ${elm.tagName.toLowerCase()}`);
        }

      } else {
        foundElm = elm;
      }

      return foundElm.outerHTML;

    }, this.shadowSelector, this.queuedActions);

    const frag = parseFragment(outerHTML);

    const rootElm = frag.firstElementChild;

    this.nodeName = rootElm.nodeName;
    this.attributes = rootElm.attributes.cloneAttributes();

    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      this.removeChild(this.childNodes[i]);
    }

    for (let i = 0; i < rootElm.childNodes.length; i++) {
      this.appendChild(rootElm.childNodes[i]);
    }
  }

  async e2eDispose() {
    if (this._e2eHandle) {
      await this._e2eHandle.dispose();
      this._e2eHandle = null;
    }

    const index = this.page._elements.indexOf(this);
    if (index > -1) {
      this.page._elements.splice(index, 1);
    }

    this.page = null;
  }

}


export async function getE2EElement(page: pd.E2EPageInternal, lightDomSelector: string) {
  const elm = new E2EElement(page, lightDomSelector);

  await elm.e2eSync();

  return elm;
}


interface ElementActions {
  eventName?: string;
  eventDetail?: any;
  setPropertyName?: string;
  setPropertyValue?: any;
}
