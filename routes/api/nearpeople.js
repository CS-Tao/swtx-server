"use strict";
exports.__esModule = true;
var mysql = require("mysql");
/**
 * 查询结果参数类型
 */
// interface INearPeopleResult {
//     /** 用户名 */     UserName: string;
//     /** 更新时间 */   PositionTime: number;
//     /** 经度 */       PositionLat: number;
//     /** 纬度 */       PositionLng: number;
// }
function nearpeople(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "swtx"
    });
    var params = req.query;
    var queryStrings = 'SELECT corsstable.UserName, corsstable.PositionTime, corsstable.PositionLat, corsstable.PositionLng\
        FROM (SELECT\
        				Users.UserName,\
        				Position.PositionTime,\
        				Position.PositionLat,\
        				Position.PositionLng\
        			FROM\
        				Users\
        			RIGHT JOIN Position ON Users.UserID = Position.PositionUserID\
        			WHERE\
        				Users.UserID <> ' + params.UserID + '\
        			ORDER BY\
        				Position.PositionTime DESC) AS corsstable\
        GROUP BY corsstable.UserName';
    connection.query(queryStrings, function (err, results) {
        if (err) {
            res.json({
                NearPeople: []
            });
            return;
        }
        else {
            res.json({
                NearPeople: results
            });
        }
    });
    connection.end();
}
exports.nearpeople = nearpeople;
