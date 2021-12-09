var invisibleground;
var score = 0;
var coinImage;
var marioImage;
var bg;
var mariosprite;
var ob1;
var ob2;
var ob3;
var gamestate = "play";
var obgroup, coingroup;
function preload() {
  bg = loadImage("backg.jpg");
  marioImage = loadAnimation("Capture1.png", "Capture3.png", "Capture4.png");
  coinImage = loadImage("coin.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
}

function setup() {
  createCanvas(600, 200);
  mariosprite = createSprite(50, 130, 50, 50);
  mariosprite.addAnimation("mario", marioImage);
  mariosprite.scale = 0.5;
  invisibleground = createSprite(300, 170, 600, 10);
  invisibleground.visible = false;
  score = 0;
  obgroup = createGroup();
  coingroup = createGroup();
}

function draw() {
  background(bg);
  textSize(20);
  fill(255);
  text("Score: " + score, 500, 40);
  mariosprite.collide(invisibleground);
  if (gamestate === "play") {
    if (keyDown("space") && mariosprite.y > 60) {
      mariosprite.velocityY = -5;
    }
    mariosprite.velocityY += 1;

    spawnCoin();
    spawnObstacles();
    if (mariosprite.isTouching(coingroup)) {
      score = score + 1;
      coingroup.destroyEach();
    }
  }
  if (gamestate === "end") {
  }
  drawSprites();
}

function spawnCoin() {
  if (frameCount % 60 == 0) {
    var coinsprite = createSprite(600, 50, 10, 10);
    coinsprite.addImage(coinImage);
    coinsprite.velocityX = -5;
    coinsprite.scale = 0.2;
    coingroup.add(coinsprite);
  }
}

function spawnObstacles() {
  if (frameCount % 60 == 0) {
    obsprite = createSprite(600, 150, 50, 50);
    obsprite.velocityX = -5;
    obsprite.scale = 0.2;
    var r = Math.round(random(1, 3));
    switch (r) {
      case 1:
        obsprite.addImage(ob1);
        break;
      case 2:
        obsprite.addImage(ob2);
        break;
      case 3:
        obsprite.addImage(ob3);
        break;
    }
    obgroup.add(obsprite);
  }
}
