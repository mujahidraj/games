const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const pauseButton = document.getElementById("pauseButton");

const catchSound = new Audio("catch.mp3"); 
const missSound = new Audio("miss.mp3"); 
const gameOverSound = new Audio("gameover.mp3"); 

let score = 0;
let gameOver = false;
let isPaused = false;
const basketWidth = 100; 
const basketHeight = 30; 
const basketSpeed = 10;
let basketX = (canvas.width - basketWidth) / 2;

const objects = [
  "🖥️", "💻", "📡", "🖨️", "🖱️", "⌨️", "🎧", "🎤", "🔊", "📠"
];
let currentObject = objects[Math.floor(Math.random() * objects.length)];
let objectX = Math.random() * (canvas.width - 30) + 15;
let objectY = 0;
const objectSpeed = 6;


function drawBasket() {

  ctx.fillStyle = "#8B4513"; 
  ctx.beginPath();
  ctx.moveTo(basketX, canvas.height - basketHeight);
  ctx.lineTo(basketX + basketWidth, canvas.height - basketHeight);
  ctx.lineTo(basketX + basketWidth - 20, canvas.height);
  ctx.lineTo(basketX + 20, canvas.height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#A0522D"; 
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(basketX + basketWidth / 2, canvas.height - basketHeight - 10, 20, 0, Math.PI);
  ctx.stroke();
}

function drawObject() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "#004d40"; 
  ctx.fillText(currentObject, objectX, objectY);
}

function update() {
  if (gameOver || isPaused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  objectY += objectSpeed;

  if (objectY + 30 > canvas.height) {
    if (
      objectX > basketX &&
      objectX < basketX + basketWidth
    ) {
      
      score++;
      scoreElement.textContent = score;
      catchSound.play(); 
    } else {
      
      gameOver = true;
      missSound.play(); 
      setTimeout(() => {
        gameOverSound.play(); 
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
      }, 500); 
    }
   
    currentObject = objects[Math.floor(Math.random() * objects.length)];
    objectX = Math.random() * (canvas.width - 30) + 15;
    objectY = 0;
  }

  
  drawBasket();
  drawObject();


  requestAnimationFrame(update);
}


document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && basketX > 0) {
    basketX -= basketSpeed;
  } else if (e.key === "ArrowRight" && basketX < canvas.width - basketWidth) {
    basketX += basketSpeed;
  } else if (e.key === "0" || e.key==="9") { 
    isPaused = !isPaused;
    
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
  }
});


pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
});


update();