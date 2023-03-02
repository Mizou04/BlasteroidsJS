import Actor from "./actor"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/

class Spaceship extends Actor{
	constructor(public x : any, public y : any, public w : number, public h : number, public color : string, public rotation : number, public vx : number, public vy: number){
		super(x, y, w, h, color, rotation, vx, vy);
	}
	draw(ctx : CanvasRenderingContext2D) : void {
		ctx.save();
		ctx.translate(this.pos2D.x, this.pos2D.y);
		ctx.rotate(this.rotation);
		ctx.beginPath();
		ctx.moveTo(-this.w /2, this.h/2);
		ctx.lineTo(this.w/2, this.h/2);
		ctx.lineTo(0, -this.h/2);
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}

	speedUp(g : number){
		let x = g * Math.sin(this.rotation), y = g * Math.cos(this.rotation);
		this.velo2D = this.velo2D.add(
			new Vector(-x, y)
		);
	}
	speedDown(g : number){
		let x = g * Math.sin(this.rotation), y = g * Math.cos(this.rotation);
		this.velo2D = this.velo2D.subtract(
			new Vector(x, -y)
		);	
	}

	move(ctx : CanvasRenderingContext2D){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.pos2D = this.pos2D.subtract(this.velo2D);

		if(this.pos2D.x <= 0){
			this.pos2D = new Vector(ctx.canvas.width, this.pos2D.y); 
		}

		if(this.pos2D.y <= 0){
			this.pos2D = new Vector(this.pos2D.x, ctx.canvas.height); 
		}

		if(this.pos2D.x > ctx.canvas.width){
			this.pos2D = new Vector(0, this.pos2D.y); 
		}

		if(this.pos2D.y > ctx.canvas.height){
			this.pos2D = new Vector(this.pos2D.x, 0); 
		}

		this.draw(ctx);
		requestAnimationFrame(this.move.bind(this, ctx));
	}
	
}

export default Spaceship;
