import Experience from "../Experience";
import * as THREE from "three/webgpu";
import gsap from "gsap";

export  default class CameraController
{
    constructor()
    {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
   
    }

    go_back()
    {
        const camera = this.camera.instance;

        gsap.to(camera.position,{
            x:this.prev_position.x,
            y:this.prev_position.y,
            z:10.0,
            duration:1.0
        });

        this.camera.controls.enabled = true;
        this.camera.controls.autoRotate = true;
    }

    go_to(_pos,_on_update = null,_on_complete = null)
    {
        
        
        this.camera.controls.enabled = false;
        this.camera.controls.autoRotate = false;
        const camera = this.camera.instance;
        this.prev_position = new THREE.Vector3().copy(camera.position);

        gsap.to(camera.position,{
            x:_pos.x,
            y:_pos.y,
            z:_pos.z,
            duration:1.0,
            onUpdate:function () {
                if(_on_update)
                {
                    _on_update(this.progress());
                }
            },
            onComplete:function () {
                if(_on_complete)
                {
                    _on_complete();
                }
            }
        });


    }


}