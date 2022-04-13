!function(){"use strict";function e(e,n){e.name="",e.upper=function(){var r=n("uppercase");e.name=r(e.name)}}angular.module("DIApp",[]).controller("DIController",e),e.$inject=["$scope","$filter"]}();

/*

Expression: something that turns into a value
 - {{expression}}
 - Angular expressions are tied to the scope they are in
 - Doesn't display TypeError and ReferenceError to user
Interpolation: replaces placeholders in a string with values
 - In Angular, these placeholders are usually expressions
 - Result is automatically updated when placeholder value changes
*/