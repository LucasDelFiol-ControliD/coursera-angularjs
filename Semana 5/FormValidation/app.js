(function () {
    'use strict';

    angular.module('SimpleFormsApp',[]);

    angular.module('SimpleFormsApp')
        .controller('RegistrationController', RegistrationController);

    function RegistrationController() {
        var reg = this;

        reg.submit = function () {
            reg.completed = true;
        };
    }
})();

/*

Create a named form with named fields
 - Declare form's novalidate flag
Bind form inputs using ng-model
Specify HTML5 validations on input elements
Use form bound objects to show/hide error messages and to disable action buttons
Use Angular provided CSS classes to style difference scenarios to give more visual feedback to the user

*/