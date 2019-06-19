#!/usr/bin/env node
let program = require('commander');

let config = require('../package.json');

program
    .version(config.version)
    .usage('<command> [options]')


program.command('init <projectName>','创建项目')
    .alias('i')

program.command('create <moduleName>','创建模块')
    .alias('c')


program.parse(process.argv);