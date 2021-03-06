import * as THREE from 'three';
import { OrbitControls } from '../../three.js/examples/jsm/controls/OrbitControls';

const mouse = new THREE.Vector2( 1, 1 );

let mesh;

const amount = 6;
const count = Math.pow(amount, 3);
const dummy = new THREE.Object3D();
const middle = window.innerWidth / window.innerHeight;

let camera = new THREE.PerspectiveCamera(60, middle, 0.1, 100);
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.set(4, 4, 15);
camera.lookAt(0, 0, 0);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

controls.minPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI/2;
controls.enableZoom = false;
controls.autoRotate = true;

const loader = new THREE.BufferGeometryLoader();
loader.load('dist/models/json/suzanne_buffergeometry.json', geometry => {

  geometry.computeVertexNormals();
  geometry.scale(0.5, 0.5, 0.5);

  const material = new THREE.MeshNormalMaterial();

  mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame

  scene.add(mesh);

});

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize);
animate();

function onWindowResize() {
  camera.aspect = middle;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  if (mesh) {
    mesh.rotation.y += .01;

    let i = 0;
    const offset = (amount-1)/2;

    for (let x = 0; x < amount; x ++) {
      for (let y = 0; y < amount; y ++) {
        for (let z = 0; z < amount; z ++) {
          dummy.position.set(offset - x, offset - y, offset - z);
          dummy.updateMatrix();
          mesh.setMatrixAt(i ++, dummy.matrix);
        }
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
  }

  renderer.render(scene, camera);
}
