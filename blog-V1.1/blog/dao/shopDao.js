// dao/shopDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    response: function(res,obj,jsonp) {
        var retCode = {
            SUCCESS: 1,
            ERROR: -1
        };

        var result = {};

        if (res.statusCode == 200) {
            result.data = obj;
            result.retCode = retCode.SUCCESS;
        } else {
            result = obj;
            result.retCode = retCode.ERROR;
        }

        result.status = res.statusCode;

        if (jsonp) {
            return res.send(jsonp + "(" + JSON.stringfy(result) + ")");
        } else {
            return res.json(result);
        }
    },
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            var $sql = $util.getSqlObj(param.tableName);
            // 建立连接，向表中插入值
            connection.query($sql.insert, [param.name, param.tel , param.address], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };    
                }

                console.error(err);

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接 
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            var $sql = $util.getSqlObj(req.query.tableName);
            connection.query($sql.delete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    // result = {
                    //     code: 200,
                    //     msg:'删除成功'
                    // };
                    res.redirect('/shops');
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.name == null || param.tel == null || param.id == null || param.address) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            var $sql = $util.getSqlObj(param.tableName);
            connection.query($sql.update, [+param.id,param.name, param.tel, param.address], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }
                console.log(result);

                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            var $sql = $util.getSqlObj(req.query.tableName);
            connection.query($sql.queryById, id, function(err, result) {
                connection.release();
                $util.setHeader(res);
                res.send(result);
            });
        });
    },
    //根据sql语句查询
    querySql: function (req, res, next) {
        var sql = req.query.sql; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query(sql,function(err, result) {
                connection.release();
                $util.setHeader(res);
                res.send(result);
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var $sql = $util.getSqlObj(req.query.tableName);
            connection.query($sql.queryAll, function(err, result) {
                //对应shopIndex.html
                // res.render('shopIndex', { content: '您当前现在在商店主页！' ,shopInfo:result});
                connection.release();
                $util.setHeader(res);
                res.send(result);
            });
        });
    }
    
};
