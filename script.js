
enemyContainer = document.querySelector(".enemies");
scoreContainer = document.querySelector(".scoreContainer");
player = document.querySelector(".character");
character = document.querySelector(".character");
header = document.querySelector(".header");
endScreenContainer = document.querySelector("body");

let goRight = false;
let goLeft = false;
let go = true;
let score = 0;
let playerPosition;
let heart;
let Lost = false;

// Eventlisterners
document.addEventListener('keydown', function(){
    if (String.fromCharCode(event.keyCode) === "'" ||
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
    if (String.fromCharCode(event.keyCode) === "'" ||
     String.fromCharCode(event.keyCode) === "D"){
    goRight = false;
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

    console.log(player.offsetWidth);

let Update = setInterval(function(){

    enemies = document.querySelectorAll(".enemy");
    for (let enemy of enemies){{
        if (((enemy.offsetTop + enemy.offsetHeight) > (player.offsetTop + 10) &&
            enemy.offsetTop < (player.offsetTop + (player.offsetHeight/3))) &&
            ((enemy.offsetLeft + enemy.offsetWidth) > (player.offsetLeft + 10) &&
            (enemy.offsetLeft) < (player.offsetLeft + (player.offsetWidth - 10))))
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


    if (goRight){
        character.style.left = (player.offsetLeft + 1 + "px");
    } 

    if (goLeft){
        character.style.left = (player.offsetLeft - 1 + "px");
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

