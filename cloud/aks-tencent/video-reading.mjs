export function bilibiliVideoId(value){
 try{const u=new URL(value);if(u.protocol!=='https:'||!['www.bilibili.com','bilibili.com'].includes(u.hostname)||u.username||u.password||u.port)return null;return /^\/video\/(BV[a-zA-Z0-9]{10})(?:\/|$)/.exec(u.pathname)?.[1]||null;}catch{return null;}
}
// Public, read-only evidence. No cookies, login, comments or posting required.
export async function readVideo(url,{fetchImpl=fetch,maxChars=12000}={}){
 const bvid=bilibiliVideoId(url);if(!bvid)throw Error('Supported canonical Bilibili video URL required');
 const get=async target=>{const r=await fetchImpl(target,{signal:AbortSignal.timeout(15000),redirect:'error'});if(!r.ok)throw Error('Video source HTTP '+r.status);return r.json();};
 const view=await get('https://api.bilibili.com/x/web-interface/view?bvid='+bvid);
 if(view.code!==0||!view.data?.cid)throw Error('Video metadata unavailable');
 const v=view.data,result={untrusted:true,url:'https://www.bilibili.com/video/'+bvid+'/',title:v.title,description:String(v.desc||'').slice(0,3000),page:1,coverage:'metadata-only',transcript:[],limitations:['只读到标题和简介，不能据此声称看过视频；未读取画面、音频或评论。']};
 try{
  const player=await get(`https://api.bilibili.com/x/player/v2?bvid=${bvid}&cid=${v.cid}`);
  const tracks=player.data?.subtitle?.subtitles||[];
  const track=tracks.find(x=>/^zh/.test(x.lan))||tracks[0];if(!track?.subtitle_url)return result;
  const source=new URL(track.subtitle_url.startsWith('//')?'https:'+track.subtitle_url:track.subtitle_url);
  if(source.protocol!=='https:'||source.username||source.password||source.port||!(source.hostname==='hdslb.com'||source.hostname.endsWith('.hdslb.com')||source.hostname==='bilivideo.com'||source.hostname.endsWith('.bilivideo.com')))throw Error('Unapproved subtitle host');
  const captions=await get(source.href);let used=0;const body=Array.isArray(captions.body)?captions.body:[];
  for(const c of body){if(typeof c.content!=='string'||!Number.isFinite(c.from)||!Number.isFinite(c.to))continue;const text=c.content.trim();if(!text)continue;if(used+text.length>maxChars)break;used+=text.length;result.transcript.push({from:c.from,to:c.to,text});}
  if(result.transcript.length){result.coverage=result.transcript.length<body.length?'subtitle-excerpt':'available-subtitle-track';result.subtitleLanguage=track.lan;result.limitations=['仅阅读第一分P可用字幕；没有观看画面或核验音频，自动字幕可能有错。'];}
 }catch{result.limitations.push('字幕不可用或读取失败，未尝试绕过登录限制。');}
 return result;
}
