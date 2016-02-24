/* This JavaScript file deals with all score logic */

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

function addCoins(time) {
    var coins = +(localStorage['coins']) + time;
    localStorage['coins'] = coins;
    $(".coins-badge").html(coins);
}

function calculateTime() {
    var endTime = new Date().getTime();
    var elapsedTime = endTime - startTime;
    var seconds = (elapsedTime / 1000) | 0;
    var milliseconds = elapsedTime % 1000;

    addCoins(seconds);
    
    return seconds + ":" + milliseconds;
}

function increaseLevel() {
    level++;
    $("#level").html("Level: " + level);
}
