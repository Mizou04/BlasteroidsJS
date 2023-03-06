import Actor from "./actor"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/

export default class Rock extends Actor{
	constructor(
		public x : any, 
		public y : any, 
		public w : number, 
		public h : number, 
		public color : string, 
		public rotation : number, 
		public vx : number, 
		public vy: number, 
		ctx?: CanvasRenderingContext2D){
		super(x, y, w, h, color, rotation, vx, vy, ctx);
	}
	move(ctx : CanvasRenderingContext2D){
		super.move(ctx);
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
	draw(ctx : CanvasRenderingContext2D){
		ctx.save();
		ctx.translate(this.pos2D.x, this.pos2D.y);
		ctx.rotate(this.rotation);	
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 2;
		ctx.moveTo(0, 0);
		ctx.lineTo(-this.w, 0);
		ctx.lineTo(-this.w, -this.h/2);
		ctx.lineTo(-4, -this.h);
		ctx.lineTo(-4, -this.h + this.h/3);
		ctx.lineTo(this.w/2, this.h/2);
		ctx.lineTo(this.w/2, 0);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
		return this;
	}
}


