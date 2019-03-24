import ControlChart from '../control/controlPanel'

function drawLine(){
	ControlChart.prototype.drawLine = function(obj){
		let mas = this.dataMas[this.numChart]['columns'][obj.n];
		let color = this.dataMas[this.numChart]['colors'][mas[0]];
		
		let line = this.lineY0;
		let lineLength = line.length;

		let chart = obj.canvas.canvas;
		let ctx = obj.canvas.ctx();

		let stepX = chart.width;

		ctx.beginPath();
		ctx.moveTo(chart.width, chart.height - mas[1]);

		ctx.strokeStyle = color;
		ctx.lineWidth = obj.lineWidth;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		
	
		if(stepX >= 0){

			while(lineLength -= 1){

				ctx.lineTo(stepX -= obj.step, chart.height - line[lineLength] / obj.dif)
			}
		}

		
		
		ctx.stroke();

	}
}

export default drawLine