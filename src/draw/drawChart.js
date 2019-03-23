import drawLine from './drawLine'
import ControlChart from '../control/controlPanel'

function drawChart(dataMas){
	ControlChart.prototype.drawChart = function(chart){
		
		let that = this;

		this.panel.addEventListener('mousedown',function(){
			that.chartLine.canvas.style.willChange = 'transform';			
		})
		this.panel.addEventListener('mousedown',checkPanel)

		this.panel.addEventListener('mouseup',function(){
			that.chartLine.canvas.style.willChange = 'auto';
		})
		this.panel.addEventListener('mouseup',checkPanel)

		// function for checking control panel and draw chart
		function checkPanel(){
			that.panel.addEventListener('mousemove', checkAndDraw)
		}
		that.panel.addEventListener('mouseout', checkAndDraw)

		function checkAndDraw(){
				
				// differnt big screen and small screen
				let sizeDif = that.getCoords(that.panel).width / that.getCoords(that.smallScreen).width;

				// changes width big screen
				that.chartLine.canvas.width =  that.getCoords(that.panel).width * sizeDif; 

				// move big screen
				that.chartLine.canvas.style.transform = `translate3d(${ that.getCoords(that.rightControl).width * sizeDif}px,0,0)`

				// changes stepX for big screen
				that.widthBigStep = that.smallChartWidth / (that.getCoords(that.smallScreen).width / that.widthSmallStep)

				// clear big screen canvas
				that.chartLine.ctx().clearRect(0,0, that.chartLine.width, that.chartLine.height)

				that.activeChartLine()			
			}


		this.drawMainChart(parseInt(chart.slice(1)) + 1)
		this.drawControlChart(parseInt(chart.slice(1)) + 1)
	
	}
}

export default drawChart

