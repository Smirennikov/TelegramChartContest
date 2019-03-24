import ControlChart from './controlPanel'

function moveVisible(){
	ControlChart.prototype.moveVisible = function(){
		let that = this
		this.panel.style.width = this.panel.clientWidth + 'px';
		
		this.smallScreen.onmousedown = () =>{

			document.onmousemove = (e) =>{
				let panelWidth = that.panel.clientWidth;
				let smallScreenWidth = that.smallScreen.clientWidth;
				let leftControlWidth = that.leftControl.offsetWidth;
				let rightControlWidth = that.rightControl.offsetWidth;

				that.rightControl.style.maxWidth = panelWidth - smallScreenWidth - 5 + 'px';
				that.leftControl.style.maxWidth = panelWidth - smallScreenWidth - 5 + 'px';

				if(e.movementX < 0){
					this.leftControl.style.width = `${leftControlWidth - Math.abs(e.movementX)}px`
					this.rightControl.style.width = `${rightControlWidth + Math.abs(e.movementX)}px`
				}
				if(e.movementX > 0){
					this.leftControl.style.width = `${leftControlWidth + Math.abs(e.movementX)}px`
					this.rightControl.style.width = `${rightControlWidth - Math.abs(e.movementX)}px`
				}		
			}
		}

		this.chart.onmouseup = () =>{
			document.onmousemove = null;
			this.panel.onmousemove = null;
		}

		this.smallScreen.ondragstart = function(){
			return false;
		}
		
	}
}


export default moveVisible