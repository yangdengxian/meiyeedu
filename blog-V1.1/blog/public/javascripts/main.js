
        function query(tableName) {
            var sql = "select * from " + tableName + " where 1=1 ";
            if ($("#name").val()) {
                sql += " AND username like '" + $("#name").val() + "%'";
            } 
            if ($("#phone").val()) {
                sql += " AND userPhone like '" + $("#phone").val() + "%'";
            }
            if ($("#date").val()) {
                sql += " AND date like '" + $("#date").val() + "%'";
            }
            $.ajax({
                url: "/shops/querySql", 
		        data: {
		            sql: sql,
		            tableName: tableName
		        },
		        success: function (result) {
		    	    debugger;        
		        },
                error: function(msg) {
                    console.log(msg);
                }
            });
        }
