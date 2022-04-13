(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController1', ShoppingListController1)
        .controller('ShoppingListController2', ShoppingListController2)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('listItemDescription', ListItemDescription)
        .directive('listItem', ListItem);

    function ListItem() {
        var ddo = {
            restrict: "AE",
            templateUrl: 'listItem.html'
        };

        return ddo;
    }

    function ListItemDescription() {
        var ddo = {
            template: '{{item.quantity}} of {{item.name}}'
        };

        return ddo;
    }

    // LIST #1 - Controller
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory) {
        var list = this;
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();
        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            shoppingList.addItem(list.itemName, list.itemQuantity);
        };

        list.removeItem = function(itemIndex) {
            shoppingList.removeItem(itemIndex);
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

Directive is a marker in HTML that Angular compiles into some behavior
 - It can also change the HTML elements themselves
Register name of directive using (normalized) camelCase
Registered factory function must return a DDO
 - The factory function gets invoked only once
With custom directies, our HTML coding becomes
 - Reusable
 - Semantically relevent to the actual web app we're building

The DDO's restrict property determines what AngularJS compiler should look for to detect your custom directive
Using directive as a different restrict type than defined will cause the compilar to simply ignore it
Best practice: use 'E' for element when directive has content along with possible behavior
Best practice: use 'A' for attribute when directive has no content and only extends the behavior of host element
Class and comment directives are possible, but not used

*/