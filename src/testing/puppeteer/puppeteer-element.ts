import * as pd from './puppeteer-declarations';
import * as puppeteer from 'puppeteer';
import { MockElement } from '../mock-doc/node';
import { parseFragment } from '../parse-html';


export class E2EElement extends MockElement implements pd.E2EElementInternal {

  constructor(private page: pd.E2EPageInternal, private selector: string) {
    super(null, null);
    page.e2eElements.push(this);
  }

  async getProperty(propertyName: string) {
    return this.page.$eval(this.selector, (elm: any, propertyName: string) => {
      return elm[propertyName];
    }, propertyName);
  }

  async setProperty(propertyName: string, value: any) {
    return this.page.$eval(this.selector, (elm: any, propertyName: string, value: any) => {
      elm[propertyName] = value;
    }, propertyName, value);
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
      this._e2eHandle = await this.page.$(this.selector);
    }
    return this._e2eHandle;
  }

  async e2eUpdate() {
    const outerHTML = await this.page.$eval(this.selector, (elm) => {
      return elm.outerHTML;
    });

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

      const index = this.page.e2eElements.indexOf(this);
      if (index > -1) {
        this.page.e2eElements.splice(index, 1);
      }
    }
    this.page = null;
  }

}


export async function getE2EElement(page: pd.E2EPageInternal, lightDomSelector: string) {
  const elm = new E2EElement(page, lightDomSelector);

  await elm.e2eUpdate();

  return elm;
}


export class E2EFindElement2 {
  handlePromise: Promise<puppeteer.ElementHandle>;

  constructor(private page: pd.E2EPage, lightDomSelector: string) {
    this.handlePromise = page.$(lightDomSelector);
  }

  findInShadow(shadowRootSelector: string) {
    return new ShadowDomElementUtils(this.page, this.handlePromise, shadowRootSelector);
  }

  // async getProperty(propName: string) {
  //   return this.page.evaluate((elm: any, propName: string) => {
  //     return elm[propName];
  //   }, await this.handlePromise, propName);
  // }

  // async setProperty(propName: string, propValue: any) {
  //   return this.page.evaluate((elm: any, propName: string, propValue: any) => {
  //     elm[propName] = propValue;
  //   }, await this.handlePromise, propName, propValue);
  // }

  // async setProperties(props: {[propName: string]: any }) {
  //   return this.page.evaluate((elm: any, props: {[propName: string]: any }) => {
  //     Object.keys(props).forEach(propName => {
  //       elm[propName] = props[propName];
  //     });
  //   }, await this.handlePromise, props);
  // }

  // async getAttribute(attrName: string) {
  //   return this.page.evaluate((elm: HTMLElement, attrName: string) => {
  //     return elm.getAttribute(attrName);
  //   }, await this.handlePromise, attrName);
  // }

  // async getAttributes() {
  //   return this.page.evaluate((elm: HTMLElement) => {
  //     const rtn: {[attrName: string]: any } = {};

  //     for (let i = 0; i < elm.attributes.length; i++) {
  //       const attr = elm.attributes.item(i);
  //       rtn[attr.name] = attr.nodeValue;
  //     }

  //     return rtn;
  //   }, await this.handlePromise);
  // }

  // async setAttribute(attrName: string, attrValue: string) {
  //   return this.page.evaluate((elm: HTMLElement, attrName: string, attrValue: string) => {
  //     elm.setAttribute(attrName, attrValue);
  //   }, await this.handlePromise, attrName, attrValue);
  // }

  // async setAttributes(attrs: {[attrName: string]: any }) {
  //   return this.page.evaluate((elm: HTMLElement, attrs: {[attrName: string]: any }) => {
  //     Object.keys(attrs).forEach(attrName => {
  //       elm.setAttribute(attrName, attrs[attrName]);
  //     });
  //   }, await this.handlePromise, attrs);
  // }

  // async removeAttribute(attrName: string) {
  //   return this.page.evaluate((elm: HTMLElement, attrName: string) => {
  //     elm.removeAttribute(attrName);
  //   }, await this.handlePromise, attrName);
  // }

