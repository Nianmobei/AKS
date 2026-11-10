import test from 'node:test';import assert from 'node:assert/strict';import {DatabaseSync} from 'node:sqlite';import {createDesktopRouter,classify} from './desktop-work-router.mjs';
test('作品讨论与跨设备阅读查询回到云端，不沿用工作状态或丢失原话',async()=>{
 const db=new DatabaseSync(':memory:');let work=0;const daily=[];
 const route=createDesktopRouter({workService:{db,generate:{classify:async()=>{throw Error('不应调用工作分类器');}},turn:async()=>{work++;return {answer:'工作',suggestions:[]};}}});
 const opts={requestId:'reading',dailyTurn:async text=>{daily.push(text);return {reply:'云端小A'};}};
 await route('帮我整理会议纪要',opts);
 const question='你觉得我写的吹笛人那篇怎么样？是写给我一个朋友的oc';
 assert.equal(classify(question,true),'daily');
 assert.equal((await route(question,opts)).reply,'云端小A');
 assert.equal(db.prepare('SELECT mode FROM desktop_work_state WHERE id=1').get().mode,'');
 assert.equal(classify('查看我另一台设备上传的阅读任务',true),'daily');
 await route('查看我另一台设备上传的阅读任务',opts);
 assert.equal(work,1);assert.equal(daily.length,2);assert.equal(daily[0],question);
 assert.equal(classify('帮我审稿并修改这篇小说',true),'daily');
 db.close();
});
test('识别工作、追问、日常与模糊意图',()=>{assert.equal(classify('帮我整理明天的会议纪要'), 'general-work');assert.equal(classify('检查任务工作台'), 'project-work');assert.equal(classify('继续补充',true),'followup');assert.equal(classify('晚安',true),'daily');assert.equal(classify('这是什么意思',false),'daily')});
test('工作与故障均不调用日常；追问和重启保留独立上下文',async()=>{const db=new DatabaseSync(':memory:');let daily=0,work=[];const service={db,turn:async p=>(work.push(p),{answer:'工作结果',suggestions:[]})};let route=createDesktopRouter({workService:service,fetchImpl:async()=>{throw Error('offline')}}),opts={dailyTurn:async()=>{daily++;return {reply:'daily'}},requestId:'one'};assert.match((await route('帮我整理会议纪要',opts)).reply,/工作结果/);route=createDesktopRouter({workService:service,fetchImpl:async()=>{throw Error('offline')}});assert.match((await route('继续补充',{...opts,requestId:'two'})).reply,/工作结果/);assert.match((await route('检查任务工作台',opts)).reply,/独立工作通道/);assert.equal(daily,0);assert.equal(work.length,2);assert.equal((await route('晚安',opts)).reply,'daily');assert.equal(daily,1);});
test('普通问题默认日常，不由模型分类器擅自切换工作',async()=>{const db=new DatabaseSync(':memory:');let classified=0,worked=0,got;const route=createDesktopRouter({workService:{db,generate:{classify:async()=>{classified++;return 'work';}},turn:async()=>{worked++;return {answer:'work',suggestions:[]};}}});const result=await route('那个安排呢',{dailyTurn:async text=>{got=text;return {reply:'日常'};}});assert.equal(result.reply,'日常');assert.equal(got,'那个安排呢');assert.equal(classified,0);assert.equal(worked,0);db.close();});
