import Spaceship from "./spaceship"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/
import {deg2rad} from "./externals/utils"/*EXT*/

const canv_bg = document.querySelector("#canvas_bg") as HTMLCanvasElement;
const ctx_bg = canv_bg.getContext("2d") as CanvasRenderingContext2D;
const canv = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canv.getContext("2d") as CanvasRenderingContext2D;

function adjust(){
	canv.width = canv_bg.width = canv_bg.clientWidth;
	canv.height = canv_bg.height = canv_bg.clientHeight;
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

let initialSpeed = new Vector(0, +80/100);
let initDeg = 0;
let g = .2; // thrust (when pushing fuel)
let sh = new Spaceship(canv.width/2 - 10, canv.height/2, 18, 20, "#0f0", deg2rad(initDeg), 0, 10, ctx);

sh.velo2D = initialSpeed;
sh.pos2D = new Vector(canv.width/2 - 10, canv.height/2)


function animate(){
	sh.move(ctx);
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
			break;
		default:
			return;
	}
});

window.addEventListener("keyup", (e : KeyboardEvent)=>{
	if(Object.values(KEYS).includes(e.key as typeof KEYS["U"])) e.preventDefault();
	switch(e.key){
		case KEYS.U:
			sh.isThrustApplied = false;
		break;
		case KEYS.D:
			break;
		case KEYS.R:
		break;
		case KEYS.L:
		break;
		case KEYS.S:
			break;
		default:
			return;
	}

})
