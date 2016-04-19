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
