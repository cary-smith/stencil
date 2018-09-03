import { newE2EPage } from '../../../../dist/testing';


describe('@Element', () => {

  it('should read the host elements attribute', async () => {
    // create a new puppeteer page
    const page = await newE2EPage({ html: `
      <element-cmp host-element-attr="Marty McFly"></element-cmp>
    `});

    // with page.find() select the "element-cmp" element (uses querySelector)
    const elm = await page.find('element-cmp');
    expect(elm).toEqualText('Hello, my name is Marty McFly');
  });

});
