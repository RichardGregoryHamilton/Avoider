var canvas = document.getElementById("my-canvas");
var gameOver = false;
var playing = false;
var scoreUpdated = false;
var level = 1;

var achievements = JSON.parse(localStorage['achievements']);
var achievementMessage = "You've unlocked the achievement ";

var avatarX = $("canvas").width / 2;
var avatarY = $("canvas").height / 2;

var enemy = localStorage['enemy'];

function Enemy(position, direction, corner, x, y, speedX, speedY) {
    this.position = position;
    this.direction = direction;
    this.corner = corner;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
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

var enemies = [
                new Enemy("left", "right", "top", 10, 10, 6, 5), 
                new Enemy("right", "left", "top", 470, 10, 6, 5),
                new Enemy("left", "right", "bottom", 10, 390, 6, 5),
                new Enemy("right", "left", "bottom", 470, 390, 6, 5)
              ];

function hideMessage() {
    $("#notification").css({ 'visibility': 'hidden' });
}
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

$("canvas").on("click", function() {
    if (gameOver) {
        $("canvas").clearCanvas();
        gameOver = false;
    }
    
    localStorage['gamesPlayed']++;

    showGamesAchievements();
    startTime = new Date().getTime();
    
    if (!playing) {
        playing = true;
        $("canvas").drawImage({
            source: "/images/avatar.png",
            x: avatarX,
            y: avatarY
        });
        
        drawEnemies();

        var gameLoop = setInterval(moveEnemy, 100);
        setInterval(function() {
            if (gameOver) {
                clearInterval(gameLoop);
                addScores();
            }
        }, 100)
    }
    if (!gameOver) {
        canvas.addEventListener('mousemove', redrawAvatar);
    }
});

function addScores() {
    if (!scoreUpdated) {
        var score = calculateTime();
        var scores = JSON.parse(localStorage['scores']);
        scores.push(score);
        if (scores.length) {
            localStorage['scores'] = localStorage['scores'].replace("]", ",\"") + score + "\"" + "]";
            localStorage['scores'] = JSON.stringify(scores);
        }
        else {
            localStorage['scores'] = JSON.stringify(scores);
        }
        scoreUpdated = true;
    }
}

function calculateTime() {
    var endTime = new Date().getTime();
    var elapsedTime = endTime - startTime;
    var seconds = Math.floor(elapsedTime / 1000);
    var milliseconds = elapsedTime % 1000;
    
    /* Add coins based on the time elapsed */
    var coins = +(localStorage['coins']) + seconds;
    localStorage['coins'] = coins;
    $("#coins-display .coins-badge").html(coins);
    
    return seconds + ":" + milliseconds;
}

function changePositions() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].direction === 'right') {
            if (enemies[i].position === 'left') {
                enemies[i].x += enemies[i].speedX;
                enemies[i].y += enemies[i].corner === 'top' ? enemies[i].speedY : -enemies[i].speedY;
                if (enemies[i].corner === 'top') {
                    enemies[i].direction = enemies[i].y >= 390 ? 'left': 'right';
                }
                else {
                    enemies[i].direction = enemies[i].y <= 10 ? 'left' : 'right';
                }
            }
            else {
                enemies[i].x += enemies[i].speedX;
                enemies[i].y -= enemies[i].corner === 'top' ? enemies[i].speedY : -enemies[i].speedY;
                if (enemies[i].position == 'top') {
                    enemies[i].direction = enemies[i].y <= 5 ? 'left': 'right';
                }
                else {
                    enemies[i].direction = enemies[i].y > 390 || enemies[i].x >= 470 ? 'left': 'right';
                }
            }
            
        }
        else {
            if (enemies[i].position === 'right') {
                enemies[i].x -= enemies[i].speedX;
                enemies[i].y += enemies[i].corner === 'top' ? enemies[i].speedY : -enemies[i].speedY;
                enemies[i].direction = enemies[i].x <= 10 || enemies[i].y >= 390 ? 'right': 'left';
            }
            else {
                enemies[i].x -= enemies[i].speedX;
                enemies[i].y -= enemies[i].corner === 'top' ? enemies[i].speedY : -enemies[i].speedY;
                if (enemies[i].corner === 'top') {
                    enemies[i].direction = enemies[i].y <= 10 ? 'right': 'left';
                }
                else {
                    enemies[i].direction = enemies[i].y >= 390 ? 'right' : 'left';
                }
            }
        }
    }
}

