/**
 * Created by 140315 on 2019/6/19.
 */
let file = require('./file')
let fs=require('fs')
let path=require('path')
let chalk=require('chalk')
let ora=require('ora')
function createDirFiles(baseDir, destPath, obj = {}, data = {}) {
    let arr = [];
    Object.keys(obj).forEach(key => {
        arr.push({
            fullpath: obj[key],
            dirPath: pathJoin(destPath, key)
        })
    })
    let spinner=ora('downloading template');
    spinner.start()
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
    return path.join(dir, './', name)
}

function readCommonObj(templateDir, data = {}) {
    let obj = {};
    let listTemplate = path.join(templateDir, './common/list.template.html');
    obj['list.vue'] = listTemplate;
    let listConfigTemplate = path.join(templateDir, './common/listConfig.template.js');
    obj['listConfig.js'] = listConfigTemplate;
    let serviceTemplate = path.join(templateDir, './service/service.template.html')
    obj[`../../${data.serviceName}.service.js`] = serviceTemplate;
    return obj;
}
//创建一体的添加页面
function createTotal(baseDir, destPath, data = {}, options = {}) {
    let arr = [], obj = {};
    let tmpDir = path.join(__dirname, '../templates/');
    let indexTemplate = path.join(tmpDir, './views/total/index.template.html');
    obj['index.vue'] = indexTemplate;
    let addTemplate = ''
    if (options.drawer) {
        addTemplate = path.join(tmpDir, './views/total/add.drawer.template.html')
    } else {
        addTemplate = path.join(tmpDir, './views/total/add.template.html')
    }
    obj[`add.vue`] = addTemplate;
    let commonObj = readCommonObj(baseDir, data);
    obj = {...commonObj, ...obj};
    createDirFiles(baseDir, destPath, obj, data);
}

//创建独立的添加页面
function createSingle(baseDir,destPath, data = {}, options = {}) {
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
function create(baseDir,dest,data={},options={}){
    console.log(baseDir)
    let total=options.single||'total'
    switch (total){
        case 'total':
            createTotal(baseDir,dest,data,options)
            break;
        case 'single':
            createSingle(baseDir,dest,data,options)
            break;
    }
}
module.exports=create;
