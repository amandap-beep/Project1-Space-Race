let gameState = "center";  // Tracks the current state of the game (center, left, or right)
let message = "You are in a room with two paths. Go Left (L) or Right (R).";
let hasSword = false;      // Tracks if the player has the sword
let gameEnded = false;     // Tracks if the game has ended (win or lose)
let song;
let stars = [];
let scene1img;


function preload() {
  scene1img = loadImage("Spaceship.png"); // Load your image
    // Load the sound file
  song = loadSound('Starlight.m4a');
}


function setup() {
  createCanvas(800, 800);
  textSize(16);
  noStroke();

  // Create an array of star objects
  for (let i = 0; i < 500; i++) {
    stars.push(new Star());
  }
}

function draw() {
  // Draw the starry background
  background("black");
  for (let star of stars) {
    star.update();
    star.show();if (!song.isPlaying()) {
    song.play();
  }
  }

  // Make the image follow the mouse
  let imgWidth = 200; // Set desired width for the image
  let imgHeight = (scene1img.height / scene1img.width) * imgWidth; // Maintain aspect ratio
  image(scene1img, mouseX - imgWidth / 2, mouseY - imgHeight / 2, imgWidth, imgHeight);

  // Display the message to the player
  fill("white");
  textAlign(CENTER);
  text(message, width / 2, height / 2.5);

  // Handle game states
  if (gameState === "center") {
    message = "You are in space on a secret mission...\n \nSuddenly a light appears on your radar... \n \nA distress signal! \n \n  Do you help them? \n \nGo Left (L) to explore, or Right (R) to stay on course with your mission.";
  } else if (gameState === "left") {
    if (!hasSword) {
      message = "You discover an old spaceship lying on the ground... \n \n After investigating you found a ray beam.\n \n It might be useful. \n \n Go Right (R) to return to the center. (P) to pick up ray beam";
    } else {
      message = "You've found the ray beam. Go Right (R) to return to the center.";
    }
  } else if (gameState === "right") {
    if (hasSword) {
      message = "Armed with the ray beam, you bravely face the rest of your mission and emerge victorious! ";
      gameEnded = true;  // Game ends with a victory
    } else {
      message = "You encounter a terrifying asteroid field that you \n \n would have missed if you stopped to help. \n \n  shame defeats you... \n \n ...and the asteroids";
      gameEnded = true;  // Game ends with a loss
    }
  }

  // If the game has ended, wait for space to restart
  if (gameEnded) {
    message += "\nPress Space to restart.";
  }
}

// Detect key presses for L, R, and Space
function keyPressed() {
  if (gameEnded && key === ' ') {
    restartGame();  // Restart the game if it's over and the player presses Space
  } else if (!gameEnded) {
    // Move between rooms based on current gameState
    if (gameState === "center") {
      if (key === 'L' || key === 'l') {
        gameState = "left";   // Go left to find the sword
      } else if (key === 'R' || key === 'r') {
        gameState = "right";  // Go right to fight the dragon
      }
    } else if (gameState === "left" && (key === 'R' || key === 'r')) {
      gameState = "center";   // Return to the center from the left room
    } else if (gameState === "left" && (key === 'P' || key === 'p')) {
      hasSword = true;   // Player picks up the sword
    } else if (gameState === "right" && (key === 'L' || key === 'l')) {
      gameState = "center";   // Return to the center from the right room
    }
  }
}

// Restart the game
function restartGame() {
  gameState = "center";   // Reset to the center room
  message = "You are in a room with two paths. Go Left (L) or Right (R).";
  hasSword = false;       // Reset sword status
  gameEnded = false;      // Reset the game ended status
}

// Star class for background
class Star {
  constructor() {
    // Random initial position and speed
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.twinkleSpeed = random(0.01, 0.05);
    this.twinkleAmount = random(50, 255);
  }

  update() {
    // Make the star twinkle
    this.twinkleAmount += this.twinkleSpeed;
    if (this.twinkleAmount > 255 || this.twinkleAmount < 50) {
      this.twinkleSpeed *= -1;
    }
  }

  show() {
    fill(255, this.twinkleAmount);
    ellipse(this.x, this.y, this.size);
  }
}
