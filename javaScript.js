const container = document.querySelector('.container');
let api = "https://api.adorable.io/avatars/"
const randomNum = () => Math.floor(Math.random() * 100); 
	let images = [];
	const loadImages = (img = 11) => {
	
		let i = 0;
		while(i < img){
			const img = document.createElement('img');
      img.src = `${api}${randomNum()}`;
			container.appendChild(img);
			i++;  
		}
	} 
	loadImages()


window.addEventListener('scroll', () => {
  if(window.scrollY + window.innerHeight > document.documentElement.scrollHeight){
    	loadImages()
  }
})