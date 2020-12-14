var PLAY=1;
var END=0;
var gamestate=1;
var fruitGroup,enemyGroup
var f1,f2,f3,f4,r
var ai1,ai2
var sword1,swordi
var gameOver,go
var knifeswooshsound,gameoverS

function preload(){
  f1=loadImage("fruit1.png");
  f2=loadImage("fruit2.png");
  f3=loadImage("fruit3.png");
  f4=loadImage("fruit4.png");
  
  ai1=loadAnimation("alien1.png");
   ai2=loadAnimation("alien2.png");
  
  swordi=loadImage("sword.png");
  
  
  go=loadImage("gameover.png")
  knifeswooshsound=loadSound("knifeSwooshSound.mp3")
  gameoverS=loadSound("gameover.mp3")
}

function setup(){
  createCanvas(400, 400);
  
  sword=createSprite(40,200,20,20)
  sword.addImage(swordi);
  sword.scale=0.7;

  fruitGroup=new Group();
  enemyGroup=new Group();
  
  sword.setCollider("circle",0,0,40);
  sword.debug = false;
  
  gameOver=createSprite(200,100);
  gameOver.addImage(go);
  
  
  
  score=0;
  
}
function draw(){
  
  background(180)
  text("Score: "+ score, 300,50);
  
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
  if(gamestate===PLAY){
    gameOver.visible=false;
    enemy();
    fruits();
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach()
      
      knifeswooshsound.play();
      score=score+2
    }
    
    if(enemyGroup.isTouching(sword)){
      enemyGroup.destroyEach();
      gameoverS.play();
    gamestate=END
    
    }
  }
  
  if(gamestate===END){
    gameOver.visible=true;
    
    fruitGroup.setLifetimeEach=-1;
    
    enemyGroup.setLifetimeEach=-1;
    fruitGroup.setVelocityXEach=0;
    
    enemyGroup.setVelocityXEach=0;
    
  }
  
  
  drawSprites();
}
  
  
  
  
  
  
  
  


function fruits(){
  if(World.frameCount%80===0){
   
    position=Math.round(random(1,2))
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4))
    
    if(r==1){
      fruit.addImage(f1);
    }else if(r==2){
      fruit.addImage(f2);
    }else if(r==3){
      fruit.addImage(f3);
    }else if(r==4){
      fruit.addImage(f4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.lifetime=100;
    fruit.velocityX=-(7+(score/4));
    
    fruitGroup.add(fruit);
     
     }
}




function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20)
    monster.addAnimation("moving",ai1);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setlifetime=50;
    
    enemyGroup.add(monster);  
  }
  
}
