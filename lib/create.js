/**
 * Created by 140315 on 2019/6/19.
 */
let file = require('./file')
let fs = require('fs')
let path = require('path')
let chalk = require('chalk')
let ora = require('ora')

function createDirFiles(baseDir, destPath, arr, data = {}) {
    let spinner = ora('开始创建模块。。。');
    spinner.start()
    console.log()
    try {
        console.log('创建模块目录')
        fs.mkdirSync(baseDir)
        console.log('模块目录创建成功')
        arr.forEach(item => {
            file.readFileSync(item.fullpath, item.dirPath, data)
        })
        spinner.stop()
    } catch (ex) {
        console.log(`${chalk.red(`error:${ex.message}`)}`)
        console.log('正在回滚已创建的文件和目录')
        file.emptyDir(baseDir)
        console.log('回滚完成')
        spinner.stop()
        process.exit()
    }
}

function pathJoin(dir, name) {
    console.log(name)
    return path.join(dir, './', name)
}

function readCommonObj(templateDir, baseDir, dest, data = {}) {
    let arr = [];
    let listTemplate = path.join(templateDir, './common/list.template.html');
    arr.push({
        fullpath: listTemplate,
        dirPath: pathJoin(baseDir, 'list.vue')
    })
    let listConfigTemplate = path.join(templateDir, './common/listConfig.template.js');
    arr.push({
        fullpath: listConfigTemplate,
        dirPath: pathJoin(baseDir, 'listConfig.js')
    })
    let serviceTemplate = path.join(templateDir, './service/service.template.html')
    arr.push({
        fullpath: serviceTemplate,
        dirPath: pathJoin(dest, `services/${data.moduleName}.service.js`)
    })
    return arr;
}
//创建一体的添加页面
function createTotal(baseDir, destPath, data = {}, options = {}) {
    let arr = [];
    let tmpDir = path.join(__dirname, '../templates/');
    let indexTemplate = path.join(tmpDir, './views/total/index.template.html');
    arr.push({
        fullpath: indexTemplate,
        dirPath: pathJoin(baseDir, `index.vue`)
    })
    let addTemplate = ''
    if (options.drawer) {
        addTemplate = path.join(tmpDir, './views/total/add.drawer.template.html')
    } else {
        addTemplate = path.join(tmpDir, './views/total/add.template.html')
    }
    arr.push({
        fullpath: addTemplate,
        dirPath: pathJoin(baseDir, `add.vue`)
    })

    let commonObj = readCommonObj(tmpDir,baseDir,destPath, data);
    arr = [...commonObj, ...arr];
    createDirFiles(baseDir, destPath, arr, data);
}

//创建独立的添加页面
function createSingle(baseDir, destPath, data = {}, options = {}) {
    let arr = [], obj = {};
    let tmpDir = path.join(__dirname, '../templates/');
    let indexTemplate = path.join(tmpDir, './views/single/index.template.html');
    obj['index.vue'] = indexTemplate;
    let addTemplate = path.join(tmpDir, './views/single/add.template.html')
    obj[`add.vue`] = addTemplate;
    let commonObj = readCommonObj(baseDir, data);
    obj = {...commonObj, ...obj};
    createDirFiles(baseDir, destPath, obj, data);
}
function create(baseDir, dest, data = {}, options = {}) {
    console.log(baseDir)
    console.log(dest)
    let total = options.single || 'total'
    switch (total) {
        case 'total':
            createTotal(baseDir, dest, data, options)
            break;
        case 'single':
            createSingle(baseDir, dest, data, options)
            break;
    }
}
module.exports = create;
