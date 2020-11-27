var ghost,ghostImage;
var climber,climberImage,climberGroup;
var door,doorImage,doorGroup;
var tower,towerImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var sound;






function preload(){
  ghostImage = loadAnimation("ghost-jumping.png","ghost-standing.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
  sound = loadSound("spooky.wav");
  
  
}

function setup(){
 createCanvas(600,600); 
  sound.loop();
 tower = createSprite(300,300);
 tower.addImage("tower",towerImage);
 tower.velocityY=1;
  
  ghost = createSprite(200,200);
  ghost.addAnimation("running",ghostImage);
  ghost.scale = 0.5;
   
  doorGroup = createGroup();
  climberGroup = createGroup();
  
  
}

function draw() {
  if (gameState===PLAY){
  if(tower.y>600){
    tower.y=tower.width/2;
     }
  if(keyDown("space")){
    ghost.velocityY = -10;
    }
  ghost.velocityY = ghost.velocityY + 0.3;
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
    
  }
    if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
    
  }
    if (doorGroup.isTouching(ghost)||climberGroup.isTouching(ghost)){
      gameState = END;
     }
  score = score+Math.round(frameCount/60);  
    
  spawnDoors();
  }

  
 drawSprites(); 
   if (gameState === END){
    textSize(30);
    fill("white");
    textFont("Algerian");
    text("GAME OVER",200,200);
    
      doorGroup.destroyEach();
     climberGroup.destroyEach();
     ghost.destroy(); 
    tower.velocityY = 0;
    
    
  }
  fill("white");
   text("SCORE "+ score,50,50);
   
}

function spawnDoors(){
  if(frameCount%200===0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY =1;
    door.x = Math.round(random(150,300));
    doorGroup.add(door);
    climber = createSprite(200,0);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climberGroup.add(climber);
    
  }
  
  
  
}



