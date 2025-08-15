import { TransformControls } from "three/examples/jsm/Addons.js";
import Experience from "../Experience";
import * as THREE from "three/webgpu";
import { WiggleBone } from "wiggle";
import {WiggleRigHelper} from "wiggle/helper"
export default class Perrito
{
    constructor()
    {
        this.experience = new Experience();
        this.init();
    }

    init()
    {
        const perrito_model = this.experience.resources.items.perrito;
        const scene = this.experience.scene;

        const instance = perrito_model.scene.children[0];
        const material = instance.children[0].material;
     
        material.transparent = true;
        material.needsUpdate = true;

        

        const scale = 3;
        instance.position.x-=scale*.25;
        instance.position.y = 3.0;
        instance.scale.multiplyScalar(scale)

        instance.children[0].renderOrder = 1;

        const mesh = instance.children[0]
        const wiggleBones = [];

        const helper = new WiggleRigHelper({
        skeleton: mesh.skeleton,
        dotSize: 0.2,
        lineWidth: 0.02,
        });
        scene.add(helper);
        scene.add(instance);


        const rootBone = scene.getObjectByName("Bone001");
        const b1 = scene.getObjectByName("Bone001");
        const b2 = scene.getObjectByName("Bone002");
        const b3 = scene.getObjectByName("Bone003");
         wiggleBones.push(new WiggleBone(b1, { stiffness: 700, damping: 28 }));
        wiggleBones.push(new WiggleBone(b2, { stiffness: 700, damping: 28 }));
        wiggleBones.push(new WiggleBone(b3, { stiffness: 700, damping: 28 }));
        const control = new TransformControls(this.experience.camera.instance,this.experience.renderer.instance.domElement)
        control.addEventListener("dragging-changed", function (event) {
           this.experience.camera.control.enabled = !event.value;
        });


        scene.add(control.getHelper());
        control.attach(rootBone);

       
        /*
        mesh.skeleton.bones.forEach((bone) => {
            if (bone.name == "Bone001") {
                rootBone = bone;
             
            } else {
                
                const wiggleBone = new WiggleBone(bone, {
                    stiffness: 700, damping: 28 
                });
                wiggleBones.push(wiggleBone);
            }
        });*/








        const time = this.experience.time;
        
        time.on("tick",()=>{
            /*
            const elapsed = this.experience.time.elapsed;
            rootBone.position.y = Math.sin(elapsed*0.2);*/
            wiggleBones.forEach((wiggleBone) => {
                wiggleBone.update();
            });
        });


    }
}