

/////////////////////////////////////////////
function ControlChart(numChart){
	this.numChart = numChart;
	this.chart = document.getElementsByClassName('chart')[numChart];
	this.panel = this.chart.getElementsByClassName('control-panel')[0];
	this.smallScreen = this.chart.getElementsByClassName('visible-control')[0];
	this.leftControl = this.chart.getElementsByClassName('left-control')[0];
	this.rightControl = this.chart.getElementsByClassName('right-control')[0];
	this.sectionButtons = this.chart.getElementsByClassName('section-buttons')[0];

	// canvas
	this.chartLine = this.chart.getElementsByClassName('chartLine')[0]
	this.chartBg = this.chart.getElementsByClassName('chartBg')[0]
	this.chartControl = this.chart.getElementsByClassName('chartControl')[0]

	// small chart (control chart)
	this.smallChartWidth = this.panel.clientWidth;
	this.smallChartStep = 20;
	this.widthSmallStep = this.smallScreen.clientWidth / this.smallChartStep;

	// big chart (main chart)
	this.widthBigStep = this.smallChartWidth / this.smallChartStep;
}

ControlChart.prototype = {
	ctx: function(canvas){
		return canvas.getContext('2d');
	},
	getCoords: function(elem){
		return elem.getBoundingClientRect();
	},
	clear: function(){
		this.ctx(this.chartLine).clearRect(0,0,this.getCoords(this.chartLine).width,this.chartLine.height)
		this.ctx(this.chartControl).clearRect(0,0,this.chartControl.width,this.chartControl.height)
	},
	createdChart: function(num){
			let chart = document.createElement('div');
			let h2 = document.createElement('h2');
			let visibleChart = document.createElement('section');
			let chartBg = document.createElement('canvas');
			let chartLine = document.createElement('canvas');
			let controlPanel = document.createElement('section');
			let chartControl = document.createElement('canvas');
			let control = document.createElement('div');
			let leftControl = document.createElement('div');
			let visibleControl = document.createElement('div');
			let rightControl = document.createElement('div');
			let sectionButtons = document.createElement('section');


			chart.className = 'chart';

			h2.innerHTML = `chart #${num}`;
			chart.appendChild(h2)

			visibleChart.className = 'visible-chart'
			chart.appendChild(visibleChart)
			
			chartBg.className = 'chartBg'
			chartBg.setAttribute('width', '455')
			chartBg.setAttribute('height', '360')
			visibleChart.appendChild(chartBg)

			chartLine.className = 'chartLine'
			chartLine.setAttribute('width', '1800')
			chartLine.setAttribute('height', '360')
			visibleChart.appendChild(chartLine)


			controlPanel.className = 'control-panel'
			chart.appendChild(controlPanel )

			chartControl.className = 'chartControl'
			chartControl.setAttribute('width', '455')
			chartControl.setAttribute('height', '55')
			controlPanel.appendChild(chartControl)

			control.className = 'control'
			controlPanel.appendChild(control)

			leftControl.className = 'left-control'
			control.appendChild(leftControl)

			visibleControl.className = 'visible-control'
			control.appendChild(visibleControl)

			rightControl.className = 'right-control'
			control.appendChild(rightControl)

			sectionButtons.className = 'section-buttons'
			chart.appendChild(sectionButtons)
		
			document.getElementsByTagName('main')[0].appendChild(chart);
			
	},
	createdButton: function(name,key){
		let button = document.createElement('button');
		let span = document.createElement('span');
		button.className = 'button active';
		button.setAttribute('data-chart', key)
		button.appendChild(span);
		button.innerHTML += name;
		this.sectionButtons.appendChild(button);
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
		let begin = Math.floor(this.smallScreen.clientWidth / this.widthSmallStep);
		let end = Math.floor(this.rightControl.offsetWidth / this.widthSmallStep);
		let masNum = 1;
		let mas = this.dataMas[this.numChart]['columns'][masNum];

		let objMax = {};
		let masMax = []
		
		for(let key in this.activeLineChart){
			for(let i = 1, max = this.dataMas[this.numChart]['columns'].length; i < max; i += 1){
				if(this.dataMas[this.numChart]['columns'][i][0] === this.activeLineChart[key]){

					masMax.push(this.max((this.dataMas[this.numChart]['columns'][i]).slice(1)))
					objMax[i] = this.max((this.dataMas[this.numChart]['columns'][i]).slice(1));	
				}			
			}	
		}
		this.absMaxY = this.max(masMax)
		
		let masObjMax;

		masObjMax = Object.entries(objMax)
		for(let key in masObjMax){
			if(masObjMax[key][1] === this.absMaxY){
				masNum = masObjMax[key][0]
			}
		}

		let masLength = this.dataMas[this.numChart]['columns'][masNum].length - end;
		let visibleMas = this.dataMas[this.numChart]['columns'][masNum].slice(masLength - begin, this.dataMas[this.numChart]['columns'][masNum].length - end)
		this.maxY = this.max(visibleMas)
		
		
	},
	ratioLine: function(column,nameLine,chartHeight){

		let mas = this.dataMas[this.numChart]['columns'][nameLine].slice(1)
		let ratio;
		if(chartHeight === this.chartControl.height){
			ratio = this.absMaxY / (chartHeight - 20);
		}else{
			ratio = this.maxY / (chartHeight - 20);
		}
		
		let line = mas.map(function(y){
			return Math.floor(y / ratio )
		})
		return line 	

	},
	drawMainChart: function(nameLine){
		this.drawLine({
				n: nameLine,
				line: this.ratioLine(this.stepY,nameLine,this.chartLine.height),
				canvas: this.chartLine,
				lineWidth: 2,
				step: this.widthBigStep,
		});
	},
	drawControlChart: function(nameLine){
		this.drawLine({
				n: nameLine,
				line: this.ratioLine(this.stepY,nameLine,this.chartControl.height),
				canvas: this.chartControl,
				lineWidth: 1,
				step: this.widthSmallStep,
			})
	},
	drawDateLine: function(){
		let ctx	= this.ctx(this.chartLine);

		let step = this.chartLine.width + this.widthBigStep

		ctx.strokeStyle = '#f2f4f5'
		ctx.font = '12px sans-serif'
		ctx.fillStyle = '#97a3ab'

		let masLegth = this.dataMas[0]['columns'][0].length
		let day 
		let month
		let cond = Math.floor(this.smallScreen.clientWidth / 50)
		while(masLegth -= 1){

			if(masLegth % cond === 0){
				day = new Date(this.dataMas[this.numChart]['columns'][0][masLegth]).getDate();
				month = new Date(this.dataMas[this.numChart]['columns'][0][masLegth])
				month = month + ''
				ctx.fillText(`${month.slice(4,7)} ${day}`, step -= this.widthBigStep + 50, this.chartLine.height - 20)
			}
			
		}


	},
	switchTheme: function(){
			const button = document.querySelector('.button-theme-mode');
			const doc = document.documentElement;

			if(localStorage.getItem('theme') === 'Night'){
				this.innerHTML = 'Switch to Day Mode';
				doc.setAttribute('theme', 'Night');
			}
			let that = this;
			button.addEventListener('click',function(){
				if(doc.getAttribute('theme') === 'Night'){
					doc.setAttribute('theme', '')
					this.innerHTML = 'Switch to Night Mode';
					localStorage.setItem('theme','Day')

				}else{
					doc.setAttribute('theme', 'Night');
					this.innerHTML = 'Switch to Day Mode';
					localStorage.setItem('theme','Night')
				}
			})
		}

}


ControlChart.prototype.switchTheme()








export default ControlChart