(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController1', ShoppingListController1)
        .controller('ShoppingListController2', ShoppingListController2)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingList);

    function ShoppingList() {
        var ddo = {
            templateUrl: 'shoppinglist.html',
            scope: {
                list: '=myList',
                title: '@title'
            }
        };

        return ddo;
    }

    // LIST #1 - Controller
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory) {
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

    // LIST #2 - Controller
    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2(ShoppingListFactory) {
        var list = this;
        var shoppingList = ShoppingListFactory(3);

        list.items = shoppingList.getItems();
        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            try {
                shoppingList.addItem(list.itemName, list.itemQuantity);
            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function(itemIndex) {
            shoppingList.removeItem(itemIndex);
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

Having isolate scope on the directive:
 - Breaks the protypal inheritance of the scope from the parent
 - Makes the directive more independent, less coupled with controller
We pass values into the directive using scope bindings
Bidirectional binding ('=') is such that directive scope property change affects the bound property and vice versa
DOM attribute value binding ('@') always results in directive property being a string
 - Changes to DOM attribute value are propagated to the directive property, but not the other way around

*/