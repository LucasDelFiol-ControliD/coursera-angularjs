(function() {
    'use strict';

    angular.module('ShoppingListPromiseApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        var list = this;

        list.items = ShoppingListService.getItems();
        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function() {
            ShoppingListService.addItem(list.itemName, list.itemQuantity);
        };

        list.removeItem = function(itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
    function ShoppingListService($q, WeightLossFilterService) {
        var service = this;

        var items = [];

        service.addItem = function(name, quantity) {
            var namePromise = WeightLossFilterService.checkName(name);
            var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

            $q.all([namePromise, quantityPromise])
            .then(function(response) {
                var item = {
                    name: name,
                    quantity: quantity
                };
                items.push(item);
            })
            .catch(function(errorResponse) {
                console.log(errorResponse.message);
            });
        };

        service.removeItem = function(itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function() {
            return items;
        };
    }

    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout) {
        var service = this;

        service.checkName = function(name) {
            var deferred = $q.defer();
            
            var result = {
                message: ""
            };

            $timeout(function() {
                if(name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result);
                } else {
                    result.message = "Stay away from cookies, Yaakov!";
                    deferred.reject(result);
                }
            }, 3000);

            return deferred.promise;
        };

        service.checkQuantity = function(quantity) {
            var deferred = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function() {
                if(quantity < 6) {
                    deferred.resolve(result);
                } else {
                    result.message = "That's too much, Yaakov!";
                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise;
        };
    }
})();

/*

Promises give us a lot of flexibility when dealing asynchronous behavior
The $q service is the Angular implementation of Promise API
Promises either get resolved or rejected
The 'then' method takes 2 arguments (both function values)
 - 1st - function to handle success or 'resolve' outcome
 - 2nd - function to handle error or 'reject' outcome
 - 'then' itself returns a Promise, so it chainable
$q.all method allows us to execute multiple promises in parallel, handling success/failure in one central place

*/