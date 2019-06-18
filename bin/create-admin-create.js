#!/usr/bin/env node
/**
 * Created by 140315 on 2019/6/12.
 */
let commander = require('commander')
let path = require('path');
let fs = require('fs');
let chalk = require('chalk');

commander.usage('create [moduleName]', '创建新模块')
    .option('-s,--single', '添加编辑独立于列表页')
    .option('-e,--editor', '依赖于富文本编辑器')
    .option('-m,--codemirror', '依赖于代码编辑器')
    .option('-c,--checkbox', '依赖于checkbox')
    .option('-r', '--radio', '依赖于radio')

commander.parse(process.argv)
let argvs = process.argv.slice(2);
let moduleName = argvs.shift();
if (!moduleName) {
    console.log(`  ${chalk.red(`error:请输入模块名称`)}`);
    console.log()
    console.log(
        `    ${chalk.grey('#example:')}`
    );
    console.log()
    console.log(`    create-admin create user`);
    console.log()
    console.log(`    或者可以输入`);
    console.log()
    console.log(`    create-admin create -h`)
    console.log()
    console.log(`    查看帮助`);
    process.exit()
}
let execPath = process.cwd();
let currentPath = __dirname;
let srcPath = path.join(execPath, 'src');
let packagePath = path.join(execPath, 'package.json')
console.log(srcPath)
console.log(packagePath)
if (!fs.existsSync(srcPath) && !fs.existsSync(packagePath)) {
    console.log(`${chalk.red(`error:请在项目根目录执行命令`)}`)
    process.exit()
}
let pagesPath=path.join(srcPath,'pages')
let servicePath=path.join(srcPath,'service')
let routerPath=path.join(srcPath,'router')
if(!pagesPath){
    console.log(`${chalk.red(`error:缺少pages目录，请确保实在项目根目录下执行命令`)}`)
    process.exit()
}
if(!servicePath){
    console.log(`${chalk.red(`error:缺少service目录，请确保实在项目根目录下执行命令`)}`)
    process.exit()
}
if(!routerPath){
    console.log(`${chalk.red(`error:缺少router目录，请确保实在项目根目录下执行命令`)}`)
    process.exit()
}
let fullModulePath=path.join(pagesPath,moduleName)
if(fs.existsSync(fullModulePath)){
    console.log(`${chalk.red(`error:要创建名为${moduleName}的模块已存在，不允许相同名称的模块`)}`)
    process.exit()
}
console.log('开始读取模板。。。')
if(!commander.single){
    let temDir=path.join(__dirname,'../templates/views/total');
    let addTemplate=path.join(temDir,'./add.template.html');
    let indexTemplate=path.join(temDir,'./index.template.html');
    let listTemplate=path.join(temDir,'./list.template.html');
    let listConfigTemplate=path.join(temDir,'./listConfig.template.js');
    let serviceTemplate=path.join(temDir,'./service.template.js')
    //首先创建module目录
    let serviceName=moduleName.slice(0,1).toUpperCase()+moduleName.slice(1);
    console.log('创建模块目录')
    fs.mkdirSync(fullModulePath)
    console.log('模块目录创建成功')
    console.log('开始读取add.template')
    let addTmp= fs.readFileSync(addTemplate)
}

