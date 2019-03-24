import ControlChart from '../control/controlPanel'

function drawBg(){
	ControlChart.prototype.drawBg = function(){
		let maxY = 0;
		let i = 7;
		let stepY = this.chartBg.canvas.height + 58;
		let ctx = this.chartBg.canvas.getContext('2d')

		ctx.strokeStyle = '#f2f4f5'
		ctx.font = '12px sans-serif'
		ctx.fillStyle = '#97a3ab'

		let that = this
		let masY = [350,290,230,170,110,50] 
		this.panel.addEventListener('mousedown', function(){
			that.panel.addEventListener('mousemove', function(){
			
			let part = Math.floor(that.maxExt() / 6);
			let stypa = -part
			if(that.maxExt() !== maxY){
				for(let key in masY){

					ctx.clearRect(0, masY[key] - 10, 20, 12)
					ctx.fillText(stypa += part, 0 , masY[key])
				}
				that.ratioLine(stypa)	
			}
			
			
			

			maxY = that.maxExt()	
			that.maxY = that.maxExt()

			
			
		})
		})

		while(i-=1){
			ctx.beginPath();

			ctx.moveTo(0, stepY -= 60);
			ctx.fillText(maxY, 0 , stepY - 6)
			ctx.lineTo(that.chartBg.canvas.width, stepY )
			
			ctx.stroke()
		
	}
		

				
	
	}
}

export default drawBg