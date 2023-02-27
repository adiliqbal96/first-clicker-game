const boxman = document.getElementById("boxman");
const trash = document.getElementById("trash");
const lives = document.getElementById("lives").getElementsByTagName("img");
const gameOverScreen = document.getElementById("game-over");
const koScreen = document.getElementById("ko");

let numLives = 3;
let gameLoop;

function jump() {
  if (boxman.classList != "jump") {
    // Remove the "run" class to stop the running animation
    boxman.classList.remove("run");

    // Add the "jump" class to trigger the jump animation
    boxman.classList.add("jump");
    console.log("Boxman jumped!");

    setTimeout(function () {
      // Remove the "jump" class to end the jump animation
      boxman.classList.remove("jump");

      // Add the "run" class back to resume the running animation
      boxman.classList.add("run");
    }, 500); // adjust the timeout value to match your animation duration
  }
}

function loseLife() {
  numLives--;
  if (numLives < 0) {
    console.log("Game over!");
    gameOver = true;
    document.removeEventListener("click", jump);
    clearInterval(gameLoop);
    gameOverScreen.style.display = "block";

    // Show the dead boxman animation after a delay
    setTimeout(function () {
      boxman.style.display = "none";
      koScreen.style.display;
      console.log("boxman died!");
    }, 1000);
  } else {
    console.log("Lost a life, " + numLives + " remaining.");
    lives[numLives].style.display = "none";
    if (numLives === 1) {
      lives[lives.length - 1].remove(); // remove the last life element
    }
  }
}

//add event listener for jump
document.addEventListener("click", function (event) {
  jump();
});

let collisionDetected = false;
//check for collision
gameLoop = setInterval(function () {
  let boxmanPos = boxman.getBoundingClientRect();
  let trashPos = trash.getBoundingClientRect();

  if (
    boxmanPos.right > trashPos.left &&
    boxmanPos.left < trashPos.right &&
    boxmanPos.bottom > trashPos.top &&
    boxmanPos.top < trashPos.bottom
  ) {
    if (!collisionDetected) {
      loseLife();
      collisionDetected = true;
      setTimeout(function () {
        collisionDetected = false;
      }, 1900); //adjust the timeout value as needed
    }
  } else {
    collisionDetected = false;
  }

  //check if all lives have been lost and show dead boxman animation
  if (numLives === 0 && !boxman.classList.contains("dead")) {
    boxman.classList.add("dead");
    console.log("boxman died!");
  }
}, 10);
