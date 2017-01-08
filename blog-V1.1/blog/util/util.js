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
    getInfoObj: function(tableName) {
        var sql = {},redirectPage = "",conent="";
        var obj = {};
        switch (tableName) {
            case "shop":
                sql = $sql;
                redirectPage = "shopIndex";
                conent = "您当前现在在商店主页！";
                break;
            case "peritem":
                sql = $sqlPeritem;
                redirectPage = "peritem";
                conent = "您当前现在在优惠套餐主页！";
                break;
            case "preferinfo":
                sql = $sqlPreferinfo;
                redirectPage = "preferinfo";
                conent = "您当前现在在优惠时刻主页！";
                break;
            case "personyy":
                sql = $sqlPersonyy;
                redirectPage = "personyy";
                conent = "您当前现在在预约信息主页！";
                break;
            default:
                sql = $sql;
                redirectPage = "shopIndex";
                conent = "您当前现在在商店主页！";
                break;
        }
        obj.sql = sql;
        obj.redirectPage = redirectPage;
        obj.conent = conent;
        return obj;
    },
    dateFormat: function(currentDate) {
        var date = new Date(currentDate);
        var fmt = "yyyy-MM-dd";
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) { 
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        
        return fmt;
    },
    getDataArray: function(dataObj) {
        var paramsArray = [];
        for (var key in dataObj) {
            if (dataObj.hasOwnProperty(key)) {
                paramsArray.push(dataObj[key]);              
            }
        }
        return paramsArray;
    },
    //解决跨域问题
    setHeader: function(response) {
        response.setHeader('Access-Control-Allow-Origin', '*');    
        response.setHeader('Access-Control-Allow-Credentials', true);    
        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    }
}