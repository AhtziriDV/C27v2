class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannon_image = loadImage("assets/canon.png");
    this.cannon_base = loadImage("assets/cannonBase.png");
  }
  display() {
    //que se muevan con flechas
    //console.log(this.angle);
    if(keyIsDown(RIGHT_ARROW) && this.angle < 70){
      this.angle +=1;
    }
  
    if(keyIsDown(LEFT_ARROW) && this.angle > -30){
      this.angle -=1;
    }
  
    //PARTE SUPERIOR CANON
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannon_image, 0, 0, this.width, this.height);
    pop();
    //PARTE INFERIOR CANON
    image(this.cannon_base,70, 20, 200, 200);
    noFill();
  }
}
