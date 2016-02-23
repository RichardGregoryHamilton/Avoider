angular.module('avoider')
	.factory('Game', function() {
		gamesPlayed: +(localStorage['gamesPlayed']);
	});