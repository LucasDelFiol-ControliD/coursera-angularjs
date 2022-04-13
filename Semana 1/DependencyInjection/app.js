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

/*

Design pattern: Dependency Injection (DI)
Implements Inversion of Control (IoC)
Client gets called with the dependency by some system
 - In our case, the "system" is AngularJS
Client is not responsible for instantiating the dependency

*/