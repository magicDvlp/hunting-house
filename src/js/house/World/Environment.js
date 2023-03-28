import Light from './Light';
class Environment {
  constructor(scene) {
    this.scene = scene;
    this.light = new Light(this.scene);
  }
}

export default Environment;
