var snake;
var SIZE = 800;

function setup() {
  createCanvas(SIZE,SIZE);
  frameRate(10);
  snake = new Snake();
  food = new Food();
  snake.generate(food);
}

function draw() {
  background(0);
  translate(width/2,height/2);
  snake.update(food);
  snake.show();
  food.show();
}

document.onkeydown = function(f) {
  switch (f.keyCode) {

    case 37:
    snake.setDirection('W');
    break;

    case 38:
    snake.setDirection('N');
    break;

    case 39:
    snake.setDirection('E');
    break;

    case 40:
    snake.setDirection('S');
    break;
  }

};

function Snake(){
  this.directions = ['N','E','S','W'];

  this.generate = function (food){
    this.body = [];
    this.direction = this.directions[floor(random(4))];
    this.x = floor(random(-width/2,width/2)/10);
    this.y = floor(random(-height/2,height/2)/10);
    this.body.push(new Array(this.x,this.y));
    this.grow();
    food.generate();
  }

  this.grow = function(){
    px = this.x;
    py = this.y;
    for(i= 1; i<4; i++){
      if(this.direction == this.directions[0]){
        py += 1;
      }else if (this.direction == this.directions[1]){
        px -= 1;
      }else if(this.direction == this.directions[2]){
        py -= 1;
      }else if(this.direction == this.directions[3]){
        px += 1;
      }
      this.body.push(new Array(px,py));
    }
  }

  this.update = function (food){

    if(this.outOfBorder() || this.autoend()){
      this.generate(food);
    }
    if(this.eating(food)){
      food.generate();
      this.grow();
    }
    fx = this.x;
    fy = this.y;
    if(this.direction == this.directions[0]){
      this.y -= 1;

    }else if (this.direction == this.directions[1]){
      this.x += 1;
    }else if(this.direction == this.directions[2]){
      this.y += 1;
    }else if(this.direction == this.directions[3]){
      this.x -= 1;
    }

    this.body[0][0] = this.x;
    this.body[0][1] = this.y;

    for(i=1; i<this.body.length; i++){
      nx = this.body[i][0];
      this.body[i][0] = fx;
      fx = nx;

      ny = this.body[i][1];
      this.body[i][1] = fy;
      fy = ny;
    }
  }
  this.autoend = function(){
    end = false;
      for(i=1; i<this.body.length && !end; i++){
      end = (this.x == this.body[i][0] && this.y == this.body[i][1]);
    }
    return end;
  }
  this.show = function(){
    greenDelta = floor(255/this.body.length);
    green = 255;
    push();

    for(i=0; i<this.body.length; i++){
      fill(242,0,231);
      dx = this.body[i][0] * 10;
      dy = this.body[i][1] * 10;

      rect(dx + 1, dy + 1, 8, 8);
      green -= greenDelta; 
    }
    pop();
  }
  this.outOfBorder= function(){
    return this.x < -width/20 || this.x > width/20 || this.y < -height/20 || this.y > height/20;
  }
   this.setDirection = function(direction){
    this.direction = direction;
  }
  this.eating = function(food){
    return food.x == this.x && food.y ==this.y;
  }
}

function Food(){
  this.generate = function(snake){
    this.x = floor(random(-width/2,width/2)/10);
    this.y = floor(random(-height/2,height/2)/10);
  }
  this.show = function(){
    fill(242,232,0);
    push();
    rect(this.x*10 , this.y *10, 10, 10);
    pop();
  }
}