import test from 'node:test';import assert from 'node:assert/strict';import {classify} from './desktop-route-policy.mjs';
test('private project discussion and mode objections never imply work mode',()=>{
 for(const text of ['怎么突然进入工作模式了，我自己的项目不算工作啦','我的项目里势力少显得世界空，设定又显得叙事虚','你觉得用一个短测试故事串起势力怎么样','我今天工作有点累','那个安排呢','帮我处理这件事'])for(const active of [false,true])assert.equal(classify(text,active),'daily',text);
});
test('explicit work entry and its direct continuation remain available',()=>{
 assert.equal(classify('工作模式：帮我处理这个需求'),'general-work');assert.equal(classify('检查任务工作台'),'project-work');assert.equal(classify('帮我整理明天的会议纪要'),'general-work');assert.equal(classify('继续补充',true),'followup');assert.equal(classify('继续补充',false),'daily');assert.equal(classify('退出工作'),'daily-reset');
});
