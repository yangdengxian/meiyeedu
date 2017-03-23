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
            var param = req.body;
            var obj = $util.getInfoObj(param.tableName);
            var $sql = obj["sql"]; 
            // 建立连接，向表中插入值
            connection.query($sql.insert, [param.name, param.tel, param.address], function(err, result) {
                if (err) {
                    res.send(err);
                }
                
                if(result) {
                    res.send({success:true});
                }
            });
            // 释放连接 
            connection.release();
        });
    },
    
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.body.id;
            var obj = $util.getInfoObj(req.body.tableName);
            var $sql = obj["sql"];
            connection.query($sql.delete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    res.send({success:true});
                } else {
                    res.send(err);
                }
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.name == null || param.tel == null || param.id == null || param.address == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            var obj = $util.getInfoObj(param.tableName);
            var $sql = obj["sql"];
            connection.query($sql.update, [param.name, param.tel, param.address,+param.id], function(err, result) {
                if (err) {
                    res.send(err);
                }
                
                if(result) {
                    res.send({success:true});
                }
                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            var obj = $util.getInfoObj(req.query.tableName);
            var $sql = obj["sql"];
            connection.query($sql.queryById, id, function(err, result) {
                res.json(result);
                connection.release();
            });
        });
    },
    //根据sql语句查询
    querySql: function (req, res, next) {
        var sql = req.query.sql; 
        pool.getConnection(function(err, connection) {
            connection.query(sql,function(err, result) {
                connection.release();
                //前端查询使用
                if (!req.query.tableName) {
                    $util.setHeader(res);
                    var resNew = [];
                    result.forEach(function(obj) {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                if (key == "date") {
                                    obj[key] = $util.dateFormat(obj[key]);
                                }                         
                            }
                        }
                        resNew.push(obj);
                    }, this);
                    res.send(resNew);
                } else {    //服务端查询使用
                    var obj = $util.getInfoObj(req.query.tableName);
                    if (req.query.tableName == "personyy") {
                        var resNew = [];
                        result.forEach(function(obj) {
                            for (var key in obj) {
                                if (obj.hasOwnProperty(key)) {
                                    if (key == "date") {
                                        obj[key] = $util.dateFormat(obj[key]);
                                    }                         
                                }
                            }
                            resNew.push(obj);
                        }, this);
                        res.render(obj['redirectPage'], { content: obj['content'] ,shopInfo:resNew});
                    }
                }
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var obj = $util.getInfoObj(req.query.tableName);
            var $sql = obj["sql"];
            connection.query($sql.queryAll, function(err, result) {
                //对应shopIndex.html             
                connection.release();
                if (req.query.tableName == "personyy") {
                    var resNew = [];
                    result.forEach(function(obj) {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                if (key == "date") {
                                    obj[key] = $util.dateFormat(obj[key]);
                                }                         
                            }
                        }
                        resNew.push(obj);
                    }, this);
                    res.render(obj['redirectPage'], { content: obj['content'] ,shopInfo:resNew});
                } else {
                    // res.render(obj['redirectPage'], { content: obj['content'] ,shopInfo:result});
                    if(err){
                        res.send(err);
                    }else{
                        res.json(result);
                        
                    }
                }
                
            });
        });
    }
    
};
