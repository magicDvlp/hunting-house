/* eslint-disable max-len */
import * as THREE from 'three';
import Debug from '../utils/Debug';
class House {
  constructor(resources) {
    this.resources = resources;
    this._init();
  }

  _setWallTextures() {
    this.wallTextures = {};

    // color
    this.wallTextures.color = this.resources.bricksColor;
    this.wallTextures.color.encoding = THREE.sRGBEncoding;
    this.wallTextures.color.repeat.set(2, 2);
    this.wallTextures.color.wrapS = THREE.RepeatWrapping;
    this.wallTextures.color.wrapT = THREE.RepeatWrapping;

    // normal
    this.wallTextures.normal = this.resources.bricksNormal;
    this.wallTextures.normal.repeat.set(2, 2);
    this.wallTextures.normal.wrapS = THREE.RepeatWrapping;
    this.wallTextures.normal.wrapT = THREE.RepeatWrapping;

    // AO
    this.wallTextures.aO = this.resources.bricksAmbientOcclusion;
    this.wallTextures.aO.repeat.set(2, 2);
    this.wallTextures.aO.wrapS = THREE.RepeatWrapping;
    this.wallTextures.aO.wrapT = THREE.RepeatWrapping;

    // roughness
    this.wallTextures.roughness = this.resources.bricksRoughness;
    this.wallTextures.roughness.repeat.set(2, 2);
    this.wallTextures.roughness.wrapS = THREE.RepeatWrapping;
    this.wallTextures.roughness.wrapT = THREE.RepeatWrapping;
  }

  _setRoofTextures() {
    this.roofTextures = {};

    // color
    this.roofTextures.color = this.resources.roofColor;
    this.roofTextures.color.encoding = THREE.sRGBEncoding;
    this.roofTextures.color.repeat.set(3, 3);
    this.roofTextures.color.center.x = 0.5;
    this.roofTextures.color.center.y = 0.5;
    this.roofTextures.color.rotation = -Math.PI * 0.1;
    this.roofTextures.color.wrapS = THREE.RepeatWrapping;
    this.roofTextures.color.wrapT = THREE.RepeatWrapping;

    // normal
    this.roofTextures.normal = this.resources.roofNormal;
    this.roofTextures.normal.repeat.set(3, 3);
    this.roofTextures.normal.center.x = 0.5;
    this.roofTextures.normal.center.y = 0.5;
    this.roofTextures.normal.rotation = -Math.PI * 0.1;
    this.roofTextures.normal.wrapS = THREE.RepeatWrapping;
    this.roofTextures.normal.wrapT = THREE.RepeatWrapping;

    // AO
    this.roofTextures.aO = this.resources.roofAmbientOcclusion;
    this.roofTextures.aO.repeat.set(3, 3);
    this.roofTextures.aO.center.x = 0.5;
    this.roofTextures.aO.center.y = 0.5;
    this.roofTextures.aO.rotation = -Math.PI * 0.1;
    this.roofTextures.aO.wrapS = THREE.RepeatWrapping;
    this.roofTextures.aO.wrapT = THREE.RepeatWrapping;

    // roughness
    this.roofTextures.roughness = this.resources.roofRoughness;
    this.roofTextures.roughness.repeat.set(3, 3);
    this.roofTextures.roughness.center.x = 0.5;
    this.roofTextures.roughness.center.y = 0.5;
    this.roofTextures.roughness.rotation = -Math.PI * 0.1;
    this.roofTextures.roughness.wrapS = THREE.RepeatWrapping;
    this.roofTextures.roughness.wrapT = THREE.RepeatWrapping;
  }

