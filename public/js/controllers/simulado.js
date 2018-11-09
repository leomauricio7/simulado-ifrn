app.controller("SimuladoController", function($scope, $http, $window){
    $scope.errors = {};
    $scope.data = [];

    $scope.geraSimulado = function(){
        $http.get(url+"/gera-simulado").then(function(res){
            $scope.data = res.data;
            console.log(res.data);
        }).catch(function(err){
            console.log(err);
        });
    }

});