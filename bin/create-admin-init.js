/**
 * Created by 140315 on 2019/6/12.
 */
let commander=require('commander')
let fs=require('fs');
let path=require('path');
let chalk=require('chalk');
let downLoad=require('download-git-repo')
let spawn=require('cross-spawn')
const execSync = require('child_process').exec;
const cmd=require('node-cmd')
let currentPath=process.cwd();

commander.usage('init [projectName]')
    .option('-c,--clone <name>','use git clone')

commander.parse(process.argv)

let argv=process.argv.slice(2);
let projectName=argv.shift();
if(!projectName){
    console.log()
    console.log(`  ${chalk.red(`error:请输入项目名称`)}`);
    console.log(`
     ${chalk.grey('#example:')}
    `)
    console.log(`      create-admin init Hello `)
    console.log(`
      或者可以输入
      
      create-admin init -h  
      
      查看帮助
    `)
    process.exit()
}

let fullPath=path.join(currentPath,projectName);




if(fs.existsSync(fullPath)){
    console.log()
    console.log(`${chalk.red(`error:已存在名为${projectName}的项目!`)}`);
    console.log(path.join(__dirname,'../template'))
    process.exit();
}else{
    fs.mkdirSync(fullPath)
}
console.log('开始创建项目....')
console.log()
let gitUrl='direct:https://github.com/lwandsyj/vue-admin-cli.git';
downLoad(gitUrl,fullPath,{clone:true},(err)=>{
    if(err){
        console.log(`${chalk.red(`error:${err.message}`)}`)
        process.exit()
    }
    console.log('创建项目完成')
    console.log('开始安装依赖模块...')
    spawn.sync('npm', ['install'], { stdio: 'inherit',cwd:fullPath });
    console.log('依赖模块安装完毕')
    console.log('进入项目,执行以下命令查看:')
    console.log(
        `npm run start`
    )
})