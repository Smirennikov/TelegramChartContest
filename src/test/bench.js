function bench(f, iterate){
	let d = new Date();
	for(let i = 0; i < iterate; i += 1) f();
	console.log(new Date() - d);
}

export default bench