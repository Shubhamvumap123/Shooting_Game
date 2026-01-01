// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Global mocks for canvas and element methods used in tests
if (typeof HTMLCanvasElement !== 'undefined') {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: () => ({
      clearRect: () => {},
      drawImage: () => {},
      fillStyle: '',
      fillRect: () => {},
      strokeRect: () => {},
      fillText: () => {},
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      fill: () => {},
      arc: () => {},
      scale: () => {},
      createLinearGradient: () => ({
        addColorStop: () => {},
      }),
      translate: () => {},
      rotate: () => {},
      shadowColor: '',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      globalAlpha: 1,
    }),
    writable: true,
  });
}

if (typeof Element !== 'undefined') {
  Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
    value: () => ({
      width: 300,
      height: 150,
      top: 0,
      left: 0,
      bottom: 150,
      right: 300,
      x: 0,
      y: 0,
    }),
    writable: true,
  });
}
