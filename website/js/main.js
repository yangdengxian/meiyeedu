(function(window,angular,undefined){
	var preferential = angular.module("preferential",[]);

	preferential.controller("preferentialCtrl",["$scope","$http","$getData",function($scope,$http,$getData){
		$scope.selectIndex = -1;
		$scope.shop = {};
		$scope.products = [];
		$scope.lastDay = $getData.getDays();
		$scope.preferential = {};

		$http.get("../json/shop.json").success(function(res){
			if (res.length > 0) {
				$scope.shop = res[0];
			}
		});

		$http.get("../json/products.json").success(function(res){
			if (res.length > 0) {
				$scope.products = res;
			}
		});

		$http.get("../json/preferinfo.json").success(function(res){
			if (res.length > 0) {
				$scope.preferential = res[0];
			}
		});

		$scope.selectDate = function(year, month, date, day, selectIndex) {
			$scope.selectIndex = selectIndex;
		};
	}]);

	preferential.factory("$getData",function(){
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
						})
					}
				});

				return newDays;
			}
		}
	});
	/*preferential.config(function($routeProvider){
		$routeProvider.when("/website", {
	        templateUrl: "index_new.html",
	        controller: "preferentialCtrl"
	    }).otherwise({
	        redirectTo: "/website"
	    });
	});*/
})(window,angular);