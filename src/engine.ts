export type Team = "home" | "away";
export type EventType = "normal" | "foul" | "offside" | "goal" | "penalty";

export interface PlayerState { id:number; team:Team; x:number; z:number; vx:number; vz:number; role:string; }
export interface MatchEvent { id:number; type:EventType; clock:number; title:string; description:string; x:number; z:number; reviewable:boolean; }

const HOME=[[-24,-42],[-8,-40],[8,-40],[24,-42],[-27,-18],[-9,-14],[9,-14],[27,-18],[-17,8],[17,8],[0,25],[0,0]];
const AWAY=[[-24,42],[-8,40],[8,40],[24,42],[-27,18],[-9,14],[9,14],[27,18],[-17,-8],[17,-8],[0,-25],[0,0]];

export class MatchEngine {
 players:PlayerState[]=[]; ball={x:0,z:0,vx:2.4,vz:7}; time=0; running=true; score={home:0,away:0}; events:MatchEvent[]=[]; private nextEvent=8; private nextId=1;
 constructor(){this.reset()}
 reset(){this.players=[];for(const [i,p] of HOME.entries())this.players.push({id:i,team:"home",x:p[0],z:p[1],vx:0,vz:0,role:i===0?"GK":i<4?"DEF":i<8?"MID":"ATT"});for(const [i,p] of AWAY.entries())this.players.push({id:i+20,team:"away",x:p[0],z:p[1],vx:0,vz:0,role:i===0?"GK":i<4?"DEF":i<8?"MID":"ATT"});this.ball={x:0,z:0,vx:2.4,vz:7};this.time=0;this.running=true;this.score={home:0,away:0};this.events=[];this.nextEvent=8;}
 step(dt:number){if(!this.running)return;this.time+=dt;const phase=Math.sin(this.time*.18);for(const p of this.players){const targetX=(p.team==="home"?-1:1)*(phase*8+Math.sin(this.time*.27+p.id)*5);const targetZ=p.team==="home"?(p.role==="ATT"?12:0):(p.role==="ATT"?-12:0);const dx=targetX-p.x,dz=targetZ-p.z,d=Math.hypot(dx,dz)||1;p.vx+=(dx/d*3-p.vx)*dt*1.5;p.vz+=(dz/d*3-p.vz)*dt*1.5;p.x+=p.vx*dt;p.z+=p.vz*dt;}this.ball.x+=this.ball.vx*dt;this.ball.z+=this.ball.vz*dt;this.ball.vx*=Math.pow(.985,dt*60);this.ball.vz*=Math.pow(.985,dt*60);if(Math.abs(this.ball.z)>52){this.ball.z=Math.sign(this.ball.z)*50;this.ball.vz*=-.65}if(Math.abs(this.ball.x)>34){this.ball.x=Math.sign(this.ball.x)*32;this.ball.vx*=-.7}if(this.time>=this.nextEvent){this.spawnIncident();this.nextEvent=this.time+7+Math.random()*9}}
 private spawnIncident(){const r=Math.random();const type:EventType=r<.28?"foul":r<.48?"offside":r<.56?"penalty":r<.65?"goal":"normal";if(type==="normal")return;const x=(Math.random()-.5)*52,z=(Math.random()-.5)*76;if(type==="goal"){const team=Math.random()<.5?"home":"away";this.score[team]++;this.events.unshift({id:this.nextId++,type,clock:this.time,title:"GOLO!",description:`Ataque concluído com gol do ${team==="home"?"mandante":"visitante"}.`,x,z,reviewable:true});return}const titles={foul:"POSSÍVEL FALTA",offside:"POSSÍVEL IMPEDIMENTO",penalty:"POSSÍVEL PÊNALTI"};this.running=false;this.events.unshift({id:this.nextId++,type,clock:this.time,title:titles[type],description:"O jogo foi pausado para análise da arbitragem.",x,z,reviewable:true})}
 resume(){this.running=true}
}