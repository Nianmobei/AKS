import {localParts} from './calendar.mjs';
export function activityEvidence({reading=[],routine=[],notes=[],now=new Date()}={}){const today=localParts(now,'Asia/Shanghai').date;const yesterday=new Date(Date.parse(today+'T12:00:00Z')-86400000).toISOString().slice(0,10);return {yesterday,reading:reading.filter(x=>x.day===yesterday),routine:routine.filter(x=>x.day===yesterday),notes:notes.filter(x=>x.created&&localParts(new Date(x.created),'Asia/Shanghai').date===yesterday)};}
export function unknownActivityReply(text,evidence){
 const asked=/昨天/.test(text)&&(/你.{0,12}(?:做|干|忙|在)/.test(text)||/昨天.{0,12}(?:做|干|忙)/.test(text));
 if(asked&&!evidence.reading.length&&!evidence.routine.length&&!evidence.notes.length)return '昨天没留下记录，我不临时给你编一天了。现在倒是想把小说往前挪一点。';
 return null;
}
export function replyViolation(reply,input){
 if(!/伦敦|天气|下雨|雨天|衣服|外套|淋|湿|伞/.test(input)&&/(?:外面|你那边|你那里|今天).{0,10}(?:下雨|在下|雨没停|下个没完)|(?:你|外套|衣服).{0,12}(?:淋湿|湿着|湿透)/.test(reply))return '没有提供老板所在地、天气或衣物状态；不要把雨伦敦设定套到老板身上。';
 return null;
}
