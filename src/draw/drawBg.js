import ControlChart from '../control/controlPanel'

function drawBg(){
	ControlChart.prototype.drawBg = function(){
		
		let ctx = this.ctx(this.chartBg)
		let maxY = this.maxExt()
		ctx.strokeStyle = '#f2f4f5'
		ctx.font = '12px sans-serif'
		ctx.fillStyle = '#97a3ab'

		let that = this
		let masY = [320,260,200,140,80,20] 


		this.chart.addEventListener('mousedown', function(){

			that.chart.addEventListener('mousemove', ratioDraw)
		})
		this.chart.addEventListener('mouseup', function(){
			that.chart.removeEventListener('mousemove', ratioDraw)
		})

		function ratioDraw(){
			let part = Math.floor(that.maxY / 6);
			let stepY = -part
			if(that.maxY !== maxY){
				for(let key in masY){

					ctx.clearRect(0, masY[key] - 17, 50, 12)
					ctx.fillText(stepY += part, 0 , masY[key] - 7)
				}
				that.stepY = stepY;
			}
			maxY = that.maxY	
			that.maxExt()
		}

		ratioDraw()

		for(let key in masY){
			ctx.beginPath();
			ctx.moveTo(0, masY[key]);
			ctx.lineTo(that.chartBg.width, masY[key])
			ctx.stroke()
		
		}	


			
		this.drawDateLine()


					
	}
}

export default drawBg