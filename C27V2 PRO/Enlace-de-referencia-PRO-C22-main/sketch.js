const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;
var score = 0;
//var cannonBall;
var balls = [];

//clase 25
var boat;
var boats=[];

//clase 27 - miss
var boatAnimation = []; //guardara la secuencia de imagenes
var boatSpritedata; //guarda img por separado
var boatSpritesheet; //guarda las imagenes

//clase 27 - alumno
var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  //clase 27
  boatSpritedata = loadJSON("assets/boat/boat.json"); //coordenadas
  boatSpritesheet = loadImage("assets/boat/boat.png"); //imagenes

  brokenBoatSpritedata = loadJSON("assets/boat/brokenBoat.json"); //coordenadas
  brokenBoatSpritesheet = loadImage("assets/boat/brokenBoat.png"); //imgs
}

function setup() {

  canvas = createCanvas(1200, 600);
//CREA MUNDO
  engine = Engine.create();
  world = engine.world;
  
//modo de radianes a grados
angleMode(DEGREES);
angle = 15;

  var options = {
    isStatic: true
  }
//CREA CUERPO GROUND
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
//CREA CUERDO TOWER
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
//CREA OBJ CANNON
  cannon = new Cannon(180, 110, 130, 100, angle);

//bola de cannon
//cannonBall = new CannonBall(cannon.x, cannon.y);

//BOTE
//boat = new Boat(width-79, height-60, 170, 170, -80);

//clase 27 
var boatFrames = boatSpritedata.frames;
for(var i=0; i<boatFrames.length; i++){
  var pos = boatFrames[i].position;
  var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  boatAnimation.push(img);
}

var brokenBoatFrames = brokenBoatSpritedata.frames;
for(var i=0; i<brokenBoatFrames.length; i++){
  var pos = brokenBoatFrames[i].position;
  var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
  brokenBoatAnimation.push(img);
}


}

function draw() {
//FONDO
  image(backgroundImg, 0, 0, width, height);
//ACTUALIZA MOTOR
  Engine.update(engine);
//MUESTRA SUELO
  rect(ground.position.x, ground.position.y, width * 2, 1);
//CARGA TORRE
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
//MUESTRA CANNON
  cannon.display();
// cannonBall.display();

//BOTE 
//Matter.Body.setVelocity(boat.body, {x:-0.9, y:0});
//boat.display();

showBoats();

for(var i = 0; i<balls.length; i++){
  showCannonBalls(balls[i], i);
  //detectar colision
  collisionWithBoat(i);
}
}

function keyPressed() {
	if(keyCode === DOWN_ARROW){
		var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
	}
}

function keyReleased() {
	if(keyCode === DOWN_ARROW){
		//cannonBall.shoot();
    balls[balls.length-1].shoot();
	}
}

function showCannonBalls(ball, i ){
  if(ball){
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(i);
    }
  }
}

function showBoats(){
  if(boats.length > 0 ){
      if ( boats[boats.length - 1] === undefined 
      || boats[boats.length - 1].body.position.x < width - 300) { 
          //ajusta posiciones aleatorias
            var positions = [-40, -60, -70, -20];
            var position = random(positions);
          //crea nuevo barco y lo agrega a la matriz
          //clase 27
            var boat = new Boat(width, height - 100, 170, 170, position, boatAnimation);
            boats.push(boat);
      }      

      for(var i = 0; i < boats.length; i++){
        if( boats[i] ) {
          Matter.Body.setVelocity(boats[i].body, {
            x: -0.9,
            y: 0
          });
          boats[i].display();
          boats[i].animate();  
        }
      }
  }
  else{
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}

function collisionWithBoat(index){
  for(var i=0; i<boats.length; i++){
    if(balls[index] !== undefined && boats[i] !== undefined){
        var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

        if(collision.collided){
          boats[i].remove(i);
          Matter.World.remove(world, balls[index].body);
          delete balls[index];
        }
  
    }
  }
}
