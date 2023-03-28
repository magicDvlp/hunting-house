import * as THREE from 'three';
class Resources extends EventTarget {
  loaders = {};
  items ={};
  constructor(sources = []) {
    super();
    if (typeof Resources.instance === 'object') {
      return Resources.instance;
    }
    this.sources = sources;
    this._init();
    Resources.instance = this;
  }
  _initLoaders() {
    this.loaders.textureLoader = new THREE.TextureLoader();
  }
  _startLoad() {
    this.sources.forEach(source => {
      switch (source.type) {
        case 'texture':
          this.loaders.textureLoader.load(source.path, file => {
            this.items[source['name']] = file;
          });
          break;
        default:
          return;
      }
    });
  }
  _init() {
    THREE.DefaultLoadingManager.onLoad = () => {
      this.dispatchEvent(new Event('sourcesLoaded'));
    };
    this._initLoaders();
    this._startLoad();
  }
}

export default Resources;
