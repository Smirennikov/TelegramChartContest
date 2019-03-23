function drawBg(bg){
		let i = 7;
		let stepY = bg.height + 58;
		let ctx = bg.getContext('2d')

		ctx.strokeStyle = '#f2f4f5'
		ctx.font = '12px sans-serif'
		ctx.fillStyle = '#97a3ab'


		while(i-=1){
			ctx.beginPath();

			ctx.moveTo(0, stepY -= 60);
			ctx.fillText(stepY, 0 , stepY - 6)
			ctx.lineTo(bg.width, stepY )
			
			ctx.stroke()
		
		}		
	
	}


export default drawBg