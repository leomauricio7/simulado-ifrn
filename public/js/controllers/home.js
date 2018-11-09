app.controller("HomeController", function ($scope, $window) {

    $scope.statusUser = function () {
        if (!localStorage.getItem('user_id')) {
            return true;
        } else {
            $scope.email = localStorage.getItem('email');
            $scope.tipo = localStorage.getItem('tipo');
            return false;
        }
    };

    $scope.logout = function(){
        //$window.location.reload();
        $window.location = "#/login";
    }

});