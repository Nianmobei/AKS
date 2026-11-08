import fs from 'node:fs/promises';import path from 'node:path';
export function qqImageUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&['qpic.cn','qlogo.cn','qq.com','qq.com.cn'].some(h=>u.hostname===h||u.hostname.endsWith('.'+h));}catch{return false;}}
export function imageMime(bytes){if(bytes.length>=8&&bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'image/png';if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255)return 'image/jpeg';if(/^GIF8[79]a/.test(bytes.subarray(0,6).toString()))return 'image/gif';if(bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP')return 'image/webp';throw Error('不支持的图片格式，请发PNG、JPG、WebP或GIF。');}
export async function receiveImages(images,{call,fetcher=fetch,roots=[]}={}){
 if(!Array.isArray(images)||images.length>3)throw Error('一次最多接收3张图片。');const output=[];
 for(const image of images){let info={};if(image.file&&/^[\w.{}-]{1,200}$/.test(image.file))try{info=await call('get_image',{file:image.file});}catch{}
  let bytes;const local=info.file||info.file_path;
  if(local&&path.isAbsolute(local)){
   const resolved=await fs.realpath(local).catch(()=>null);
   if(resolved&&roots.some(r=>{const relative=path.relative(path.resolve(r),resolved);return relative&&!relative.startsWith('..')&&!path.isAbsolute(relative);})){
    const stat=await fs.stat(resolved);if(stat.size>8*1024*1024)throw Error('图片超过8MB，请压缩后再发。');bytes=await fs.readFile(resolved);
   }
  }
  if(!bytes){let url=info.url||image.url;if(!qqImageUrl(url))throw Error('图片下载地址不可用，请直接重新发送图片。');
   for(let redirect=0;redirect<3;redirect++){
    const response=await fetcher(url,{redirect:'manual',signal:AbortSignal.timeout(25000)});
    if(response.status>=300&&response.status<400){url=new URL(response.headers.get('location'),url).href;if(!qqImageUrl(url))throw Error('图片跳转地址不受支持。');continue;}
    if(!response.ok)throw Error('QQ图片下载失败，请重新发送。');if(Number(response.headers.get('content-length'))>8*1024*1024)throw Error('图片超过8MB，请压缩后再发。');let size=0;const chunks=[];
    for await(const chunk of response.body){size+=chunk.length;if(size>8*1024*1024){await response.body.cancel?.().catch(()=>{});throw Error('图片超过8MB，请压缩后再发。');}chunks.push(chunk);}bytes=Buffer.concat(chunks);break;
   }
  }
  if(!bytes?.length)throw Error('没有取得图片内容，请重新发送。');output.push({type:'image',mimeType:imageMime(bytes),data:bytes.toString('base64')});
 }
 return output;
}
