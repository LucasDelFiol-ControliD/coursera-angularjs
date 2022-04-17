(function () {
    'use strict';

    angular.module('RoutingApp',['ui.router']);

    angular.module('RoutingApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to tab 1 if no other URL matches
        $urlRouterProvider.otherwise('/tab1');

        // Set up UI states
        $stateProvider.state('tab1', {
            url: '/tab1',
            templateUrl: 'tab1.html'
        }).state('tab2', {
            url: '/tab2',
            templateUrl: 'tab2.html'
        });
    }
})();

/*

ui-router uses independent concepts for URL mapping and UI state representation
Configure ui-router in angular.config:
 - Provide alternative URL mapping with $urlRouterProvider.otherwise('alternateURL')
 - Configure states with optional URLs using $stateprovider.state('name', {url: '...', template: '...'})
Use <ui-view> tag as placeholder for state-based UI
Use ui-sref attribute for constructing links and actions to configured states

*/