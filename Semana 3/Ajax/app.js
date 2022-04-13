(function() {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;

        var promise = MenuCategoriesService.getMenuCategories();

        promise.then(function(response) {
            menu.categories = response.data;
        })
        .catch(function(error) {
            console.log("Something went terribly wrong.");
        });

        menu.logMenuItems = function(shortName) {
            var promise = MenuCategoriesService.getMenuForCategory(shortName);

            promise.then(function(response) {
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
            })
        };
    }

    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function() {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });

            return response;
        };

        service.getMenuForCategory = function(shortName) {
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

$http service is based on the promise api exposed to by $q
$http is itself a function:
 - Takes a single config object parameter (url only required prop)
 - Returns a promise to be resolved with .then function
response.data property holds the server data response
 - If JSON, automatically gets transformed into a JS object
module.constant can be used an injectable constant

*/