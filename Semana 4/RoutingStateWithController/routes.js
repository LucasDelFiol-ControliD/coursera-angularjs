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
            controller: 'MainShoppingListController as mainList'
        });
    }
})();

/*

We can declare a controller that is responsible for the state's template right in the state's declaration
Use:
 - controller: 'CtrlName as label'
 - controller: CtrlName, controllerAs: 'label'
In the template, use label.data as usual with controllerAs syntax

*/