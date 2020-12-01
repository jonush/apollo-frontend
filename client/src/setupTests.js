// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jest-prop-type-error";

// fix: `matchMedia` not present, legacy browsers require a polyfill
global.matchMedia = global.matchMedia || function() {
  return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
  }
}

// disable the async validator warning (for form validation) when running tests
const warn = console.warn
console.warn = (...args) => {
  if(typeof args[0] === 'string' && args[0].startsWith('async-validator:')) return

  warn(...args)
}