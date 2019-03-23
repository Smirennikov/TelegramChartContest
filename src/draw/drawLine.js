import ControlChart from '../control/controlPanel'

function drawLine(){
	ControlChart.prototype.drawLine = function(obj){
		let mas = this.dataMas[0]['columns'][obj.n];
		let color = this.dataMas[0]['colors'][mas[0]];
		let masLength = mas.length;
		


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

			while(masLength -= 1){
				ctx.lineTo(stepX -= obj.step, chart.height - mas[masLength] / obj.dif)
			}
		}

		
		
		ctx.stroke();

	}
}

export default drawLine