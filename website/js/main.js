(function(window,angular,undefined){
	var preferential = angular.module("preferential",[]);

	preferential.controller("preferentialCtrl",["$scope","$http","$getData",function($scope,$http,$getData){
		$scope.selectIndex = -1;
		$scope.shop = {};
		$scope.products = [];
		$scope.lastDay = $getData.getDays();
		$scope.preferential = {};
		$scope.dataUrl = "http://192.168.0.111:3000/shops";

		$http.get($scope.dataUrl).success(function(res){
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
			$scope.selectIndex = selectIndex;
		};

	}]);

	preferential.factory("$getData",["$http",function($http){
		return {
			getDays: function() {
				var mouth = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 30, 31];

		    	var days = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

		    	var currentDate = new Date();
		    	var newDays = [];
				angular.forEach(days,function(number,index){
					if (currentDate.getDay() <= index) {
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

			getProductsData: function($http,url) {
				$http.get(url).success(function(res){
					if (res.length > 0) {
						return res;
					}
				}).error(function(msg){
					console.log(msg);
				});
			}

		}
	}]);
	/*preferential.config(function($routeProvider){
		$routeProvider.when("/website", {
	        templateUrl: "index_new.html",
	        controller: "preferentialCtrl"
	    }).otherwise({
	        redirectTo: "/website"
	    });
	});*/
})(window,angular);