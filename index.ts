import Spaceship from "./spaceship"/*EXT*/
import Rock from "./rock"/*EXT*/
//import Bullet from "./bullet"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/
import {deg2rad} from "./externals/utils"/*EXT*/

const canv_bg = document.querySelector("#canvas_bg") as HTMLCanvasElement;
const ctx_bg = canv_bg.getContext("2d") as CanvasRenderingContext2D;
const canv = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canv.getContext("2d") as CanvasRenderingContext2D;
const canv_st = document.querySelector("#canvas_state") as HTMLCanvasElement;
const ctx_st = canv_st.getContext("2d") as CanvasRenderingContext2D;

function adjust(){
	canv.width = canv_bg.width = canv_bg.clientWidth;
	canv.height = canv_bg.height = canv_bg.clientHeight;
	canv_st.height = canv_st.clientHeight;
	canv_st.width = canv_st.clientWidth;
}
adjust();

function resizeHandler(e : UIEvent){
	e.preventDefault();
	adjust();
	drawBackground();
}

window.addEventListener("resize", resizeHandler);

const KEYS = {
	"U" : 'ArrowUp', "D" : 'ArrowDown', "R" : "ArrowRight", "L" : "ArrowLeft", "S" : " "
} as const

function drawBackground(){
	let w = ctx_bg.canvas.width, h = ctx_bg.canvas.height;
	ctx_bg.beginPath();
	ctx_bg.clearRect(0, 0, w, h);
	ctx_bg.fillStyle = "#000010";
	ctx_bg.fillRect(0, 0, w, h);
	ctx_bg.fillStyle = "#999999";
	for(let i = 0; i < 100; i++){
		ctx_bg.beginPath();
		ctx_bg.arc(Math.random()*w, Math.random()*h, Math.random() + 1, Math.PI*2, 0);
		ctx_bg.fill();
		ctx_bg.closePath();
	}	
	ctx_bg.closePath();
}

class Game {
	state : 'before_start' | 'started' | 'won' | 'lost' | 'paused'
	rocks : Rock[];
	initialSpeed : Vector;
	initDeg : number;
	g : number; // thrust (when pushing fuel)
	sh : Spaceship;
	score : number;
	private heart : string = "❤";
	lives : number = 3;
	level : number;
	private boomed : boolean;
	constructor(){
		this.state = 'started';
		this.rocks = [];
		this.boomed = false;
		this.initialSpeed = new Vector(0, +80/100);
		this.initDeg = 0;
		this.g = .2; // thrust (when pushing fuel)
		this.score = 0;
		this.level = 1;
		this.sh = {} as Spaceship;
		}
	
	init(){
		this.respawnRocks();
		this.drawState();
		this.score = 0;
		this.level = 1;
		this.lives = 3;
		this.respawnSpaceship();
	}

	private respawnRocks(){
		this.rocks = [];
		for(let i = 1; i <= this.level * 2; i++){
			this.rocks.push(new Rock(
				canv.width*Math.random(),
				canv.height * Math.random(),
				15,
				15,
				"#f0f",
				deg2rad(Math.random()*360),
				Math.random()*2 - Math.random()*2,
				Math.random()*2 - Math.random()*2
			));
		}	
	}
	private respawnSpaceship(){
		this.sh = new Spaceship(
						canv.width/2 - 10,
						canv.height/2,
						18, 20,
						"#0f0",
						deg2rad(this.initDeg),
						0, 10,
						ctx);
						this.sh.pos2D = new Vector(canv.width/2 - 10, canv.height/2)
						this.sh.velo2D = this.initialSpeed;
	}

	loops(){
		this.spaceshipDestroy();
		this.rocksDrawer();
		if(this.sh.bullets.length && this.rocks.length)
			this.rockDestroy();
		this.sh.move(ctx);
		this.drawState();
	}

