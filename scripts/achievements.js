/* This JavaScript file deals with all achievement logic */

function showGamesAchievements() {
    var countGames = +(localStorage['gamesPlayed']);
    var currentMilestone = _.find(gameMilestones, function(m) {
        return m.number === countGames;
    });
    if (achievements.length) {
        //localStorage['achievements'] = localStorage['achievements'].replace("]", ",\"") + currentMilestone.name + "\"" + "]";
    }
    else {
        localStorage['achievements'] = JSON.stringify([currentMilestone.name]);
    }
    if (currentMilestone) {
        $("#notification").css({ 'visibility': 'visible' });
        $("#notification").html(achievementMessage + currentMilestone.name);
        setTimeout(hideMessage, 5000);
    }
}

var gameMilestones = [
                        { "number": 1,  "name": "Novice"       },
                        { "number": 5,  "name": "Beginner"     },
                        { "number": 10, "name": "Journeyman"   },
                        { "number": 20, "name": "Master"       },
                        { "number": 30, "name": "Grand Master" }
                     ];
                     
var timeMilestones = [
                        { "number": 10,  "name": "Level 1" },
                        { "number": 20,  "name": "Level 2" },
                        { "number": 30,  "name": "Level 3" },
                        { "number": 40,  "name": "Level 4" },
                        { "number": 50,  "name": "Level 5" }
                     ];

function hideMessage() {
    $("#notification").css({ 'visibility': 'hidden' });
}
