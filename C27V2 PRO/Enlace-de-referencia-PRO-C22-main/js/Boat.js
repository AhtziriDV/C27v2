class Boat {
    constructor(x,y,width,height, boatPos, boatAnimation){
		var options = {
			restitution: 0.8,
			friction: 1.0,
			density: 1.0, 
			label: boat
		};
		this.animation = boatAnimation;
		this.speed = 0.05;
		this.isBroken = false;
		this.body = Bodies.rectangle(x,y,width,height,options);
		this.width = width;
		this.height = height;
		this.image = loadImage("./assets/boat.png");
		this.boatPosition = boatPos;
		World.add(world, this.body);
	}

	display() {
		var pos = this.body.position;
		//clase 27
		var index = floor(this.speed % this.animation.length);
		
		push();
		translate(pos.x, pos.y);
		imageMode(CENTER);
		image(this.animation[index], 0, this.boatPosition, this.width, this.height);
		pop();
	}

	remove(index){
		//Matter.Body.setVelocity(this.body, {x:0, y:0});
		this.animation = brokenBoatAnimation;
		this.speed = 0.05;
		this.width = 300;
		this.height = 300;
		this.isBroken = true;
		setTimeout ( ( ) => {
			Matter.World.remove(world, boats[index].body);
			delete boats[index];
		}, 2000);
	}

	//clase 27
	animate(){
		this.speed += 0.05;
	}
	

}