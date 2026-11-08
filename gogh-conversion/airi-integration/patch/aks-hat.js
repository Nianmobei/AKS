export const HAT_NODE='ME_AvatarItem_02103';
export function applyHatVisibility(scene,slug,visible){if(slug!=='aks-slot0')return {supported:false,matched:0,visible};let matched=0;scene.traverse(n=>{if(n.name===HAT_NODE){n.visible=!!visible;matched++;}});return {supported:matched>0,matched,visible:!!visible};}
