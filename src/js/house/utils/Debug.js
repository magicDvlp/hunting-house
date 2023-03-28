import GUI from 'lil-gui';

class Debug {
  isActive = window.location.hash === '#debug';
  constructor() {
    if (typeof Debug.instance === 'object') {
      return Debug.instance;
    }
    if (this.isActive) {
      this.gui = new GUI();
    }
    Debug.instance = this;
  }
}

export default Debug;