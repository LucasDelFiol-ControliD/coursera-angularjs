(function () {
    'use strict';

    angular.module('MsgApp', []).controller('MsgController', MsgController);

    MsgController.$inject = ['$scope'];
    function MsgController($scope) {
        $scope.name = "Lucas";
        $scope.stateOfBeing = "hungry";

        $scope.sayMessage = function() {
            return "String aqui";
        };

        $scope.feedYaakov = function() {
            $scope.stateOfBeing = "fed";
        }
    }
})();