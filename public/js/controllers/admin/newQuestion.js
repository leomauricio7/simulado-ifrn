app.controller("NewQuestionController", function ($scope, $window, $http, isAuth) {
    isAuth();

    $scope.errors = {};
    $scope.success = false;;
    $scope.error = false;
    
    $scope.save = function () {
        $scope.errors = {};
        var peg = angular.element(perguntaAtiva).html();
        var newstr = peg.replace(/&lt;/g, "<");
        newstr = newstr.replace(/&gt;/g, ">");
        $scope.description = newstr;
        if (!$scope.description)
            return $scope.errors.description = true;
        if (!$scope.tipo)
            return $scope.errors.tipo = true;
        if (!$scope.alt1)
            return $scope.errors.alt1 = true;
        if (!$scope.alt2)
            return $scope.errors.alt2 = true;
        if (!$scope.alt3)
            return $scope.errors.alt3 = true;
        if (!$scope.alt4)
            return $scope.errors.alt4 = true;
        if (!$scope.resposta)
            return $scope.errors.resposta = true;

        var data = {
            description: $scope.description,
            tipo: $scope.tipo,
            alt1: $scope.alt1,
            alt2: $scope.alt2,
            alt3: $scope.alt3,
            alt4: $scope.alt4,
            resposta: $scope.resposta,
            user: localStorage.getItem('user_id'),
        }
        saveQuestion(data);
    }
    function saveQuestion(data) {
        $http.post(url + "/questions", data).then(function (res) {
            $scope.success = true;
            $scope.error = false;
            console.log(res.data);
        }).catch(function (err) {
            $scope.success = false;
            $scope.error = true;
            console.log(err);
        });
    }

});