	private spaceshipDestroy(){
		for(let i = 0; i < this.rocks.length; i++)
		if(
			this.sh.pos2D.x < this.rocks[i].x + this.rocks[i].w 
		&&
			this.sh.pos2D.x + this.sh.w > this.rocks[i].x 
		&&
			this.sh.pos2D.y < this.rocks[i].y + this.rocks[i].h 
		&&
			this.sh.h + this.sh.pos2D.y > this.rocks[i].y
		){
			if(this.lives >= 1){
				this.lives--;
				this.respawnRocks();
				this.respawnSpaceship();
			}
			if(this.lives == 0) {
				console.log("you lost") ;
				this.init();
			}
			//sh.w = 0;
			//alert("you lost");
		}
	}

	rockDestroy(){
		for(let i = 0; i < this.rocks.length; ++i){
			for(let j = 0; j < this.sh.bullets.length; j++){
				if(
					this.sh.bullets[j]?.x < this.rocks[i]?.x + this.rocks[i]?.w 
				&&
					this.sh.bullets[j]?.x + this.sh.bullets[j]?.w > this.rocks[i]?.x 
				&&
					this.sh.bullets[j]?.y < this.rocks[i]?.y + this.rocks[i]?.h 
				&&
					this.sh.bullets[j]?.h + this.sh.bullets[j]?.y > this.rocks[i]?.y
				) {
					// Collision detected!
					this.sh.bullets = this.sh.bullets.filter(bul => bul != this.sh.bullets[j]!);		
					this.rocks = this.rocks.filter(bul => bul != this.rocks[i]!);		
					this.boomed = true;
				}	
			}
			if(!this.rocks.length) this.levelUp();
		}
			
		if(this.boomed){
			this.score += 10;
			this.drawState();
		}
		this.boomed = false;
	}

	rocksDrawer(){
		for(let i = 0; i < this.rocks.length; i++){
			this.rocks[i]?.move(ctx);
		}	
	}

	levelUp(){
		if(this.level < 10) this.level++;
		this.respawnSpaceship();
		this.respawnRocks();
	}

	private drawState(){
		ctx_st.beginPath();
		ctx_st.clearRect(0, 0, ctx_st.canvas.width, ctx_st.canvas.height);
		ctx_st.fillStyle = "#f41010";
		ctx_st.fillRect(0, 0, ctx_st.canvas.width, ctx_st.canvas.height);
		this.drawScore();
		this.drawLifes();
		this.drawLevel();
	}

	private drawLevel(){
		ctx_st.beginPath();
		ctx_st.fillStyle = "#fff";
		ctx_st.font = "20px sans-serif";
		ctx_st.fillText(`level ${this.level}`, canv_st.width/2-30, canv_st.height/2 + 5);
		ctx_st.closePath();
	}
	private drawScore(){
		ctx_st.beginPath();
		ctx_st.fillStyle = "#fff"
		ctx_st.font = "16px serif";
		ctx_st.fillText(this.score.toString(), 30, ctx_st.canvas.height/2 + 10);
		ctx_st.closePath();
	}

	private drawLifes(){
		ctx_st.beginPath();
		ctx_st.fillStyle = "#fff"
		ctx_st.font = "16px serif";
		ctx_st.fillText(this.heart.repeat(this.lives), ctx_st.canvas.width - 48, ctx_st.canvas.height/2 + 10);
		ctx_st.closePath();
	}

}


let game = new Game();
game.init();


function animate(){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	game.loops();
		requestAnimationFrame(animate);
}

drawBackground();
requestAnimationFrame(animate);
window.addEventListener("keydown", (e : KeyboardEvent)=>{
	if(Object.values(KEYS).includes(e.key as typeof KEYS["U"])) e.preventDefault();
	switch(e.key){
		case KEYS.U:
			game.sh.speedUp();
			break;
		case KEYS.D:
			break;
		case KEYS.R:
			game.initDeg = game.initDeg < 360 ? game.initDeg + 10 : 10;
			game.sh.rotation = deg2rad(game.initDeg);
			break;
		case KEYS.L:
			game.initDeg = game.initDeg > 0 ? game.initDeg - 10 : 350;
			game.sh.rotation = deg2rad(game.initDeg);
			break;
		case KEYS.S:
			game.sh.fire(ctx);
			break;
		default:
			return;
	}
});

