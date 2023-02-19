//test code for jumping:
const boxman = document.getElementById("boxman");
const trash = document.getElementById("trash");

function jump() {
  if (boxman.classList != "jump") {
    boxman.classList.add("jump");

    setTimeout(function () {
      boxman.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  //get current boxman y position
  let boxmanTop = parseInt(
    window.getComputedStyle(boxman).getPropertyValue("top")
  );
  //get current trash x position
  let trashLeft = parseInt(
    window.getComputedStyle(trash).getPropertyValue("left")
  );

  //detect collision
  if (trashLeft < 50 && trashLeft > 0 && boxmanTop >= 140) {
    //add collision function
    collision();
    alert("Game Over!");
  }
}, 10);

//collision function
function collision() {
  //stop the scrolling animation
  document.querySelector(".game").style.animation = "none";
  //stop the boxman animation
  boxman.style.animation = "none";
}

document.addEventListener("click", function (event) {
  jump();
});
