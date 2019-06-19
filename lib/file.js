/**
 * Created by 140315 on 2019/6/19.
 */
let path = require('path')
let fs = require('fs')
let Handlebars = require('handlebars')


function readFileSync(fullPath, destPath, data = {}) {
    let name = path.basename(fullPath)

    console.log(`开始读取${name}文件`)
    let content = fs.readFileSync(fullPath, 'utf-8');
    console.log(`${name}文件读取完毕`)
    console.log(`开始解析${name}文件内容`)
    let template = Handlebars.compile(content);
    content = template(content);
    console.log(`${name}文件内容解析完毕`)
    console.log(`开始写入`)
    fs.writeFileSync(path.join(destPath, ''), content, {'flag': 'a'})
    console.log(`写入完毕`)

}
function emptyDir(dirPath) {
    try {
        let files = fs.readdirSync(dirPath);
        if (files && files.length == 0) {
            fs.rmdirSync(dirPath)
            return;
        }
        files.forEach(file => {
            let filePath = path.join(dirPath, './', file)
            let stats = fs.statSync(filePath)
            if (stats.isDirectory()) {
                emptyDir(filePath)
            } else {
                fs.unlinkSync(filePath)
            }
        })
        fs.rmdirSync(dirPath)
    } catch (ex) {
        console.log(`error：创建出现错误，目录回滚报错，具体错误代码如下：`)
        console.log(`${chalk.red(`error:${ex.message}`)}`)
    }
}

module.exports = {readFileSync, emptyDir}