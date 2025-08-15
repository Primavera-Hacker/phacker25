
import * as THREE from "three/webgpu";
import Experience from "../Experience";
import { billboarding, modelPosition, modelViewMatrix, positionGeometry, positionLocal, positionView, uv, vec2, vec4,vec3, viewportUV, uniform, max, float, abs, length, min, smoothstep, texture, alphaT, depth } from "three/tsl";
import { BackSide, DoubleSide } from "three";

export default class RoundedMask
{
    constructor()
    {
        this.experience = new Experience();
        this.init();
    }

    init()
    {

        const {scene,sizes} = this.experience;

        const instance = new THREE.Mesh(
            new THREE.PlaneGeometry(2,2,2,2),
            new THREE.MeshBasicNodeMaterial()
        );

        const material = instance.material;
        material.depthTest = false;

        material.transparent = true;
        

        const u_resolution = uniform(new THREE.Vector2(sizes.width, sizes.height));
        const aspect = u_resolution.x.div(u_resolution.y);

        const r_px         = uniform(10.0);   // radio esquina px
        const thickness_px = uniform(1.0);    // grosor borde px
        const aa_px        = uniform(1.5);    // anti-alias px

        const px2ndc  = float(2.0).div(u_resolution.y);
        const r       = r_px.mul(px2ndc);
        const t_ndc   = thickness_px.mul(px2ndc);
        const aa_ndc  = aa_px.mul(px2ndc);

        const half_size = vec2(aspect.mul(0.99), 0.7);

        const p = uv()
            .add(vec2(0.0, 0.05))
            .mul(2.0)
            .sub(1.0)
            .mul(vec2(aspect, 1.0));

        const b   = half_size.sub(vec2(r));
        const q   = abs(p).sub(b);
        const sdf = length(max(q, vec2(0.0))).sub(r);

        const fill = sdf.step(0.0).oneMinus();

        const border = smoothstep(t_ndc.add(aa_ndc), t_ndc.sub(aa_ndc), abs(sdf));

        const d_box = max(fill, border);  // relleno + borde

        material.vertexNode = vec4(positionGeometry.x,positionGeometry.y,0.0,1.0);
        const color = vec3(1.0);
        material.colorNode = vec4(color,d_box);
        

        scene.add(instance);

        this.experience.resources.items.logo.colorSpace = THREE.SRGBColorSpace;
        const logo_texture = texture(this.experience.resources.items.logo);
        const aspect_logo = this.experience.resources.items.logo.source.data.height/this.experience.resources.items.logo.source.data.width;
        const _aspect = this.experience.sizes.width / this.experience.sizes.height ;
           
        const logo_instance = new THREE.Mesh(
            new THREE.PlaneGeometry(2,2*aspect_logo,1),
            new THREE.MeshBasicNodeMaterial({
                transparent:true,
                depthTest:true,
                depthWrite:false
            })
        );
        logo_instance.geometry.translate(0,-2*aspect_logo*.5,0);
        logo_instance.renderOrder = 1;
        const u_aspect =  uniform(_aspect);

        const n = vec3(logo_texture.r);

        const logo_material = logo_instance.material;
        logo_material.colorNode =logo_texture
        const cuenta = positionGeometry.y.mul(u_aspect);
        logo_material.vertexNode = vec4(positionGeometry.x,cuenta.add(1.0),0.0,1.0);
        
        scene.add(logo_instance);


        this.experience.sizes.on("resize",()=>{
            const _aspect = this.experience.sizes.width / this.experience.sizes.height ;
            u_aspect.value = _aspect;
        });


    }    
}