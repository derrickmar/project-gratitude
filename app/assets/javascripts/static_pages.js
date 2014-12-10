var controllers, aspire;
var arrayOffset = 1;


gratitude = angular.module('gratitude', ['templates', 'ngRoute', 'controllers']);

gratitude.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "home.html",
            controller: 'ActController',
        });
    }
]);
gratitude.filter('range', function() {
    return function(input, total) {
        // total = parseInt(total);
        for (var i = total[0]; i < total[1] + 1; i++)
            input.push(i);
        return input;
    };
});

controllers = angular.module('controllers', []);

controllers.controller("ActController", function($scope) {
	// controller stuff here
});