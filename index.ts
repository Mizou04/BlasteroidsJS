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
	sh.draw(ctx);
}

let rocks : Rock[] = [];

let initialSpeed = new Vector(0, +80/100);
let initDeg = 0;
let g = .2; // thrust (when pushing fuel)
let sh = new Spaceship(canv.width/2 - 10, canv.height/2, 18, 20, "#0f0", deg2rad(initDeg), 0, 10, ctx);
let score = 0;
let heart = "❤"

sh.pos2D = new Vector(canv.width/2 - 10, canv.height/2)
sh.velo2D = initialSpeed;

for(let i = 1; i <= 5; i++){
	rocks.push(new Rock(
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

function spaceshipDestroy(){
	for(let i = 0; i < rocks.length; i++)
		if(
			sh.pos2D.x < rocks[i].x + rocks[i].w 
			&&
			sh.pos2D.x + sh.w > rocks[i].x 
			&&
			sh.pos2D.y < rocks[i].y + rocks[i].h 
			&&
			sh.h + sh.pos2D.y > rocks[i].y
		){
			//sh.w = 0;
			//alert("you lost");
		}
}
let boomed = false;
function rockDestroy(){
	for(let i = 0; i < rocks.length; ++i)
	for(let j = 0; j < sh.bullets.length; j++){
		if(
			sh.bullets[j]?.x < rocks[i]?.x + rocks[i]?.w 
			&&
			sh.bullets[j]?.x + sh.bullets[j]?.w > rocks[i]?.x 
			&&
			sh.bullets[j]?.y < rocks[i]?.y + rocks[i]?.h 
			&&
			sh.bullets[j]?.h + sh.bullets[j]?.y > rocks[i]?.y
		) {
			// Collision detected!
			sh.bullets = sh.bullets.filter(bul => bul != sh.bullets[j]!);		
			rocks = rocks.filter(bul => bul != rocks[i]!);		
			boomed = true;
		}	
	}
	if(boomed){
		score += 10;
		drawState();
	}
	boomed = false;
}

function rocksDrawer(){
	for(let i = 0; i < rocks.length; i++){
		
		rocks[i]?.move(ctx);
	}	
}


function animate(){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	rocksDrawer();
	spaceshipDestroy();
	if(sh.bullets.length && rocks.length)
		rockDestroy();
	if(!rocks.length) alert(`you win, score is ${score}`)
	sh
	.move(ctx);
	requestAnimationFrame(animate);
}

drawBackground();
requestAnimationFrame(animate);
window.addEventListener("keydown", (e : KeyboardEvent)=>{
	if(Object.values(KEYS).includes(e.key as typeof KEYS["U"])) e.preventDefault();
	switch(e.key){
		case KEYS.U:
			sh.speedUp(g);
			break;
		case KEYS.D:
			break;
		case KEYS.R:
			initDeg = initDeg < 360 ? initDeg + 10 : 10;
			sh.rotation = deg2rad(initDeg);
			break;
		case KEYS.L:
			initDeg = initDeg > 0 ? initDeg - 10 : 350;
			sh.rotation = deg2rad(initDeg);
			break;
		case KEYS.S:
			sh.fire(ctx);
			break;
		default:
			return;
	}
});

function drawState(){
	ctx_st.beginPath();
	ctx_st.clearRect(0, 0, ctx_st.canvas.width, ctx_st.canvas.height);
	ctx_st.fillStyle = "#f41010";
	ctx_st.fillRect(0, 0, ctx_st.canvas.width, ctx_st.canvas.height);
	drawScore();
	drawLifes();
}
drawState();

function drawScore(){
	ctx_st.beginPath();
	ctx_st.strokeStyle = "#fff"
	ctx_st.fillStyle = "#fff"
	ctx_st.font = "20px serif";
	ctx_st.strokeText(score.toString(), 30, ctx_st.canvas.height/2 + 10);
	ctx_st.fillText(score.toString(), 30, ctx_st.canvas.height/2 + 10);
	ctx_st.closePath();
}

function drawLifes(){
	ctx_st.beginPath();
	ctx_st.strokeStyle = "#fff"
	ctx_st.fillStyle = "#fff"
	ctx_st.font = "20px serif";
	ctx_st.strokeText(heart, ctx_st.canvas.width - 40, ctx_st.canvas.height/2 + 10);
	ctx_st.fillText(heart, ctx_st.canvas.width - 40, ctx_st.canvas.height/2 + 10);
	ctx_st.closePath();
}

