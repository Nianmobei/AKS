import fs from 'node:fs/promises';const f=process.argv[2];let s=await fs.readFile(f,'utf8');
s=s.replace("if(result.proposals?.length)reply+='\\n\\n已保存 '+result.proposals.length+' 条待审建议，打开工作区查看；未自动修改项目。 http://127.0.0.1:4175/work';", "if(result.proposals?.length)reply+='\\n\\n待审建议（未自动修改）：\\n'+result.proposals.map((p,i)=>`${i+1}. ${p.reason||'建议更新'}：${p.value}（${p.sheet} / ${Object.values(p.ref||{}).join(' / ')} / ${p.field}）`).join('\\n');");
s=s.replace("if(result.focus?.length)reply+='\\n定位信息已保存在工作记录中。';", "if(result.focus?.length)reply+='\\n定位：'+result.focus.map(f=>JSON.stringify(f.ref)).join('；');");
await fs.writeFile(f,s);
