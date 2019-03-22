import getData from './getData'


import ControlChart from './control/controlPanel'
import moveVisible from './control/moveVisible'
import resizeVisible from './control/resizeVisible'





import drawLine from './draw/drawLine'
import {drawBg} from './draw/drawBg'



getData('src/chart_data.json')
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
	
		
let controls = {}; 
controls.chart = new ControlChart(document.getElementsByClassName('chart')[0])


moveVisible()
controls.chart.moveVisible()

resizeVisible()
controls.chart.resizeVisible()


console.log(controls)

	
	console.log(res)

				drawLine({
					n: 1,
					mas: res,
					canvas: controls.chart.chartLine,
					lineWidth: 2,
					step:20,
					dif: 1
				});

				drawLine({
					n: 1,
					mas: res,
					canvas: controls.chart.chartControl,
					lineWidth: 1,
					step: 6,
					dif: controls.chart.chartLine.height / controls.chart.chartControl.height
				});
	
			drawLine({
					n: 2,
					mas: res,
					canvas: controls.chart.chartLine,
					lineWidth: 2,
					step: 20,
					dif: 1
				});
				drawLine({
					n: 2,
					mas: res,
					canvas: controls.chart.chartControl,
					lineWidth: 1,
					step: 6,
					dif: controls.chart.chartLine.height / controls.chart.chartControl.height
				});

	


	

	

	
	
	


	
}





