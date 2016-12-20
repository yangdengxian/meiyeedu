/**
 * Created by sixf on 2015/5/13.
 */
$(document).ready(function () {

});

var preferential = angular.module("preferential", ["ngRoute"]);
preferential.controller('preferentialCtrl', function ($http, $scope, $location) {
    var mouth = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 30, 31];

    var days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];


    var currentDate = new Date();

    $scope.selectIndex = -1;
    $scope.preferential = {};
    $scope.perItems = [];
    $scope.staticPerItemsCount = [];
    $scope.selectItemData = [];
    $scope.selectPerItems = [];
    $scope.lastDay = [];

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

        $http.get("pref", {
            params: {
                action: "daycount",
                id: id,
                date: currentDate.getTime()
            }
        }).success(function (response) {

            //alert(response.data);
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
                it.date = currentDate.getTime();
                it.username = $scope.name;
                it.preItemName = m.name;
                it.preItemPrice = m.cPrice;
                it.userPhone = $scope.phone;
                it.isUse = false;
                it.preItemID = m.id;
                pDat.push(it);
            }
        }
        $http.get("pref", {
            params: {
                action: "appointment",
                json: angular.toJson(pDat),
                id: $scope.shop.id
            }
        }).success(function (response) {
            $scope.selectItemData = [];
            $scope.name = "";
            $scope.phone = "";
            alert(response.status.massage);
            $scope.getData();
        });

    }

    $http.get("shop", {params: {action: "geta", id: id}}).success(function (response) {
        $scope.shop = response.data;
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
        $http.get("pref", {params: {action: "geta", id: id}}).success(function (reponse) {
            //alert(reponse.status.massage);
            if (reponse.data == undefined || reponse.data == null) {

            } else {
                $scope.preferential = reponse.data;

                $scope.lastDay = [];


                var date = new Date(reponse.time);

                var cuDay = new Date(reponse.time);



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
                            //alert(lastDay[i].year+":"+lastDay[i].month+":"+lastDay[i].date+":"+lastDay[i].day);
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

                        //alert(lastDay[i].year+":"+lastDay[i].month+":"+lastDay[i].date+":"+lastDay[i].day);
                        date.setDate(date.getDate() + 1);
                    }
                }


                $http.get("perItem", {params: {action: "get", id: $scope.preferential.id}}).success(function (reponse) {
                    $scope.perItems = reponse.data;
                    for (var i = 0; i < $scope.perItems.length; i++) {
                        $scope.staticPerItemsCount.push($scope.perItems[i].count);
                    }

                    //$scope.staticPerItemsCount = angular.copy($scope.perItems);
                    $scope.selectDate(cuDay.getFullYear(), cuDay.getMonth(), cuDay.getDate(), cuDay.getDay(), 0);
                });


            }
        });
    }
    $scope.getData();


    //console.log(lastDay.toString());
});
