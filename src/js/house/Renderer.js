/* eslint-disable max-len */
import * as THREE from 'three';
import Sizes from './utils/Sizes';
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    // sizes
    this.sizes = new Sizes();

    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });

    // setup
    this.instance.setSize(this.sizes.canvasWidth, this.sizes.canvasHeight, false);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  resize(width, height) {
    this.instance.setSize(width, height, false);
  }

  update(scene, camera) {
    this.instance.render(scene, camera);
  }
}

export default Renderer;
