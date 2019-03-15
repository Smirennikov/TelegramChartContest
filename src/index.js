import {chart, ctx, ctx2, chartControl} from './module.js'
import getData from './getData'
import bench from './test/bench'


getData('/src/chart_data.json')
	.then(response =>{
		// берем данные и рассериализуем их 
		let jsonparse = JSON.parse(response);
		return jsonparse;
	})
	.then(jsonparse =>{
		// берм то что нам нужно 
		iterateJSON(jsonparse)
	})




function iterateJSON(res){
	
		function drawBg(){
		let i = 7;
		let stepY = 0;
		let stepY2 = 0;

		while(i-=1){
			ctx.beginPath();
			ctx.moveTo(0, stepY2 += 50);
			ctx.strokeStyle = '#f2f4f5'
			ctx.lineTo(chart.width, stepY += 50 )
			ctx.stroke()
			console.log(stepY)
		}
		

	
	}

	drawBg()
	

	console.log(res)
	drawLine(2);
	drawLine(1);
	
	drawLineControl(2)
	drawLineControl(1)






	function drawLine(n){
		let mas = res[0]['columns'][n];
		let color = res[0]['colors'][mas[0]];
		let masLength = mas.length;
		let stepX = 0;

		ctx.beginPath();
		ctx.moveTo(0, chart.height - mas[1]);

		ctx.strokeStyle = color;
		ctx.lineWidth = '2';
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		while(masLength -= 1){
			ctx.lineTo(stepX += 10, chart.height - mas[masLength])
		}

		ctx.stroke();

	}

	function drawLineControl(n){
		let mas = res[0]['columns'][n];
		let color = res[0]['colors'][mas[0]];
		let masLength = mas.length;
		let stepX = 0;

		ctx2.beginPath();
		ctx2.moveTo(0, chartControl.height - mas[1]);

		ctx2.strokeStyle = color;
		ctx2.lineWidth = '1';
		ctx2.lineJoin = 'round';
		ctx2.lineCap = 'round';

		let xyu = chart.height / chartControl.height;

		while(masLength -= 1){
			ctx2.lineTo(stepX += 5, chartControl.height - mas[masLength] / xyu )
		}

		ctx2.stroke();

	}

	
	
}