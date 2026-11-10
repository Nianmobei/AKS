export async function bindAksCloudRoute({cards,providers,consciousness,report=async()=>{}}){
 const card=cards.activeCard;
 if(!card||! /^(小A|AKS)$/i.test(card.name||'')||cards.selectedAvatarModel?.displayModelId!=='preset-gogh-aks-slot0')return {skipped:true};
 const config=providers.getProviderConfig('aks-cloud');
 if(config?.apiKey)providers.updateProviderConfig('aks-cloud',{...config,baseUrl:'http://127.0.0.1:6220/v1/'},'configured');
 // A restored card must not silently inherit an unrelated global provider.
 await cards.updateActiveCardConsciousness({provider:'aks-cloud',model:'aks-cloud'});
 if(!config?.apiKey){await report({phase:'missing_device_key',provider:consciousness.activeProvider,model:consciousness.activeModel,keyConfigured:false});throw Error('AKS device key is not configured');}
 const status={phase:'configured',provider:consciousness.activeProvider,model:consciousness.activeModel,keyConfigured:true,localEndpoint:true,cardScoped:true};await report(status);return status;
}
export async function ensureAksCloudRoute(cards){
 const h=await import('./hearing-CWm8WPGq.js');const providers=h.Z(),consciousness=h.K();
 return bindAksCloudRoute({cards,providers,consciousness,report:async status=>{
  const key=providers.getProviderConfig('aks-cloud')?.apiKey;if(!key)return;
  const response=await fetch('http://127.0.0.1:6220/native-status',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify(status)});
  if(!response.ok)throw Error('AKS local device authentication failed');
 }});
}
