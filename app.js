(function () {
    'use strict';

    angular.module('myFirstApp', [])
    .controller('myFirstController', function ($scope) {
        $scope.name = "Lucas";
        $scope.sayHello = function () {
            return "Hello Coursera!";
        }
    });
})();