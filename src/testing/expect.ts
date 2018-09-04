import * as d from '../declarations';
import { parseFragment } from './parse-html';
import { serialize } from './mock-doc/serialize-node';


export function toEqualHtml(input: string | HTMLElement, shouldEqual: string) {
  if (input == null) {
    throw new Error(`expect toEqualHtml value is null`);
  }

  let serializeA: string;

  if ((input as HTMLElement).nodeName) {
    serializeA = (input as HTMLElement).innerHTML;

  } else {
    const parseA = parseFragment(input as string);

    serializeA = serialize(parseA, {
      format: 'html'
    });
  }

  const parseB = parseFragment(shouldEqual);

  const serializeB = serialize(parseB, {
    format: 'html'
  });

  if (serializeA !== serializeB) {
    expect(serializeA).toBe(serializeB);
    return {
      message: () => 'HTML does not match',
      pass: false,
    };
  }

  return {
    message: () => 'expect HTML to match',
    pass: true,
  };
}

export function toEqualText(elm: HTMLElement, expectTextContent: string) {
  if (!elm) {
    throw new Error(`expect toEqualText value is null`);
  }

  if (elm.nodeType !== 1) {
    throw new Error(`expect toEqualText value is not an element`);
  }

  const elmTextContent = (elm.textContent || '').trim();
  expectTextContent = (expectTextContent || '').trim();

  const pass = (elmTextContent === expectTextContent);

  return {
    message: () => `expected textContent "${expectTextContent}" to ${pass ? 'not ' : ''}equal "${elmTextContent}"`,
    pass: pass,
  };
}

export function toHaveAttribute(elm: HTMLElement, expectAttrName: string) {
  if (!elm) {
    throw new Error(`expect toHaveAttribute value is null`);
  }

  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveAttribute value is not an element`);
  }

  const pass = elm.hasAttribute(expectAttrName);

  return {
    message: () => `expected to ${pass ? 'not ' : ''}have the attribute "${expectAttrName}"`,
    pass: pass,
  };
}

export function toEqualAttribute(elm: HTMLElement, expectAttrName: string, expectAttrValue: string) {
  if (!elm) {
    throw new Error(`expect toMatchAttribute value is null`);
  }

  if (elm.nodeType !== 1) {
    throw new Error(`expect toMatchAttribute value is not an element`);
  }

  const receivedAttrValue = elm.getAttribute(expectAttrName);

  const pass = (expectAttrValue === receivedAttrValue);

  return {
    message: () => `expected attribute ${expectAttrName} "${expectAttrValue}", but received "${receivedAttrValue}"`,
    pass: pass,
  };
}

export function toHaveCalledEvent(eventSpy: d.EventSpy) {
  if (!eventSpy) {
    throw new Error(`toHaveCalledEvent event spy is null`);
  }

  if (!eventSpy.isEventSpy) {
    throw new Error(`toHaveCalledEvent did not receive an event spy`);
  }

  const pass = (eventSpy.events.length > 0);

  return {
    message: () => `expected to have ${pass ? 'not ' : ''}called "${eventSpy.eventName}" event`,
    pass: pass,
  };
}

export function toHaveCalledEventTimes(eventSpy: d.EventSpy, count: number) {
  if (!eventSpy) {
    throw new Error(`toHaveCalledEventTimes event spy is null`);
  }

  if (!eventSpy.isEventSpy) {
    throw new Error(`toHaveCalledEventTimes did not receive an event spy`);
  }

  const pass = (eventSpy.events.length === count);

  return {
    message: () => `expected event "${eventSpy.eventName}" to have been called ${count} times, but was called ${eventSpy.events.length} time${eventSpy.events.length > 1 ? 's' : ''}`,
    pass: pass,
  };
}

export function toHaveCalledEventWith(eventSpy: d.EventSpy, expectEventInitDict: d.EventInitDict) {
  if (!eventSpy) {
    throw new Error(`toHaveCalledEventWith event spy is null`);
  }

  if (!eventSpy.isEventSpy) {
    throw new Error(`toHaveCalledEventWith did not receive an event spy`);
  }

  const lastEvent = eventSpy.events[eventSpy.events.length - 1];

  expect(lastEvent.detail).toEqual(expectEventInitDict.detail);

  return {
    message: () => `expected toHaveCalledEventWith`,
    pass: true,
  };
}

export function toHaveClass(elm: HTMLElement, expectClassName: string) {
  if (!elm) {
    throw new Error(`expect toHaveClass value is null`);
  }

  if (elm.nodeType !== 1) {
    throw new Error(`expect toHaveClass value is not an element`);
  }

  const pass = elm.classList.contains(expectClassName);

  return {
    message: () => `expected to ${pass ? 'not ' : ''}have css class "${expectClassName}"`,
    pass: pass,
  };
}
