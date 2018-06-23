
/* DOM ELEMENTS */

enemyContainer = document.querySelector(".enemies");
scoreContainer = document.querySelector(".scoreContainer");
player = document.querySelector(".character");
character = document.querySelector(".character");
header = document.querySelector(".header");
endScreenContainer = document.querySelector("body");


/* VARIABLES */

let goRight = false;
let goLeft = false;
let goUp = false;
let goDown = false;
let atBotLimit = false;
let atLeftLimit = false;
let atRightLimit = false;
let atTopLimit = false;
let Lost = false;
let pause = false;
let spawnRight = false;

let score = 0;
let collisionSofter = 13;

let playerPosition;
let heart;


/* EVENTLISTENERS */

document.addEventListener('keydown', function(event){

    if (String.fromCharCode(event.keyCode) === "P"){
        if (pause)
            pause = false;
        else
            pause = true;
    }

    if (String.fromCharCode(event.keyCode) === "&" ||
    String.fromCharCode(event.keyCode) === "W"){
    goUp = true;
    if (!goRight && !goLeft)
    character.classList.add("characterAnimRight");
    }

    else if (String.fromCharCode(event.keyCode) === "(" ||
     String.fromCharCode(event.keyCode) === "S"){
    goDown = true;
    if (!goRight && !goLeft)
    character.classList.add("characterAnimRight");
    }

    else if (String.fromCharCode(event.keyCode) === "'" ||
     String.fromCharCode(event.keyCode) === "D"){
    goRight = true;
    character.classList.add("characterAnimRight");
    }

    else if ((String.fromCharCode(event.keyCode) === "%" ||
    String.fromCharCode(event.keyCode) === "A")){
    goLeft = true;
    character.classList.add("characterAnimLeft");
    }

    else if (String.fromCharCode(event.keyCode) === "R")
    location.reload();
})

document.addEventListener('keyup', function(){
    if (String.fromCharCode(event.keyCode) === "&" ||
    String.fromCharCode(event.keyCode) === "W"){
    goUp = false;
    if (!goRight && !goDown)
    character.classList.remove("characterAnimRight");
    }

    else if (String.fromCharCode(event.keyCode) === "(" ||
    String.fromCharCode(event.keyCode) === "S"){
    goDown = false;
    if (!goRight && !goUp)
    character.classList.remove("characterAnimRight");
    }

    if (String.fromCharCode(event.keyCode) === "'" ||
     String.fromCharCode(event.keyCode) === "D"){
    goRight = false;
    if (!goDown && !goUp)
    character.classList.remove("characterAnimRight");
    }

    else if ((String.fromCharCode(event.keyCode) === "%" ||
    String.fromCharCode(event.keyCode) === "A")){
    goLeft = false;
    character.classList.remove("characterAnimLeft");
    }
})

document.addEventListener('keypress', function(){
    
    if (String.fromCharCode(event.keyCode) === "R")
    location.reload();
    
    
})


/* FUNCTIONS */

// spawn enemies ev

const spawnEnemiesTop = function(){
    let spawnPosition = Math.floor((Math.random() * (95 - 0 + 1)));
    let addEnemy = `<div class="enemy" style="left:${spawnPosition}%"; ></div>`
    enemyContainer.insertAdjacentHTML("beforeend", addEnemy);
}

const spawnEnemiesRight = function(){
    let spawnPosition = Math.floor((Math.random() * (95 - 15 + 1))) + 15;
    let addEnemy = `<div class="enemyRight" style="top:${spawnPosition}%"; ></div>`
    enemyContainer.insertAdjacentHTML("beforeend", addEnemy);
}

