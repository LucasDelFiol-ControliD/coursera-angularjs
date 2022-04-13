(function() {
    'use strict';

    angular.module('ControllerAsApp', [])
        .controller('ParentController1', ParentController1)
        .controller('ChildController1', ChildController1)
        .controller('ParentController2', ParentController2)
        .controller('ChildController2', ChildController2);
    
    ParentController1.$inject = ['$scope'];
    function ParentController1($scope) {
        $scope.parentValue = 1;
        $scope.pc = this;
        $scope.pc.parentValue = 1;
    }

    ChildController1.$inject = ['$scope'];
    function ChildController1($scope) {
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("CHILD $scope: ", $scope);

        $scope.parentValue = 5;
        console.log("*** CHANGED: $scope.parentValue = 5 ***");
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("CHILD $scope: ", $scope);

        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        $scope.pc.parentValue = 5;
        console.log("*** CHANGED: $scope.pc.parentValue = 5 ***");
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        console.log("CHILD $scope: ", $scope);

        console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);
    }

    function ParentController2() {
        var parent = this;
        parent.value = 1;
    }

    ChildController2.$inject = ['$scope'];
    function ChildController2($scope) {
        var child = this;
        child.value = 5;
        console.log("ChildController2 $scope: ", $scope);
    }
})();

/*

Inheritance in general is used for code re-use (and sometimes to express a relationship between entities)
Prototypal inheritance in JS is based on object instances rather than classes
 - Property is inherited from parent, looked up through Prototype Chain
 - Property is local if it's declared on the child with the same name as the parent and therefore masking the parent's property

$scope is based on prototypal inheritance
 - Child controller's $scope inherits from parent controller's $scope
Controller As Syntax is ControllerName as label
Angular creates property 'label' on the $scope
 - The label is a reference to 'this', i.e., instance of Controller
 - Works because .controller treats it as a function constructor
Attach properties to 'this' inside of Controller, not $scope
 - Easier syntax in HTML and JS - no masking occurs

*/