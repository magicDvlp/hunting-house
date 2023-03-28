/* eslint-disable max-len */
import * as THREE from 'three';
import Debug from '../utils/Debug';
class Ground {
  constructor(resources) {
    this.resources = resources;
    this._init();
  }
  setTextures() {
    this.textures = {};

    // color
    this.textures.color = this.resources.groundColor;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(5, 5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    // normal
    this.textures.normal = this.resources.groundNormal;
    this.textures.normal.repeat.set(5, 5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;

    // ao
    this.textures.aO = this.resources.groundOcc;
    this.textures.aO.repeat.set(5, 5);
    this.textures.aO.wrapS = THREE.RepeatWrapping;
    this.textures.aO.wrapT = THREE.RepeatWrapping;

    // roughness
    this.textures.roughness = this.resources.groundRough;
    this.textures.roughness.repeat.set(5, 5);
    this.textures.roughness.wrapS = THREE.RepeatWrapping;
    this.textures.roughness.wrapT = THREE.RepeatWrapping;
  }
  createPlane() {
    this.geometry = new THREE.PlaneGeometry(20, 20);
    this.geometry.setAttribute('uv2', new THREE.BufferAttribute(this.geometry.attributes.uv.array, 2));
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      side: THREE.DoubleSide,
      aoMap: this.textures.aO,
      aoMapIntensity: 1,
      roughnessMap: this.textures.roughness,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.rotateX(Math.PI * 0.5);
    this.mesh.position.y = 0;
  }
  _setUpDebug() {
    this.debug = new Debug();
    if (this.debug.isActive) {
      this.guiFolder = this.debug.gui.addFolder('Ground');
      this.guiFolder
          .add(this.material, 'aoMapIntensity')
          .name('ambientOcclusionIntensity')
          .min(1)
          .max(30)
          .step(0.3);
    }
  }
  _init() {
    this.setTextures();
    this.createPlane();
    this._setUpDebug();
  }
}

export default Ground;
