import type {MatchEvent,PlayerState} from './engine';
export function nearestPlayer(players:PlayerState[],x:number,z:number){return players.reduce((best,p)=>Math.hypot(p.x-x,p.z-z)<Math.hypot(best.x-x,best.z-z)?p:best,players[0])}
export function decisionFor(event:MatchEvent,choice:string){if(event.type==='offside')return choice==='offside';if(event.type==='foul'||event.type==='penalty')return choice==='foul';if(event.type==='goal')return choice==='goal';return false}
export const labels={offside:'Impedimento',foul:'Falta / pênalti',goal:'Validar gol',none:'Sem infração'};