  _setDoorTextures() {
    this.doorTextures = {};

    // color
    this.doorTextures.color = this.resources.doorColor;
    this.doorTextures.encoding = THREE.sRGBEncoding;

    // ambient
    this.doorTextures.ambiant = this.resources.doorAmbient;

    // normal
    this.doorTextures.normal = this.resources.doorNormal;

    // alpha
    this.doorTextures.alpha = this.resources.doorOpacity;

    // height
    this.doorTextures.displacementMap = this.resources.doorHeight;

    // metalness
    this.doorTextures.metalness = this.resources.doorMetalic;

    // roughness
    this.doorTextures.roughness = this.resources.doorRoughness;
  }

  createRoof() {
    const roofGeometry = new THREE.ConeGeometry(3.5, 1, 4);
    roofGeometry.setAttribute('uv2', new THREE.BufferAttribute(roofGeometry.attributes.uv.array, 2));
    const roofTexture = new THREE.MeshStandardMaterial({
      map: this.roofTextures.color,
      normalMap: this.roofTextures.norma,
      aoMap: this.roofTextures.aO,
      roughnessMap: this.roofTextures.roughness,
    });
    return new THREE.Mesh(roofGeometry, roofTexture);
  }

  createWalls() {
    const wallsGeometry = new THREE.BoxBufferGeometry(4, 2.5, 4, 40, 40, 40);
    // uv2 attribute for AO texture
    wallsGeometry.setAttribute('uv2', new THREE.BufferAttribute(wallsGeometry.attributes.uv.array, 2));
    this.wallsMaterial = new THREE.MeshStandardMaterial({
      map: this.wallTextures.color,
      normalMap: this.wallTextures.normal,
      aoMap: this.wallTextures.aO,
      roughnessMap: this.wallTextures.roughness,
    });
    return new THREE.Mesh(wallsGeometry, this.wallsMaterial);
  }

  createDoor() {
    const doorGeometry = new THREE.PlaneGeometry(2, 2, 100, 100);
    doorGeometry.setAttribute('uv2', new THREE.BufferAttribute(doorGeometry.attributes.uv.array, 2));
    const doorMaterial = new THREE.MeshStandardMaterial({
      map: this.doorTextures.color,
      aoMap: this.doorTextures.ambiant,
      normalMap: this.doorTextures.normal,
      transparent: true,
      alphaMap: this.doorTextures.alpha,
      displacementMap: this.doorTextures.displacementMap,
      displacementScale: 0.1,
      metalnessMap: this.doorTextures.metalness,
      roughnessMap: this.doorTextures.roughness,
    });
    return new THREE.Mesh(doorGeometry, doorMaterial);
  }

  createDorLight() {
    return new THREE.PointLight('#ff7d46', 2, 9);
  }

  buildHouse() {
    const house = new THREE.Group();
    this.walls = this.createWalls();
    this.walls.castShadow = true;
    this.walls.position.y = 2.5 * 0.5;
    house.add(this.walls);
    this.roof = this.createRoof();
    this.roof.position.y = 2.5 + 0.5;
    this.roof.rotateY(Math.PI * 0.25);
    house.add(this.roof);
    this.door = this.createDoor();
    this.door.position.z = 2 + 0.01;
    this.door.position.y = this.door.geometry.parameters.height / 2;
    house.add(this.door);
    this.doorLight = this.createDorLight();
    this.doorLight.castShadow = true;
    this.doorLight.position.set(0, 2, 2.5);
    house.add(this.doorLight);
    return house;
  }

  _debugInit() {
    this.debug = new Debug();
    if (this.debug.isActive) {
      this.guiFolder = this.debug.gui.addFolder('House');
      const wallNormalScale = {value: 1};
      this.guiFolder
          .add(wallNormalScale, 'value')
          .name('wallNormalScale')
          .min(0.1)
          .max(1)
          .step(0.1)
          .onChange(() => {
            this.wallsMaterial.normalScale.set(wallNormalScale.value, wallNormalScale.value);
          });
    }
  }

  _init() {
    this._setWallTextures();
    this._setRoofTextures();
    this._setDoorTextures();
    this.house = this.buildHouse();
    this._debugInit();
  }
}

export default House;
