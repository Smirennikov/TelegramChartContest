import drawLine from './drawLine'
import ControlChart from '../control/controlPanel'

function drawChart(dataMas){
	ControlChart.prototype.drawChart = function(chart){
		
		let that = this;

		this.panel.addEventListener('mouseover',function(){
			that.chartLine.canvas.style.willChange = 'transform';			
		})
		this.panel.addEventListener('mousedown',checkPanel)

		this.panel.addEventListener('mouseout',function(){
			that.chartLine.canvas.style.willChange = 'auto';
		})
		this.panel.addEventListener('mouseup',checkPanel)

		// function for checking control panel and draw chart
		function checkPanel(){
			that.panel.addEventListener('mousemove', checkAndDraw)
		}
		that.panel.addEventListener('mouseout', checkAndDraw)

		function checkAndDraw(){
				
				let panelWidth = that.panel.clientWidth;
				let smallScreenWidth = that.smallScreen.clientWidth;

				// differnt big screen and small screen
				let sizeDif = panelWidth / smallScreenWidth;

				// changes width big screen
				that.chartLine.canvas.width =  panelWidth * sizeDif; 

				// move big screen
				that.chartLine.canvas.style.transform = `translate3d(${ that.rightControl.clientWidth * sizeDif}px,0,0)`

				// changes stepX for big screen
				that.widthBigStep = that.smallChartWidth / (smallScreenWidth / that.widthSmallStep)

				// clear big screen canvas
				// that.chartLine.ctx().clearRect(0,0, that.chartLine.width, that.chartLine.height)

				that.activeChartLine()	

						
			}


		this.drawMainChart(parseInt(chart.slice(1)) + 1)
		this.drawControlChart(parseInt(chart.slice(1)) + 1)
	
	}
}

export default drawChart

