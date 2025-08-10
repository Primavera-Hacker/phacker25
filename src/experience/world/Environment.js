import * as THREE from "three/webgpu";
import Experience from "../Experience";
// import { SkyMesh } from "three/examples/jsm/objects/SkyMesh.js";
// import * as SunCalc from "suncalc";
// import { MathUtils } from "three";
// import { metalness, roughness, texture, time, uv, vec2, vec3 } from "three/tsl";
// import { color } from "dat.gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.renderer = this.experience.renderer.instance;
    this.resources.on("ready", () => {
      this.ready();
    });
  }

  ready() {
    const directiona_light = new THREE.DirectionalLight("#ffffff", 1.87);
    directiona_light.castShadow = true;
    directiona_light.shadow.camera.far = 400;
    directiona_light.shadow.camera.near = 0.01;
    directiona_light.shadow.mapSize.set(2048, 2048);
    directiona_light.shadow.normalBias = 0.005;
    directiona_light.position.set(-1.38, 10.22, 3.17);

    this.scene.add(directiona_light);

    this.scene.fog = new THREE.FogExp2(new THREE.Color("red"), 0.018);
    this.scene.background = this.scene.fog.color;

    if (this.debug.active) {
      const folder = this.debug.ui.addFolder("Directional Light");
      folder.open();
      folder.add(directiona_light.position, "x", -20, 20, 0.01);
      folder.add(directiona_light.position, "y", -20, 20, 0.01);
      folder.add(directiona_light.position, "z", -20, 20, 0.01);
      folder.add(directiona_light, "intensity", 0, 10, 0.01);

      const enviroment_folder = this.debug.ui.addFolder("Enviroment Map");
      enviroment_folder.open();
      enviroment_folder.add(this.scene, "environmentIntensity", 0, 10, 0.01);
    }

    /*
        this.enviromentMap = {};
        this.enviromentMap.intensity = 0.3;
        this.enviromentMap.texture = this.resources.items.rocky_env;
        
     
        this.resources.items.rocky_env.colorSpace = THREE.LinearSRGBColorSpace;

        this.scene.environmentIntensity = this.enviromentMap.intensity;
        this.scene.environment = this.resources.items.rocky_env;*/
    //    this.scene.background = this.resources.items.rocky_env;
  }
}
