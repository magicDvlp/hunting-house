/* eslint-disable max-len */
class Sizes extends EventTarget {
  constructor(canvas) {
    super();
    if (typeof Sizes.instance === 'object') {
      return Sizes.instance;
    }
    this.canvas = canvas;
    this._init();
    Sizes.instance = this;
  }
  calculate() {
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.aspect = this.canvasWidth / this.canvasHeight;
    this.needResize = this.canvas.width !== this.canvasWidth || this.canvas.height !== this.canvasHeight;
  }
  _resize() {
    this.calculate();
    this.dispatchEvent(new Event('resize'));
  }
  _init() {
    this.calculate();
    window.addEventListener('resize', () => this._resize());
  }
}

export default Sizes;
