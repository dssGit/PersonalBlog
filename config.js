var fs = require("fs");

var globalConf = {};

var conf = fs.readFileSync("./service.conf");

var confArr = conf.toString().split("\r\n");

for(var i = 0 ; i < confArr.length ; i ++) {
    globalConf[confArr[i].split("=")[0].trim()] = confArr[i].split("=")[1].trim();
}

module.exports = globalConf