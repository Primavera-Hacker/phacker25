import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter
{
    constructor()
    {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.animation = window.requestAnimationFrame(()=>{
            this.tick();
        });
    }

    tick()
    {
        const current_time = Date.now();
        this.delta = current_time - this.current;
        this.step = this.delta/1000;
        this.current = current_time;
        this.elapsed = this.current-this.start;
        this.trigger("tick");
        window.requestAnimationFrame(()=>{
            this.tick();
        })
    }

    destroy()
    {
        window.cancelAnimationFrame(this.animation);
        this.animation = null;
    }

   
}