  // async removeAttributes(attrs: string[]) {
  //   return this.page.evaluate((elm: HTMLElement, attrs: string[]) => {
  //     attrs.forEach(attrName => {
  //       elm.removeAttribute(attrName);
  //     });
  //   }, await this.handlePromise, attrs);
  // }

  // async hasAttribute(attrName: string) {
  //   return this.page.evaluate((elm: HTMLElement, attrName: string) => {
  //     return elm.hasAttribute(attrName);
  //   }, await this.handlePromise, attrName);
  // }

  // async getClasses() {
  //   return this.page.evaluate((elm: HTMLElement) => {
  //     const classes: string[] = [];
  //     for (let i = 0; i < elm.classList.length; i++) {
  //       classes.push(elm.classList.item(i));
  //     }
  //     return classes;
  //   }, await this.handlePromise);
  // }

  // async setClasses(classes: string[]) {
  //   return this.page.evaluate((elm: HTMLElement, classes: string[]) => {
  //     for (let i = 0; i < elm.classList.length; i++) {
  //       const className = elm.classList.item(i);
  //       if (!classes.includes(className)) {
  //         elm.classList.remove(className);
  //       }
  //     }
  //     classes.forEach(className => {
  //       elm.classList.add(className);
  //     });
  //   }, await this.handlePromise, classes);
  // }

  // async addClass(...classNames: string[]) {
  //   return this.page.evaluate((elm: HTMLElement, ...classNames: string[]) => {
  //     classNames.forEach(className => {
  //       elm.classList.add(className);
  //     });
  //   }, await this.handlePromise, classNames);
  // }

  // async removeClass(...classNames: string[]) {
  //   return this.page.evaluate((elm: HTMLElement, ...classNames: string[]) => {
  //     classNames.forEach(className => {
  //       elm.classList.remove(className);
  //     });
  //   }, await this.handlePromise, classNames);
  // }

  // async hasClass(className: string) {
  //   return this.page.evaluate((elm: HTMLElement, className: string) => {
  //     return elm.classList.contains(className);
  //   }, await this.handlePromise, className);
  // }

  // async getHtml() {
  //   return this.page.evaluate((elm: HTMLElement) => {
  //     return elm.innerHTML;
  //   }, await this.handlePromise);
  // }

  // async setHtml(innerHTML: string) {
  //   return this.page.evaluate((elm: HTMLElement, innerHTML: string) => {
  //     elm.innerHTML = innerHTML;
  //   }, await this.handlePromise, innerHTML);
  // }

  // async getText() {
  //   return this.page.evaluate((elm: HTMLElement) => {
  //     return elm.textContent;
  //   }, await this.handlePromise);
  // }

  // async setText(textContent: string) {
  //   return this.page.evaluate((elm: HTMLElement, textContent: string) => {
  //     elm.textContent = textContent;
  //   }, await this.handlePromise, textContent);
  // }

}


export class ShadowDomElementUtils {

  constructor(private page: pd.E2EPage, private handlePromise: Promise<puppeteer.ElementHandle>, private shadowRootSelector: string) {
  }

