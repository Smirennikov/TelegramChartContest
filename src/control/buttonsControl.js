import ControlChart from './controlPanel'
import drawChart from '../draw/drawChart'

function buttonsControl(dataMas){
	ControlChart.prototype.buttonsControl = function(){
		
		let colors = dataMas[this.numChart]['colors'];
		let names = dataMas[this.numChart]['names'];

		drawChart(dataMas);

		let that = this;

		for(let key in names){
			this.createdButton(names[key],key);
		}

		let buttons = this.sectionButtons.getElementsByClassName('button');
		this.activeLineChart = [];

		checkButtons()

		function checkButtons(){
			for(let i = 0, max = buttons.length; i < max; i += 1){
				if(buttons[i].classList.contains('active')){

					buttons[i].getElementsByTagName('span')[0].style.background = colors[buttons[i].getAttribute('data-chart')];
					that.activeLineChart.push(buttons[i].getAttribute('data-chart'));
					that.maxExt()
					that.drawChart(buttons[i].getAttribute('data-chart'));
				}

			buttons[i].addEventListener('click', function(e){

				this.classList.toggle('active');
				let target = e.target;

				if(e.target.classList.contains('active')){
					this.getElementsByTagName('span')[0].style.background = colors[this.getAttribute('data-chart')];
					that.activeLineChart.push(target.getAttribute('data-chart'));
					
					that.maxExt();
					that.clear();
					that.drawDateLine();
					for(let i = 0, max = buttons.length; i < max; i += 1){
						if(buttons[i].classList.contains('active')){
							that.drawChart(buttons[i].getAttribute('data-chart'));
							that.activeLineChart.push(buttons[i].getAttribute('data-chart'));
					
						}
					}
				}else{
					that.clear();
					that.drawDateLine();
					that.activeLineChart = []		
					this.getElementsByTagName('span')[0].style.background = '';

					for(let i = 0, max = buttons.length; i < max; i += 1){
						if(buttons[i].classList.contains('active')){
							that.activeLineChart.push(buttons[i].getAttribute('data-chart'));
							that.maxExt();
							that.drawChart(buttons[i].getAttribute('data-chart'));
						}
					}
				}
			})
		}
		}
	}
}

export default buttonsControl