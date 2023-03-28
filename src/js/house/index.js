/* eslint-disable max-len */
import * as THREE from 'three';
import Camera from './Camera';
import Sizes from './utils/Sizes';
import Renderer from './Renderer';
import Time from './utils/Time';
import Resources from './utils/Resources';
import sources from './sources';
import World from './World/World';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Debug from './utils/Debug';
class House {
  constructor(canvas) {
    if (!canvas) {
      console.error('You must pass canvas!');
      return;
    }
    this.canvas = canvas;

    // init
    this._init();
  }
  _resize(e) {
    const {
      needResize,
      aspect,
      canvasWidth,
      canvasHeight,
    } = e.target;
    if (needResize) {
      this.camera.resize(aspect);
      this.renderer.resize(canvasWidth, canvasHeight);
    }
  }
  _update(e) {
    this.renderer.update(this.scene, this.camera.instance);
  }
  _init() {
    // debug
    this.debug = new Debug();

    // time
    this.time = new Time();

    // resources
    this.resources = new Resources(sources);

    // sizes
    this.sizes = new Sizes(this.canvas);

    // scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog('#262837', 1, 15);

    // camera
    this.camera = new Camera({
      aspect: this.sizes.aspect,
    });

    // renderer
    this.renderer = new Renderer(this.canvas);
    this.renderer.update(this.scene, this.camera.instance);
    this.renderer.instance.setClearColor('#262837');

    // OrbitControls
    this.orbitControls = new OrbitControls(this.camera.instance, this.canvas);
    this.orbitControls.enableDamping = true;

    // events
    this.sizes.addEventListener('resize', this._resize.bind(this));
    this.time.addEventListener('tick', this._update.bind(this));
    this.resources.addEventListener('sourcesLoaded', e => {
      // world
      this.world = new World(this.scene, this.resources.items);
    });
  }
}

export default House;
