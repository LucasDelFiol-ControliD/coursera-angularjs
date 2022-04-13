(function () {
    'use strict';

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController)
        .filter('loves', LovesFilter)
        .filter('truth', TruthFilter);

    MsgController.$inject = ['$scope', 'lovesFilter'];
    function MsgController($scope, lovesFilter) {
        $scope.name = "Yaakov";
        $scope.stateOfBeing = "hungry";
        $scope.cookieCost = 0.45;

        $scope.sayMessage = function() {
            var msg = "Yaakov likes to eat healthy snacks at night!";
            return msg;
        };

        $scope.sayLovesMessage = function() {
            var msg = "Yaakov likes to eat healthy snacks at night!";
            msg = lovesFilter(msg);
            return msg;
        };

        $scope.feedYaakov = function() {
            $scope.stateOfBeing = "fed";
        }
    }

    // Filter Factory Function
    function LovesFilter() {
        return function(input) {
            input = input || "";
            input = input.replace("likes", "loves");
            return input;
        }
    }

    function TruthFilter() {
        return function(input, target, replace) {
            input = input || "";
            input = input.replace(target, replace);
            return input;
        }
    }
})();

/*

Steps to create a custom filter:
 - Define filter factory function
 - Register filter factory function with module
To use custom filter in JavaScript:
 - Inject filter function registeredNameFilter into controller
To use in HTML - no need to inject into controller
 - {{expression | registeredName}}

*/