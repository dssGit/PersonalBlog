
var url = require("url")
var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var respUtil = require("../util/respUtil");
var timeUtil = require("../util/TimeUtil");
var path = new Map();

function queryBlogByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        console.log(result == "")
        if(result == "") {
            console.log("===========")
            response.writeHead(200);
            response.write("result");
            response.end();
            return;
        }
        tagBlogMappingDao.queryTagBlogMapping(parseInt(result[0].id), function (result) {
            // console.log(result)
            var temp = [];
            for(var i = 0 ; i < result.length ; i++) {
                blogDao.queryBlogByBid(parseInt(result[i].blog_id), function (result) {
                    if (result[0]  != null) {
                        result[0].content = result[0].content.replace(/<img[\w\W]*">/, "");
                        result[0].content = result[0].content.replace(/<[\w\W]{1,150}">/g, "");
                        result[0].content = result[0].content.substring(0, 300);
                        temp.push(result[0]);
                    } else {
                        temp.push(1);
                    }
                })
            }
            getResult(temp, result.length, response);

        })

    })

}

path.set("/queryBlogByTag", queryBlogByTag);

function getResult (list, len, response) {
    if(list.length < len) {
        setTimeout(function () {
            getResult(list, len, response)
        }, 10)
    } else {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "请求成功", list));
        response.end();
    }
}

function queryHotBlog(request, response) {
    blogDao.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "请求成功", result));
        response.end();
    })
}

path.set("/queryHotBlog", queryHotBlog);

function queryAllBlog(request, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "请求成功", result));
        response.end();
    })
}

path.set("/queryAllBlog", queryAllBlog);

function queryBlogByBid (request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params.bid)
    blogDao.queryBlogByBid(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "查询成功", result));
        response.end();
        blogDao.addViews(params.bid, function (resp) {})
    })
}

path.set("/queryBlogByBid", queryBlogByBid);

function queryBlogCount (request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "查询成功", result));
        response.end();
    })
}

path.set("/queryBlogCount", queryBlogCount);

function queryBlogCountByTag (request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogCountByTag(params.tag, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "查询成功", result));
        response.end();
    })
}

path.set("/queryBlogCountByTag", queryBlogCountByTag);

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(parseInt(params.page), parseInt(params.pageSize))
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for(var i = 0 ; i < result.length; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,150}">/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "查询成功", result));
        response.end();
    })
}

path.set("/queryBlogByPage", queryBlogByPage)

function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/" "/g, "").replace(/，/g, ",");
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            console.log(result);
            response.writeHead(200);
            response.write(respUtil.writeResult(200, "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            console.log(tagList)
            for(var i = 0; i < tagList.length; i++) {
                if(tagList[i] == "") {
                    continue;
                }
                console.log("=")
                queryTag(tagList[i], blogId);
            }
        })
    })
}

path.set("/editBlog", editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if(result == null || result.length == 0) {
            insertTag(tag, blogId)
        } else {
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.inserTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {

    })
}




module.exports.path = path;