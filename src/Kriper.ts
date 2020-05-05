import * as THREE from './../dist/build/three.module.js';
import {TMousePosition} from "./main.js";
import {BoxGeometry, Group, Mesh, MeshBasicMaterial, Scene} from "/build/three.module.js";
import {MeshLambertMaterial} from "../dist/build/three.module.js";

export class Kriper {

    private readonly headMesh: Mesh;
    private blackMaterial: MeshBasicMaterial = new MeshLambertMaterial({
        color: 0x003300,
        wireframe: false,
        flatShading: true,
        opacity: .5
    })
    private greenMaterial: MeshBasicMaterial = new MeshLambertMaterial({
        color: 0x00cc00,
        wireframe: false,
        flatShading: true,
        opacity: .5
    })
    private legs: Group[] = [];
    private bodyMesh: Mesh;

    constructor(private scene: Scene) {
        const head: BoxGeometry = new THREE.BoxGeometry(20, 20, 20)
        const body: BoxGeometry = new THREE.BoxGeometry(10, 40, 10)
        const eye: BoxGeometry = new THREE.BoxGeometry(5, 5, 5)
        const mouthPart: BoxGeometry = new THREE.BoxGeometry(2.5, 5, 5)

        this.headMesh = new THREE.Mesh(head, this.greenMaterial);
        const leftEyeMesh: Mesh = new THREE.Mesh(eye, this.blackMaterial);
        const rightEyeMesh: Mesh = new THREE.Mesh(eye, this.blackMaterial);
        const mouthPart1Mesh: Mesh = new THREE.Mesh(mouthPart, this.blackMaterial);
        const mouthPart2Mesh: Mesh = new THREE.Mesh(mouthPart, this.blackMaterial);
        const mouthPart3Mesh: Mesh = new THREE.Mesh(mouthPart, this.blackMaterial);
        const mouth: Group = new THREE.Group();
        const leg1: Group = this.getLegGroup(-5, -40, -5);
        const leg2: Group = this.getLegGroup(-5, -40, 5);
        const leg3: Group = this.getLegGroup(5, -40, 5);
        const leg4: Group = this.getLegGroup(5, -40, -5);
        mouth.add(mouthPart1Mesh);
        mouth.add(mouthPart2Mesh);
        mouth.add(mouthPart3Mesh);
        mouthPart1Mesh.position.x -= 2.5;
        mouthPart3Mesh.position.x += 2.5;
        mouthPart1Mesh.position.y -= 5;
        mouthPart2Mesh.position.y -= 2.5;
        mouthPart3Mesh.position.y -= 5;
        mouthPart1Mesh.position.z += 10;
        mouthPart2Mesh.position.z += 10;
        mouthPart3Mesh.position.z += 10;
        this.bodyMesh = new THREE.Mesh(body, this.greenMaterial);
        leftEyeMesh.position.z += 10;
        leftEyeMesh.position.x += 5;
        leftEyeMesh.position.y += 2;
        rightEyeMesh.position.z += 10;
        rightEyeMesh.position.x -= 5;
        rightEyeMesh.position.y += 2;
        this.bodyMesh.position.y = -20;
        const kriper: Group = new THREE.Group()
        this.headMesh.add(leftEyeMesh);
        this.headMesh.add(rightEyeMesh);
        this.headMesh.add(mouth);
        kriper.add(this.headMesh)
        kriper.add(this.bodyMesh)
        kriper.add(leg1)
        kriper.add(leg2)
        kriper.add(leg3)
        kriper.add(leg4)
        this.legs.push(leg1)
        this.legs.push(leg2)
        this.legs.push(leg3)
        this.legs.push(leg4)
        scene.add(kriper);
        kriper.traverse(function (object) {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
        kriper.position.y -= 0;
        kriper.position.z = 100;
    }

    private getLegGroup(x: number, y: number, z: number) {
        let group = new THREE.Group();
        const leg: BoxGeometry = new THREE.BoxGeometry(5, 10, 5)
        const bottomPart: BoxGeometry = new THREE.BoxGeometry(5, 5, 5)
        const bodyMesh: Mesh = new THREE.Mesh(leg, this.greenMaterial);
        const bottomPartMesh: Mesh = new THREE.Mesh(bottomPart, this.blackMaterial);
        bodyMesh.position.y += 10;
        bottomPartMesh.position.y += 5;
        bottomPartMesh.position.z += 2;
        group.add(bodyMesh)
        group.add(bottomPartMesh)
        group.position.set(x, y - 10, z);
        return group;
    }

    animate(mousePos: TMousePosition) {
        let expectedY = ((mousePos.x / innerWidth) - .5) * 2;
        let expectedX = ((mousePos.y / innerHeight) - .5) * 2;
        this.headMesh.rotation.y += (expectedY - this.headMesh.rotation.y) * .25;
        this.headMesh.rotation.x += (expectedX - this.headMesh.rotation.x) * .25

        this.bodyMesh.rotation.y += (expectedY / 4 - this.bodyMesh.rotation.y) * .25;
        this.bodyMesh.rotation.x += (-expectedX / 4 - this.bodyMesh.rotation.x) * .25;
        for (const leg of this.legs) {
            leg.rotation.y += (-expectedY / 8 - leg.rotation.y) * .25;
            leg.rotation.x += (expectedX / 8 - leg.rotation.x) * .25;
        }
    }
}