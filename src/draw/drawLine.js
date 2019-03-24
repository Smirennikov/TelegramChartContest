import ControlChart from '../control/controlPanel'

function drawLine(){
	ControlChart.prototype.drawLine = function(obj){
		let mas = this.dataMas[this.numChart]['columns'][obj.n];
		let color = this.dataMas[this.numChart]['colors'][mas[0]];
		
		let line = obj.line;
		let lineLength = line.length;

		let chart = obj.canvas;
		let ctx = this.ctx(obj.canvas);

		let stepX = chart.width + obj.step;

		let chartHeight = chart.height - 20;

		ctx.beginPath();
		ctx.moveTo(chart.width, chartHeight - line[lineLength]);

		ctx.strokeStyle = color;
		ctx.lineWidth = obj.lineWidth;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		
	
		if(stepX >= 0){

			while(lineLength -= 1){

				ctx.lineTo(stepX -= obj.step, chartHeight - line[lineLength])
			}
		}

		
		
		ctx.stroke();

		


	}
}

export default drawLine