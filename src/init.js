import getData from './getData'

import ControlChart from './control/controlPanel'
import moveVisible from './control/moveVisible'
import resizeVisible from './control/resizeVisible'
import buttonsControl from './control/buttonsControl'

import drawLine from './draw/drawLine'
import drawBg from './draw/drawBg'



getData('src/chart_data.json')
	.then(response =>{
		// берем данные и рассериализуем их 
		let jsonparse = JSON.parse(response);
		return jsonparse;
	})
	.then(jsonparse =>{
		
		drawBg()
		moveVisible()
		resizeVisible()
		drawLine()
		buttonsControl(jsonparse)
		ControlChart.prototype.dataMas = jsonparse; 
		 
		let controls = {};

		function instalChart(num){
			ControlChart.prototype.createdChart(num)
			controls['chart' + num] = new ControlChart(num)
			controls['chart' + num].drawBg()
			controls['chart' + num].moveVisible()
			controls['chart' + num].resizeVisible()
			controls['chart' + num].buttonsControl()

		}
		for(let num in jsonparse){
			instalChart(num)
		}
		
		

	})