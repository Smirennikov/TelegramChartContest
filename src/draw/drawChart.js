import drawBg from './drawBg' 
import drawLine from './drawLine'
import ControlChart from '../control/controlPanel'

function drawChart(dataMas){
	ControlChart.prototype.drawChart = function(column){
		
		drawBg(this.chartBg.canvas)

		let that = this;

		let chartControlStep = 115 / 22;

		let chartLineStep = 455 / (this.getCoords(this.smallScreen).width / chartControlStep);


		this.panel.addEventListener('mousedown',function(){
			that.panel.addEventListener('mousemove',function(){
				

				// differnt big screen and small screen
				let sizeDif = that.getCoords(that.panel).width / that.getCoords(that.smallScreen).width;

				// changes width big screen
				that.chartLine.canvas.width =  that.getCoords(that.panel).width * sizeDif; 

				// move big screen
				that.chartLine.canvas.style.transform = `translate3d(${ that.getCoords(that.rightControl).width * sizeDif}px,0,0)`

				// changes stepX for big screen
				chartLineStep = 455 / (that.getCoords(that.smallScreen).width / chartControlStep)

				// clear big screen canvas
				that.chartLine.ctx().clearRect(0,0, that.chartLine.width, that.chartLine.height)

				drawLine({
					n: 1,
					mas: dataMas,
					canvas: that.chartLine,
					lineWidth: 2,
					step: chartLineStep,
					dif: 1
				});

				drawLine({
					n: 2,
					mas: dataMas,
					canvas: that.chartLine,
					lineWidth: 2,
					step: chartLineStep,
					dif: 1
				});

			})
		})

		function drawing(names){

			drawLine({
					n: names,
					mas: dataMas,
					canvas: that.chartLine,
					lineWidth: 2,
					step: chartLineStep,
					dif: 1
				});

			drawLine({
					n: names,
					mas: dataMas,
					canvas: that.chartControl,
					lineWidth: 1,
					step: chartControlStep,
					dif: that.chartLine.height / that.chartControl.height
				});
		}

		drawing(parseInt(column.slice(1)) + 1)
	

		


		

	}
}

export default drawChart

