// Tracks transport health only. It never changes credentials or refreshes QR codes.
export class QqConnectionMonitor {
 constructor(){this.failures=0;this.attempts=0;this.busy=false;}
 delay(){return Math.min(120000,5000*2**Math.min(5,this.attempts++));}
 healthy(){this.failures=0;this.attempts=0;}
 async probe({status,identity,expected,disconnect}){
  if(this.busy)return {skipped:'busy'};this.busy=true;
  try{const s=await status();if(s?.online!==true)throw Error('QQ is offline');const i=await identity();if(String(i?.user_id)!==String(expected))throw Error('QQ account mismatch');this.healthy();return {verified:true};}
  catch{this.failures++;if(this.failures>=2){this.failures=0;disconnect();return {verified:false,reconnecting:true};}return {verified:false,reconnecting:false};}
  finally{this.busy=false;}
 }
}
