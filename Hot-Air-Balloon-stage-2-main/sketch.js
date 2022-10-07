var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var life=3; 
var obsTop1Group; 
var obsTop2Group; 
var gameState=1;


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
obsTop1Group=createGroup(); 
obsTop2Group=createGroup(); 



}

function draw() {
  
  background("black");

  if(gameState === 1){
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
    }
    
    balloon.velocityY = balloon.velocityY + 2;
    Bar();
    spawnObstaclesTop();
    if(obsTop1Group.isTouching(balloon)){
        life-=1
        obsTop1Group.destroyEach(); 
      }
      if(life === 0){
        gameState = 0;
      }
  }


      drawSprites();
      
      fill('black')

      text("Lives:"+life,50,50)
      
      if(gameState === 0){
        text("Game Over",150,180)
        balloon.velocityX=0;
        balloon.velocityY=0;

        balloon.x=100
        balloon.y=100
      }
      
}




function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;

   obsTop1Group.add(obstacleTop); 
   
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}


  
