import * as THREE from 'three';
export const broadcast=new THREE.Vector3(0,58,48);
export function followCamera(camera:THREE.PerspectiveCamera,target:THREE.Vector3,close=false){const desired=close?new THREE.Vector3(target.x,25,target.z+24):broadcast;camera.position.lerp(desired,.08);camera.lookAt(target.x,0,target.z)}