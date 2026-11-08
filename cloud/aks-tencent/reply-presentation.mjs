export function visibleReply(text){return String(text).replace(/<\|(?:ACT|THINK|THOUGHT|PAUSE|DELAY|VOICE|SPEAK|EMOTION)\b[\s\S]*?\|>/g,'').trim();}
