//Hungry monkey

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var backgr,backgrImage

//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  
  //Monkey
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
  //background
  backgrImage = loadImage("jungle.jpg");



}


//Setup
function setup() {
  //Canvas
  createCanvas(400,400);
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  
  
 //Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
 //Background

  backgr=createSprite(0,0,800,400);
  backgr.addImage("background",backgrImage);
  backgr.scale=1.5;
  backgr.velocityX=-4;

//Monkey
monkey = createSprite(50, 250, 10, 10);
monkey.addAnimation("monkey",monkey_running);
monkey.scale = 0.1;


  //score
  score = 0;
  survialTime = 0;

monkey.depth=obstacleGroup.depth;


}

//Draw
function draw() {
  
  if(backgr.x<100){
  
    backgr.x=backgr.width/2;
    

  }

  //Background
  background (180);
  
 //Monkey
  monkey.collide(ground);
  obstacleGroup.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
      

    if(monkey.y>288){
      monkey.scale=0.1;
     
      }

    if (ground.x < 0){
      ground.x = ground.width/2;

    }
    
    //jump when the space key is pressed
    
    if(keyDown("space")&&monkey.y>313) {
        monkey.velocityY = -20.465;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
      monkey.scale=0.182636;
    


    }
    
   
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.visible=true;
  
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  //END

  //draw Sprites
  drawSprites();
  
  if (gameState === END) {
    obstacleGroup.destroyEach();
   FoodGroup.destroyEach();
    survialTime.visible = false;
    

    stroke("red");
   fill("red");
      textSize(30);
 text("Game Over", 110, 200);
    
     stroke("black");
   fill("black");
      textSize(30);
    text("Monkey is dead", 100, 240);
  }
 //displaying survialtime
 stroke("black");
 fill("black");
   textSize(20);

text("Survial Time:"+  survialTime, 100, 50);

//displaying score
stroke("black");
 fill("black");
   textSize(20);
text("Score:"+  score, 300, 100);



}

//Banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;

    FoodGroup.add(banana);
  monkey.depth=banana.depth+1;
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,350,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}




 
 


