import * as THREE from "/build/three.module.js";
import {Group, Mesh} from "/build/three.module.js";
import {TMousePosition} from "./main.js";

export class Kriper {

    private readonly headMesh: THREE.Mesh;
    private blackMaterial: THREE.MeshBasicMaterial = new THREE.MeshLambertMaterial({
        color: 0x003300,
        wireframe: false,
        flatShading: true,
        opacity: .5
    })
    private greenMaterial: THREE.MeshBasicMaterial = new THREE.MeshLambertMaterial({
        color: 0x00cc00,
        wireframe: false,
        flatShading: true,
        opacity: .5
    })
    private legs: Group[] = [];
    private bodyMesh: Mesh;

    constructor(private scene: THREE.Scene) {
        const head: THREE.BoxGeometry = new THREE.BoxGeometry(20, 20, 20)
        const body: THREE.BoxGeometry = new THREE.BoxGeometry(10, 40, 10)
        const eye: THREE.BoxGeometry = new THREE.BoxGeometry(5, 5, 5)
        const mouthPart: THREE.BoxGeometry = new THREE.BoxGeometry(2.5, 5, 5)

        this.headMesh = new THREE.Mesh(head, this.greenMaterial);
        const leftEyeMesh: THREE.Mesh = new THREE.Mesh(eye, this.blackMaterial);
        const rightEyeMesh: THREE.Mesh = new THREE.Mesh(eye, this.blackMaterial);
        const mouthPart1Mesh: THREE.Mesh = new THREE.Mesh(mouthPart, this.blackMaterial);
        const mouthPart2Mesh: THREE.Mesh = new THREE.Mesh(mouthPart, this.blackMaterial);
        const mouthPart3Mesh: THREE.Mesh = new THREE.Mesh(mouthPart, this.blackMaterial);
        const mouth: Group = new Group();
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
        const kriper: THREE.Group = new THREE.Group()
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
        let group = new Group();
        const leg: THREE.BoxGeometry = new THREE.BoxGeometry(5, 10, 5)
        const bottomPart: THREE.BoxGeometry = new THREE.BoxGeometry(5, 5, 5)
        const bodyMesh: THREE.Mesh = new THREE.Mesh(leg, this.greenMaterial);
        const bottomPartMesh: THREE.Mesh = new THREE.Mesh(bottomPart, this.blackMaterial);
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