app.controller("AdminController", function($scope, $http, isAuth){
    isAuth();
    
    $scope.email = localStorage.getItem('email');
    $scope.tipo = localStorage.getItem('tipo');
    
});