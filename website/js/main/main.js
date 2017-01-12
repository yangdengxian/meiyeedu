(function(window,angular,undefined){
    var preferential = angular.module("preferential", ["ngRoute"]);
    preferential.controller('preferentialCtrl', ["$http","$scope","$location","$getData",function ($http, $scope, $location,$getData) {
        var mouth = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 30, 31];

        var days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];


        var currentDate = new Date();

        var sqlShop = "select * from shop";

        $scope.selectIndex = -1;
        $scope.preferential = {};
        $scope.perItems = [];
        $scope.staticPerItemsCount = [];
        $scope.selectItemData = [];
        $scope.selectPerItems = [];
        $scope.lastDay = [];
        $scope.dataUrl = "http://192.168.0.106:3000/shops";

        $scope.selectDate = function (year, month, date, day, selectIndex) {
            //alert(month);
            currentDate.setYear(year);
            currentDate.setMonth(month);
            currentDate.setDate(date);
            currentDate.setHours(0);
            currentDate.setMinutes(0);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);

            $scope.selectIndex = selectIndex;
            if ($scope.preferential.timeSection == "workDay") {

                if (day == 1 || day == 2 || day == 3 || day == 4 || day == 5) {
                    $scope.selectPerItems = $scope.perItems;
                } else {
                    $scope.selectPerItems = [];
                }
            } else {
                if (day == 0 || day == 6) {
                    //$scope.selectPerItems = $scope.perItems;
                } else {
                    //$scope.selectPerItems = [];
                }
                $scope.selectPerItems = $scope.perItems;
            }

            $http.get($scope.dataUrl + "/querySql", {
                params: {
                    sql: "select peritemID from checkhassalednum_v where shopId=" + id + " and date=" + currentDate.getTime()
                }
            }).success(function (result) {
                var countArr = $getData.countArrayVal(result);
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

        $scope.select = function (item) {
            //alert(index);

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
            //alert($scope.selectItemData.length);

        };

        $scope.yuyue = function () {

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
                    it.date = currentDate.getTime();
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
                $scope.selectItemData = [];
                $scope.name = "";
                $scope.phone = "";
                if (response.code == 200) {
                    alert("预约成功");
                }
                $scope.getData();
            });

        };

        $http.get($scope.dataUrl + "/queryById", {params: {id: id}}).success(function (result) {
            $scope.shop = result[0];
            shareData.title = $scope.shop.name + "限时秒杀";
            //descContent = shareTitle;


            var pathname = window.location.pathname.split("\/");
            pathname.splice(pathname.length - 2, 2);
            var urls;
            for (var i = 0; i < pathname.length; i++) {
                if (pathname[i] == "" && i == 0) {
                    urls = "/";
                } else {
                    urls = urls + pathname[i] + "/";
                }
            }

            //../lq/preferential?id={{shop.id}}
            //var qrcodeurl=encodeURIComponent(window.location.origin+"/"+urls+"lq/preferential?id="+$scope.shop.id);

            // window.location.replace(qrcodeurl);
            //imgUrl=window.location.origin+"/"+urls+"resources/lq/frreimg.png";
            shareData.imgUrl = "http://tkb.meiyeedu.com/resources/lq/frreimg.png";


        });


        //$scope.preferentials = [];
        //$scope.preferential = {project0: ["", 0, 0, 0], project1: ["", 0, 0, 0], project2: ["", 0, 0, 0], project3: ["", 0, 0, 0]};

        $scope.getData = function () {
            $http.get($scope.dataUrl + "/querySql", {params: {sql: "select * from preferinfo where shopId=" + id}}).success(function (result) {
                //alert(reponse.status.massage);
                if (result.length == 1) {
                    $scope.preferential = result[0];

                    $scope.lastDay = [];


                    var date = new Date();

                    var cuDay = new Date();



                    if ($scope.preferential.timeSection == "workDay") {
                        var kk = 0;
                        for (var i = 0; i < 100; i++) {
                            if (date.getDay() != 0 && date.getDay() != 6 && kk <= 4) {

                                $scope.lastDay.push({
                                    "year": date.getFullYear(),
                                    "month": (date.getMonth()),
                                    "date": date.getDate(),
                                    "dayTxt": days[date.getDay()],
                                    "day": date.getDay()
                                });
                                kk = kk + 1;
                            }
                            date.setDate(date.getDate() + 1);

                        }
                    } else {

                        for (var i = 0; i < 5; i++) {
                            $scope.lastDay.push({
                                "year": date.getFullYear(),
                                "month": (date.getMonth()),
                                "date": date.getDate(),
                                "dayTxt": days[date.getDay()],
                                "day": date.getDay()
                            });

                            date.setDate(date.getDate() + 1);
                        }
                    }


                    $http.get($scope.dataUrl + "/querySql", {
                            params: {
                                sql: "select * from peritem where preferentialID = " + $scope.preferential.id
                            }
                        }).success(function (result) {
                            $scope.perItems = result;
                            for (var i = 0; i < $scope.perItems.length; i++) {
                                $scope.staticPerItemsCount.push($scope.perItems[i].count);
                            }

                            $scope.selectDate(cuDay.getFullYear(), cuDay.getMonth(), cuDay.getDate(), cuDay.getDay(), 0);
                        });


                }
            });
        }
        $scope.getData();

    }]);
    /**
     * 通用工具类封装
     * @param  {Array}  $http){     return {            getDays:        function()    {             var mouth [description]
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
            },
            /**
             * 数组去重
             * @param  {[type]} arr [description]
             * @return {[type]}     [description]
             */
            uniqueArray: function(arr) {
                var tmp = [];
                for(var i in arr){
                    //该元素在tmp内部不存在才允许追加
                    if(tmp.indexOf(arr[i])==-1){
                        tmp.push(arr[i]);
                    }
                }
                return tmp;
            },
            /**
             * 判断某一元素在数组中出现的次数
             * @return {[type]} [description]
             */
            countArrayVal: function (arrayObj) {
                var count = 0, arrNew = [];
                for(var i=0;i<arrayObj.length;i++){

            　　　　if(arrayObj[i] != -1){

            　　　　　　temp = arrayObj[i];

            　　　　　　for(var j = 0;j <= arrayObj.length;j++){//再次循环数组，用第一次循环得到的temp与数组的每一个元素比较

            　　　　　　　　if(temp==arrayObj[j]){

        　　　　　　　　　　　　count++;//如果两个元素相同，count就自加一次

        　　　　　　　　　　　　arrayObj[j] = -1;//这个时候临时改变这次循环时元素变量的值，以便不参与下次循环

            　　　　　　　　}

            　　　　　　}

            　　　　　　arrNew.push([temp["peritemID"],count]);//把这次循环的元素以及出现的次数保存到新的数组中

            　　　　　　count = 0;//让count的值重新等于0

            　　　　}

            　　}
                return arrNew;
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
})(window,angular)

