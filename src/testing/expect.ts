import { parseFragment } from './parse-html';
import { serialize } from './mock-doc/serialize-node';


export function toBeChecked(elm: HTMLElement) {
  if (!elm) {
    return {
      message: () => `expected to be checked, but element is null`,
      pass: false,
    };
  }

  return {
    message: () => `expected to be checked`,
    pass: elm.hasAttribute('checked'),
  };
}

export function toEqualHtml(a: string, b: string) {
  const parseA = parseFragment(a);
  const parseB = parseFragment(b);

  const serializeA = serialize(parseA, {
    format: 'html'
  });

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

export function toHaveAttribute(elm: HTMLElement, attributeName: string) {
  if (!elm) {
    return {
      message: () => `expected to have attribute "${attributeName}", but element is null`,
      pass: false,
    };
  }

  return {
    message: () => `expected to have attribute`,
    pass: elm.hasAttribute(attributeName),
  };
}

export function toHaveAttributes(elm: HTMLElement, attributes: { [attr: string]: string }) {
  const keys = Object.keys(attributes);

  if (!elm) {
    return {
      message: () => `expected to have attributes "${keys.join(' ')}", but element is null`,
      pass: false,
    };
  }

  for (const attr of keys) {
    if (!elm.hasAttribute(attr)) {
      return {
        message: () => `expected to have attribute "${attr}", but element attributes includes: ${keys.join(' ')}`,
        pass: false,
      };
    }
  }

  return {
    message: () => 'expected to have attributes',
    pass: true,
  };
}

export function toMatchAttributes(elm: HTMLElement, attributes: { [attr: string]: string }) {
  const keys = Object.keys(attributes);

  if (!elm) {
    return {
      message: () => `expected to match attributes "${keys.join(' ')}", but element is null`,
      pass: false,
    };
  }

  for (const attr of keys) {
    if (elm.getAttribute(attr) !== attributes[attr]) {
      return {
        message: () => `expected attribute "${attr}" to be equal to "${attributes[attr]}", but attribute value is "${elm.getAttribute(attr)}"`,
        pass: false,
      };
    }
  }

  return {
    message: () => 'expected to match attributes',
    pass: true,
  };
}

export function toHaveClass(elm: HTMLElement, className: string) {
  if (!elm) {
    return {
      message: () => `expected to have css class "${className}", but element is null`,
      pass: false,
    };
  }

  if (!elm.classList.contains(className)) {
    return {
      message: () => `expected to have css class "${className}", but element className is "${elm.className}"`,
      pass: false,
    };
  }

  return {
    message: () => `expected to have css class "${className}"`,
    pass: true,
  };
}

export function toHaveClasses(elm: HTMLElement, classNames: string[]) {
  if (!elm) {
    return {
      message: () => `expected to have css class "${classNames.join(' ')}", but element is null`,
      pass: false,
    };
  }

  for (const className of classNames) {
    if (!elm.classList.contains(className)) {
      return {
        message: () => `expected to have css class "${className}", but element className is "${elm.className}"`,
        pass: false,
      };
    }
  }

  return {
    message: () => `expected css classes`,
    pass: true,
  };
}

export function toMatchClasses(elm: HTMLElement, classNames: string[]) {
  if (!elm) {
    return {
      message: () => `expected to match css class "${classNames.join(' ')}", but element is null`,
      pass: false,
    };
  }

  const expected = classNames.slice().filter(c => c.length > 0).sort().join(' ').trim();
  const received = elm.className.split(' ').filter(c => c.length > 0).sort().join(' ').trim();

  if (expected !== received) {
    throw new Error(`expected css class${classNames.length > 1 ? 'es' : ''} "${expected}", but element classes are "${received}"`);
  }

  return {
    message: () => `expected to match classes`,
    pass: true,
  };
}

export function toHaveProperties(instance: any, properties: { [prop: string]: any }) {
  const keys = Object.keys(properties);

  for (const prop of keys) {
    if (!instance[prop] === properties[prop]) {
      return {
        message: () => `expected property "${prop}", but it was not found`,
        pass: true,
      };
    }
  }

  return {
    message: () => `expected to match properties`,
    pass: true,
  };
}
