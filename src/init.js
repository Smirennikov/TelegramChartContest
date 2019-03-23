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

buttonsControl(res)
controls.chart.buttonsControl()


}