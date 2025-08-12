import Experience from "../Experience";
import * as THREE from "three/webgpu";

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

        const instance = perrito_model.scene.children[0].children[0];

     
        instance.material.transparent = true;
        instance.material.needsUpdate = true;
        instance.position.x-=5;
        instance.position.z-=1;
        instance.scale.multiplyScalar(5.0)


        scene.add(instance);


    }
}