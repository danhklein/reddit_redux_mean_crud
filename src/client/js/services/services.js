/**
 * Created by danielklein on 4/17/16.
 */

app.service('discussionDataService', ['$rootScope', 'crudService', function($rootScope, crudService) {

    return {
        getAllDiscussions: function () {
            return crudService.getAll('discussion')
                .then(function(discussions){
                console.log(discussions);
                    return discussions;
                });
        },
        addDiscussion: function(payload) {
            crudService.addOne('discussion', payload)
                .then(function(discussion) {
                    return discussion;
                })
                .catch(function (err) {
                    return err;
                });
        },
        deleteDiscussion: function(payload) {

            crudService.deleteOne('discussion', payload)
                .then(function(discussion) {

                    return discussion;
                });
        },
        editDiscussion: function(id, payload) {
            crudService.editOne('discussion', payload)
                .then(function(discussion) {
                    return discussion;
                })
                .catch(function (err) {
                    return err;
                });
        },
    };
}]);

app.service('crudService', ['$http', function($http) {
    return {
        getAll: function (resource) {
            return $http.get('/'+resource)
                .then(function(res) {
                    return res;
                })
                .catch(function(err) {
                    return err;
                });
        },
        addOne: function(resource, payload) {

            return $http.post('/'+resource, payload)
                .then(function(res) {
                    return res;
                })
                .catch(function(err) {
                    return err;
                });
        },
        deleteOne: function(resource, payload) {
            return $http.delete('/'+resource + '/'+ req.body._id)
                .then(function(res) {
                    return res;
                })
                .catch(function(err) {
                    return err;
                });
        },
        editOne: function(resource, payload) {
            console.log('payload', payload);
            return $http.put('/'+resource + '/'+ payload._id, payload)

                .then(function(res) {
                    return res;
                })
                .catch(function(err) {
                    return err;
                });
        }
    };
}])

// 1. login
// 2. logout
// 3. register
// 4. set user info into localstorage
// 5. get user info from localstorage
// **/
app.service('authService', ['$http', '$window', function($http, $window) {
    var user = {};
    return {
        login: function(user) {
            return $http.post('/auth/login', user);
        },
        logout: function(user) {
            user = null;
            $window.localStorage.clear();
        },
        register: function(user) {
            return $http.post('/auth/register', user);
        },
        setUserInfo: function(userData) {
            $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
            $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
        },
        getUserInfo: function(userData) {
            return $window.localStorage.getItem('user');
        },
    };
}]);

app.service('authInterceptor', ['$window', function($window) {
    return {
        request: function(config) {
            // check for token in headers
            // config.headers['X-requested-with'] = XMLHttpRequest;
            var token = $window.localStorage.getItem('token');
            if(token) {
                config.headers.Authorization = "Bearer " + token;
                // return $q.resolve(config);
            }
            return config;
        }
    };
}]);