function drawEnemies() {
    $("canvas").drawImage({
        source: "images/" + enemy + ".png",
        x: enemies[0].x,
        y: enemies[0].y
    }).drawImage({
        source: "images/" + enemy + ".png",
        x: enemies[1].x,
        y: enemies[1].y
    }).drawImage({
        source: "images/" + enemy + ".png",
        x: enemies[2].x,
        y: enemies[2].y
    }).drawImage({
        source: "images/" + enemy + ".png",
        x: enemies[3].x,
        y: enemies[3].y
    })
}

function clearCanvas() {
    $("canvas").clearCanvas();
}

function moveEnemy() {
    
    changePositions();  
    clearCanvas();
    
    $("canvas").drawImage({
        source: "images/avatar.png",
        x: avatarX,
        y: avatarY
    });
    
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var seconds = (elapsedTime / 1000) | 0;
    var milliseconds = elapsedTime % 1000;
    $("#time").html("Time: " + seconds + ":" + milliseconds);
    
    timeMilestones.forEach(function(milestone) {
        if (seconds == milestone.number && milliseconds < 50) {
            level++;
            $("#level").html("Level: " + level);
            enemies.forEach(function(enemy) {
                enemy.speedX++;
                enemy.speedY++;
            });
        }
    });
    
    var levelMilestone = _.find(timeMilestones, function(m) {
        return m.number == seconds;
    });

    if (levelMilestone) {
        if (JSON.parse(localStorage['achievements']).indexOf(levelMilestone.name) < 0) {
            if (levelMilestone) {
                $("#notification").css({ 'visibility': 'visible' });
                $("#notification").html(achievementMessage + levelMilestone.name);
                setTimeout(hideMessage, 5000);
            }
            localStorage['achievements'] = localStorage['achievements'].replace("]", ",\"") + levelMilestone.name + "\"" + "]";
        }
    }
    
    drawEnemies();
    
    // Collision Detection
    var hitEnemy = enemies.some(function(enemy) {
        return (avatarY <= enemy.y + 25 && avatarY >= enemy.y) &&
               (avatarX <= enemy.x + 25 && avatarX >= enemy.x - 25);
    });

    var hitWalls = avatarY <= 15 || avatarY >= 385 || avatarX <= 15 || avatarX >= 385;
    if (hitWalls || hitEnemy) {
        gameOver = true;
        setTimeout(function() {
            clearCanvas();
            endMessage();
            resetGame();
        }, 200);
    }
    
}

function endMessage() {
    $("canvas").drawText({
        fillStyle: "green",
        fontSize: 30,
        x: canvas.width / 2,
        y: 30,
        text: 'Game Over'
    });
}

function resetGame() {
    playing = false;
    level = 1;
    $("#level").html("Level: " + level);
    enemies[0] = new Enemy("left", "right", "top", 10, 10, 5, 6);
    enemies[1] = new Enemy("right", "left", "top", 470, 10, 5, 6);
    enemies[2] = new Enemy("left", "right", "bottom", 10, 390, 5, 6);
    enemies[3] = new Enemy("right", "left", "bottom", 470, 390, 5, 6);
    avatarX = $("canvas").width / 2;
    avatarY = $("canvas").height / 2;
}

function redrawAvatar(event) {
    clearCanvas();
    avatarX = event.offsetX;
    avatarY = event.offsetY;
    
    if (!gameOver) {
        $("canvas").drawImage({
            source: "images/avatar.png",                // Development
            x: avatarX,
            y: avatarY
        });
        drawEnemies();
    }
}
