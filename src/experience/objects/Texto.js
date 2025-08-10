import * as THREE from "three/webgpu"
import Experience from "../Experience"
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { emissive } from "three/tsl";


export default class Texto
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        this.init();
    }


    init()
    {
        const grid_helper = new THREE.GridHelper(20,20);
       // this.scene.add(grid_helper);
      //  grid_helper.rotation.x = Math.PI*.5




        const font = this.resources.items.tipo;
        const text_geo = new TextGeometry("NUEVOS",{
            font:font,
            size:2.0,
            depth:0.2,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 1
        }); 
        
       
        ///text_geo.scale(.9,1.2,1.0);

        const instance = new THREE.Mesh(text_geo,new THREE.MeshStandardMaterial({
            color:new THREE.Color("#656565"),
            metalness:0.4,
            roughness:0.3,
            emissive:new THREE.Color("#ff0000"),
            emissiveIntensity:2
        }));
        text_geo.computeBoundingBox();

        const centerOffset = - 0.5 * ( text_geo.boundingBox.max.x - text_geo.boundingBox.min.x );
        const centerOffsety = - 0.5 * ( text_geo.boundingBox.max.y - text_geo.boundingBox.min.y );

        text_geo.translate(centerOffset,centerOffsety,0);
        instance.position.y = 1.01;

        this.scene.add(instance);

    }

    update()
    {

    }
}