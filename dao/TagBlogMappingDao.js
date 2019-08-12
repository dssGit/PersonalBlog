var dbutil = require("../dao/DBUtil");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    var insertSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?)";
    var params = [tagId, blogId, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    });
    connection.end();
}

function queryTagBlogMapping(tagId, success) {
    var querySql = "select * from tag_blog_mapping where tag_id = ?";
    var params = [tagId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports = {
    "insertTagBlogMapping": insertTagBlogMapping,
    "queryTagBlogMapping": queryTagBlogMapping
}