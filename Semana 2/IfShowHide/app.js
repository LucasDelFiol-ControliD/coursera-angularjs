(function() {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);


    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 5;
    }

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        var list = this;

        list.items = ShoppingListService.getItems();
        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            try {
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            } catch (error) {
                list.errorMessage = error.message;
            }
        };

        list.removeItem = function(itemIndex) {
            ShoppingListService.removeItem(itemIndex);
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

    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function() {
            var shoppingList = new ShoppingListService(provider.defaults.maxItems);
            return shoppingList;
        };
    }
})();

/*

ng-if is a general purpose "if statement" like attribute directive
 - If its value is false, angular removes the containing element from the DOM entirely
ng-show/ng-hide attribute directives automatically attach CSS classes to the containing element that either show or hide the element
 - The containing element does NOT get removed from the DOM

*/