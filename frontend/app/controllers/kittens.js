module.exports = function ($scope, $http) {
  $scope.message = "Hello kitty";

  $scope.showMessage = function() {
    alert($scope.message);
  };
}
