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

function ControlChart(chart){
	this.chart = chart;
	this.panel = chart.getElementsByClassName('control-panel')[0];
	this.smallScreen = chart.getElementsByClassName('visible-control')[0];
	this.leftControl = chart.getElementsByClassName('left-control')[0];
	this.rightControl = chart.getElementsByClassName('right-control')[0];
	this.sectionButtons = chart.getElementsByClassName('section-buttons')[0];
}

ControlChart.prototype = {
	getCoords: function(elem){
		return elem.getBoundingClientRect();
	},
	clear: function(){
		this.chartLine.ctx().clearRect(0,0,this.chartLine.width,this.chartLine.height)
		this.chartControl.ctx().clearRect(0,0,this.chartControl.width,this.chartControl.height)
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