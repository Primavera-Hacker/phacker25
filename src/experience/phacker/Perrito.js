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



/*
        const helper = new WiggleRigHelper({
            skeleton: mesh.skeleton,
            dotSize: 0.2,
            lineWidth: 0.02,
        });
        scene.add(helper);*/
        scene.add(instance);

        const rootBone = scene.getObjectByName("Root");

        mesh.skeleton.bones.forEach((bone) => {
            if(bone.name != "Root")
            {
                const wiggleBone = new WiggleBone(bone, {
                    stiffness: 700, damping: 28
                });
                wiggleBones.push(wiggleBone);
            }
     
        });
        
        const control = new TransformControls(this.experience.camera.instance,this.experience.renderer.instance.domElement)
        control.addEventListener("dragging-changed", function (event) {
           this.experience.camera.control.enabled = !event.value;
        });


        scene.add(control.getHelper());
        control.attach(rootBone);

        console.log(instance)

       const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        this.experience.renderer.instance.domElement.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, this.experience.camera.instance);

        const intersects = raycaster.intersectObject(mesh, true);

        if (intersects.length > 0) {
            const hit = intersects[0];
            console.log("Impacto en:", hit.point);
        // punto exacto en el mesh
            const point = hit.point.clone();

            // normal en espacio local
            const normal = hit.face.normal.clone();

            // convertir normal a espacio mundo
            normal.transformDirection(hit.object.matrixWorld);

            // ahora tenés un vector con dirección de la normal
            console.log("punto:", point.toArray(), "normal:", normal.toArray());
            const dir = new THREE.Vector3().copy(normal); 
          //  rootBone.position.sub(dir.multiplyScalar(0.5));
        }
        });


        const time = this.experience.time;
        
        time.on("tick",()=>{

            wiggleBones.forEach((wiggleBone) => {
                wiggleBone.update();
            });
        });


    }
}