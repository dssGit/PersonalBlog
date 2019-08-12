var express = require("express");
var globalConf = require("./config");
var loader = require("./loader");

var app = express();

app.use(express.static("./page/"));

app.post("/editEveryDay", loader.get("/editEveryDay"))

app.get("/queryEveryDay", loader.get("/queryEveryDay"))

app.post("/editBlog", loader.get("/editBlog"))

app.get("/queryBlogByPage", loader.get("/queryBlogByPage"))

app.get("/queryBlogCount",loader.get("/queryBlogCount"));

app.get("/queryBlogByBid",loader.get("/queryBlogByBid"));

app.post("/addComment", loader.get("/addComment"))

app.get("/queryRandomCode",loader.get("/queryRandomCode"));

app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"));

app.get("/queryCommentCountByBlogId",loader.get("/queryCommentCountByBlogId"));

app.get("/queryAllTags",loader.get("/queryAllTags"));

app.get("/queryAllBlog",loader.get("/queryAllBlog"));

app.get("/queryHotBlog",loader.get("/queryHotBlog"));

app.get("/queryNewComments",loader.get("/queryNewComments"));

app.get("/queryBlogByTag",loader.get("/queryBlogByTag"));

app.get("/queryBlogCountByTag",loader.get("/queryBlogCountByTag"));

app.listen(globalConf.port, function () {
    console.log("服务器已启动")
})