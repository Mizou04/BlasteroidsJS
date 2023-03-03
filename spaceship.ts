import Actor from "./actor"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/
import {strip} from "./externals/utils"/*EXT*/

class Spaceship extends Actor{
	isThrustApplied : boolean;
	constructor(public x : any, public y : any, public w : number, public h : number, public color : string, public rotation : number, public vx : number, public vy: number, ctx?: CanvasRenderingContext2D){
		super(x, y, w, h, color, rotation, vx, vy, ctx);
		this.isThrustApplied = false;
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
		if(this.isThrustApplied)
			this.drawPlasma(ctx);	
		ctx.restore();
		
	}
/*
	move(){
		super.move(this.ctx as CanvasRenderingContext2D);
		this.drawPlasma(this.ctx as CanvasRenderingContext2D)
	}
*/
		speedUp(g : number){
			let x = g * Math.sin(this.rotation),
					y = g * Math.cos(this.rotation);

			if(this.velo2D.x > 4 || this.velo2D.x < -4) 
				this.velo2D =  new Vector(this.velo2D.x < 0 ? -4 : 4, this.velo2D.y) ;
			if(this.velo2D.y > 4 || this.velo2D.y < -4) 
				this.velo2D =  new Vector(this.velo2D.x, this.velo2D.y < 0 ? -4 : 4) ;

			this.velo2D = this.velo2D.add(
				new Vector(-x, y)
			);
			this.isThrustApplied = true;	
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


	
}

export default Spaceship;
