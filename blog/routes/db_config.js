
/**
* 需要安装mysql组件
* 类似于安装express，执行：npm install mysql 即可；
* 在node_modules 目录下多出 mysql 模块
*（或者从其他项目中拷贝进来也可以）
*/
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',  //ip或者域名
    port: '3306',   //端口号
    user: 'dlwy',   //数据库的用户名
    password: 'dlwy',    //密码
    database: 'meiyeedu'  //数据库名称
});

exports.pool=pool;


/** 
* 测试数据库连接是否成功
* callback：回调函数
*/
function test_connection(callback){
    pool.getConnection(function(err, connection) {
            // 获取当前时间
            var sql = 'SELECT CURRENT_TIMESTAMP() AS cur_time FROM DUAL '; 
            console.log('##    sql: '+sql);
            connection.query(sql, function(err, result) {
                if(err){
                    console.log('[getConnection error] - ',err.message);
                    return;
                }
                if(result != null && result.length > 0){
                    obj = result[0];
                    callback(obj);
                }else{
                    callback(null);
                }
            });
            connection.release();
        });
};

test_connection(function my_callback(obj){
    console.log(obj.cur_time);
});

