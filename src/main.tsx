import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import './style.css';

function App() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mount.current) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07111d);
    const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(0, 34, 27);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true; mount.current.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x18304a, 2.2));
    const sun = new THREE.DirectionalLight(0xffffff, 2.5); sun.position.set(10, 30, 8); sun.castShadow = true; scene.add(sun);

    const pitch = new THREE.Mesh(new THREE.BoxGeometry(68, .25, 105), new THREE.MeshStandardMaterial({ color: 0x176b3a, roughness: .9 }));
    pitch.receiveShadow = true; scene.add(pitch);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    const lines = new THREE.Group();
    const addLine = (pts: [number,number,number][]) => { const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p))); lines.add(new THREE.Line(g, lineMat)); };
    const w=68/2, h=105/2, y=.16;
    addLine([[-w,y,-h],[w,y,-h],[w,y,h],[-w,y,h],[-w,y,-h]]); addLine([[-w,y,0],[w,y,0]]);
    addLine([[-16.5,y,-h],[16.5,y,-h],[16.5,y,-h+16.5],[-16.5,y,-h+16.5],[-16.5,y,-h]]);
    addLine([[-16.5,y,h],[16.5,y,h],[16.5,y,h-16.5],[-16.5,y,h-16.5],[-16.5,y,h]]);
    const circle = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({length:65},(_,i)=>new THREE.Vector3(Math.cos(i*Math.PI*2/64)*9.15,y,Math.sin(i*Math.PI*2/64)*9.15))),lineMat); lines.add(circle); scene.add(lines);

    const ball = new THREE.Mesh(new THREE.SphereGeometry(.85,24,16), new THREE.MeshStandardMaterial({color:0xffffff})); ball.position.set(0,.95,0); ball.castShadow=true; scene.add(ball);
    const players: THREE.Mesh[]=[];
    const makePlayer=(x:number,z:number,color:number)=>{ const p=new THREE.Mesh(new THREE.CapsuleGeometry(.65,1.25,4,10),new THREE.MeshStandardMaterial({color})); p.position.set(x,1.2,z); p.castShadow=true; scene.add(p); players.push(p); };
    [-22,-10,4,18].forEach((z,i)=>makePlayer(-20,z,0x2563eb)); [-25,-12,2,15,25].forEach((z)=>makePlayer(20,z,0xef4444));
    [-30,-8,10,28].forEach(z=>makePlayer(0,z,0xf8fafc));

    const animate=()=>{ requestAnimationFrame(animate); const t=performance.now()/1000; ball.position.x=Math.sin(t*.7)*7; ball.position.z=Math.cos(t*.55)*10; players.forEach((p,i)=>{p.position.x += Math.sin(t*.35+i)*.006;}); renderer.render(scene,camera); }; animate();
    const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)}; addEventListener('resize',resize);
    return ()=>{removeEventListener('resize',resize);renderer.dispose();mount.current?.removeChild(renderer.domElement)};
  },[]);
  return <div className="game"><div ref={mount} className="canvas"/><header><div><strong>EYES OF THE MATCH</strong><span> • PROTÓTIPO 3D</span></div><div className="score">FLA <b>0 — 0</b> VAS</div></header><div className="hud"><div className="clock">27:43</div><div className="event">SIMULAÇÃO EM ANDAMENTO</div><button>⏸ PAUSAR</button><button>📺 VAR</button></div></div>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
