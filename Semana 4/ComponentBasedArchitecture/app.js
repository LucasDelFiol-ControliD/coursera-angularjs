(function() {
    'use strict';

    angular.module('ShoppingListComponentApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .component('shoppingList', {
            templateUrl: 'shoppinglist.html',
            controller: ShoppingListComponentController,
            bindings: {
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            }
        });

    ShoppingListComponentController.$inject = ['$element'];
    function ShoppingListComponentController($element) {
        var $ctrl = this;
        var totalItems;

        $ctrl.cookiesInList = function() {
            for (var i = 0; i < $ctrl.items.length; i++) {
                var name = $ctrl.items[i].name;
                if (name.toLowerCase().indexOf("cookie") !== -1) {
                    return true;
                }
            }

            return false;
        };

        $ctrl.remove = function(myIndex) {
            $ctrl.onRemove({index: myIndex});
        };

        $ctrl.$onInit = function() {
            totalItems = 0;
        };

        $ctrl.$onChanges = function(changeObj) {
            console.log("Changes: ", changeObj);
        };

        $ctrl.$doCheck = function() {
            if ($ctrl.items.length !== totalItems) {
                totalItems = $ctrl.items.length;
                if ($ctrl.cookiesInList()) {
                    var warningElem = $element.find('div.error');
                    warningElem.slideDown(900);
                } else {
                    var warningElem = $element.find('div.error');
                    warningElem.slideUp(900);
                }
            }
        };
    }

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
            console.log("'this' is: ", this);
            this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
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

Components encourage component-based architecture
 - But they don't enforce it 100%, so we must follow conventions
Components should never modify data or DOM that doesn't belong to them
 - That's why it always has isolate scope and well-defined API
Register component with .component('name', configObj)
Provide controller only if you are adding extra functionality
 - Otherwise, Angular already provides an empty function for us

*/