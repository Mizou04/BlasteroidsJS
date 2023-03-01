import Spaceship from "./spaceship"/*EXT*/
import Vector from "./externals/Vector2D"/*EXT*/

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

let sh = new Spaceship(canv.width/2 - 10, canv.height/2, 18, 20, "#0f0", (0 * Math.PI)/180, 0, 10);
sh.velo2D = new Vector(0, -100/100);
sh.pos2D = new Vector(canv.width/2 - 10, canv.height/2)

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
setTimeout(()=>{
	sh.speedUp(new Vector(0, -200/100));
	setTimeout(()=>{
		sh.speedDown(new Vector(0, -100/100));
	}, 2000)
}, 2000)

drawBackground();
requestAnimationFrame(sh.move.bind(sh, ctx));
