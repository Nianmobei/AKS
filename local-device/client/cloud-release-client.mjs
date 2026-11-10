// A small memory cache avoids opening an SSH connection for every UI status poll.
export function createCloudReleaseReader(request,{clock=Date.now,ttlMs=300000}={}){
 let cached=null,expires=0,pending=null;
 return async()=>{
  if(cached&&clock()<expires)return cached;
  if(pending)return pending;
  pending=(async()=>{const health=await request('health');
   if(!health.ok||health.release?.authority!=='cloud'||health.release.protocol!=='aks-cloud/1')throw Error('云端尚未发布统一版本信息');
   cached={...health.release,bridgeProtocol:1,compatible:health.release.minimumBridgeProtocol<=1,source:'cloud-health'};expires=clock()+ttlMs;return cached;
  })();try{return await pending;}finally{pending=null;}
 };
}
