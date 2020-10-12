var monkey, monkey_running;
var score;
var ground;
var obj;
var objGroup, foodGroup;
var mode = "play";
var Eaten = 0;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(100, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  ground = createSprite(300, 600, 800, 20);
  foodGroup = createGroup();
  objGroup = createGroup();
}

//Making A Spawn Banana Function
function SpawnBanana(){
  if (mode == "play"){
      if (World.frameCount % 120 == 0){
          banana = createSprite(560, Math.round(random(200, 430)), 40, 40);
          banana.addImage(bananaImage);
          banana.scale = 0.2;
          banana.velocityX = -5;
          banana.lifetime = 150;
          foodGroup.add(banana);
          
      }
      
      
  }
}


function SpawnObj(){
  if (mode == "play"){
    if (World.frameCount % 121 == 0){
      obj = createSprite( Math.round(random(400, 600)), 540, 40, 40);
      obj.addImage(obstacleImage);
      obj.scale = 0.3;
      obj.velocityX = -4;
      obj.lifetime = 200;
      objGroup.add(obj);
      
    }
  }
}



function draw() {
  if (mode == "play"){
      background("white");    
      monkey.scale = 0.2;
      ground.velocityX = -4;
      monkey.collide(ground);
      monkey.velocityY = monkey.velocityY + 0.8;
      score = Math.ceil(frameCount/frameRate());

      fill("black");
      textSize(20);
      text("Survival Time: " + score, 225, 50);
      textSize(15);
      text("Banana's Eaten: " + Eaten, 400, 100);
    
      if (ground.x < 200 ) {
        ground.x = ground.width / 2;
      }
    
      if(keyWentUp("space")){
            monkey.velocityY = -13;
      }
      
      if (foodGroup.isTouching(monkey)){
        foodGroup.destroyEach(); 
        Eaten += 1;
      } 
      
      if (objGroup.isTouching(monkey)){
        mode = "end";
      }
      
    
      if (mode == "end"){
        ground.velocityX = 0;
        objGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
        
      }
     
    
       

      SpawnBanana();
      SpawnObj();
      drawSprites();
  }  
}