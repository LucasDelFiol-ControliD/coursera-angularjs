(function () {
    'use strict';

    angular.module('DIApp', []).controller('DIController', DIController);

    DIController.$inject = ['$scope', '$filter'];
    function DIController ($scope, $filter) {
        $scope.name = "";
        
        // Transforma as letras minusculas de uma string de caracteres em letras maiusculas
        $scope.upper = function() {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };
    }
})();