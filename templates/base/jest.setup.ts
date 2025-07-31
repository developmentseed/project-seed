// jest.setup.ts
import '@testing-library/jest-dom';

// implementation of structuredClone polyfill

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = function structuredClone(value) {
    if (value === null || value === undefined) {
      return value;
    }

    try {
      // For objects and arrays, use JSON methods
      if (typeof value === 'object') {
        return JSON.parse(JSON.stringify(value));
      }

      // For primitive values, return directly
      return value;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('structuredClone polyfill failed:', error);

      // Returns a shallow copy as fallback
      return Array.isArray(value) ? [...value] : { ...value };
    }
  };
}
