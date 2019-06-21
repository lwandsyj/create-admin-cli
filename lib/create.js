/**
 * Created by 140315 on 2019/6/19.
 */
let file = require('./file')
let fs = require('fs')
let path = require('path')
let chalk = require('chalk')
let ora = require('ora')
let listRoute=(moduleName)=>`{
          path: '/${moduleName}',
          name: '${moduleName}',
          component: resolve => require(['../pages/${moduleName}/index.vue'], resolve),
          meta: {title: '${moduleName}'}
        },
`;
let addRoute=(moduleName)=>`        {
          path: '/${moduleName}/add/:id?',
          name: '${moduleName}Add',
          component: resolve => require(['../pages/${moduleName}/add.vue'], resolve),
          meta: {title: '${moduleName}'}
        },
`
function createDirFiles(baseDir, destPath, arr, data = {},options={}) {
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
        // 开始创建路由
        console.log('开始创建路由...')
        let routePath=path.join(destPath,'./router/routes.js')
        let content=fs.readFileSync(routePath,'utf-8')
        let reg=/(\/\*\s+<--route-->\s+\*\/)/g;
        let route=listRoute(data.moduleName);
        if(options.single=='single'){
            route+=addRoute(data.moduleName)
        }
        content=content.replace(reg,`${route}        $1`);
        fs.writeFileSync(routePath,content,{ 'flag': 'w' })
        console.log('路由创建完成')
        console.log()
        console.log('创建模块完成')
        spinner.stop()
        console.log()
        console.log('        #example:')
        console.log(`        访问${data.moduleName}列表输入一下url：`)
        console.log(`           /${data.moduleName}`)
        console.log()
        if(options.single=='single'){
            console.log(`        访问${data.moduleName}添加页输入一下url：`)
            console.log(`           /${data.moduleName}/add`)
        }
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
function create(baseDir, destPath, data = {}, options = {}) {
    let arr = [];
    let tmpDir = path.join(__dirname, '../templates/');
    let indexTemplate='',addTemplate=''
    if(options.single=='single'){
        indexTemplate = path.join(tmpDir, './views/single/index.template.html');
        addTemplate = path.join(tmpDir, './views/single/add.template.html')
    }else{
        indexTemplate = path.join(tmpDir, './views/total/index.template.html');
        if (options.drawer) {
            addTemplate = path.join(tmpDir, './views/total/add.drawer.template.html')
        } else {
            addTemplate = path.join(tmpDir, './views/total/add.template.html')
        }
    }
    arr.push({
        fullpath: indexTemplate,
        dirPath: pathJoin(baseDir, `index.vue`)
    });
    arr.push({
        fullpath: addTemplate,
        dirPath: pathJoin(baseDir, `add.vue`)
    });
    let commonObj = readCommonObj(tmpDir,baseDir,destPath, data);
    arr = [...commonObj, ...arr];
    createDirFiles(baseDir, destPath, arr, data,options);
}
module.exports = create;
