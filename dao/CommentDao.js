var dbUtil = require("./DBUtil");

function addComment(bid, reply, replyName, name, email, content, ctime, utime, success) {
    var insertSql = "insert into comments (blog_id, parent, parent_name, user_name, email, comments, ctime, utime) values (?,?,?,?,?,?,?,?)";
    var params = [bid, reply, replyName, name, email, content, ctime, utime];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, resule) {
        if(error == null) {
            success(resule);
        } else {
            console.log("==============================")
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentsByBlogId(bid, success) {
    var querySql = "select * from comments where blog_id = ?";
    var params = [bid];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentCountByBlogId (bid, success) {
    var querySql = "select count(1) as count from comments where blog_id = ?";
    var params = [bid];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

function queryNewComments (size, success) {
    var querySql = "select * from comments order by id desc limit ?";
    var params = [size];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

module.exports = {
    "addComment": addComment,
    "queryCommentsByBlogId": queryCommentsByBlogId,
    "queryCommentCountByBlogId": queryCommentCountByBlogId,
    "queryNewComments": queryNewComments
}