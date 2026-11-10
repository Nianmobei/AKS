import {DatabaseSync} from 'node:sqlite';
const d=new DatabaseSync(process.argv[2],{readOnly:true});
const {n}=d.prepare("SELECT count(*) n FROM work_requests WHERE status='running'").get();
console.log(JSON.stringify({running:n}));d.close();if(n)process.exitCode=1;
