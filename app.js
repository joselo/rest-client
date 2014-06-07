angular.module('app', [])

.controller('MainCtrl', function($scope, $rootScope, $http) {

  $scope.meeting = {};

  $scope.send = function() {
    var name = 'Loja';
    $rootScope.$broadcast('sendStarted', name);
  };

  $scope.fetch = function() {
    var url = 'http://0.0.0.0:3000/api/v1/meetings';

    $http.get(url).success(function(response){
      $scope.meetings = response.meetings;
    }).error(function(response) {
      $scope.errors = "Something was wrong";
    });

  };

  $scope.create = function() {
    var url = 'http://0.0.0.0:3000/api/v1/meetings';

    $http.post(url, { meeting: $scope.meeting }).success(function(response){
      $scope.meetings.push(response.meeting);
      $scope.meeting = {};
    }).error(function(response){
      console.log(response);
    });
  };

})

.controller('WelcomeCtrl', function($scope) {

  $scope.$on('sendStarted', function(e, obj) {
    $scope.name = obj;    
  });

});