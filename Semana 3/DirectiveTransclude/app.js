(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingList);

    function ShoppingList() {
        var ddo = {
            templateUrl: 'shoppinglist.html',
            scope: {
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: ShoppingListDirectiveLink,
            transclude: true
        };

        return ddo;
    }

    function ShoppingListDirectiveLink($scope, element, attrs, controller) {
        console.log("Link scope is: ", $scope);
        console.log("Controller instance is: ", controller);
        console.log("Element is: ", element);

        $scope.$watch('list.cookiesInList()', function(newValue, oldValue) {
            console.log("Old value: ", oldValue);
            console.log("New value: ", newValue);

            if (newValue === true) {
                displayCookieWarning();
            } else {
                removeCookieWarning();
            }
        });

        function displayCookieWarning() {
            // Using Angular jqLite
            /* var warningElem = element.find("div");
            console.log(warningElem);
            warningElem.css('display', 'block'); */

            // If jQuery included before Angular
            var warningElem = element.find("div.error");
            warningElem.slideDown(900);
        }
    
        function removeCookieWarning() {
            // Using Angular jqLite
            /* var warningElem = element.find("div");
            warningElem.css('display', 'none'); */

            // If jQuery included before Angular
            var warningElem = element.find("div.error");
            warningElem.slideUp(900);
        }
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

        list.warning = "COOKIES DETECTED!";

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

transclude allows whole templates to be passed into a directive
The wrapped content is evaluated in the parent's context, NOT in the directive's context
In the DDO:
 - transclude: true
In directive's template:
 - ng-transclude attribute designates place for evaluated wrapped content

*/