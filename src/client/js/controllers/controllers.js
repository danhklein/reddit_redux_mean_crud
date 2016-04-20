/**
 * Created by danielklein on 4/17/16.
 */

app.controller('allDiscussionController', ['$scope',  'discussionDataService',
    function($scope, discussionDataService) {

discussionDataService.getAllDiscussions()
    .then(function(discussion) {
        $scope.allDiscussions = discussion.data.data;
        console.log('Kevin request', $scope.allDiscussions);
    });
    }]);

app.controller('addDiscussionController', ['$scope', '$rootScope', '$window','discussionDataService',
    function($scope, $rootScope, $window, discussionDataService){

        console.log('rootScope:', $rootScope );
        console.log('$window', $window)
        $scope.discussion = {};
        // $scope.discussion.user = $rootScope.currentUser;
        $scope.addDiscussion = function() {
            console.log($scope.discussion);
            discussionDataService.addDiscussion($scope.discussion);
            $scope.discussion = {};
        }
    }]);

app.controller('editDiscussionController', ['$scope', '$window', 'discussionDataService',
    function($scope, $window, discussionDataService) {
        $scope.show = false;

        $scope.makeEditable = function () {
            this.show = true;
        };

        $scope.editDiscussion = function(discussion) {
            discussionDataService.editDiscussion(discussion);
            this.show = false;
        };

        $scope.changeVote = function(discussionID, change) {
            console.log('dID', discussionID);
            console.log($scope.discussion)
            if (change === 'plus') {
                $scope.discussion.meta.votes++;
            }
            if (change === 'minus') {
                $scope.discussion.meta.votes--;
            }
            discussionDataService.editDiscussion(discussionID, $scope.discussion)
        };

        $scope.addComment = function(discussionID, newComment) {
            $scope.newComment = {};
            console.log(newComment);
            $scope.discussion.comments.push(newComment);
            discussionDataService.editDiscussion(discussionID, $scope.discussion)
        }


    }]);

app.controller('registerController', ['$rootScope', '$scope', '$location', 'authService',
    function($rootScope, $scope, $location, authService) {
        $scope.user = {};
        $scope.register = function() {

            authService.register($scope.user)
                .then(function(user) {
                    authService.setUserInfo(user);
                    $location.path('/');
                    $rootScope.currentUser = authService.getUserInfo();
                    console.log('registerController: rootscope.currentuser:', $rootScope.currentUser  )
                    console.log('rootscope', $rootScope)
                })
                .catch(function(err){
                    //check status code,
                    //send appropriate message
                    console.log(err);
                });
        };
    }]);

app.controller('loginController', ['$rootScope', '$scope', '$location', 'authService',
    function($rootScope, $scope, $location, authService) {
        $scope.user = {};
        $scope.login = function() {
            authService.login($scope.user)

                .then(function(user) {
                    console.log('rootScope:', $rootScope );
                    console.log('$window', $window);

                    authService.setUserInfo(user);
                    $location.path('/');
                    $rootScope.currentUser = authService.getUserInfo();
                    console.log('loginController: rootscope.currentuser:', $rootScope.currentUser  )

                })
                .catch(function(err){
                    //check status code,
                    //send appropriate message
                    console.log(err);

                });
        };
    }])