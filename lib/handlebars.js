let handlebars = require('handlebars')
handlebars.registerHelper('conIfHelper', function (code, edit) {
    if (code || edit) {
        let arr = [];
        if (code) {
            arr.push('CodeMirror');
        }
        if (edit) {
            arr.push('Editor')
        }
        if (arr.length == 0) {
            return '';
        }
        return `
    components:{
      ${arr.join(',')}
    }
     `
    }
    return '';
})
module.exports = handlebars