import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import { DRACOLoader, Font, FontLoader, GLTFLoader, RGBELoader, TTFLoader } from "three/examples/jsm/Addons.js";

export default class Resources extends EventEmitter
{
    constructor(_sources)
    {
        super();
        this.sources = _sources;

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();

    }

    setLoaders()
    {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.hdrLoader = new RGBELoader();
        this.loaders.ttfLoader = new TTFLoader();
        this.loaders.fontLoader = new FontLoader();

        this.loaders.cubemap_loader = new THREE.CubeTextureLoader()

    }

    startLoading()
    {
        for(const source of this.sources)
        {
            if(source.type == "hdr")
            {
                this.loaders.hdrLoader.load(source.path,(_file)=>{
                    _file.mapping = THREE.EquirectangularReflectionMapping;
            
                    this.sourceLoaded(source,_file);
                });
            }else if(source.type == "gltf")
            {
                this.loaders.gltfLoader.load(source.path,(_file)=>{
                    this.sourceLoaded(source,_file);

                });
            }else if(source.type == "texture"){
                this.loaders.textureLoader.load(source.path,(_file,_err)=>{
                    this.sourceLoaded(source,_file);
                });
            }else if(source.type == "draco"){
                this.loaders.dracoLoader.load(source.path,(_file)=>{
                    this.sourceLoaded(source,_file);
                });
            }else if(source.type == "cubemap"){
                this.loaders.cubemap_loader.load([
                    source.path+"/px.png",
                    source.path+"/nx.png",
                    source.path+"/py.png",
                    source.path+"/ny.png",
                    source.path+"/pz.png",
                    source.path+"/nz.png"
                ],(_file)=>{
                    _file.colorSpace = THREE.SRGBColorSpace;

                    this.sourceLoaded(source,_file)
                });
            }else if(source.type == "font"){
                this.loaders.fontLoader.load(source.path,(_file)=>{
                    this.sourceLoaded(source,_file);
                });
            }else if(source.type == "ttf"){
                this.loaders.ttfLoader.load(source.path,(_file)=>{
                    this.sourceLoaded(source,new Font(_file));
                });
            }
        }   

    }

    sourceLoaded(_source,_file)
    {
        this.items[_source.name] = _file;
        this.loaded++;
     
        if(this.loaded == this.toLoad)
        {
            this.trigger("ready");
        }
    }

}

/*    const rgbeLoader = new RGBELoader().setPath( url_cube );
    rgbeLoader.load("rosendal_plains_2_2k.hdr",(_data)=>{
        _data.mapping = THREE.EquirectangularReflectionMapping;
        _data.colorSpace = THREE.SRGBColorSpace
        AppData.environment = _data;
        createScene();


    });

   */