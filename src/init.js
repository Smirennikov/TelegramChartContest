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

		ControlChart.prototype.dataMas = jsonparse; 

		let controls = {}; 
		controls.chart = new ControlChart(document.getElementsByClassName('chart')[0])
		console.log(controls)
		drawBg(controls.chart.chartBg.canvas)

		// include modules
		moveVisible()
		controls.chart.moveVisible()

		resizeVisible()
		controls.chart.resizeVisible()
		
		drawLine()

		buttonsControl(jsonparse)
		controls.chart.buttonsControl()



	})


