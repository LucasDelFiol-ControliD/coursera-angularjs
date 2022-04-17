(function () {
    'use strict';

    angular.module('ShoppingList')
        .component('shoppingList', {
            templateUrl: 'shoppinglist/templates/shoppinglist.template.html',
            bindings: {
                items: '<'
            }
        });
})();