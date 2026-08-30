export type RefereeChoice='offside'|'foul'|'goal'|'none';
export interface CameraPreset{name:string;position:[number,number,number];target:[number,number,number]}
export interface RefereeStats{score:number;correct:number;incorrect:number}