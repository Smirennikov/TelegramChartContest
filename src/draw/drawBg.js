

function drawBg(){
		let i = 7;
		let stepY = chartBg.height + 58;
		

		ctx3.strokeStyle = '#f2f4f5'
		ctx3.font = '12px sans-serif'
		ctx3.fillStyle = '#97a3ab'
		while(i-=1){
			ctx3.beginPath();

			ctx3.moveTo(0, stepY -= 60);
			ctx3.fillText(stepY, 0 , stepY - 6)
			ctx3.lineTo(chart.width, stepY )

			ctx3.stroke()
		
		}		
	
	}


export {drawBg}