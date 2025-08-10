import * as THREE from 'three/webgpu';
import Experience from '../Experience.js';
import { texture } from 'three/tsl';

export default class GridFloor {


    constructor() {

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;
        this.raycaster = this.experience.raycaster;
        this.ready();
    } 

    ready() {
        
        const map = this.experience.resources.items.rock_color;
        const normal_map = this.experience.resources.items.rock_normal;
        const ao_map = this.experience.resources.items.rock_ao;
        const height_map = this.experience.resources.items.rock_height;

        this.geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
        this.geometry.rotateX(-Math.PI / 2);
        this.instance = new THREE.Mesh(this.geometry, new THREE.MeshStandardMaterial()); 
        this.instance.position.y = 0.0;
        this.instance.receiveShadow = true;
        const material = this.instance.material;
        function repeat(_t,_scale)
        {
            if(_t)
            {
                _t.wrapS = THREE.RepeatWrapping;
                _t.wrapT = THREE.RepeatWrapping;
                _t.repeat.set(_scale, _scale);
            }
        }
      
    
        material.map = map;
        material.map.colorSpace  = THREE.SRGBColorSpace;
        material.normalMap = normal_map;
        material.normalMap.colorSpace  = THREE.LinearSRGBColorSpace;
        material.aoMap = ao_map;
        material.aoMap.colorSpace  = THREE.LinearSRGBColorSpace;
        material.aoMapIntensity=2.0;
        material.metalness = 0.11;
        material.roughness = .72;
        material.normalScale = new THREE.Vector2(1.0, 1.0);
        //material.wireframe = true;

        const scale_texture = 100;
        
        repeat(material.map, scale_texture);
        repeat(material.normalMap, scale_texture);     
        repeat(material.aoMap, scale_texture);     
        repeat(material.bumpMap, scale_texture);     

        this.raycaster.register(this.instance);
        this.raycaster.on("hit",(_arg)=>{
            if(_arg && _arg.name == this.instance.uuid)
            {
                const intersect = _arg.intersect;             
            }
        });

        this.scene.add(this.instance);

               
        if(this.debug.active)
        {
            const folder = this.experience.debug.ui.addFolder("Floor Material");
            folder.open();
            folder.add(material,"metalness",0,1,0.01);
            folder.add(material,"roughness",0,1,0.01);
            folder.add(material,"aoMapIntensity",0,2,0.01);
            folder.add(material.normalScale,"x",-10,10,0.01).onChange(()=> material.needsUpdate = true);
            folder.add(material.normalScale,"y",-10,10,0.01).onChange(()=> material.needsUpdate = true);
            
        }
    

    }


}