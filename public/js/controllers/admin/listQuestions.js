app.controller("ListQuestionsController", function($scope, $http, $window, isAuth){
    
    isAuth();
    $scope.questions = [];

    function atualizarDados(){
        $http.get(url+"/questions").then(function(res){
            $scope.questions = res.data;
            console.log($scope.questions);
        }).catch(function(err){
            console.log("Error; "+err);
        });
    }

    atualizarDados();
    // Função para remover médico
    $scope.remover = function(index){
      if(confirm('Você tem certeza?')){
        $http.delete(url+'/questions/' + index).then(function(res){
          atualizarDados();
        });
      }
    };
  

});