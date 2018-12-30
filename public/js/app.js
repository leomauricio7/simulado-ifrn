var app = angular.module('sif', ['ngRoute']);
var url = "http://localhost:3000"; //"https://sif-simulado.herokuapp.com";

app.config(function($routeProvider) {
      $routeProvider.when("/", {
        templateUrl: "views/home.html",
        controller: "HomeController"
      })
      .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController"
      })
      .when("/quem-somos", {
        templateUrl: "views/quemsomos.html",
        controller: "QuemSomosController"
      })
      .when("/forgot-password", {
        templateUrl: "views/forgot-password.html",
        controller: "ForgotPasswordController"
      })
      .when("/reset-password/:token", {
        templateUrl: "views/reset-password.html",
        controller: "ResetPasswordController"
      })
      .when("/simulado", {
        templateUrl: "views/simulado.html",
        controller: "SimuladoController"
      })
      .when("/admin/dashboard", {
        templateUrl: "views/admin/dashboard.html",
        controller: "AdminController"
      })
      .when("/admin/dashboard/questions", {
        templateUrl: "views/admin/listQuestions.html",
        controller: "ListQuestionsController"
      })
      .when("/admin/dashboard/questions/new", {
        templateUrl: "views/admin/newQuestion.html",
        controller: "NewQuestionController"
      })
      .when("/admin/dashboard/questions/update/:id", {
        templateUrl: "views/admin/updateQuestion.html",
        controller: "UpdateQuestionController"
      })
      .otherwise({
        redirectTo: '/'
      });
});

app.factory('isAuth', function($http, $window){
  return function(){
    $http.get(url+"/isAuth").then(function(data){
      // Tudo ok
    }, function(data){
      // Redirecionando
      $window.location = "#/login";
    });
  };
});

  
