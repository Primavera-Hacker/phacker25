import Experience from "../Experience";
import * as THREE from "three/webgpu";
import { WiggleBone } from "wiggle";

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
        let rootBone;
        const wiggleBones = [];
        mesh.skeleton.bones.forEach((bone) => {
            if (!bone.parent.isBone) {
            rootBone = bone;
            } else {
            const wiggleBone = new WiggleBone(bone, {
                velocity: 0.5,
            });
            wiggleBones.push(wiggleBone);
            }
        });

        console.log(rootBone)






        scene.add(instance);

        const time = this.experience.time;
        
        time.on("tick",()=>{
            const elapsed = this.experience.time.elapsed;
            rootBone.position.y = Math.sin(elapsed*0.1)*10.0;
            wiggleBones.forEach((wiggleBone) => {
                wiggleBone.update();
            });
        });


    }
}