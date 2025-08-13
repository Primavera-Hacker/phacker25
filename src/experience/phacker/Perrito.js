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
        const scale = 2;
        instance.position.x-=scale;
        instance.position.z-=1;
        instance.position.y = 1.0;
        instance.scale.multiplyScalar(scale)

        instance.renderOrder = 1;








        scene.add(instance);


    }
}