var c;
var scl = 20;
var fish;
var mode;
var gameStarted = false; // Variable to track if the game has started
var gameOver = false; // Variable to track if the game is over
var fishEaten = 0; // Variable to track the number of fish eaten
var level = 1; // Variable to track the current level
var mountains = []; // Array to store the mountains

function setup() {
  createCanvas(450, 450);
  c = new Crocodile();
  frameRate(10); // to make it old school
  pickLocation();
  generateMountains(); // Generate mountains for level 2
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl); // Changed from width to height
  fish = createVector(floor(random(cols)), floor(random(rows)));
  fish.mult(scl);
}

function generateMountains() {
  mountains = [];
  var numMountains = 3; // Reduced number of mountains to make them wider
  var mountainWidth = width / numMountains;
  
  for (var i = 0; i < numMountains; i++) {
    var x = i * mountainWidth;
    var y = height;
    var w = mountainWidth;
    var h = random(300, 450); // Random height for mountains, adjusted for fewer but wider mountains
    mountains.push({ x: x, y: y, w: w, h: h });
  }
}

function drawMountains() {
  noStroke();
  for (var i = 0; i < mountains.length; i++) {
    var m = mountains[i];

    // Draw left side of mountain
    fill(139, 69, 19); // Darker brown color for shadow
    beginShape();
    vertex(m.x, m.y);
    vertex(m.x + m.w / 2, m.y - m.h);
    vertex(m.x + m.w / 2, m.y);
    endShape(CLOSE);

    // Draw right side of mountain
    fill(160, 82, 45); // Lighter brown color for light
    beginShape();
    vertex(m.x + m.w / 2, m.y);
    vertex(m.x + m.w / 2, m.y - m.h);
    vertex(m.x + m.w, m.y);
    endShape(CLOSE);
  }
}



function draw() {
  if (!gameStarted) {
    // Start screen background
    background(225, 0, 0);
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Welcome to Hungry Crocodile", width / 2, height / 2 - 50);
    textSize(45);
    text("Press Enter to start", width / 2, height / 2);
    textSize(25);
    text("Eat Ten Pieces of food to", width / 2, height / 2 + 50);
    text(" advance to the next level", width / 2, height / 2 + 75);
    if (keyIsDown(ENTER)) { // If Enter key is pressed, start the game
      gameStarted = true; // this means when the enter button is pressed the game will inevitably start
    }
  } else if (!gameOver) { // If the game is not over
    // Game background
    if (level === 1) {
      background(51);
    } else if (level === 2) {
      background(135, 206, 235); // Light blue background for the sky
      drawMountains();
    }

    if (c.eat(fish)) {
      pickLocation();
      fishEaten++;
      if (fishEaten === 10) { // Change level after ten fish are eaten
        level++;
        changeLevel();
      }
    }

    c.update();
    c.show();

    // Set fish color based on level
    if (level === 1) {
      fill(0, 213, 255); // Blue for level 1
      noStroke();
    } else if (level === 2) {
      fill(128, 0, 128); // Purple for level 2
      stroke(0); // Black stroke
    }
    rect(fish.x, fish.y, scl, scl);

    if (keyIsDown(UP_ARROW)) {
      c.dir(0, -1);
    } else if (keyIsDown(DOWN_ARROW)) {
      c.dir(0, 1);
    } else if (keyIsDown(RIGHT_ARROW)) {
      c.dir(1, 0);
    } else if (keyIsDown(LEFT_ARROW)) {
      c.dir(-1, 0);
    }
    
    // Check if the crocodile hits itself or the walls
    if (c.eliminated()) {
      gameOver = true;
    }
  } else { // If the game is over
    // Game over screen
    background(225, 0, 0);
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2 - 50);
    textSize(25);
    text("Press Enter to play again", width / 2, height / 2);

    if (keyIsDown(ENTER)) { // If Enter key is pressed, reset the game
      resetGame();
    }
  }
}

function resetGame() {
  gameOver = false;
  gameStarted = false;
  fishEaten = 0;
  level = 1;
  c = new Crocodile();
  pickLocation();
  generateMountains();
}

function changeLevel() {
  // Increase the speed of the crocodile for level 2
  c.xspeed *= 1;
  c.yspeed *= 1; 
  generateMountains();
}

