var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup
var gameState="play";
function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png")
  spookySound=loadSound("spooky.wav")
}
function setup() {
  createCanvas(600,600);
  spookySound.loop();
 tower=createSprite(300,300);
 tower.addImage(towerImg)
 tower.velocityY=3 ;
 ghost=createSprite(200,200,50,50)
 ghost.addImage(ghostImg)
 ghost.scale=0.3
 climbersGroup=new Group()
 doorsGroup=new Group()
 invisibleBlockGroup=new Group()
}


function draw() {
  background(0);
  if(gameState==="play"){

  if(keyDown("space")){
    ghost.velocityY=-2;
  }
    if(keyDown("right")){
      ghost.x+=3
    }
    if(keyDown("left")){
      ghost.x-=3
    }
  ghost.velocityY=ghost.velocityY+0.8
  if(tower.y>400){
    tower.y=300;
  }
  spawnDoors();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end"
    tower.destroy();
  }  
  drawSprites()
}
  if(gameState==="end") {
  //  storke("yellow")
    fill("yellow")
    textSize(30)
    text("game over",300,300)
  }
}
function spawnDoors () {
if(frameCount %240 ===0){
var door=createSprite(200,-50) 
door.addImage(doorImg)
var climber=createSprite(200,10) 
climber.addImage(climberImg)
climber.velocityY=1;
climber.x=door.x;
var invisibleBlock=createSprite(200,15)
invisibleBlock.width=climber.width
invisibleBlock.height=2;
invisibleBlock.x=door.x;
invisibleBlock.velocityY=1;
invisibleBlock.debug=false
invisibleBlockGroup.add(invisibleBlock)
climber.lifetime=800;
ghost.depth=door.depth
ghost.depth +=1;
door.x=Math.round(random(120,400))
door.velocityY=1;
door.lifetime=800;
invisibleBlock.lifetime=800;
doorsGroup.add(door)
climbersGroup.add(climber)
}
}
