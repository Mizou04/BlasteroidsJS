export function deg2rad(deg: number){
	return deg*Math.PI/180;
}

export function strip(number : number) {
	return parseFloat(parseFloat(number.toString()).toPrecision(12));
}
