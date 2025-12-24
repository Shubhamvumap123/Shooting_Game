// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock HTMLCanvasElement.prototype.getContext
HTMLCanvasElement.prototype.getContext = () => {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x, y, w, h) => {
      return {
        data: new Array(w * h * 4)
      };
    },
    putImageData: () => {},
    createImageData: () => { return []; },
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => { return { width: 0 }; },
    transform: () => {},
    rect: () => {},
    clip: () => {},
    strokeRect: () => {},
  };
};
