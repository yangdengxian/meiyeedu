(function(window,angular,undefined){
	var preferential = angular.module("preferential",['ngRoute']);

	preferential.controller("preferentialCtrl",["$rootScope","$scope","$http","$getData",function($rootScope,$scope,$http,$getData){
		var sqlShop = "select * from shop";
		$scope.currentDate = new Date();
		$scope.selectIndex = -1;
		$scope.shop = {};
		$scope.products = [];
		$scope.staticPerItemsCount = [];
		$scope.selectItemData = [];
		$scope.selectPerItems = [];
		$scope.lastDay = $getData.getDays();
		$scope.preferential = {};
		$scope.dataUrl = "http://192.168.0.106:3000/shops";

		$http.get($scope.dataUrl + "/querySql?sql="+sqlShop).success(function(res){
			var sqlPeritem = "",sqlPreferInfo = "";
			if (res.length > 0) {
				$scope.shop = res[0];
				sqlPreferInfo = "select * from preferinfo where shopID = " + $scope.shop.id;
				
				$http.get($scope.dataUrl + "/querySql?sql="+sqlPreferInfo).success(function(res){
					if (res.length > 0) {
						$scope.preferential = res[0];
						sqlPeritem = "select * from peritem where preferid = " + $scope.preferential.id;
						$http.get($scope.dataUrl + "/querySql?sql="+sqlPeritem).success(function(res){
							if (res.length > 0) {
								$scope.products = res;								
							}
						});
					}
				});
				
			}
		}).error(function(msg){
			console.log(msg);
		});

		$scope.selectDate = function(year, month, date, day, selectIndex) {
			$scope.currentDate.setYear(year);
        	$scope.currentDate.setMonth(month);
        	$scope.currentDate.setDate(date);
			$scope.selectIndex = selectIndex;
			if ($scope.preferential.timeSection == "workDay") {

			    if (day == 1 || day == 2 || day == 3 || day == 4 || day == 5) {
			        $scope.selectPerItems = $scope.products;
			    } else {
			        $scope.selectPerItems = [];
			    }
			} else {
			    $scope.selectPerItems = $scope.products;
			}

			$http.get("pref", {
			    params: {
			        id: $scope.preferential.shopID,
			        date: $scope.currentDate.getTime()
			    }
			}).success(function (response) {
			    var countArr = response.data;
			    var arr = $scope.perItems;
			    for (var i = 0; i < arr.length; i++) {
			        var m = arr[i];

			        arr[i].count = $scope.staticPerItemsCount[i];

			        for (var j = 0; j < countArr.length; j++) {
			            if (m.id == countArr[j][0]) {

			                arr[i].count = $scope.staticPerItemsCount[i] - countArr[j][1];
			            }
			        }

			    }

			    $scope.perItems = arr;


			});
		};

		/*$scope.selectDate($scope.currentDate.getFullYear(),$scope.currentDate.getMonth() + 1,$scope.currentDate.getDate(),$scope.currentDate.getDay(),0);*/

		$scope.select = function (item) {
	        var isHave = false;
	        for (var i = 0; i < $scope.selectItemData.length; i++) {
	            var m = $scope.selectItemData[i];
	            if (m.id == item.id) {
	                var arr = $scope.selectItemData;

	                arr.splice(i, 1);

	                $scope.selectItemData = arr;
	                isHave = true;
	                break;
	            }
	        }
	        if (isHave == false) {
	            $scope.selectItemData.push(item);
	        }
	    };
	}]);
	/**
	 * 预约人信息
	 * @param  {[type]} $scope           [description]
	 * @param  {Date}   $getData){		var currentDate   [description]
	 * @return {[type]}                  [description]
	 */
	preferential.controller("personInfoController",["$scope","$getData","$http",function($scope,$getData,$http){
		/**
		 * 预约
		 * @return {[type]} [description]
		 */
		$scope.order = function () {

		    if ($scope.name == "" || $scope.phone == "") {
		        alert("姓名或电话不能为空！");
		        return;
		    }
		    if ($scope.name.length < 2) {
		        alert("姓名长度不够");
		        return;
		    }
		    if ($scope.phone.length < 11) {
		        alert("电话长度不够（11位）");
		        return;
		    }
		    if ($scope.selectItemData.length == 0) {

		        alert("没有选择项目！")
		        return;

		    }

		    var pDat = [];
		    for (var i = 0; i < $scope.selectItemData.length; i++) {

		        var m = $scope.selectItemData[i];
		        if (m != null) {
		            var it = {};
		            it.username = $scope.name;
		            it.preItemName = m.name;
		            it.preItemPrice = m.cPrice;
		            it.userPhone = $scope.phone;
		            it.isUse = false;
		            it.date = $getData.dateFormat($scope.currentDate.getTime());
		            it.preItemID = m.id;
		            pDat.push(it);
		        }
		    }
		    $http.get($scope.dataUrl + "/add", {
		        params: {
		            json: angular.toJson(pDat),
		            tableName: "personyy"
		        }
		    }).success(function (response) {
		    	if (response.code == 200) {
		    		alert("预约成功");
		    	}	            
		    });

		};
	}]);
	/**
	 * 通用工具类封装
	 * @param  {Array}  $http){		return {			getDays:        function()    {				var mouth [description]
	 * @param  {[type]} dateFormat:      function(currentDate [description]
	 * @return {[type]}                  [description]
	 */
	preferential.factory("$getData",["$http",function($http){
		return {
			getDays: function() {
				var mouth = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 30, 31];

		    	var days = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

		    	var currentDate = new Date();
		    	var newDays = [];
		    	/*for (var i = 0; i < days.length; i++) {
		    		if (newDays.length <= 4) {
						newDays.push({
							"year": currentDate.getFullYear(),
                            "month": (currentDate.getMonth() + 1),
                            "date": currentDate.getDate(),
                            "dayTxt": number,
                            "day": currentDate.getDay()
						});
					}
		    	}*/
				angular.forEach(days,function(number,index){
					if (newDays.length <= 4 && (currentDate.getDay() == index)) {
						newDays.push({
							"year": currentDate.getFullYear(),
                            "month": (currentDate.getMonth() + 1),
                            "date": currentDate.getDate(),
                            "dayTxt": number,
                            "day": currentDate.getDay()
						});
					}
				});
				return newDays;
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
			}

		}
	}]);
	
	/**
	 * 路由设置
	 * @param  {[type]}  
	 */
	preferential.config(function($routeProvider){
		$routeProvider.when("/website", {
	        templateUrl: "index_new.html",
	        controller: "preferentialCtrl"
	    }).otherwise({
	        redirectTo: "/website"
	    });
	});
})(window,angular);