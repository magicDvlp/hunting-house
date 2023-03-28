import Bush from './Bush';
import Graves from './Graves';
import Environment from './Environment';
import Ghosts from './Ghosts';
import Ground from './Ground';
import House from './House';
class World {
  constructor(scene, textures) {
    this.scene = scene;
    this.textures = textures;
    this.#init();
  }
  #createBush() {
    this.bushCreator = new Bush();
    this.bush = this.bushCreator.getBush();
    this.bush.castShadow = true;
    this.bush.scale.set(0.5, 0.5, 0.5);
    this.bush.position.set(0.8, 0.2, 2.2);
    this.scene.add(this.bush);
    this.bush2 = this.bushCreator.getBush();
    this.bush2.castShadow = true;
    this.bush2.scale.set(0.25, 0.25, 0.25);
    this.bush2.position.set(1.4, 0.1, 2.1);
    this.scene.add(this.bush2);
  }
  #init() {
    // gound
    this.ground = new Ground(this.textures);
    this.scene.add(this.ground.mesh);

    // environment
    this.environment = new Environment(this.scene);

    // house
    this.house = new House(this.textures);
    this.scene.add(this.house.house);

    // bush
    this.#createBush();

    // grave
    this.grave = new Graves(this.scene);

    // ghosts
    this.ghosts = new Ghosts(this.scene);
  }
}

export default World;
