var canvas = document.getElementById("my-canvas");
var gameOver = false;
var playing = false;
var scoreUpdated = false;
var level = 1;

var achievements = JSON.parse(localStorage['achievements']);
var achievementMessage = "You've unlocked the achievement ";

var avatarX = $("canvas").width / 2;
var avatarY = $("canvas").height / 2;

$("canvas, #new-game").on("click", function() {
    if (gameOver) {
        clearCanvas();
        gameOver = false;
    }
    
    localStorage['gamesPlayed']++;

    showGamesAchievements();
    startTime = new Date().getTime();
    
    if (!playing) {
        playing = true;
        drawAvatar();
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

function clearCanvas() {
    $("canvas").clearCanvas();
}

function endMessage() {
    $("canvas").drawText({
        fillStyle: "green",
        fontSize: 30,
        x: canvas.width / 2,
        y: 30,
        text: "Game Over"
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

function endGame() {
    clearCanvas();
    endMessage();
    resetGame();
}

document.addEventListener("keydown", moveAvatar);

function moveAvatar(event) {
    clearCanvas();
    switch(event.keyCode) {
        case 37:
            avatarX -=5;
            break;
        case 38:
            avatarY -= 5;
            break;
        case 39:
            avatarX += 5;
            break;
        case 40:
            avatarY += 5;
            break;
    }

    if (!gameOver) {
        drawAvatar();
    }
}

function drawAvatar() {
    $("canvas").drawImage({
        source: "images/avatar.png",
        x: avatarX,
        y: avatarY
    });
}

function redrawAvatar(event) {
    clearCanvas();
    avatarX = event.offsetX;
    avatarY = event.offsetY;
    
    if (!gameOver) {
        $("canvas").drawImage({
            source: "images/avatar.png",
            x: avatarX,
            y: avatarY
        });
        drawEnemies();
    }
}
