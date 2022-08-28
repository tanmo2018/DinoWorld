score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.key)

    if (e.key == "ArrowUp") {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    else if (e.key == "ArrowRight") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    else if (e.key == "ArrowLeft") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
    else if (e.key == "r" ||e.key == "R") {
        location.reload();
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obs = document.querySelector('.obs');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obs, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obs, null).getPropertyValue('top'));
    
    
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    
    console.log(offsetX);
    console.log(offsetY);
    
    if (offsetX < 100 && offsetY < 150) {
        gameOver.innerHTML = "Game Over - Press R to Play Again";
        obs.classList.remove('obsAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 200 && cross) {
        score += 1;
        updateScore(score-1);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obs, null).getPropertyValue('animation-duration'));
            if(aniDur>4){
                newDur = aniDur - 0.1;
            }
            if(aniDur>2 &&aniDur<=4){
                newDur = aniDur - 0.035;
            }
            obs.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}