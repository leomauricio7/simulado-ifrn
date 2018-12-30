app.controller("SimuladoController", function($scope, $http, $window){
    $scope.data = [];
    $scope.status = true;
    $scope.tasks = false;
    $scope.finish = false;
    $scope.certas = 0;
    $scope.erradas = 0;

    $scope.geraSimulado = function(){
        $http.get(url+"/gera-simulado").then(function(res){
            $scope.certas = 0;
            $scope.erradas = 0;
            $scope.status = false;
            $scope.tasks = true;
            $scope.finish = false;
            $scope.completed = false;
            $scope.data = res.data;
            console.log(res.data);
        }).catch(function(err){
            console.log(err);
        });
    }

    $scope.selectAlt = function(id_pergunta, resposta){
        console.log('pergunta enviada:',id_pergunta,resposta)
        let peg_temp = $scope.data.filter( elm => { return elm._id == id_pergunta })
        console.log('pergunta achada:', peg_temp[0]._id)
        if(peg_temp[0].resposta === resposta){
            $scope.certas+=1;
        }else{
            $scope.erradas+=1;
        }   
    }

    $scope.finalizaSimulado = function(){
        $scope.finish = true;
        $scope.completed = true;
    }

});