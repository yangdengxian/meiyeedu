var Util = {
    query: function(tableName) {
        var sql = "select * from " + tableName + " where 1=1 ";
        if ($("#name").val()) {
            sql += " AND username like '%" + $("#name").val() + "%'";
        } 
        if ($("#phone").val()) {
            sql += " AND userPhone like '%" + $("#phone").val() + "%'";
        }
        if ($("#date").val()) {
            sql += " AND date =" + Util.getTime($("#date").val());
        }
        $.ajax({
            url: "/shops/querySql", 
            data: {
                sql: sql
            },
            success: function (result) {
                // var $body = document.getElementsByTagName("body")[0];
                // $body.innerHTML = result;
                var $tbody = $("table tbody");
                var trStr = "";
                $tbody.html("");
                for (var i = 0; i < result.length; i++) {
                    trStr += "<tr><td>" + result[i]["preItemID"] + "</td>";
                    trStr += "<td>" + result[i]["username"] + "</td>";
                    trStr += "<td>" + result[i]["userPhone"] + "</td>";
                    trStr += "<td>" + result[i]["preItemName"] + "</td>";
                    trStr += "<td>" + result[i]["preItemPrice"] + "</td>";
                    trStr += "<td>" + result[i]["date"] + "</td>";
                    trStr += "<td>" + result[i]["isUse"] + "</td></tr>";
                    $tbody.append(trStr);
                }              
            },
            error: function(msg) {
                console.log(msg);
            }
        });
    },
    getTime: function(date) {
        var date = date ? new Date(date) : new Date();
        return date.getTime();
    },
    dateFormat: function(date) {
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
    }
};