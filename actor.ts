import Vector from "./externals/Vector2D"/*EXT*/

 class Actor extends Vector{
	constructor(public x : any, public y : any, public w : number, public h : number, public color : string, public rotation : number, public vx : number, public vy: number){
		super(x, y);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.rotation = rotation;
		this.vx = vx;
		this.y = y;
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

}

export default Actor;
