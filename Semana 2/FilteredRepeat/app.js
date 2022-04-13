(function() {
    'use strict';

    var shoppingList = ["Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"];

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController);
    
    ShoppingListController.$inject = ['$scope'];
    function ShoppingListController($scope) {
        $scope.shoppingList = shoppingList;
    }
})();

/*

Array has a special function called filter
 - Create new array where each item satisfies some condition of the comparison function passed into the filter function
Angular has a special filter called 'filter'
 - Provided a string as 1st argument, it will filter the array it's applied to, matching all string items against the provided one
ng-repeat="item in collection | filter : searchString"

*/