import { TransformControls } from "three/examples/jsm/Addons.js";
import Experience from "../Experience";


export default class Gizmo3D
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.renderer = this.experience.renderer.instance;
    }

    attach(_object)
    {
        this.control = new TransformControls(this.camera.instance,this.renderer.domElement);
        this.control.attach(_object);
        this.scene.add(this.control.getHelper());
       
        this.control.addEventListener('dragging-changed',(event)=>{
            if(this.camera.controls)
            {
                this.camera.controls.enabled = !event.value;
            }
        });

    }

    
}