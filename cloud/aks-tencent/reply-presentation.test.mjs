import test from 'node:test';import assert from 'node:assert/strict';import {visibleReply} from './reply-presentation.mjs';
test('removes leaked standalone avatar call while preserving actual reply',()=>{assert.equal(visibleReply('set_avatar_intent(intent="amused", reason="被老板调侃，回应一个克制的笑意")\n要是真是什么文艺小女孩，那就太好认了。'),'要是真是什么文艺小女孩，那就太好认了。');});
test('handles quoted parentheses and multiple lines',()=>{assert.equal(visibleReply('开头\n set_avatar_intent(\n intent="amused", reason="笑(一下)") ;\n下文'),'开头\n下文');});
test('preserves code mentioned in explanatory prose and user-visible quoted text',()=>{for(const text of ['这个函数叫 set_avatar_intent(intent="amused")。','“set_avatar_intent(intent="amused")”是工具调用。','set_avatar_intent(intent="amused") 是工具调用示例。'])assert.equal(visibleReply(text),text);});
test('only internal content produces an empty answer instead of leaking',()=>assert.equal(visibleReply('set_avatar_intent(intent="amused")'),''));
