

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeChecked(): void;
      toEqualHtml(html: string): void;
      toEqualText(textContent: string): void;

      toHaveAttribute(attributeName: string): void;
      toHaveAttributes(attributes: { [attr: string]: string }): void;
      toMatchAttributes(attributes: { [attr: string]: string }): void;

      toHaveClass(className: string): void;
      toHaveClasses(classNames: string[]): void;
      toMatchClasses(classNames: string[]): void;

      toMatchProperties(properties: { [prop: string]: any }): void;
    }
  }
}


export interface JestEnvironmentGlobal {
  __BUILD_CONDITIONALS__: any;
  __NEW_TEST_PAGE__: () => Promise<any>;
  Context: any;
  loadTestWindow: (testWindow: any) => Promise<void>;
  h: any;
  resourcesUrl: string;
}


export interface E2EProcessEnv {
  STENCIL_COMMIT_ID?: string;
  STENCIL_COMMIT_MESSAGE?: string;
  STENCIL_REPO_URL?: string;
  STENCIL_SCREENSHOT_CONNECTOR?: string;
  STENCIL_SCREENSHOT_SERVER?: string;

  __STENCIL_EMULATE__?: string;
  __STENCIL_BROWSER_URL__?: string;
  __STENCIL_LOADER_URL__?: string;
  __STENCIL_BROWSER_WS_ENDPOINT__?: string;
  __STENCIL_SCREENSHOTS__?: 'true';
  __STENCIL_SCREENSHOT_IMAGES_DIR__?: string;
  __STENCIL_SCREENSHOT_DATA_DIR__?: string;

  __STENCIL_E2E_TESTS__?: 'true';

  __STENCIL_PUPPETEER_MODULE__?: string;
  __STENCIL_JEST_ENVIRONMENT_NODE_MODULE__?: string;
}


export interface Testing {
  isValid: boolean;
  runTests(): Promise<void>;
  destroy(): Promise<void>;
}


export interface TestingConfig {
  emulate?: ScreenshotEmulate[];
  moduleFileExtensions?: string[];
  reporters?: string[];
  setupTestFrameworkScriptFile?: string;
  testEnvironment?: string;
  testMatch?: string[];
  testPathIgnorePatterns?: string[];
  testRegex?: string;
  transform?: {[key: string]: string };
}


export interface ScreenshotEmulate {
  /**
   * Predefined device descriptor name, such as "iPhone X" or "Nexus 10".
   * For a complete list please see: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
   */
  device?: string;

  /**
   * Page width in pixels.
   */
  width?: number;

  /**
   * page height in pixels.
   */
  height?: number;

  /**
   * Specify device scale factor (can be thought of as dpr). Defaults to 1.
   */
  deviceScaleFactor?: number;

  /**
   * Whether the meta viewport tag is taken into account. Defaults to false.
   */
  isMobile?: boolean;

  /**
   * Specifies if viewport supports touch events. Defaults to false
   */
  hasTouch?: boolean;

  /**
   * Specifies if viewport is in landscape mode. Defaults to false.
   */
  isLandscape?: boolean;

  userAgent?: string;

  /**
   * Changes the CSS media type of the page. The only allowed values are 'screen', 'print' and null. Passing null disables media emulation.
   */
  mediaType?: 'screen' | 'print';
}


export interface TestScreenshotOptions {
  /**
   * When true, takes a screenshot of the full scrollable page.
   * @default false
   */
  fullPage?: boolean;

  /**
   * Hides default white background and allows capturing screenshots with transparency.
   * @default false
   */
  omitBackground?: boolean;

  /**
   * An object which specifies clipping region of the page.
   */
  clip?: {
    /** The x-coordinate of top-left corner. */
    x: number;
    /** The y-coordinate of top-left corner. */
    y: number;
    /** The width. */
    width: number;
    /** The height. */
    height: number;
  };
}
