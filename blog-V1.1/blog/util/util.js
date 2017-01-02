var $sql = require('../dao/shop/shopSqlMapping');
var $sqlPeritem = require('../dao/peritem/peritemSqlMapping');
var $sqlPersonyy = require('../dao/personyy/personyySqlMapping');
var $sqlPreferinfo = require('../dao/preferinfo/preferinfoSqlMapping');
/**
 * Created by fujunou on 2015/3/6.
 */

module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    getSqlObj: function(tableName) {
        var sql = {};
        switch (tableName) {
            case "shop":
                sql = $sql;
                break;
            case "peritem":
                sql = $sqlPeritem;
                break;
            case "preferinfo":
                sql = $sqlPreferinfo;
                break;
            case "personyy":
                sql = $sqlPersonyy;
                break;
            default:
                sql = $sql;
                break;
        }
        return sql;
    },
    //解决跨域问题
    setHeader: function(response) {
        response.setHeader('Access-Control-Allow-Origin', '*');    
        response.setHeader('Access-Control-Allow-Credentials', true);    
        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    }
}