app.controller("LoginController", function($scope, $http, $window){
    
    $scope.errors = {};
    
    localStorage.removeItem('Authorization');
    localStorage.removeItem('tipo');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    
    $scope.login = function(){
        $scope.errors = {};
        if(!$scope.email)
            return $scope.errors.email = true;
        if(!$scope.password)
            return $scope.errors.password = true;
        var data = {
            email: $scope.email,
            password: $scope.password
        }
        autenticate(data);
    }

    function autenticate(data){
        $http.post(url+"/auth/authenticate", data).then(function(res){
            localStorage.setItem("Authorization", 'Bearer ' + res.data.token);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("tipo", res.data.user.tipo);
            localStorage.setItem("user_id", res.data.user._id);
            $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token; 
            console.log(res.data);
            
           $window.location = "#/admin/dashboard";

        }).catch(function(err){
            $scope.errors.login = true;
            $scope.error = err.data;
        });

    }
});