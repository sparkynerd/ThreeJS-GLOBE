import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import './style.css'


// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );






// Globe

const geometry = new THREE.SphereGeometry( 1,100,100 );
const material = new THREE.MeshStandardMaterial( {
  map: new THREE.TextureLoader().load('./globe.jpeg')
});


const flatGeo = new THREE.BoxGeometry();

const loader = new THREE.CubeTextureLoader();

// loader.setPath( './square' );

const textureCube = loader.load( [
	'./square/pixilart-drawing.png', './square/pixilart-drawing.png',
	'./square/pixilart-drawing.png', './square/pixilart-drawing.png',
	'./square/pixilart-drawing.png', './square/pixilart-drawing.png'
] );

const flatTex = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );


const flatMaterial = new THREE.MeshStandardMaterial( {
  map: flatTex,
})

const flatCube = new THREE.Mesh(flatGeo, flatMaterial);

const cube = new THREE.Mesh( geometry, material );


// OrbitControls

const controls = new OrbitControls(camera, renderer.domElement);


const ambientLight = new THREE.AmbientLight({color: 0x404040 })
scene.add(ambientLight)

const answer = window.prompt("Is the earth flat? [y,n]")

if (answer == "y") {scene.add( flatCube )}
else if (answer == "n") {scene.add( cube );};

camera.position.z = 5;

let stars = []

const addStar = () => {

  const starGeo = new THREE.SphereGeometry(.5, 1, 1);
  const starMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const star = new THREE.Mesh(starGeo, starMaterial);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
  stars.push(star)
}
for (let i = 0; i!=40; i++) {
  Array(i).fill().forEach(addStar)
}

console.log(stars)


const animate = () => {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	flatCube.rotation.x += 0.01;
	flatCube.rotation.y += 0.01;

  // for (let i = 0; i!= 20; i++ ){
  //   for (let j = 0; j!=stars.length; j++){
  //       stars[j].position.x += 0.1;
  //   }
  // }

  for (let i = 0; i != stars.length; i++ ){
    let moveStar = stars[i].position;
    moveStar.x += 0.005;
  }





  controls.update();

	renderer.render(scene, camera);
};

animate();