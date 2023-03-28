import * as THREE from 'three';
class Camera {
  params = {
    fov: 75,
    aspect: 2,
    near: 0.1,
    far: 100,
  };
  constructor(params = {}) {
    this.params = {
      ...this.params,
      ...params,
    };
    this.instance = new THREE.PerspectiveCamera(
        this.params.fov,
        this.params.aspect,
        this.params.near,
        this.params.far,
    );
    this.instance.position.set(4, 2, 5);
    this.instance.lookAt(0, 0, 0);
  }
  resize(aspect) {
    this.instance.aspect = aspect;
    this.instance.updateProjectionMatrix();
  }
}

export default Camera;
