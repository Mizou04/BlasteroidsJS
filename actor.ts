import Vector from "./externals/Vector2D"/*EXT*/

 class Actor extends Vector{
	constructor(public x : any, public y : any, public w : number, public h : number, public color : string, public rotation : number, public vx : number, public vy: number, public ctx?: CanvasRenderingContext2D){
		super(x, y);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.rotation = rotation;
		this.vx = vx;
		this.y = y;
		this.ctx = ctx;
	}
	  get pos2D (){
    return new Vector(this.x, this.y);
  }
  
  set pos2D (pos){
    this.x = pos.x;
    this.y = pos.y;
  }
  
  get velo2D (){
    return new Vector(this.vx,  this.vy);
  }

  set velo2D (velo){
    this.vx = velo.x;
    this.vy = velo.y;
  }


	draw(ctx : CanvasRenderingContext2D) : void {}
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
	}

}

export default Actor;
