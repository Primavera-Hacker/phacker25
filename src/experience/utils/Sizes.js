import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio,1);
        
        this.resize_callback = () => {
            this.resize();
        }
        
        window.addEventListener("resize", this.resize_callback);
    }

    resize()
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
     //   this.pixelRatio = Math.min(window.devicePixelRatio,1);
        this.trigger("resize");
    }

    destroy()
    {
        window.removeEventListener("resize",this.resize_callback);
    }
}