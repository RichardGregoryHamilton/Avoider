var enemy = localStorage['enemy'];

function Enemy(position, direction, corner, x, y, speedX, speedY) {
    this.position = position;
    this.direction = direction;
    this.corner = corner;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    
    this.topCorner = function() {
        return this.corner === 'top'
    }
    
    this.reverseDirection = function() {
        this.direction = this.direction === 'left' ? 'right' : 'left';
    }
    
    this.move = function(direction) {
        switch (direction) {
        case 'right':
            this.x += this.speedX;
            break;
        case 'left':
            this.x -= this.speedX;
            break;
        case 'up':
            this.y -= this.speedY;
            break;
        case 'down':
            this.y += this.speedY;
            break;
        }   
    }
    
    this.draw = function() {
        $("canvas").drawImage({
            source: "images/" + enemy + ".png",
            x: this.x,
            y: this.y
        });
    }
    
}

var enemies = [
                new Enemy("left", "right", "top", 10, 10, 6, 5), 
                new Enemy("right", "left", "top", 470, 10, 6, 5),
                new Enemy("left", "right", "bottom", 10, 390, 6, 5),
                new Enemy("right", "left", "bottom", 470, 390, 6, 5)
              ];
              
function drawEnemies() {
    enemies.forEach(function(enemy) {
        enemy.draw();
    });
}

function changePositions() {
    enemies.forEach(function(enemy) {
        
        // If the enemy's position is right
        
        if (enemy.direction === 'right') {
            enemy.move('right');
            if (enemy.position === 'left') {
                enemy.topCorner() ? enemy.move('down') : enemy.move('up');
                if (enemy.topCorner() && enemy.y >= 390 || (enemy.y <= 10)) {
                    enemy.reverseDirection();
                }
            }
            else {
                enemy.topCorner() ? enemy.move('up') : enemy.move('down');
                if ((enemy.topCorner() && enemy.y <= 5) || (enemy.y > 390 || enemy.x >= 470)) {
                    enemy.reverseDirection();
                }
            }
            
        }
        
        // If the enemy's position is left
        
        else {
            enemy.move('left');
            if (enemy.position === 'right') {
                enemy.topCorner() ? enemy.move('down') : enemy.move('up');
                enemy.direction = enemy.x <= 10 || enemy.y >= 390 ? 'right': 'left';
            }
            else {
                enemy.topCorner() ? enemy.move('up') : enemy.move('down');
                if (enemy.topCorner() && enemy.y <= 10 || (enemy.y >= 390)) {
                    enemy.reverseDirection();
                }
            }
        }
        
    });                  // End forEach block
    
}

function increaseSpeed() {
    enemies.forEach(function(enemy) {
        enemy.speedX++;
        enemy.speedY++;
    });
}

function moveEnemy() {
    
    changePositions();  
    clearCanvas();   
    drawAvatar();
    
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - startTime;
    var seconds = (elapsedTime / 1000) | 0;
    var milliseconds = elapsedTime % 1000;
    $("#time").html("Time: " + seconds + ":" + milliseconds);
    
    timeMilestones.forEach(function(milestone) {
        if (seconds === milestone.number && milliseconds < 50) {
            increaseLevel();
            increaseSpeed();
        }
    });
    
    var levelMilestone = _.find(timeMilestones, function(m) {
        return m.number === seconds;
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
        setTimeout(endGame, 200);
    }
    
}
