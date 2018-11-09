app.controller("UpdateQuestionController", function ($scope, $window, $http, isAuth, $routeParams) {
    isAuth();
    $scope.errors = {};
    $scope.success = false;;
    $scope.error = false;
    $scope.data = [];

    function getQuestion(){
        $http.get(url + "/questions/" + $routeParams.id).then(function (res) {
            $scope.data = res.data;
            console.log($scope.data);
        });
    }

    $scope.update = function () {
        $scope.errors = {};
        if (!$scope.data.description)return $scope.errors.description = true;
        if (!$scope.data.tipo)return $scope.errors.tipo = true;
        if (!$scope.data.alt1) return $scope.errors.alt1 = true;
        if (!$scope.data.alt2)return $scope.errors.alt2 = true;
        if (!$scope.data.alt3)return $scope.errors.alt3 = true;
        if (!$scope.data.alt4)return $scope.errors.alt4 = true;
        if (!$scope.data.resposta)return $scope.errors.resposta = true;

        var data = {
            description: $scope.data.description,
            tipo: $scope.data.tipo,
            alt1: $scope.data.alt1,
            alt2: $scope.data.alt2,
            alt3: $scope.data.alt3,
            alt4: $scope.data.alt4,
            resposta: $scope.data.resposta,
        }
        updateQuestion(data, $routeParams.id);
    }

    function updateQuestion(data, question) {
        $http.put(url + "/questions/" + question, data).then(function (res) {
            $scope.success = true;
            $scope.error = false;
            console.log(res.data);
        }).catch(function (err) {
            $scope.success = false;
            $scope.error = true;
            console.log(err);
        });
    };

    getQuestion();

});