import ControlChart from './controlPanel'

function resizeVisible(){
	ControlChart.prototype.resizeVisible = function(){

		let that = this;
		this.smallScreen.style.minWidth = '50px'

		this.leftControl.onmouseover = () =>{

			this.chart.addEventListener('mousemove', leftRisize)

			function leftRisize(e){
				if(e.pageX >= that.getCoords(that.leftControl).right - 5 && e.pageX <= that.getCoords(that.leftControl).right){

					that.leftControl.style.cursor = 'w-resize';
					that.leftControl.addEventListener('mousedown', resizedLeft)
					
				}else{
					that.leftControl.style.cursor = '';
				}
			}
		}

		this.rightControl.onmouseover = () =>{

			this.chart.addEventListener('mousemove', rightRisize)

			function rightRisize(e){

				if(e.pageX >= that.getCoords(that.rightControl).left && e.pageX <= that.getCoords(that.rightControl).left + 5){

					that.rightControl.style.cursor = 'e-resize';
					that.rightControl.addEventListener('mousedown', resizedRight)
					
				}else{
					that.rightControl.style.cursor = '';
				}
			}
		}

		
		function resizedLeft(e){

			that.panel.onmousemove = (e) =>{

				if(e.movementX < 0){
					that.leftControl.style.width = `${that.getCoords(that.leftControl).width - Math.abs(e.movementX)}px`;
					that.smallScreen.style.width = `${that.getCoords(that.smallScreen).width + Math.abs(e.movementX)}px`;
					that.leftControl.style.maxWidth = `${that.getCoords(that.panel).width - that.getCoords(that.smallScreen).width - 5}px`;
				}
				if(e.movementX > 0){
					that.leftControl.style.width = `${that.getCoords(that.leftControl).width + Math.abs(e.movementX)}px`;
					that.smallScreen.style.width = `${that.getCoords(that.smallScreen).width - Math.abs(e.movementX)}px`;
					that.leftControl.style.maxWidth = `${that.getCoords(that.panel).width - that.getCoords(that.smallScreen).width - 5}px`;
				}
			}
		}

		function resizedRight(){
			that.panel.onmousemove = (e) =>{

				if(e.movementX < 0){
					that.rightControl.style.width = `${that.getCoords(that.rightControl).width + Math.abs(e.movementX)}px`;
					that.smallScreen.style.width = `${that.getCoords(that.smallScreen).width - Math.abs(e.movementX)}px`;
					that.rightControl.style.maxWidth = `${that.getCoords(that.panel).width - that.getCoords(that.smallScreen).width - 5}px`
				}
				if(e.movementX > 0){
					that.rightControl.style.width = `${that.getCoords(that.rightControl).width - Math.abs(e.movementX)}px`
					that.smallScreen.style.width = `${that.getCoords(that.smallScreen).width + Math.abs(e.movementX)}px`
					that.rightControl.style.maxWidth = `${that.getCoords(that.panel).width - that.getCoords(that.smallScreen).width - 5}px`
				}
			}
		}
		
		this.rightControl.ondragstart = function(){
			return false;
		}

	}
}

export default resizeVisible