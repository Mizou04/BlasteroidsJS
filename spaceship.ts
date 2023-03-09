import Actor from "./actor"/*EXT*/
import Bullet from "./bullet"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/

class Spaceship extends Actor{
	private isThrustApplied : boolean;
	private timeout : number;
	public bullets : Bullet[];
	public g : number;
	constructor(public x : any, public y : any, public w : number, public h : number, public color : string, public rotation : number, public vx : number, public vy: number, ctx?: CanvasRenderingContext2D){
		super(x, y, w, h, color, rotation, vx, vy, ctx);
		this.isThrustApplied = false;
		this.bullets = [];
		this.timeout = 0;
		this.g = 0.2;
	}
	draw(ctx : CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.pos2D.x, this.pos2D.y);
		ctx.rotate(this.rotation);
		ctx.beginPath();
		ctx.moveTo(-this.w /2, this.h/2);
		ctx.lineTo(this.w/2, this.h/2);
		ctx.lineTo(0, -this.h/2);
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		//ctx.stroke();
		ctx.fill();	
		if(this.isThrustApplied){
			this.drawPlasma(ctx);	
			this.timeout =	setTimeout(()=> this.isThrustApplied = false, 100);
		} else {
			clearTimeout(this.timeout);
		}
		ctx.restore();
		for(let bullet of this.bullets){
			bullet.move(ctx);
		}	
		return this;
	}

	move(ctx : CanvasRenderingContext2D){
		super.move(this.ctx as CanvasRenderingContext2D);
		
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
		return this;
	}

	speedUp(){
		let x = this.g * Math.sin(this.rotation),
			y = this.g * Math.cos(this.rotation);

		if(this.velo2D.x > 4 || this.velo2D.x < -4) 
			this.velo2D =  new Vector(this.velo2D.x < 0 ? -4 : 4, this.velo2D.y) ;
		if(this.velo2D.y > 4 || this.velo2D.y < -4) 
			this.velo2D =  new Vector(this.velo2D.x, this.velo2D.y < 0 ? -4 : 4) ;

		this.velo2D = this.velo2D.add(
			new Vector(-x, y)
		);
		this.isThrustApplied = true;
		return this;
	}
	speedDown(g : number){
		let x = g * Math.sin(this.rotation), y = g * Math.cos(this.rotation);
		this.velo2D = this.velo2D.subtract(
			new Vector(-x, y)
		);	
	}
	private drawPlasma(ctx : CanvasRenderingContext2D){
		ctx.beginPath();
		ctx.moveTo(this.w/4 - 2, this.h/2);
		ctx.lineTo(this.w/4 + 0,  this.h);
		ctx.lineTo(this.w/4 + 2, this.h/2);
		ctx.closePath();
		ctx.moveTo(-this.w/2 + 1 + 2, this.h/2);
		ctx.lineTo(-this.w/2 + 3 + 2,  this.h);
		ctx.lineTo(-this.w/2 + 5 + 2, this.h/2);
		ctx.closePath();
		ctx.strokeStyle = ctx.fillStyle = "#f2f";
		ctx.stroke();
		ctx.fill();
	}
	fire(ctx : CanvasRenderingContext2D){
		this.bullets.push(
			new Bullet(
				this.pos2D.x,
				this.pos2D.y,
				2, 2,
				"#fff",
				this.rotation,
				5, //doesn't matter
				5 //doesn't matter
			));
	
	this.bullets = this.bullets.filter(
				bullet => 			
				(bullet.pos2D.x < ctx.canvas.width 
			&& bullet.pos2D.x > 0 
			&& bullet.pos2D.y < ctx.canvas.height 
			&& bullet.pos2D.y > 0) )

	}
	
}

export default Spaceship;
