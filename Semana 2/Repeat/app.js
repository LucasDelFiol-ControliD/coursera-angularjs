(function() {
    'use strict';

    var shoppingList1 = ["Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"];
    var shoppingList2 = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        }
    ];

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];
    function ShoppingListController($scope) {
        $scope.shoppingList1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;

        $scope.addToList = function() {
            var newItem = {
                name: $scope.newItemName,
                quantity: $scope.newItemQuantity
            };

            $scope.shoppingList2.push(newItem);
        };
    }
})();

/*

ng-repeat is a directive that extends the functionality of HTML elements it's applied to
 - Behaves very similarly to for-each construct
ng-repeat = "item in collection", where item can now be used in interpolation as an item in the collection at particular index of iteration
ng-repeat exposes a special $index property to the body of its host tag
 - Holds the numeric index of the current item in the loop

*/