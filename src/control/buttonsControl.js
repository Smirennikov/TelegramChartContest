import ControlChart from './controlPanel'
import drawChart from '../draw/drawChart'



function buttonsControl(dataMas){
	ControlChart.prototype.buttonsControl = function(){
		
		let colors = dataMas[0]['colors'];
		let names = dataMas[0]['names'];

		drawChart(dataMas)
		

		console.log(colors)
		console.log(names)
		console.log(dataMas[0])



		let that = this;

		function createdButton(name,key){
			let button = document.createElement('button');
			let span = document.createElement('span');
			button.className = 'button';
			button.setAttribute('data-chart', key)
			button.appendChild(span);
			button.innerHTML += name;
			that.sectionButtons.appendChild(button);
		}

		for(let key in names){
			createdButton(names[key],key)
		}

		let buttons = this.sectionButtons.getElementsByClassName('button');

		for(let i = 0, max = buttons.length; i < max; i += 1){
			buttons[i].addEventListener('click', function(e){
				this.classList.toggle('active')

				let target = e.target

				if(e.target.classList.contains('active')){
					this.getElementsByTagName('span')[0].style.background = colors[this.getAttribute('data-chart')]


					that.drawChart(target.getAttribute('data-chart'))
					

					

					

				}else{
					this.getElementsByTagName('span')[0].style.background = ''
					that.clear()
				}

			})
		}
		
	}
}

export default buttonsControl