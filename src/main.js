import { BoxGeometry, Mesh, MeshBasicMaterial,  PerspectiveCamera, Scene, WebGLRenderer } from 'three';


const center = window.innerWidth / window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, center, 0.1, 1000);
const renderer = new WebGLRenderer({ antialias: true });

const geometry = new BoxGeometry(3, 3, 3);
const material = new MeshBasicMaterial({ color: 0x0000ff });

const cube = new Mesh(geometry, material);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

scene.add(cube);
camera.position.z = 5;



function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  cube.rotation.y += -0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = center;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

animate();
