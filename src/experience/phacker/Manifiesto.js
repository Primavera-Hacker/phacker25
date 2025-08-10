import * as THREE from "three/webgpu";
import Experience from "../Experience";
import Raycast from "../utils/RayCast";
import { mx_bilerp_0 } from "three/src/nodes/materialx/lib/mx_noise.js";
import { isMobile } from "../utils/Utils";
import { gsap } from "gsap";
import EventEmitter from "../utils/EventEmitter";

export default class Manifiesto extends EventEmitter
{
    constructor()
    {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.init();
    }
    

    init()
    {

        this.interactive = true;


        const   html_manifiesto = document.getElementById("html_manifiesto");

        const   html_data = document.getElementById("div_data");



        const manifiesto_texture = this.resources.items.manifiesto;
      

        const   button_cerrar = document.getElementById("boton_cerrar_data");
        
     
        button_cerrar.addEventListener("click",(_evt)=>{
            this.hide_html();
        });

        const button_idioma = document.getElementById("boton_idioma");
        const texto_ingles = document.getElementById("texto_en");
        let isEnglish = false;
        button_idioma.addEventListener("click", () => {
            isEnglish = !isEnglish;
            html_manifiesto.style.display = isEnglish ? "none" : "block";
            texto_ingles.style.display = isEnglish ? "block" : "none";
            button_idioma.innerText = isEnglish ? "ESP" : "ENG";
        });

        const   sizes = {
            x:1,
            y:(manifiesto_texture.source.data.height/manifiesto_texture.source.data.width),
            z:1
        };

        

        const   geometry = new THREE.BoxGeometry(sizes.x,sizes.y,sizes.z);
        geometry.translate(0,sizes.y*.5,0);

        const   instance = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial());
        instance.scale.multiplyScalar(2.0);
        instance.position.y = 1.0;
        instance.castShadow = true;

        instance.material.metalness = 0.02;
        instance.material.roughness = 0.8;
        

        const   material = instance.material;

        
        material.map = manifiesto_texture;


        this.scene.add(instance);

        const debug_frame = new THREE.Mesh(new THREE.PlaneGeometry(sizes.x*2.0,sizes.y*2.0,1,1), new THREE.MeshBasicMaterial({
            color:new THREE.Color("white").multiplyScalar(4.0),
            wireframe:true
        }))
        debug_frame.geometry.translate(0,sizes.y,0);
        debug_frame.visible = false;

        this.scene.add(debug_frame);

        this.raycast = new Raycast();
        this.raycast.register(instance);


        const camera_controller = this.experience.camera.controller;

        this.raycast.on("hit",(_args)=>{
            if(_args.intersect && this.interactive)
            {
                const intersect = _args.intersect;
                debug_frame.visible = true;
                debug_frame.position.copy(intersect.object.position.clone().add(intersect.normal.clone().multiplyScalar(1.02)))
                debug_frame.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),intersect.normal)

                
                html_data.style.display = "flex";

                this.interactive = false;

                this.trigger("touch");

                const glitch =this.experience.renderer.postpro.glitch;

                camera_controller.go_to(
                    {
                        x:intersect.point.x,
                        y:intersect.point.y,
                        z:intersect.point.z 
                    },(_val)=>{
                         glitch.set_hide(_val);
                    },
                    ()=>{
                        this.show_html();
                    }
                );

           



            }

        })

        


    }



    hide_html()
    {
        const   html_data = document.getElementById("div_data");
        const glitch = this.experience.renderer.postpro.glitch;
        const camera_controller = this.experience.camera.controller;

        gsap.to(html_data, {
            opacity: 0.0,
            duration: 0.2,
            onComplete:()=>{
                this.interactive = true;
                html_data.style.display = "none";
            }
        });

        camera_controller.go_back();
        glitch.set_hide(0.0);

    }

    show_html()
    {
    
        const   html_data = document.getElementById("div_data");
        
        html_data.scrollTop =0;


        gsap.to(html_data, {
            opacity: 1.0,
            duration: 0.2
        });
       
    }



}