var everyDayDao = require("../dao/EveryDayDao");
var respUtil = require("../util/respUtil");
var timeUtil = require("../util/TimeUtil");
var path = new Map();

function editEveryDay(request, response) {
    request.on("data", function (data) {
        console.log(data.toString().trim());
        everyDayDao.insertEventDay(data.toString().trim(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult(200, "添加成功", null));
            response.end();
        })
    })
}

function queryEveryDay(request, response) {

        everyDayDao.queryEventDay(function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult(200, "获取成功", result));
            response.end();
        })

}

path.set("/editEveryDay", editEveryDay);
path.set("/queryEveryDay", queryEveryDay);

module.exports.path = path;