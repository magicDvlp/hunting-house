import * as THREE from 'three';
import Debug from '../utils/Debug';
class Light {
  constructor(scene) {
    this.scene = scene;
    this._init();
  }

  _debugInit() {
    this.debug = new Debug();
    if (this.debug.isActive) {
      this.guiFolder = this.debug.gui.addFolder('Light');
      this.guiFolder
          .add(this.ambientLight, 'intensity')
          .name('ambientLight')
          .min(0.1)
          .max(2)
          .step(0.1);
      this.guiFolder
          .add(this.directionLight, 'intensity')
          .name('moonLight')
          .min(0.1)
          .max(2)
          .step(0.1);
    }
  }

  _init() {
    // ambient light
    this.ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3);
    this.scene.add(this.ambientLight);

    // moon light
    this.directionLight = new THREE.DirectionalLight('#b9d5ff', 0.5);
    this.directionLight.position.set(3, 3, -1);
    this.directionLight.castShadow = true;
    this.scene.add(this.directionLight);

    // debug init
    this._debugInit();
  }
}
export default Light;