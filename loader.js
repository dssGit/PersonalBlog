var globalConf = require("./config");

var fs = require("fs");

var files = fs.readdirSync(globalConf["web_path"]);

var pathMap = new Map();

// console.log(files)

for(var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConf["web_path"] + "/" + files[i]);
    // console.log(temp)
    if(temp.path) {
        for(var [key, value] of temp.path) {
            pathMap.set(key, value);
        }
    }else {
        throw new Error("url 异常，url" + key)
    }
}
console.log(pathMap)
module.exports = pathMap;
