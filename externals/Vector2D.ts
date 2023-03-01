export default class Vector2D{
	constructor(public x : number, public y : number) {
	this.x = x;
	this.y = y;
	}
	add(vec : Vector2D) {
		return new Vector2D(this.x + vec.x,this.y + vec.y);
	}
	addScaled(vec : Vector2D, k : number) {
		return new Vector2D(this.x + k*vec.x, this.y + k*vec.y);
	}
	clone() {
		return new Vector2D(this.x,this.y);
	}
	decrementBy(vec : Vector2D) {
		this.x -= vec.x;
		this.y -= vec.y;
	}		

	dotProduct(vec : Vector2D) {
		return this.x*vec.x + this.y*vec.y;
	}
	incrementBy(vec : Vector2D) {
		this.x += vec.x;
		this.y += vec.y;
	}		

	length(){
		return Math.sqrt(this.lengthSquared());
	}	
	lengthSquared(){
		return this.x*this.x + this.y*this.y;
	}

	multiply(k : number) {
		return new Vector2D(k*this.x, k*this.y);
	}		

	negate() {
		this.x = - this.x;
		this.y = - this.y;
	}
	normalize() {
		var length = this.length();
		if (length > 0) {
			this.x /= length;
			this.y /= length;
		}
		return this.length();
	}

	scaleBy(k : number) {
		this.x *= k;
		this.y *= k;
	}

	subtract(vec : Vector2D) {
		return new Vector2D(this.x - vec.x,this.y - vec.y);
	}

	static angleBetween(vec1 : Vector2D,vec2 : Vector2D){
		return Math.acos(vec1.dotProduct(vec2)/(vec1.length()*vec2.length()));
	}

	distance(vec1 : Vector2D,vec2 : Vector2D){
		return (vec1.subtract(vec2)).length(); 
	}
}		
