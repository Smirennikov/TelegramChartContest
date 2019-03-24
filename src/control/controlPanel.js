
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
function ControlChart(chart, numChart){
	this.numChart = numChart;
	this.chart = chart;
	this.panel = chart.getElementsByClassName('control-panel')[0];
	this.smallScreen = chart.getElementsByClassName('visible-control')[0];
	this.leftControl = chart.getElementsByClassName('left-control')[0];
	this.rightControl = chart.getElementsByClassName('right-control')[0];
	this.sectionButtons = chart.getElementsByClassName('section-buttons')[0];

	// small chart (control chart)
	this.smallChartWidth = this.panel.clientWidth;
	this.smallChartStep = 20;
	this.widthSmallStep = this.smallScreen.clientWidth / this.smallChartStep;

	// big chart (main chart)
	this.widthBigStep = this.smallChartWidth / this.smallChartStep;
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
				line: this.lineY0,
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
			for(let i = 1, max = this.dataMas[this.numChart]['columns'].length; i < max; i += 1){
				if(this.dataMas[this.numChart]['columns'][i][0] === this.activeLineChart[key]){
					this.drawMainChart(i);	
				}			
			}		
		}
	},
	max: function(mas){
		return Math.max(...mas);	
	},
	ratio: function(mas, maxChartY){
		let max = this.max(mas);
		if(max > maxChartY){
			return Math.floor(max / maxChartY)
		}else{
			return Math.floor(maxChartY / max)
		}
	},
	maxExt: function(){
		let begin = Math.floor(this.smallScreen.clientWidth / this.widthSmallStep)
		let end = Math.floor(this.rightControl.offsetWidth / this.widthSmallStep);
		let mas = this.dataMas[this.numChart]['columns'][1];
		let masLength = this.dataMas[this.numChart]['columns'][1].length - end;
		let visibleMas = mas.slice(masLength - begin, this.dataMas[this.numChart]['columns'][1].length - end)
		return this.max(visibleMas)
	},
	ratioLine: function(column){
		console.log(this.maxY )
		console.log(this.dataMas[this.numChart]['columns'][1].slice(1) )
		let mas = this.dataMas[this.numChart]['columns'][1].slice(1)
		let ratio = this.maxY / (this.chartBg.height - 60);
		let line = mas.map(function(y){
			return Math.floor(y / ratio )
		})
		this.lineY0 = line 	
		console.log(line)
		console.log(this.maxY / column)
	}
}

ControlChart.prototype.chartLine = new SetChart({
	canvas: document.getElementsByClassName('chartLine')[0],
	width: 1800,
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