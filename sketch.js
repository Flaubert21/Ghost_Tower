var gamestate = "play"
var tower, tower_image
var ghost, ghost_image
var climber, climber_image
var door, door_image
var doorsGroup, climbersGroup
var invisibleGroup,Invisible
var sound

function preload(){
  tower_image = loadImage("tower.png");
  ghost_image = loadImage("ghost-standing.png");
  door_image = loadImage("door.png");
  climber_image = loadImage("climber.png");
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300,50,50);
  tower.addImage(tower_image);
  tower.velocityY = 4;
  
  sound.loop();

  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghost_image);
  ghost.scale = 0.3;
   

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();

}


function draw(){
background("black");
 


   if(gamestate == "end"){
     fill("yellow");
     textSize(30);
     text ("Game Over ", 230,300);
   }




  
   if(gamestate == "play"){
        if(tower.y > 600 ){
        tower.y = height/2;
   }
  
    if(keyDown("space")){
      ghost.velocityY = -5;


    }

      ghost.velocityY = ghost.velocityY + 0.8; 

      if(keyDown("left")){
      ghost.x = ghost.x - 4;
      }

      if(keyDown("right")){
        ghost.x = ghost.x + 4;
      }
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
     

   }
      if(invisibleGroup.isTouching(ghost) || ghost.y > 600) {
        ghost.destroy();
        gamestate = "end";
      }
     
     spawWindow();
     drawSprites();
   }
   
   

  


}
function spawWindow(){
  
  if(frameCount % 90 == 0){
 
  door = createSprite(Math.round(random(200,400)),-50,200);
  door.velocityY = 3;
  door.addImage(door_image);
  door.lifetime = 500;


  climber = createSprite(door.x,0,50,20);
  climber.velocityY = 3;
  climber.addImage(climber_image);
  climber.lifetime = 500;
 
  invisible = createSprite(door.x,10,85,2);
  invisible.velocityY = 3;
  invisible.lifetime = 500;
  invisible.visible = false; 
  


  door.depth = ghost.depth;
  ghost.depth = ghost.depth + 1; 
  
  climber.depth = ghost.depth;
  ghost.depth = ghost.depth + 1; 
  
  climbersGroup.add(climber);
  doorsGroup.add(door);
  invisibleGroup.add(invisible)


}
  

  

}