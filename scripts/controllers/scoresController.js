angular.module('avoider')
    .controller('scoresController', ['$scope', function($scope) {
        
        var oldScores = JSON.parse(localStorage['scores'] || '[]');
        
        var sorted = oldScores.sort(
			firstBy(function(a,b) { return +(b.split(":")[0]) - +(a.split(":")[0]) })
			.thenBy(function(a,b) { return +(b.split(":")[1]) - +(a.split(":")[1]) })
        );
        
        $scope.scoreData = [
                             { 'class': 'gold',     'score': sorted[0], 'level': (sorted[0].split(":")[0] / 10) | 0 },
                             { 'class': 'silver',   'score': sorted[1], 'level': (sorted[1].split(":")[0] / 10) | 0 },
                             { 'class': 'bronze',   'score': sorted[2], 'level': (sorted[2].split(":")[0] / 10) | 0 },
                             { 'class': 'top-five', 'score': sorted[3], 'level': (sorted[3].split(":")[0] / 10) | 0 },
                             { 'class': 'top-five', 'score': sorted[4], 'level': (sorted[4].split(":")[0] / 10) | 0 }
                           ];
                           
    }]);