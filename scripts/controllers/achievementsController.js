angular.module('avoider')
    .controller('achievementsController', ['$scope', function($scope) {
    
        var achievementMessage = 'You have unlocked the achievement ';
        var allScoreAchievements = [];

        [100, 200, 500, 1000].forEach(function(number, index) {
            allScoreAchievements[index] = { 'name': 'Score ' + number, 'value': number };
        });

        function showNotification() {
            $('#notification').css({ 'visibility': 'visible' });
            setTimeout(function() {
                $('#notification').css({ 'visibility': 'hidden' });
            }, 5000);
        }
        
        $scope.hasAchievement = function(achievement) {
            return localStorage['achievements'].includes(achievement);
        }
        
        $scope.levelAchievements = [
                                     { 'name': 'Level 2',  'value': 10, 'points': 5,  'src': 'number2.png' },
                                     { 'name': 'Level 3',  'value': 20, 'points': 10, 'src': 'number3.jpg' },
                                     { 'name': 'Level 4',  'value': 30, 'points': 15, 'src': 'number4.jpe' },
                                     { 'name': 'Level 5',  'value': 40, 'points': 20, 'src': 'number5.jpg' },
                                     { 'name': 'Level 6',  'value': 50, 'points': 25, 'src': 'number6.jpg' },
                                     { 'name': 'Level 7',  'value': 60, 'points': 30, 'src': 'number7.png' }
                                   ];
                                   
        $scope.scoreAchievements = [
                                     { 'name': 'Score 100',  'value': 100,  'points': 10, 'src': 'score100.png' },
                                     { 'name': 'Score 200',  'value': 200,  'points': 15, 'src': 'score200.png' },
                                     { 'name': 'Score 500',  'value': 500,  'points': 30, 'src': 'score500.jpg' },
                                     { 'name': 'Score 1000', 'value': 1000, 'points': 50, 'src': 'score1000.jpe' }
                                   ];
                                   
        $scope.gameAchievements = [
                                    { 'name': 'Novice',       'value': 1,  'points': 5,  'src': 'novice.jpe' },
                                    { 'name': 'Beginner',     'value': 5,  'points': 10, 'src': 'beginner.jpg' },
                                    { 'name': 'Journeyman',   'value': 10, 'points': 15, 'src': 'journeyman.png' },
                                    { 'name': 'Master',       'value': 20, 'points': 20, 'src': 'master.jpe' },
                                    { 'name': 'Grand Master', 'value': 30, 'points': 30, 'src': 'grandmaster.jpg' }
                                  ];
                                  
    }]);