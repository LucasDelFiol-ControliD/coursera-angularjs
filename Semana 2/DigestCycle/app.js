(function () {
    'use strict';

    angular.module('CounterApp', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];
    function CounterController($scope) {
        $scope.onceCounter = 0;
        $scope.counter = 0;
        $scope.name = "Yaakov";

        $scope.showNumberOfWatchers = function() {
            console.log("# of Watchers: ", $scope.$$watchersCount);
        };

        $scope.countOnce = function() {
            $scope.onceCounter = 1;
        };

        $scope.upCounter = function() {
            $scope.counter++;
        };

        $scope.$watch(function() {
            console.log("Digest Loop Fired!");
        });

        // Não é recomendado fazer watchers dessa forma
        /*
        $scope.$watch('onceCounter', function(newValue, oldValue) {
            console.log("onceCounter old value: ", oldValue);
            console.log("onceCounter new value: ", newValue);
        });

        $scope.$watch('counter', function(newValue, oldValue) {
            console.log("counter old value: ", oldValue);
            console.log("counter new value: ", newValue);
        });
        */
    }
})();

/*

Digest Cycle: running digest loops until all watchers report that nothing has changed
 - Dirty checking
Several ways to set up watchers:
 - $scope.$watch - don't do this in a controller
 - {{someProp}}
 - <input ... ng-model="someProp">
Only applies to things done inside of the Angular context
 - Angular-aware event binding (e.g., ng-click)

*/