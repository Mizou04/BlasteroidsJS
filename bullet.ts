import Actor from "./actor"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/

export default class Bullet extends Actor {
	constructor(public x : any, public y : any, public w : number, public h : number, public color : string, public rotation : number, public vx : number, public vy: number, ctx?: CanvasRenderingContext2D){
		super(x, y, w, h, color, rotation, vx, vy, ctx);
		this.firePower(4);
	}
	draw(ctx : CanvasRenderingContext2D){
		ctx.save();
		ctx.translate(this.pos2D.x, this.pos2D.y);
		ctx.rotate(this.rotation);	
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(-this.w/2, -this.h/2, (this.w+this.h)/2, Math.PI*2, 0, true);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		return this;
	}
	move(ctx : CanvasRenderingContext2D){
		this.pos2D = this.pos2D.subtract(this.velo2D);
		this.draw(ctx);	
		return this;
	}
	private firePower(g : number){
		let x = g * Math.sin(this.rotation),
				y = g * Math.cos(this.rotation);
		this.velo2D = new Vector(-x, y)
	}
}

