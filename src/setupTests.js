// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock HTMLCanvasElement.prototype.getContext
HTMLCanvasElement.prototype.getContext = () => {
  return {
    clearRect: () => {},
    drawImage: () => {},
    fillRect: () => {},
    strokeRect: () => {},
    fillText: () => {},
  };
};
