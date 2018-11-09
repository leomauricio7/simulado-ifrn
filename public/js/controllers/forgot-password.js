app.controller("ForgotPasswordController", function($scope, $http){
    $scope.errors = {};

    $scope.forgotPassword = function(){
        $scope.errors = {};
        if(!$scope.email)
            return $scope.errors.email = true;
        var data  =  {
                email: $scope.email,   
        }
        $http.post(url+'/auth/forgot-password', data).then(function(res){
            $scope.success = true;
        }).catch(function(err){
            console.log("Error: "+err);
            $scope.errors.login = true;
            $scope.error = err.data;
        });
    }
});