(function () {
    'use strict';

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];
    function CounterController($scope, $timeout) {
        $scope.counter = 0;

        $scope.upCounter = function() {
            $timeout(function() {
                $scope.counter++;
                console.log("Counter incremented!");
            }, 2000);
        };
    }
})();

/*

Digest Cycle does not get triggered automatically of events are unaware of Angular
Solution:
 - call $digest after your custom code
 - or wrap your custom code inside of $apply
 - or find the Angular specific service that handles the same functionality (e.g., $timeout)

*/