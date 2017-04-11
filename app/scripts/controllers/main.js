'use strict';
app.controller('MainCtrl', function ($scope, $window, $http, $interval) {

    $scope.count = 0;

    $scope.forceScrape= function(){
 $http.get("/api/scrape")
    .success(function(response){

        $scope.details += response;
        
     });

    };


    var var_1=$interval(function(){
        $scope.count +=1;
 $http.get("/api/scrape")
     .success(function(response){

        $scope.details += response;
        

     });
},300000);



  });
