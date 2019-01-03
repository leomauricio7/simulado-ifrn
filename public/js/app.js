var app = angular.module('sif', ['ngRoute','ngSanitize']);
var url = "https://sif-simulado.herokuapp.com"; //"https://sif-simulado.herokuapp.com";

app.config(function($routeProvider) {
      $routeProvider.when("/", {
        templateUrl: "views/home.html",
        controller: "HomeController",
        cache: false
      })
      .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController",
        cache: false
      })
      .when("/quem-somos", {
        templateUrl: "views/quemsomos.html",
        controller: "QuemSomosController",
        cache: false
      })
      .when("/forgot-password", {
        templateUrl: "views/forgot-password.html",
        controller: "ForgotPasswordController",
        cache: false
      })
      .when("/reset-password/:token", {
        templateUrl: "views/reset-password.html",
        controller: "ResetPasswordController",
        cache: false
      })
      .when("/simulado", {
        templateUrl: "views/simulado.html",
        controller: "SimuladoController",
        cache: false
      })
      .when("/admin/dashboard", {
        templateUrl: "views/admin/dashboard.html",
        controller: "AdminController",
        cache: false
      })
      .when("/admin/dashboard/questions", {
        templateUrl: "views/admin/listQuestions.html",
        controller: "ListQuestionsController",
        cache: false
      })
      .when("/admin/dashboard/questions/new", {
        templateUrl: "views/admin/newQuestion.html",
        controller: "NewQuestionController",
        cache: false
      })
      .when("/admin/dashboard/questions/update/:id", {
        templateUrl: "views/admin/updateQuestion.html",
        controller: "UpdateQuestionController",
        cache: false
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

  
