var xpos = 255;
var ypos = 25;
var xspeed = 2;
var yspeed = 2;
var userPos;
score = 0;

function setup() {
  createCanvas(500, 500);
  noStroke();
  fill(random(255), random(255), random(255));
  rectMode(CENTER);
}

function draw() {
  background(240, 95);
  //Ball dimensions
  ellipse(xpos, ypos, 50, 50); 
  textAlign(50,50);
  text("Score: " + score, width/2, height/2, 450, 450);

  //Keeps user within bounds
  if (mouseX >= 40 && mouseX <= width - 40) {
    userPos = mouseX;
  } else if (mouseX < 40) {
    userPos = 40;
  } else if (mouseX > width - 40) {
    userPos = width - 40;
  }
  rect(userPos, height - 2.5, 80, 5);

  //Ball movement
  xpos += xspeed;
  ypos += yspeed;

  //Ball bouncing from walls
  if (xpos <= 25 || xpos >= width - 25) {
    //x-Speed control
    if (xspeed < 10 && xspeed > -10) { 
      xspeed = xspeed * (-1.1);
    } else {
      xspeed = xspeed * (-1.005);
    }
  }
  //y-speed control
  if (ypos <= 25) {
    if (yspeed < 10 && yspeed > -10) {
      yspeed = yspeed * (-1.1);
    } else {
      yspeed = yspeed * (-1.005);
    }
  }
  
  //Ball bounce from user control
  if (ypos >= height - 25) {
    if (xpos <= userPos + 65 && xpos >= userPos - 65) {
      score = score + 5;
      if (yspeed < 10 && yspeed > -10) {
        yspeed = yspeed * (-1.1);
      } else {
        yspeed = yspeed * (-1.005);
      }
      //Ball below the given height, game ends
    } else {
      textAlign(CENTER);
      textFont("Times New Roman");
      textStyle(BOLD);
      textSize(50);
      text("GAME OVER", width/2, height/2);
      noLoop();
    }
  }
}

//Random color when clicked
function mousePressed() {
  fill(random(255), random(255), random(255));
  score++;
}