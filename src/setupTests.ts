import { beforeAll, beforeEach, afterAll, afterEach } from 'vitest';
import { expect } from 'vitest';
import { html, render } from 'lit';

beforeAll(() => {
  // Add your global beforeAll logics
});

beforeEach(() => {
  // Add your globalbeforeEach logics
});

afterAll(() => {
  // Add your global afterAll logics
});

// Extend expect with custom matchers
expect.extend({
  toHaveAttribute(received, attr, value) {
    const element = received as HTMLElement;
    const hasAttr = element.hasAttribute(attr);
    if (!hasAttr) {
      return {
        message: () => `expected ${element.tagName} to have attribute ${attr}`,
        pass: false,
      };
    }
    if (value !== undefined) {
      const attrValue = element.getAttribute(attr);
      return {
        message: () =>
          `expected ${element.tagName} to have attribute ${attr} with value ${value}, but got ${attrValue}`,
        pass: attrValue === value,
      };
    }
    return {
      message: () =>
        `expected ${element.tagName} not to have attribute ${attr}`,
      pass: true,
    };
  },
});

// Clean up after each test
afterEach(() => {
  // cleanup();
});

// Helper function to render Lit components
export function renderComponent(template: ReturnType<typeof html>) {
  const container = document.createElement('div');
  render(template, container);
  return container;
}
