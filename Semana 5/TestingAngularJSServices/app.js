(function () {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;

        var promise = MenuCategoriesService.getMenuCategories();

        promise.then(function (response) {
            menu.categories = response.data;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });

        menu.logMenuItems = function (shortName) {
            var promise = MenuCategoriesService.getMenuForCategory(shortName);

            promise.then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        };
    }

    MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function () {
            var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
            });

            return response;
        };

        service.getMenuForCategory = function (shortName) {
            var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category: shortName
            }
            });

            return response;
        };
    }
})();

/*

To test Angular services:
 - Use mock inject method to inject the $injector service
 - Use $injector.get("DeclaredServiceName") to get service to test
 - If service doesn't make $http calls, just use call its methods and create expectations in the 'it' method
 - If service uses $http, retrieve $httpBackend service in beforeEach
 - In the "it" method, mock each network call with $httpBackend.whenGet or some similar method

*/