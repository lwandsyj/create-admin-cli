#!/usr/bin/env node
/**
 * Created by 140315 on 2019/6/12.
 */
let commander = require('commander')
let path = require('path');
let fs = require('fs');
let chalk = require('chalk');
let create = require('../lib/create')
commander.usage('create [moduleName]', '创建新模块')
    .option('-i,--independent', '添加编辑独立于列表页')
    .option('-a,--drawer','添加编辑基于drawer')
    .option('-d,--date', '表单依赖于富文本编辑器')
    .option('-e,--edit', '表单依赖于富文本编辑器')
    .option('-m,--codemirror', '表单依赖于代码编辑器')
    .option('-c,--checkbox', '表单依赖于checkbox')
    .option('-r,--radio', '表单依赖于radio')
    .option('-w,--switch', '表单依赖于switch')
    .option('-l,--slider', '表单依赖于slider')
    .option('-s,--select', '表单依赖于select')

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
let pagesPath = path.join(srcPath, 'pages')
let servicePath = path.join(srcPath, 'service')
let routerPath = path.join(srcPath, 'router')
if (!pagesPath) {
    console.log(`${chalk.red(`error:缺少pages目录，请确保实在项目根目录下执行命令`)}`)
    process.exit()
}
if (!servicePath) {
    console.log(`${chalk.red(`error:缺少service目录，请确保实在项目根目录下执行命令`)}`)
    process.exit()
}
if (!routerPath) {
    console.log(`${chalk.red(`error:缺少router目录，请确保实在项目根目录下执行命令`)}`)
    process.exit()
}
let fullModulePath = path.join(pagesPath, moduleName)
if (fs.existsSync(fullModulePath)) {
    console.log(`${chalk.red(`error:要创建名为${moduleName}的模块已存在，不允许相同名称的模块`)}`)
    process.exit()
}
let data = {}, options = {};
let serviceName = moduleName.slice(0, 1).toUpperCase() + moduleName.slice(1)
data.serviceName = serviceName;
data.moduleName = moduleName;
if (commander.independent) {
    options.single = 'single'
} else {
    options.single = 'total'
}
if(commander.drawer){
    drawer.drawer=commander.drawer
}
['date','edit','codemirror','select','checkbox','slider','switch','radio'].forEach(item=>{
    if(commander[item]){
        data[item]=true;
    }
})
create(fullModulePath, srcPath, data, options)

