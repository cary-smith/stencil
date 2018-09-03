import * as d from '../../declarations';
import * as puppeteer from 'puppeteer';


export interface NewE2EPageOptions {
  url?: string;
  html?: string;
}


type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type PuppeteerPage = Omit<puppeteer.Page,
'bringToFront' | 'browser' | 'screenshot' | 'close' | 'emulate' | 'emulateMedia' | 'frames' | 'goBack' | 'goForward' | 'isClosed' | 'mainFrame' | 'pdf' | 'reload' | 'target' | 'title' | 'url' | 'viewport' | 'waitForNavigation' | 'screenshot' | 'workers'
>;

export interface E2EPage extends PuppeteerPage {
  /**
   * Testing query for one element. Uses queryselector() to
   * find the first element that matches the selector
   * within the e2e page's light dom.
   * @param lightDomSelector Light Dom querySelector
   */
  find(lightDomSelector: string): Promise<E2EElement>;

  goTo(url: string, options?: Partial<puppeteer.NavigationOptions>): Promise<puppeteer.Response | null>;

  screenshot(uniqueDescription: string, opts?: d.E2EScreenshotOptions): Promise<void>;

  setContent(html: string): Promise<void>;

  waitForChanges(): Promise<void>;

  waitForEvent(selector: 'window' | 'document' | string, eventName: string, opts?: WaitForEventOptions): Promise<CustomEvent>;
}


export interface E2EPageInternal extends E2EPage {
  isClosed(): boolean;
  _elements: E2EElementInternal[];
  _goto(url: string, options?: Partial<puppeteer.NavigationOptions>): Promise<puppeteer.Response | null>;
  _screenshot(options?: puppeteer.ScreenshotOptions): Promise<Buffer>;
}


export interface E2EElementInternal extends E2EElement {
  e2eRunActions(): Promise<void>;
  e2eSync(): Promise<void>;
}


export interface E2EElement {
  getProperty(propertyName: string): Promise<any>;

  setProperty(propertyName: string, value: any): void;

  click(options?: puppeteer.ClickOptions): void;

  focus(): Promise<void>;

  hover(): Promise<void>;

  isIntersectingViewport(): Promise<boolean>;

  press(key: string, options?: { text?: string, delay?: number }): Promise<void>;

  tap(): Promise<void>;

  triggerEvent(eventName: string, detail?: any): void;

  type(text: string, options?: { delay: number }): Promise<void>;
}


export interface WaitForEventOptions {
  timeout?: number;
}


export interface WaitForEvent {
  selector: string;
  eventName: string;
  resolve: (ev: any) => void;
  cancelRejectId: any;
}


export interface BrowserContextEvent {
  selector: string;
  eventName: string;
  event: any;
}


export interface BrowserWindow extends Window {
  stencilOnEvent(ev: BrowserContextEvent): void;
  stencilSerializeEvent(ev: CustomEvent): any;
  stencilSerializeEventTarget(target: any): any;
  stencilAppLoaded: boolean;
}
