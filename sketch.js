var PLAY=1;
var END=0;
var gameState=PLAY;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, ObstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);

  monkey=createSprite(40,200,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(200,200,1000,20);
  ground.shapeColor = "green";
  
  FoodGroup=new Group();
  ObstacleGroup=new Group();
  
  score=0
}


function draw() {
background('lightblue');

  text("Score: "+ score, 500,50);
  
  if (gameState === PLAY) {
 
    ground.velocityX = -4
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& monkey.y >= 120) {
     monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    if(monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score=score+1;
    }
  
    if(monkey.isTouching(ObstacleGroup)) {
     ObstacleGroup.destroyEach();
     gameState = END;
    }
  
    Banana();
    Obstacle();
    
    monkey.collide(ground);
    }
  else if(gameState === END) {
      monkey.collide(ground);
      text("GAME OVER",300,100);
      FoodGroup.setVelocityEach(0);
      ObstacleGroup.setVelocityEach(0);
      FoodGroup.setLifetimeEach(-1);
      ObstacleGroup.setLifetimeEach(-1);
      ground.velocityX=0;
      score=0;
    }
  
  
  
  
  drawSprites();
}

function Banana() {
  if(frameCount%150 === 0) {
    banana=createSprite(300,20,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-3;
    FoodGroup.add(banana);
  }
}

function Obstacle() {
  if(frameCount%300 === 0) {
    obstacle=createSprite(300,210,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-3;
    ObstacleGroup.add(obstacle);
  }
}