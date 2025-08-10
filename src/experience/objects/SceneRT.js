import * as THREE from "three/webgpu";
import Experience from "../Experience";
import { normalLocal, positionWorld, vec3, vec4 } from "three/tsl";


export default class SceneRt
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.init();
    }

    init()
    {

        //  camara que mira de arriba para 
        //  50 tamaño de escena, luego lo usa en el shader
        const size = 10;
        const collisionCamera = new THREE.OrthographicCamera( - size, size, size, - size, .1, 100 );
        
        collisionCamera.position.y = 2;
        collisionCamera.lookAt( 0, 0, 0 );
        collisionCamera.layers.enable( 1 );

        const width = 1024;
        const height = width;

        const collisionPosRT = new THREE.RenderTarget(width,height,{
    //        internalFormat:"rgb16float"
         });
        collisionPosRT.texture.type = THREE.HalfFloatType;
        collisionPosRT.texture.magFilter = THREE.NearestFilter;
        collisionPosRT.texture.minFilter = THREE.NearestFilter;
        collisionPosRT.texture.generateMipmaps = false;

        const collisionPosMaterial = new THREE.MeshBasicMaterial();
        collisionPosMaterial.fog = false;
        collisionPosMaterial.toneMapped = false;
        collisionPosMaterial.colorNode = vec4(positionWorld.y,normalLocal.x,normalLocal.y,normalLocal.z);


        function    update()
        {

            if(this.renderer.instance)
            {
                const renderer = this.renderer.instance;
                
                this.scene.overrideMaterial = collisionPosMaterial;
                renderer.setRenderTarget(collisionPosRT);
                renderer.renderAsync(this.scene, collisionCamera);

                this.scene.overrideMaterial = null;
                renderer.setRenderTarget(null);

                //  compute

                ///

            }

        }
        this.update = update;

        this.get_texture = () =>
        {
            return collisionPosRT.texture;
        }
        

    }
}