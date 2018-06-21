
enemyContainer = document.querySelector(".enemies");
scoreContainer = document.querySelector(".scoreContainer");
player = document.querySelector(".character");
character = document.querySelector(".character");
header = document.querySelector(".header");
endScreenContainer = document.querySelector("body");

let goRight = false;
let goLeft = false;
let goUp = false;
let goDown = false;
let atBotLimit = false;
let atLeftLimit = false;
let atRightLimit = false;
let atTopLimit = false;
let score = 0;
let playerPosition;
let heart;
let Lost = false;
let collisionSofter = 13;

// Eventlisterners
document.addEventListener('keydown', function(event){
    console.log(String.fromCharCode(event.keyCode));

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

// spawn first enemy
let spawnPosition = Math.floor((Math.random() * (90 - 10 + 1)) + 10);
let addEnemy = 
        `
        <div class="enemy" style="left:${spawnPosition}%"; ></div>
        `
enemyContainer.insertAdjacentHTML("beforeend", addEnemy);


// spawn enemies
let spawnEnemies = setInterval(function(){

    let spawnPosition = Math.floor((Math.random() * (90 - 10 + 1)) + 10);
    let addEnemy = 
        `
        <div class="enemy" style="left:${spawnPosition}%"; ></div>
        `
    enemyContainer.insertAdjacentHTML("beforeend", addEnemy);

    }, 1000);

let Update = setInterval(function(){
    console.log(player.offsetLeft);
    enemies = document.querySelectorAll(".enemy");
    for (let enemy of enemies){{
        if (((enemy.offsetTop + enemy.offsetHeight) > (player.offsetTop + collisionSofter +3) &&
            enemy.offsetTop < (player.offsetTop + (player.offsetHeight/3))) &&
            ((enemy.offsetLeft + enemy.offsetWidth) > (player.offsetLeft + collisionSofter) &&
            (enemy.offsetLeft) < (player.offsetLeft + (player.offsetWidth - collisionSofter))))
        {
            hearts = document.querySelectorAll(".heart");
            enemyContainer.removeChild(enemy);
            heart = hearts[hearts.length -1];
            header.removeChild(heart);
        }
    }

    if (enemy.offsetTop > (447)){
        enemyContainer.removeChild(enemy);
        score++;
        scoreContainer.innerHTML = "<p>Score: " + score + "</p>";
        }
    }

    hearts = document.querySelectorAll(".heart");
    if (hearts.length == 0)
        {
         Lost = true;
        }

    if (player.offsetTop === 70)
        atTopLimit = true;
    else (atTopLimit = false);
        
    if (player.offsetTop === 412)
        atBotLimit = true;
    else (atBotLimit = false);

    if (player.offsetLeft === 1)
        atLeftLimit = true;
    else (atLeftLimit = false);

    if (player.offsetLeft === 637)
        atRightLimit = true;
    else (atRightLimit = false);

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

    if (Lost)
    {
        clearInterval(spawnEnemies);
        clearInterval(Update);
        let endScreen = 
        `
        <div class="endScreen"><p class="lostText">Game over</p><p>Press R to play again</p></div>
        `
        endScreenContainer.insertAdjacentHTML("beforeend", endScreen);
    }
}, 1);

