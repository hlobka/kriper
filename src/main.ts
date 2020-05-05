import * as THREE from '/build/three.module.js'
import {Kriper} from "./Kriper.js";
// import { OrbitControls } from '/jsm/controls/OrbitControls.js'

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)
export type TMousePosition = {
    x, y:number;
}
document.addEventListener('mousemove', handleMouseMove, false);
let mousePos:TMousePosition = {x:0, y:0};
function handleMouseMove(event) {
    mousePos = {x:event.clientX, y:event.clientY};
}

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(20,20,20)
const material: THREE.MeshBasicMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    wireframe: false,
    flatShading:true,
    opacity:.5
})

const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;

// scene.add(cube);
// cube.material.
cube.position.z = 160;
camera.position.z = 200;
camera.position.x = 0;
camera.position.y = 0;
createLights();
createFloor();
let kriper = new Kriper(scene);
function createLights() {
    let light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)

    let shadowLight = new THREE.DirectionalLight(0xffffff, .8);
    shadowLight.position.set(200, 200, 200);
    shadowLight.castShadow = true;
    // @ts-ignore
    shadowLight.shadowDarkness = .2;

    let backLight = new THREE.DirectionalLight(0xffffff, .4);
    backLight.position.set(-100, 200, 50);
    // @ts-ignore
    backLight.shadowDarkness = .1;
    backLight.castShadow = true;

    scene.add(backLight);
    scene.add(light);
    scene.add(shadowLight);
}
function createFloor(){
    let floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,500), new THREE.MeshBasicMaterial({color: 0xebe5e7}));
    floor.rotation.x = -Math.PI/2;
    floor.position.y = -100;
    floor.receiveShadow = true;
    scene.add(floor);
}
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

var animate = function () {
    requestAnimationFrame(animate)
    kriper.animate(mousePos)
    // cube.rotation.y = ((mousePos.x/innerWidth)-.5)*2;
    // cube.rotation.x = ((mousePos.y/innerHeight)-.5)*2;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z -= 0.01;
    // camera.position.z += .001;
    // controls.update()

    render()
};

function render() {
    renderer.render(scene, camera)
}

animate();