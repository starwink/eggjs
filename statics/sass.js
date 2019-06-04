var sass = require('node-sass');
var fs = require('fs');

//接收参数
const params = require('minimist')(process.argv.slice(2),{string:['work']}); 

var file=params.f;
if(!file){
    console.log('--f=youFile');
    return false;
}
var outFile=params.o;
if(!outFile){
    console.log('--o=youOutFile');
    return false;
}

if(params.s=='prod'){
    var ouputStyle='compressed';//压缩css
}else{
    var ouputStyle='expanded';//无压缩,正常回车
}

//判断文件是否存在

sass.render({
    file:file,
    outputStyle:ouputStyle,
}, function(error, result) { // node-style callback from v3.0.0 onwards
   if(result){
       fs.writeFile(outFile,result.css);
   }
});
