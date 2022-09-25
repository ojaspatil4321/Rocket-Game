// You are an astronuat going to the moon, but you run into an astroid feild. Move through the astroids to survive

// Use the right arrow key to move to the right. Use the left arrow key to move to the right. Avoid the meteors

// Keep avoiding the meteors

var rocket, rocketimg;
var space, spaceimg;
var meteor, meteorimg, meteorGroup;
var gameState = "play";

var score = 0

function preload() {

  spaceimg = loadImage("space.png");
  rocketimg = loadImage("rocket.png");
  meteorimg = loadImage("meteor.png");  
}

function setup() {
 
  space = createSprite(200,300,20,20);
  space.addImage("space",spaceimg)
  space.velocityY = 1;
  space.scale = 2.5
  
  rocket = createSprite(150,335,20,20);
  rocket.addImage("rocket",rocketimg)
  rocket.scale = 0.25
  
  meteorGroup = new Group(); 
  
}

function draw() {
  
  background("black");
  
  text("Score:"+score, 30,50 );
 
  if(gameState === "play"){
    
    score = score + Math.round(getFrameRate()/60);
  
  if(space.y > 400){
    space.y = 200
  }
  
  if(keyDown("right_arrow")){
    rocket.x = rocket.x+5;
  }
  
  if(keyDown("left_arrow")){
    rocket.x = rocket.x-5;
  }
  
  
  
//  console.log(frameCount)
  
  spawnMeteors();
  
  if(meteorGroup.isTouching(rocket)){
    gameState = "end";
    rocket.destroy();
    meteorGroup.destroyEach();
  }
  }
  
 if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(55)
    text("Game Over", 100,100);
    space.velocityY = 0;
  }
  
  drawSprites();
}

function spawnMeteors(){
  if(frameCount % 75 === 0){
    meteor = createSprite(200,-25,20,20);
    
    meteor.addImage("meteor",meteorimg)
    
    meteor.velocityY = 1;
    
    meteor.scale = 0.75;
    
    meteor.x = Math.round(random(125,400));
    
    meteor.lifetime = 450;
    
    meteorGroup.add(meteor);
  }
}