import ControlChart from './controlPanel'
import drawChart from '../draw/drawChart'

function buttonsControl(dataMas){
	ControlChart.prototype.buttonsControl = function(){
		
		let colors = dataMas[0]['colors'];
		let names = dataMas[0]['names'];

		drawChart(dataMas);

		let that = this;

		for(let key in names){
			this.createdButton(names[key],key);
		}

		let buttons = this.sectionButtons.getElementsByClassName('button');
		this.activeLineChart = [];

		for(let i = 0, max = buttons.length; i < max; i += 1){

			buttons[i].addEventListener('click', function(e){

				this.classList.toggle('active');
				let target = e.target;

				if(e.target.classList.contains('active')){

					this.getElementsByTagName('span')[0].style.background = colors[this.getAttribute('data-chart')];
					
					that.activeLineChart.push(target.getAttribute('data-chart'));

					that.drawChart(target.getAttribute('data-chart'));

				}else{
					
					that.activeLineChart = []		
					this.getElementsByTagName('span')[0].style.background = '';
					that.clear();

					for(let i = 0, max = buttons.length; i < max; i += 1){

						if(buttons[i].classList.contains('active')){
							that.drawChart(buttons[i].getAttribute('data-chart'));
							that.activeLineChart.push(buttons[i].getAttribute('data-chart'));
							
						}
					}
				}
			})
		}
	}
}

export default buttonsControl