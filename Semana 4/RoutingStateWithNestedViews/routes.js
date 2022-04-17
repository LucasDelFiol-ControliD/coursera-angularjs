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

        // Item detail
        .state('mainList.itemDetail', {
            // url: '/item-detail/{itemId}',
            templateUrl: 'shoppinglist/templates/item-detail.template.html',
            controller: 'ItemDetailController as itemDetail',
            params: {
                itemId: null
            }
        });
    }
})();

/*

Nested states allow us to logically represent nested views
Parent state template has a ui-view in its template for the child state's template to insert its HTML
Child state name is usually declared with syntax 'parent.child'
The optionally declared url of the child gets concatenated to the declared url of the parent
The parent's resolve property is inherited by the child and is injectable directly into the child's controller

*/