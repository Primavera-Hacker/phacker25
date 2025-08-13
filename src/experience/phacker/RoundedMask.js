
import * as THREE from "three/webgpu";
import Experience from "../Experience";
import { billboarding, modelPosition, modelViewMatrix, positionGeometry, positionLocal, positionView, uv, vec2, vec4,vec3, viewportUV, uniform, max, float, abs, length, min, smoothstep } from "three/tsl";
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

        const half_size = vec2(aspect.mul(0.99), 0.5);

        const p = uv()
            .add(vec2(0.0, 0.23))
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
        

        scene.add(instance)


    }    
}