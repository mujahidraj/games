const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// Game variables
let score = 0;
let gameOver = false;
const basketWidth = 80;
const basketHeight = 20;
const basketSpeed = 10;
let basketX = (canvas.width - basketWidth) / 2;

const objectRadius = 15;
let objectX = Math.random() * (canvas.width - objectRadius * 2) + objectRadius;
let objectY = 0;
const objectSpeed = 3;

// Draw basket
function drawBasket() {
  ctx.fillStyle = "blue";
  ctx.fillRect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
}

// Draw falling object
function drawObject() {
  ctx.beginPath();
  ctx.arc(objectX, objectY, objectRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Update game state
function update() {
  if (gameOver) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move object
  objectY += objectSpeed;

  // Check if object hits the ground
  if (objectY + objectRadius > canvas.height) {
    if (
      objectX > basketX &&
      objectX < basketX + basketWidth
    ) {
      // Object caught
      score++;
      scoreElement.textContent = score;
    } else {
      // Object missed
      gameOver = true;
      alert(`Game Over! Your score: ${score}`);
      document.location.reload();
    }
    // Reset object position
    objectX = Math.random() * (canvas.width - objectRadius * 2) + objectRadius;
    objectY = 0;
  }

  // Draw elements
  drawBasket();
  drawObject();

  // Request next frame
  requestAnimationFrame(update);
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && basketX > 0) {
    basketX -= basketSpeed;
  } else if (e.key === "ArrowRight" && basketX < canvas.width - basketWidth) {
    basketX += basketSpeed;
  }
});

// Start the game
update();