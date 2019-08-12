var url = require("url")

var commentDao = require("../dao/CommentDao");
var respUtil = require("../util/respUtil");
var timeUtil = require("../util/TimeUtil");
var svgCaptcha = require("svg-captcha");

var path = new Map();

function queryNewComments (request, response) {
    commentDao.queryNewComments(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "添加成功", result));
        response.end();
    })
}

path.set("/queryNewComments", queryNewComments);

function addComment (request, response) {
    request.on("data", function (data) {
        var newData = JSON.parse(data.toString());
        commentDao.addComment(parseInt(newData.bid), parseInt(newData.reply), newData.replyName, newData.name, newData.email, newData.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult(200, "添加成功", null));
            response.end();
        })
    })
}

path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    var img = svgCaptcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult(200, "添加成功", img));
    response.end();
}

path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200", "请求成功", result))
        response.end();
    })
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryCommentCountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentCountByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("200", "请求成功", result))
        response.end();
    })
}

path.set("/queryCommentCountByBlogId", queryCommentCountByBlogId);


module.exports.path = path;