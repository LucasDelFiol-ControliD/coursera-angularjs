(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        // .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
        .directive('shoppingList', ShoppingList);

    function ShoppingList() {
        var ddo = {
            templateUrl: 'shoppinglist.html',
            scope: {
                items: '<',
                title: '@'
            },
            // controller: 'ShoppingListDirectiveController as list',
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function ShoppingListDirectiveController() {
        var list = this;

        list.cookiesInList = function() {
            for (var i = 0; i < list.items.length; i++) {
                var name = list.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }

            return false;
        }
    }

    // LIST #1 - Controller
    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var list = this;
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();
        var origTitle = "Shopping List #1";
        list.title = origTitle + " (" + list.items.length + " items )";

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + " (" + list.items.length + " items )";
        };

        list.removeItem = function(itemIndex) {
            shoppingList.removeItem(itemIndex);
            list.title = origTitle + " (" + list.items.length + " items )";
        };
    }

    function ShoppingListService(maxItems) {
        var service = this;
        var items = [];

        service.addItem = function(itemName, quantity) {
            if ((maxItems === undefined) || ((maxItems !== undefined) && (items.length < maxItems))) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };
                items.push(item);
            } else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };

        service.removeItem = function(itemIndex) {
            items.splice(itemIndex, 1);
        }

        service.getItems = function() {
            return items;
        };
    }

    function ShoppingListFactory() {
        var factory = function(maxItems) {
            return new ShoppingListService(maxItems);
        };

        return factory;
    }
})();

/*

To add functionality to the directive, one choice is to use a controller that's declared directly on the DDO
Use controller property to declare controller in DDO
Use bindToController and controllerAs props to bind declared properties in isolate scope directly to controller instance
Define controller function as usual
Whenever possible, use '<' for one-way binding to save resources instead of bidirectional binding with '='

*/