const collisionCheckRed = function(){
    // Red enemies
    enemies = document.querySelectorAll(".enemy");
    for (let enemy of enemies){ //checking collision with red enemies (from top)
        if (((enemy.offsetTop + enemy.offsetHeight) > (player.offsetTop + collisionSofter +3) && // Top side of player
        enemy.offsetTop < (player.offsetTop + (player.offsetHeight - collisionSofter))) &&  // Lower side of player 
        ((enemy.offsetLeft + enemy.offsetWidth) > (player.offsetLeft + collisionSofter) && // Left side of player
        (enemy.offsetLeft) < (player.offsetLeft + (player.offsetWidth - collisionSofter)))) // Right side of player
        {
            enemyContainer.removeChild(enemy);
            removeHeart();
        }
    if (enemy.offsetTop > (450)){ // Enemy has passed the field without hitting player
        enemyContainer.removeChild(enemy);
        increaseScore();
    }
}
}

const collisionCheckBlue = function(){
    // Blue enemies
    let enemiesRight = document.querySelectorAll(".enemyRight");
    for (let enemy of enemiesRight){ //checking collision with blue enemies (from Right)
        if (((enemy.offsetTop + enemy.offsetHeight) > (player.offsetTop + collisionSofter +3) && // Top side of player
        enemy.offsetTop < (player.offsetTop + (player.offsetHeight - collisionSofter))) &&  // Lower side of player 
        ((enemy.offsetLeft + enemy.offsetWidth) > (player.offsetLeft + collisionSofter) && // Left side of player
        (enemy.offsetLeft) < (player.offsetLeft + (player.offsetWidth - collisionSofter)))) // Right side of player
        {
            enemyContainer.removeChild(enemy);
            removeHeart();
        }
    if (enemy.offsetLeft < (1)){ // Enemy has passed the field without hitting player
        enemyContainer.removeChild(enemy);
        increaseScore();
    }
}
}

const increaseScore = function(){
    score++;
    scoreContainer.innerHTML = "<p>Score: " + score + "</p>";
}

const removeHeart = function(){
    hearts = document.querySelectorAll(".heart");
    heart = hearts[hearts.length -1];
    header.removeChild(heart);
}

const playerLimitCheck = function(){
    // Making so the player cant walk outside the gameview
    if (player.offsetTop === 70) // Top limit 
    atTopLimit = true;
    else (atTopLimit = false);
    
    if (player.offsetTop === (442)) // Bot limit
    atBotLimit = true;
    else (atBotLimit = false);
    
    if (player.offsetLeft === 1) // Left limit
    atLeftLimit = true;
    else (atLeftLimit = false);
    
    if (player.offsetLeft === 657) // Right limit
    atRightLimit = true;
    else (atRightLimit = false);
}

const playerMovement = function(){
    
    if (goRight && !atRightLimit){
        character.style.left = (player.offsetLeft + 1 + "px");
    } 
    
    if (goLeft && !atLeftLimit){
        character.style.left = (player.offsetLeft - 1 + "px");
    }
    
    if (goUp && !atTopLimit){
        character.style.top = (player.offsetTop - 1 + "px");
    } 
    
    if (goDown && !atBotLimit){
        character.style.top = (player.offsetTop + 1 + "px");
    } 
}

const lifeCheck = function(){
    
    hearts = document.querySelectorAll(".heart");
    if (hearts.length == 0)
    Lost = true;
    
}

const endGame = function(){
    
    clearInterval(spawnEnemies);
    clearInterval(Update);
    let endScreen = `<div class="endScreen"><p class="lostText">Game over</p><p>Press R to play again</p></div>`
    endScreenContainer.insertAdjacentHTML("beforeend", endScreen);
}

    /* RUNNING THE GAME */

const spawnEnemies = setInterval(function(){
    if (pause === false){
    spawnEnemiesTop();

    if (score > 20)
        spawnEnemiesRight();
    }
}, 1000);

let Update = setInterval(function(){
    if (pause === false)
    {
    collisionCheckRed();
    collisionCheckBlue();
    playerLimitCheck();
    playerMovement();
    lifeCheck();

    if (Lost)
        endGame();
    }
}, 1)

