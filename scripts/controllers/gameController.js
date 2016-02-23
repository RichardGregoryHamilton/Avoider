angular.module('avoider')
	.controller('gameController', ['$scope', function($scope) {
		
		$scope.level = 1;
		$scope.coins = +(localStorage['coins']);
	}]);