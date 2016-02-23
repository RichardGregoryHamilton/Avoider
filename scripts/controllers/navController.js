angular.module('avoider')
    .controller('navController', ['$scope', '$document', function($scope, $document) {
        $scope.page = $document[0].title;
        $scope.home = 'Avoider Game';
		$scope.coins = +(localStorage['coins']);
    }]);