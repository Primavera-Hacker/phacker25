import Experience from "../Experience";
import EventEmitter from "./EventEmitter";

export default class KeyboardInput extends EventEmitter
{
    constructor()
    {
        super();
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.listenKeys = {
            "w":false,
            "a":false,
            "s":false,
            "d":false
        }
        this.onKeyDownCallback = (_evt) => {
            this.onKeyDown(_evt);
        };
        this.onKeyUpCallback = (_evt) => {
            this.onKeyUp(_evt);
        }
        window.addEventListener("keydown",this.onKeyDownCallback);
        window.addEventListener("keyup",this.onKeyUpCallback);
        this.keyDown = false;
        this.keyDownBang = false;

    }
    
    onKeyDown(_evt)
    {
        this.keyDown = true;
        if(this.listenKeys[_evt.key] != undefined){
            this.listenKeys[_evt.key] = true;
            this.trigger("keydown",_evt);
        }
    }

    onKeyUp(_evt)
    {
        if(this.listenKeys[_evt.key] != undefined){
            this.listenKeys[_evt.key] = false;
            this.trigger("keyup",_evt);
        }
        let count_down = 0;
        for(const key in this.listenKeys)
        {
            if(this.listenKeys[key])
            {
                count_down++;
            }
        }
        if(count_down == 0)
        {
            this.keyDown = false;
        }
    }

    keyPressed(_key)
    {
        return this.listenKeys[_key] ?? false;
    }

    destroy()
    {
        window.removeEventListener("keydown",this.onKeyDownCallback)
    }
}