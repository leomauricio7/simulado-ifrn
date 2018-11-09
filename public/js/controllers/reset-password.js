app.controller("ResetPasswordController", function($scope, $http, $routeParams){
    $scope.errors = {};
    $scope.success = false;

    $scope.resetPassword = function(){
        $scope.errors = {};
        if(!$scope.email)
            return $scope.errors.email = true;
        if(!$scope.password)
            return $scope.errors.password = true;
        var data  =  {
                email: $scope.email,
                password: $scope.password,   
        }
        $http.post('/auth/reset-password/'+$routeParams.token, data).then(function(res){
            $scope.success = true;
        }).catch(function(err){
            console.log("Error: "+err.data);
            $scope.errors.login = true;
            $scope.error = err.data;
        });
    };
});