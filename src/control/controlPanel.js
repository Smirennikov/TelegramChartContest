
///////////////////////////////////////
function SetChart(obj){
	this.canvas = obj.canvas,
	this.width = obj.width,
	this.height = obj.height
}

SetChart.prototype = {
	ctx: function(){
		return this.canvas.getContext('2d');
	},
	setSize: function(){
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}
}
/////////////////////////////////////////////
function ControlChart(chart){
	this.chart = chart;
	this.panel = chart.getElementsByClassName('control-panel')[0];
	this.smallScreen = chart.getElementsByClassName('visible-control')[0];
	this.leftControl = chart.getElementsByClassName('left-control')[0];
	this.rightControl = chart.getElementsByClassName('right-control')[0];
	this.sectionButtons = chart.getElementsByClassName('section-buttons')[0];

	// small chart (control chart)
	this.smallChartWidth = this.panel.clientWidth;
	this.smallChartStep = 20;
	this.widthSmallStep = Math.floor(this.smallScreen.clientWidth / this.smallChartStep);

	// big chart (main chart)
	this.widthBigStep = Math.floor(this.smallChartWidth / this.smallChartStep);
}

ControlChart.prototype = {
	getCoords: function(elem){
		return elem.getBoundingClientRect();
	},
	clear: function(){
		this.chartLine.ctx().clearRect(0,0,this.getCoords(this.chartLine.canvas).width,this.chartLine.height)
		this.chartControl.ctx().clearRect(0,0,this.chartControl.width,this.chartControl.height)
	},
	createdButton: function(name,key){
		let button = document.createElement('button');
		let span = document.createElement('span');
		button.className = 'button';
		button.setAttribute('data-chart', key)
		button.appendChild(span);
		button.innerHTML += name;
		this.sectionButtons.appendChild(button);
	},
	drawMainChart: function(nameLine){
		this.drawLine({
				n: nameLine,
				canvas: this.chartLine,
				lineWidth: 2,
				step: this.widthBigStep,
				dif: 1
		});
	},
	drawControlChart: function(nameLine){
		this.drawLine({
				n: nameLine,
				canvas: this.chartControl,
				lineWidth: 1,
				step: this.widthSmallStep,
				dif: this.chartLine.height / this.chartControl.height
			})
	},
	activeChartLine: function(){
		for(let key in this.activeLineChart){
			for(let i = 1, max = this.dataMas[0]['columns'].length; i < max; i += 1){
				if(this.dataMas[0]['columns'][i][0] === this.activeLineChart[key])
				this.drawMainChart(i)	
			}		
		}
	}
}

ControlChart.prototype.chartLine = new SetChart({
	canvas: document.getElementsByClassName('chartLine')[0],
	width: 1910,
	height: 360
})
ControlChart.prototype.chartBg = new SetChart({
	canvas: document.getElementsByClassName('chartBg')[0],
	width: 455,
	height: 360
})
ControlChart.prototype.chartControl = new SetChart({
	canvas: document.getElementsByClassName('chartControl')[0],
	width: 455,
	height: 50
})

ControlChart.prototype.chartLine.setSize();
ControlChart.prototype.chartBg.setSize();
ControlChart.prototype.chartControl.setSize();


export default ControlChart