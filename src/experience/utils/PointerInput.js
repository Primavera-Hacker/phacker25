import Experience from "../Experience";
import EventEmitter from "./EventEmitter";
import { isMobile } from "./Utils";



export default class PointerInput extends EventEmitter
{
    constructor()
    {
        super();
        this.experience = new Experience();

        function isMobile() {
            const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            return regex.test(navigator.userAgent);
        }
        this.is_mobile = isMobile();
        this.init();
       
    }

    init()
    {

        this.cursor = {
            "x":0.0,
            "y":0.0,

        };

        window.addEventListener('pointerdown', (event) =>
        {
            if(this.is_mobile == false && event.pressure > 0.0 || this.is_mobile){
                this.cursor.x = event.clientX / this.experience.sizes.width - 0.5
                this.cursor.y = event.clientY / this.experience.sizes.height - 0.5
                this.trigger("down",[this.cursor]);
            }
            
        });
        window.addEventListener('pointerexit', (event) =>
        {
            this.cursor.x = event.clientX / this.experience.sizes.width - 0.5;
            this.cursor.y = event.clientY / this.experience.sizes.height - 0.5;
            this.trigger("up",[this.cursor]);

        });

        window.addEventListener('pointerup', (event) =>
            {
                this.cursor.x = event.clientX / this.experience.sizes.width - 0.5;
                this.cursor.y = event.clientY / this.experience.sizes.height - 0.5;
                this.trigger("up",[this.cursor]);
    
            });

        window.addEventListener('pointermove', (event) =>
        {
            event.preventDefault();
            if(isMobile() == false && event.pressure > 0.0 || this.is_mobile){
              
            }
            this.cursor.x = event.clientX / this.experience.sizes.width - 0.5
            let ny =  event.clientY / this.experience.sizes.height - 0.5
            this.cursor.y = ny;
            this.trigger("move",[this.cursor]);
        },{ passive: false })

    }

    get()
    {
        return this.cursor;
    }


    
}