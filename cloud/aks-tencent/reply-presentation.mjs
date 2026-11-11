export function visibleReply(text){
 let s=String(text).replace(/<\|(?:ACT|THINK|THOUGHT|PAUSE|DELAY|VOICE|SPEAK|EMOTION)\b[\s\S]*?\|>/g,'');
 // Only remove standalone internal avatar calls; quoted or explanatory prose stays intact.
 const prefix=/(^|\n)[ \t]*set_avatar_intent\s*\(/g;let m;
 while((m=prefix.exec(s))){
  let i=prefix.lastIndex,depth=1,quote='',escaped=false;
  for(;i<s.length&&depth;i++){const c=s[i];if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote='';}else if(c==='"'||c==="'")quote=c;else if(c==='(')depth++;else if(c===')')depth--;}
  if(depth)break;
  let end=i;while(s[end]===' '||s[end]==='\t')end++;if(s[end]===';')end++;while(s[end]===' '||s[end]==='\t')end++;
  if(end<s.length&&s[end]!=='\n'&&s[end]!=='\r'){prefix.lastIndex=i;continue;}
  if(s[end]==='\r')end++;if(s[end]==='\n')end++;
  const start=m.index+(m[1]?1:0);s=s.slice(0,start)+s.slice(end);prefix.lastIndex=start;
 }
 return s.trim();
}
