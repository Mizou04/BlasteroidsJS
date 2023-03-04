import Actor from "./actor"/*EXT*/

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
	
	draw(ctx : CanvasRenderingContext2D){
		ctx.save();
		ctx.translate(this.pos2D.x, this.pos2D.y);
		ctx.rotate(this.rotation);	
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(-this.w/2, -this.h/2, (this.w+this.h)/2, Math.PI*2, 0, true);
		ctx.fill();
		ctx.restore();
		return this;
	}
}


