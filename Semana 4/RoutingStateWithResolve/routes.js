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
        });
    }
})();

/*

resolve property can be used to inject values directly into the controller responsible for the state
If resolve property is a promise:
 - Router will wait for it to resolve before transitioning to the state
 - If rejected, router will not transition to the new state at all
The name of the key in the resolve's property object is what is to be injected into the corresponding controller's function
Resolve can have properties that contain anything: objects, strings, etc.

*/