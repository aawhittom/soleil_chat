	import * as THREE from 'three';

			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
			import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

			let camera, controls, scene, renderer;
			let chat;

			init();
			//render(); // remove when using animation loop

			function init() {

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xe6eee0, 0);
				
				//scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

				renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( animate );
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( -90, 60,60);

				// controls

				controls = new OrbitControls( camera, renderer.domElement );
				controls.listenToKeyEvents( window ); // optional

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;

				controls.screenSpaceRotate = true;
				controls.screenSpacePanning = true;

				controls.minDistance = 14;
				controls.maxDistance = 15;

				controls.maxPolarAngle = Math.PI;

				//Load Glb
				const loader = new GLTFLoader();
				loader.load( './cat_high.glb', function ( glb ) {
					chat = glb.scene;
					//console.log(glb.scene.children[0].name);
					scene.add(chat);

				}, undefined, function ( error ) {

				console.error( error );

				} );

				

				// world
				/*
				const geometry = new THREE.ConeGeometry( 10, 30, 4, 1 );
				//const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

				//for ( let i = 0; i < 500; i ++ ) {

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 1600 - 800;
					mesh.position.y = 0;
					mesh.position.z = Math.random() * 1600 - 800;
					mesh.updateMatrix();
					mesh.matrixAutoUpdate = false;
					scene.add( mesh );

				}
					*/

				// lights

				const dirLight1 = new THREE.DirectionalLight( 0xe6eee0, 5);
				dirLight1.position.set( 1, 1, 1 );
				scene.add( dirLight1 );

				const dirLight2 = new THREE.DirectionalLight( 0x554ef0, 3 );
				dirLight2.position.set( - 1, - 1, - 1 );
				scene.add( dirLight2 );

				const ambientLight = new THREE.AmbientLight( 0xe6eee0, );
				scene.add( ambientLight );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame(animate);

				controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
				chat.rotation.y += 0.01*0.5;

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

		



