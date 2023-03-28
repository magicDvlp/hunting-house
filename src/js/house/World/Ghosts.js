/* eslint-disable max-len */
import * as THREE from 'three';
import Time from '../utils/Time';
class Ghosts {
  constructor(scene) {
    this.scene = scene;
    this.time = new Time();
    this.#init();
  }
  #createGhost(params) {
    const lightParams = {
      color: 'ff00ff',
      intensity: 3,
      distance: 3,
      ...params,
    };
    const {color, intensity, distance} = lightParams;
    return new THREE.PointLight(color, intensity, distance);
  }
  #init() {
    this.ghost1 = this.#createGhost();
    this.ghost1.castShadow = true;
    this.ghost2 = this.#createGhost({color: '#00ffff'});
    this.ghost2.castShadow = true;
    this.ghost3 = this.#createGhost({color: '#ff7800'});
    this.ghost3.castShadow = true;
    this.scene.add(this.ghost1);
    this.scene.add(this.ghost2);
    this.scene.add(this.ghost3);
    console.log(this.time);
    this.time.addEventListener('tick', () => {
      const elapsedTime = this.time.clock.getElapsedTime();
      const ghost1Angle = elapsedTime * 0.5;
      this.ghost1.position.x = Math.cos(ghost1Angle) * 4;
      this.ghost1.position.y = Math.sin(ghost1Angle) * 3;
      this.ghost1.position.z = Math.sin(ghost1Angle * 3);

      const ghost2Angle = -elapsedTime * 0.33;
      this.ghost2.position.x = Math.cos(ghost2Angle) * 5;
      this.ghost2.position.y = Math.sin(ghost2Angle) * 5;
      this.ghost2.position.z = Math.sin(ghost2Angle * 3) + Math.sin(elapsedTime * 2.5);

      const ghost3Angle = -elapsedTime * 0.18;
      this.ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
      this.ghost3.position.y = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
      this.ghost3.position.z = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    });
  }
}

export default Ghosts;