  async getProperty(propName: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, propName: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }
      return elm[propName];
    }, await this.handlePromise, this.shadowRootSelector, propName);
  }

  async setProperty(propName: string, propValue: any) {
    return this.page.evaluate((hostElm, shadowRootSelector, propName: string, propValue: any) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (elm) {
        elm[propName] = propValue;
      }
    }, await this.handlePromise, this.shadowRootSelector, propName, propValue);
  }

  async setProperties(props: {[attrName: string]: any }) {
    return this.page.evaluate((hostElm, shadowRootSelector, props: {[attrName: string]: any }) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return;
      }

      Object.keys(props).forEach(propName => {
        elm[propName] = props[propName];
      });
    }, await this.handlePromise, this.shadowRootSelector, props);
  }

  async getAttribute(attrName: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, attrName: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }
      return elm.getAttribute(attrName);
    }, await this.handlePromise, this.shadowRootSelector, attrName);
  }

  async getAttributes() {
    return this.page.evaluate((hostElm: HTMLElement, shadowRootSelector) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }

      const rtn: {[attrName: string]: any } = {};

      for (let i = 0; i < elm.attributes.length; i++) {
        const attr = elm.attributes.item(i);
        rtn[attr.name] = attr.nodeValue;
      }

      return rtn;
    }, await this.handlePromise, this.shadowRootSelector);
  }

  async setAttribute(attrName: string, attrValue: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, attrName: string, attrValue: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (elm) {
        elm.setAttribute(attrName, attrValue);
      }
    }, await this.handlePromise, this.shadowRootSelector, attrName, attrValue);
  }

  async setAttributes(attrs: {[attrName: string]: any }) {
    return this.page.evaluate((hostElm, shadowRootSelector, attrs: {[attrName: string]: any }) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return;
      }

      Object.keys(attrs).forEach(attrName => {
        elm.setAttribute(attrName, attrs[attrName]);
      });
    }, await this.handlePromise, this.shadowRootSelector, attrs);
  }

  async removeAttribute(attrName: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, attrName: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (elm) {
        elm.removeAttribute(attrName);
      }
    }, await this.handlePromise, this.shadowRootSelector, attrName);
  }

  async removeAttributes(attrs: string[]) {
    return this.page.evaluate((hostElm, shadowRootSelector, attrs: string[]) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (elm) {
        attrs.forEach(attrName => {
          elm.removeAttribute(attrName);
        });
      }
    }, await this.handlePromise, this.shadowRootSelector, attrs);
  }

  async hasAttribute(attrName: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, attrName: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }

      return elm.hasAttribute(attrName);
    }, await this.handlePromise, this.shadowRootSelector, attrName);
  }

  async getClasses() {
    return this.page.evaluate((hostElm, shadowRootSelector) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }

      const classes: string[] = [];
      for (let i = 0; i < elm.classList.length; i++) {
        classes.push(elm.classList.item(i));
      }

      return classes;
    }, await this.handlePromise, this.shadowRootSelector);
  }

  async setClasses(classes: string[]) {
    return this.page.evaluate((hostElm, shadowRootSelector, classes: string[]) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return;
      }

      for (let i = 0; i < elm.classList.length; i++) {
        const className = elm.classList.item(i);
        if (!classes.includes(className)) {
          elm.classList.remove(className);
        }
      }

      classes.forEach(className => {
        elm.classList.add(className);
      });
    }, await this.handlePromise, this.shadowRootSelector, classes);
  }

  async addClass(...classNames: string[]) {
    return this.page.evaluate((hostElm, shadowRootSelector, ...classNames: string[]) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return;
      }

      classNames.forEach(className => {
        elm.classList.add(className);
      });
    }, await this.handlePromise, this.shadowRootSelector, classNames);
  }

  async removeClass(...classNames: string[]) {
    return this.page.evaluate((hostElm, shadowRootSelector, ...classNames: string[]) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return;
      }

      classNames.forEach(className => {
        elm.classList.remove(className);
      });
    }, await this.handlePromise, this.shadowRootSelector, classNames);
  }

  async hasClass(className: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, className: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }

      return elm.classList.contains(className);
    }, await this.handlePromise, this.shadowRootSelector, className);
  }

  async getHtml() {
    return this.page.evaluate((hostElm, shadowRootSelector) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }

      return elm.innerHTML;
    }, await this.handlePromise, this.shadowRootSelector);
  }

  async setHtml(innerHTML: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, innerHTML: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return;
      }

      elm.innerHTML = innerHTML;
    }, await this.handlePromise, this.shadowRootSelector, innerHTML);
  }

  async getText() {
    return this.page.evaluate((hostElm, shadowRootSelector) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return null;
      }

      return elm.textContent;
    }, await this.handlePromise, this.shadowRootSelector);
  }

  async setText(textContent: string) {
    return this.page.evaluate((hostElm, shadowRootSelector, textContent: string) => {
      const elm = shadowRootSelector ? hostElm.shadowRoot.querySelector(shadowRootSelector) : hostElm.shadowRoot;
      if (!elm) {
        return;
      }

      elm.textContent = textContent;
    }, await this.handlePromise, this.shadowRootSelector, textContent);
  }

}
