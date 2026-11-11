import {ConversationClient} from 'file:///C:/Users/linbowen/Documents/AKS-Windows-本地端/client/conversation-client.mjs';let c=new ConversationClient({root:'C:/Users/linbowen/Documents/AKS-Windows-本地端/client/cloud'});let h=await c.request('health');console.log(JSON.stringify(h));

