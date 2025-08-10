
import * as THREE from 'three';
import Experience from '../Experience.js';
import GridFloor from './GridFloor.js';
import ParticleSystem from './ParticleSystem.js';
import Texto from './Texto.js';


export default class GWorld {

    constructor()
    {
        this.experience = new Experience();
        
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.controller = this.experience.controller;  
        this.renderer = this.experience.renderer.instance; 

        this.resources.on("ready",()=>{
            this.ready();
        });
    }

    ready()
    {

        this.floor = new GridFloor(100, 1, 0x000000);


        this.texto = new Texto();

        this.particles = new ParticleSystem();

        


    }

    update()
    {
        if(this.particles)
            this.particles.update();
    }

}