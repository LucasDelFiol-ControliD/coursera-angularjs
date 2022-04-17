(function () {
    'use strict';

    angular.module('ShoppingList', ['Spinner']);

    angular.module('ShoppingList')
        .config(function () {
            console.log("ShoppingList config fired.");
        })
        .run(function () {
            console.log("ShoppingList run fired.");
        });
})();

/*

angular.module method takes 2 args to create a module:
 - Name of module
 - Array of string module name dependencies
angular.module method with just name of module retrives the previously created module
 - Then, you can declare components, controllers, etc, on it
module.config methid fires before module.run method
All dependency modules get configured first
It doesn't matter which modules are listed first as long as module declarations are listed before artifact declarations on that module

*/