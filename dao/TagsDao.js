var dbutil = require("../dao/DBUtil");

function insertTag(tag, ctime, utime, success) {
    var insertSql = "insert into tags (tag, ctime, utime) values (?, ?, ?)";
    var params = [tag, ctime, utime];

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

function queryTag(tag, success) {
    var querySql = "select * from tags where tag like ?";
    var params = ["%" + tag + "%"];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {

            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    });
    connection.end();
}

function queryAllTags(success) {
    var querySql = "select * from tags";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result)
        } else {
            console.log("==============================")
            console.log(error);
        }
    });
    connection.end();
}


module.exports = {
    "inserTag": insertTag,
    "queryTag": queryTag,
    "queryAllTags": queryAllTags
}