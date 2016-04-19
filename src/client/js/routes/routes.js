
app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../partials/main.html',
            // preventLoggedIn: false
        })
        .when('/register', {
            templateUrl: '../partials/register.html',
            controller: 'registerController',
            restricted: false,
            preventLoggedIn: true
        })
        .when('/logout', {
            restricted: false,
            preventLoggedIn: false,
            resolve: {
                test: function(authService, $rootScope, $location) {
                    authService.logout();
                    $rootScope.currentUser = authService.getUserInfo();
                    $location.path('/login');
                }
            }
        })
        .when('/login', {
            templateUrl: '../partials/login.html',
            controller: 'loginController',
            restricted: false,
            preventLoggedIn: true
        })
        .otherwise({redirectTo: '/login'});
    $httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, $location, $window, authService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        // if route us restricted and no token is present
        if(next.restricted && !$window.localStorage.getItem('token')) {
            $location.path('/login');
        }
        // if token and prevent logging in is true
        if(next.preventLoggedIn && $window.localStorage.getItem('token')) {
            $location.path('/');
        }
    });
});


/**
 * Created by danielklein on 4/17/16.
 */
