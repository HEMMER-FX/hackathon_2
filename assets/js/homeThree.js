import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';


let camera, scene, renderer, labelRenderer;

let controls, dirLight, light;

function init() {
    
    //SCENE and CAMERA
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set(-1, 6, 7);
   
        
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xD7D7BF );


        let light = new THREE.PointLight(0xffffff, 1.4, 100)
        light.position.set(0,3,2);
        scene.add(light);
       
        const mtlLoader = new MTLLoader();
        

        mtlLoader.setPath( "Object3D/" );

        mtlLoader.load( 'Fivverr.mtl', function( materials ) {

            materials.preload(); 
            const loader = new OBJLoader(); 

            loader.setMaterials( materials );
            loader.setPath( "Object3D/" );
            loader.load( 'Fivverr.obj', function ( object ) {
            
                object.position.set(.1,.1,.1);
                object.scale.set( .04, .04, .04 );    
                scene.add( object );

            })
        });
 


        

        //LINK HTML
        let forum = document.createElement( 'a' );
        forum.href = "http://localhost:8000/sujet";
        forum.textContent = 'Salon';
        const divSalon = document.createElement( 'div' );
        divSalon.className = 'nav-link';
        divSalon.appendChild(forum);
        const salonRend = new CSS2DObject( divSalon );
        salonRend.position.set( 10, 1.1, -3);
        scene.add( salonRend ); 

         //logout
         let logIn = document.createElement( 'a' );
         logIn.href = "http://localhost:8000/logout";
         logIn.textContent = 'LogOut';
         const divLogIn = document.createElement( 'div' );
         divLogIn.className = 'nav-link';
         divLogIn.appendChild(logIn);
         const logInRend = new CSS2DObject( divLogIn );
         logInRend.position.set( 5, 1, 1);
         scene.add( logInRend );

         //projets
         let projet = document.createElement( 'a' );
         projet.href = "http://localhost:8000/projet";
         projet.textContent = 'Projets';
         const divProjet = document.createElement( 'div' );
         divProjet.className = 'nav-link';
         divProjet.appendChild(projet);
         const projetRend = new CSS2DObject( divProjet );
         projetRend.position.set( -6, 2.5, -8);
         scene.add( projetRend );


        //RENDERER  

        // WebGl
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        //Css2d
        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize( window.innerWidth ,window.innerHeight);
        labelRenderer.domElement.classList.add('link');
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        document.body.appendChild( labelRenderer.domElement );
        
        
        //orbitControl
        controls = new OrbitControls( camera, labelRenderer.domElement ); 
        // vertical angle control
        controls.minPolarAngle = -Math.PI / 4;
        controls.maxPolarAngle = Math.PI / 2.5;
        // horizontal angle control
        controls.minAzimuthAngle = -Math.PI/3 ; 
        controls.maxAzimuthAngle = Math.PI/3 ;
        // min / max Zoom
        controls.minDistance = 5;
        controls.maxDistance = 12;
        // Do not Drag
        controls.enablePan = false; 
        controls.update();

}


window.addEventListener('resize', ()=>{
    renderer.setSize( window.innerWidth ,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
})


// ANIMATE FUNCTION (re-renderer)
const animate = function () {
    requestAnimationFrame( animate );

    controls.update();
    renderer.render( scene, camera );
    labelRenderer.render( scene, camera );
};

if (document.querySelector('.home')){
    init();
    animate(); 
}
