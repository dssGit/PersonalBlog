var dbUtil = require("./DBUtil");

function insertBlog(title, content, views, tags, ctime, utime, success) {
    var insertSql = "insert into blog (title, content, views, tags, ctime, utime) values (?,?,?,?,?,?)"
    var params = [title, content, views, tags, ctime, utime];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function queryBlogByTag(tag, page, pageSize, success) {
    var insertSql = "select * from blog where id = ? order by id desc limit ?, ?"
    var params = [tag, page * pageSize, pageSize];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function queryBlogByPage(page, pageSize, success) {
    var insertSql = "select * from blog order by id desc limit ?, ?"
    var params = [page * pageSize, pageSize];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog"
    var params = [];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function queryBlogCountByTag(tag, success) {
    var querySql = "select count(1) as count from blog where tags = ?"
    var params = [tag];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            console.log(result)
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function queryBlogByBid(id, success) {
    var querySql = "select * from blog where id = ?"
    var params = [id];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function queryAllBlog(success) {
    var querySql = "select * from blog order by id desc"
    var params = [];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function addViews(id, success) {
    var querySql = "update blog set views = views + 1 where id = ?"
    var params = [id];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

function queryHotBlog(size, success) {
    var querySql = "select * from blog order by views desc limit ?"
    var params = [size];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            // console.log(result)
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
}

module.exports = {
    "insertBlog": insertBlog,
    "queryBlogByPage": queryBlogByPage,
    "queryBlogCount": queryBlogCount,
    "queryBlogByBid": queryBlogByBid,
    "queryAllBlog": queryAllBlog,
    "addViews": addViews,
    "queryHotBlog": queryHotBlog,
    "queryBlogByTag": queryBlogByTag,
    "queryBlogCountByTag": queryBlogCountByTag
}
