function getData(url){
	return new Promise(function(resolve,reject){

		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		
		xhr.onload = function(){
			if(this.status === 200){
				resolve(this.response);
			}else{
				reject(new Error('Request failed:' + this.statusText));
			}
		}

		xhr.onerror = ()=>{
			reject(new Error('Network error'));
		}
		
		xhr.send();
	})
}

export default getData




