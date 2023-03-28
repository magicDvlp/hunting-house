import * as THREE from 'three';
class Bush {
  constructor() {
    this.bushGeometry = new THREE.SphereGeometry(1, 16, 16);
    this.bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'});
    this.bush = new THREE.Mesh(this.bushGeometry, this.bushMaterial);
  }
  getBush() {
    return new THREE.Mesh(this.bushGeometry, this.bushMaterial);
  }
}
export default Bush;
