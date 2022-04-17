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
        .state('mainList.itemDetail', {
            url: '/item-detail/{itemId}',
            templateUrl: 'shoppinglist/templates/item-detail.template.html',
            controller: "ItemDetailController as itemDetail"
        });
    }
})();

/*

ui-router exposes numerous state change events that our code is able to listen for
All ui-router events are fired on the $rootScope
$stateChangeStart - starts the state transition
 - Call event.preventDefault() to prevent the transition
$stateChangeSuccess indicates a successful transition end
$stateChangeError indicates that the transition failed, including having errors in the resolve
 - Listen for this event to catch ALL errors during state changes

*/