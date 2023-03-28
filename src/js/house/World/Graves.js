import * as THREE from 'three';
class Graves {
  #graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  #graveMeterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'});
  constructor(scene) {
    this.scene = scene;
    this.graves = new THREE.Group();
    this.#init();
    this.scene.add(this.graves);
  }
  #init() {
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 6;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const grave = new THREE.Mesh(this.#graveGeometry, this.#graveMeterial);
      grave.castShadow = true;
      grave.position.set(x, 0.3, z);
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.4;
      this.graves.add(grave);
    }
  }
}

export default Graves;
