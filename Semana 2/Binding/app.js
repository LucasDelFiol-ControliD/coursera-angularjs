(function () {
    'use strict';

    angular.module('BindingApp', [])
        .controller('BindingController', BindingController);

    BindingController.$inject = ['$scope'];
    function BindingController($scope) {
        $scope.firstName = "Yaakov";
        // $scope.fullName = "";

        $scope.showNumberOfWatchers = function() {
            console.log("# of Watchers: ", $scope.$$watchersCount);
        };

        $scope.setFullName = function() {
            $scope.fullName = $scope.firstName + " " + "Chaikin";
        };

        $scope.logFirstName = function() {
            console.log("First name is: ", $scope.firstName);
        };

        $scope.logFullName = function() {
            console.log("Full name is: ", $scope.fullName);
        };
    }
})();

/*

2-way binding (ng-model) means:
 - Lisntener for change on input automatically set up by Angular updates prop value on $scope
 - Direct update to prop value is automatically updated in UI
1-way binding ({{prop}}) means:
 - Direct update to prop value is automatically updated in UI
1-time binding ({{:: prop}}) means:
 - Inialized value of prop is automatically updated in UI
 - Watcher for prop is removed, so UI never agains gets updated

*/