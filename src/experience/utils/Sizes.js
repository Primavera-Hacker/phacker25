import EventEmitter from "./EventEmitter";
import getCanvasSize from "./getCanvasSize";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    const { canvasWidth, canvasHeight } = getCanvasSize();
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 1.0);

    this.resize_callback = () => {
      this.resize();
    };

    window.addEventListener("resize", this.resize_callback);
  }

  resize() {
    const { canvasWidth, canvasHeight } = getCanvasSize();
    this.width = canvasWidth;
    this.height = canvasHeight;
    //   this.pixelRatio = Math.min(window.devicePixelRatio,1);
    this.trigger("resize");
  }

  destroy() {
    window.removeEventListener("resize", this.resize_callback);
  }
}
