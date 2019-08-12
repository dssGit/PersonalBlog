var dbutil = require("./DBUtil");

function insertEventDay(content, ctime, success) {
    var insertSql = "insert into every_day (content, ctime) values (?,?)";
    var params = [content, ctime];

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

function queryEventDay(success) {
    var querySql = "select * from every_day order by id desc limit 1";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            console.log("成功")
            success(result)
        } else {
            console.log("失败")
            console.log(error);
        }
    });
    connection.end();
}

module.exports = {
    "insertEventDay": insertEventDay,
    "queryEventDay": queryEventDay
}