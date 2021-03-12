var bg, puck
var playerMallet,computerMallet;
var goal1,goal2;
var boostpad1,boostpadGroup;

var gameState = "serve";
var computerscore =0;
var playerscore = 0;

var edges;

function preload(){
  field_img = loadImage("Field.png");
  ball_img = loadImage("Ball.png");
  fennec_img = loadImage("Fennec.png");
  octane_img = loadImage("Octane.png");


}

function setup(){
  createCanvas(300,400);

  bg = createSprite(150,200,300,400);
  bg.addAnimation("field",field_img);
  bg.scale = 1.8;

  boostpadGroup = new Group();
  
  puck = createSprite(150,200,10,10);
  puck.addAnimation("Ball",ball_img); 
  puck.scale = 0.2;
  puck.setCollider("circle",0,0,10);

  playerMallet = createSprite(150,50,55,11);
  playerMallet.shapeColor='red';
  playerMallet.addAnimation(";)Fennec",fennec_img); 
  playerMallet.scale = 0.13;
  playerMallet.debug = false;

  computerMallet = createSprite(150,350,55,11);
  computerMallet.shapeColor='blue';
  computerMallet.addAnimation("Octane",octane_img);
  computerMallet.scale = 0.5;
   
  goal1 = createSprite(150,28,100,20);
  goal1.shapeColor='purple';
  goal1.visible = false;
  
  goal2 = createSprite(150,372,100,20);
  goal2.shapeColor='purple';
  goal2.visible = false;

  edges = createEdgeSprites();
}

function draw() {
  background("white");

 if (gameState === "serve") {
    strokeWeight(3);
    textSize(23);
    fill('brown');
    text("Press Space to Strike",100,180);
  }
  
 
  
  /*if(puck>400||puck<0){
    if(puck>400){
      playerMallet.x=200;
      playerMallet.y;
    }
  }*/
  
 if(keyDown("left")&& gameState === "play"){
  playerMallet.x=playerMallet.x-10;
}
if (keyDown("right")&& gameState === "play"){
  playerMallet.x=playerMallet.x+10;
} 
  
if(keyDown("up")&& gameState === "play"){
    playerMallet.y=playerMallet.y-10;
  }
 if (keyDown("down")&& gameState === "play"){
   playerMallet.y=playerMallet.y+10;
 }
 computerMallet.x = puck.x;

for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }

createEdgeSprites();
  puck.bounceOff(edges[1]);
  puck.bounceOff(edges[0]);
  puck.bounceOff(edges[2]);
  puck.bounceOff(edges[3]);
  puck.bounceOff(playerMallet);
  puck.bounceOff(computerMallet);
  
  if(gameState === "play"){
    if(frameCount%60 === 0){
      var y = Math.round(random(5,350));
      var x = Math.round(random(5,350));
      var boostpad1 = createSprite(x,y,10,10);
      boostpad1.lifetime = 35;
      boostpad1.shapeColor = "yellow";
    
      boostpadGroup.add(boostpad1);
    }
  }
  
 
 if (playerMallet.isTouching(boostpadGroup)){
   playerscore = playerscore + 10;
   boostpadGroup.destroyEach();
 }

  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }

    if (puck.isTouching(goal1)){
    computerscore=computerscore+1;
    reset();
    gameState="serve";
    
    }

     if(puck.isTouching(goal2)){
       playerscore=playerscore+1;
       reset();
       gameState="serve";
     }
    
    
    
   
    
  
  
  //information to display when 5 points are earned
  if(playerscore===5||computerscore===5){
  gameState="over";
  strokeWeight(3);
  textFont('Georgia');
  textSize(23);
  fill('orange');
  text("Game over!!!",130,170);
  
  text("pressR to Restart",180,220);
    
  }



  if( keyDown("r") && gameState === "over"){
    gameState = "serve";
  computerscore = 0; 
    playerscore =0;
  
}
  
  drawSprites();
    fill('white');
    text(computerscore,60 ,230);
    text (playerscore , 60,190);
  
}

function serve() {
  puck.velocityX = 2;
  puck.velocityY = 2;
}

function reset() {
  puck.x = 150;
  puck.y = 150;
  puck.velocityX = 0;
  puck.velocityY = 0;
}

















































































































































