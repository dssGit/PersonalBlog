var tagsDao = require("../dao/TagsDao");
var respUtil = require("../util/respUtil");

var path = new Map();

function queryAllTags(request, response) {
    tagsDao.queryAllTags(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false
        })
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "请求成功", result));
        response.end();
    })
}

path.set("/queryAllTags", queryAllTags);

module.exports.path =path;