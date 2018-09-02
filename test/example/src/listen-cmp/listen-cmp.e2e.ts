import { newE2EPage } from '../../../../dist/testing';


describe('@Listen', () => {

  it('host listener toggles "opened" from "click" event', async () => {
    // create a new puppeteer page
    const page = await newE2EPage({ html: `
      <listen-cmp></listen-cmp>
    `});

    // select the "event-cmp" element within the page (same as querySelector)
    // and return the value from the component's "opened" @Prop
    let opened = await page.find('listen-cmp').getProperty<boolean>('opened');

    // we just made a change and now the async queue need to process it
    // make sure the queue does its work before we continue
    await page.waitForChanges();

    // test that the value we got from the element's "opened" property is correct
    expect(opened).toEqual(false);

    // in the browser's context, let's fire off a
    // simulated "click" event from the element
    await page.$eval('listen-cmp', (elm: any) => {
      // this function is within the browser's context
      const ev = new Event('click');
      elm.dispatchEvent(ev);
    })

    await page.waitForChanges();

    // let's get the value of "opened" again
    opened = await page.find('listen-cmp').getProperty<boolean>('opened');

    // test that the event that we manually dispatched correctly
    // triggered the component's @Listen('click') handler which
    // in this test should have changed the "opened" value to true
    expect(opened).toEqual(true);

    // let's do it again!
    await page.$eval('listen-cmp', (elm: any) => {
      // this function is within the browser's context
      const ev = new Event('click');
      elm.dispatchEvent(ev);
    })

    await page.waitForChanges();

    // let's get the value of "opened" again
    opened = await page.$eval('listen-cmp', (elm: any) => elm.opened);

    expect(opened).toEqual(false);
  });

});
