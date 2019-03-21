import ControlChart from './controlPanel'

function moveVisible(){
	ControlChart.prototype.moveVisible = function(){

		this.panel.style.width = this.getCoords(this.panel).width + 'px';
		
		this.smallScreen.onmousedown = () =>{

			document.onmousemove = (e) =>{

				if(e.movementX < 0){
					this.leftControl.style.width = `${this.getCoords(this.leftControl).width - Math.abs(e.movementX)}px`
					this.rightControl.style.width = `${this.getCoords(this.rightControl).width + Math.abs(e.movementX)}px`
				}
				if(e.movementX > 0){
					this.leftControl.style.width = `${this.getCoords(this.leftControl).width + Math.abs(e.movementX)}px`
					this.rightControl.style.width = `${this.getCoords(this.rightControl).width - Math.abs(e.movementX)}px`
				}		
			}
		}

		this.chart.onmouseup = () =>{
			document.onmousemove = null;
			this.panel.onmousemove = null;
		}

		this.chart.onmouseout = () =>{
			document.onmousemove = null;
		}

		this.smallScreen.ondragstart = function(){
			return false;
		}
		
	}
}


export default moveVisible