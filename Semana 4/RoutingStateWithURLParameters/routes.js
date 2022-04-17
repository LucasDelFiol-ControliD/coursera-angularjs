(function () {
    'use strict';

    angular.module('ShoppingList')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'shoppinglist/templates/home.template.html'
        })

        // Premade list page
        .state('mainList', {
            url: '/main-list',
            templateUrl: 'shoppinglist/templates/main-shoppinglist.template.html',
            controller: 'MainShoppingListController as mainList',
            resolve: {
            items: ['ShoppingListService', function (ShoppingListService) {
                return ShoppingListService.getItems();
            }]
            }
        })

        .state('itemDetail', {
            url: '/item-detail/{itemId}',
            templateUrl: 'shoppinglist/templates/item-detail.template.html',
            controller: 'ItemDetailController as itemDetail',
            resolve: {
            item: ['$stateParams', 'ShoppingListService',
                    function ($stateParams, ShoppingListService) {
                    return ShoppingListService.getItems()
                        .then(function (items) {
                            return items[$stateParams.itemId];
                        });
                    }]
            }
        });
    }
})();

/*

State's url property can be declared with parameters
Parameters:
 - Wrapped in curly braces /{paramName}
 - Can have more complex matching rules other than just a string
 - Support regular expressions matching
Use $stateParams service to retrieve parameters
 - $stateParams.paramName
Construct a URL with ui-sref directive:
 - ui-sref="stateName({paramName: value})"

*/