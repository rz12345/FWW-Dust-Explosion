var app = angular.module('app', ['Controllers']);
angular.module('Controllers', [])
    .controller('MainController', ['$scope', '$http', '$q',
    function ($scope, $http, $q) {
            var memberDataUrl = "https://gist.githubusercontent.com/tony1223/098e45623c73274f7ae3/raw";
            var contactDataUrl = "https://gist.githubusercontent.com/tony1223/695a3c4c2d1ccb8eae85/raw"

            var memberAjax = $http.get(memberDataUrl);
            var contactAjax = $http.get(contactDataUrl);


            $q.all([memberAjax, contactAjax]).then(function (arrayOfResults) {
                $scope.dataMembers = arrayOfResults[0].data.data;
                $scope.dataMembersLastModify = arrayOfResults[0].data.lastmodify;
                $scope.dataMembersSource = arrayOfResults[0].data.source;
                $scope.dataContactInfo = arrayOfResults[1].data;


                $scope.harmSpecies = {
                    "總人數": arrayOfResults[0].data.data.length,
                    "重傷": 0,
                    "中傷": 0,
                    "輕傷": 0
                };
                angular.forEach($scope.dataMembers, function (item, key) {
                    if ($scope.harmSpecies.indexOf(item["救護檢傷"]) == -1) {
                        $scope.harmSpecies.push(item["救護檢傷"]);
                    }

                });
                console.log($scope.harmSpecies);
                /*
                $scope.hospital = [];

                angular.forEach($scope.dataMembers, function (item, key) {
                    if ($scope.hospital.indexOf(item["收治單位"]) == -1) {
                        $scope.hospital.push(item["收治單位"]);
                    }
                });
                */
            });

            // 模糊搜尋
            $scope.fuzzySearch = function (inputQuery) {
                if (inputQuery['姓名'].length > 1) {
                    var query = inputQuery['姓名'].split("");
                    query[1] = '○';
                    $scope.query = {
                        '姓名': query.join("")
                    };
                } else {
                    $scope.query = {};
                }
            };
}]);