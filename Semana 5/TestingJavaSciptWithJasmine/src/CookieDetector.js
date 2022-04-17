// Version 1
// function detectCookie(items) {
//     for (var i = 0; i < items.length; i++) {
//         var item = items[i];
//         if (item.indexOf("cookie") !== -1) {
//             return true;
//         }

//         return false;
//     }
// }

// Version 2
// function detectCookie(items) {
//     for (var i = 0; i < items.length; i++) {
//         var item = items[i];
//         if (item.indexOf("cookie") !== -1) {
//             return true;
//         }
//     }

//     return false;
// }

// Version 3
function detectCookie(items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.toLowerCase().indexOf("cookie") !== -1) {
            return true;
        }
    }

    return false;
}

/*

Unit testing is an essential process in any software dev
 - Planning for unit testing changes how you write code (for the better)
Mocks are used to fake the dependencies of target code
describe("message", function() {}) is used to group tests together
beforeEach(function() {}) is used to initialize state before running each test
it("message", function() {actual test}) is used to run the actual test code

*/