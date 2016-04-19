
app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../partials/main.html',
            preventLoggedIn: false
        })


});

/**
 * Created by danielklein on 4/17/16.
 */
