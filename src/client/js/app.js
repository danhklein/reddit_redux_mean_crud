// add scripts

var app = angular.module('myApp', ['ngRoute']);


app.controller('myController', ['$scope', function($scope){
  $scope.greeting = 'Angulargh'
}]);
