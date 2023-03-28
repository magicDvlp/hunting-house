import * as THREE from 'three';
class Time extends EventTarget {
  constructor() {
    super();
    if (Time.instance === 'object') {
      return Time.instance;
    }
    this._init();
    Time.instance = this;
  }
  tick() {
    this.dispatchEvent(new Event('tick'));
    window.requestAnimationFrame(this.tick.bind(this));
  }
  _init() {
    this.clock = new THREE.Clock();
    this.tick();
  }
}

export default Time;
