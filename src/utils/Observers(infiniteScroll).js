export const createObserver = (target,page,limit) => {
	const options = {
		root: null,
		rootMargin:'0px',
		threshold: 0.5,
	}
	const observer = new IntersectionObserver(handleObserver, options);
	observer.observe(target)
	return { page, limit}
}

let noMoreItems = false;
const handleObserver = async (entries) => {
	if(entries[0].isIntersecting && activeItem === 'Current Polls'){
		try {
			const { data } = await axios.get(`${api}/polls?limit=${limit}&page=${++page}`);
			if (data.next || data.results.length > 0 ) $storePolls = [...$storePolls,...data.results];
			else noMoreItems = true;
		}catch(err){
			console.log(err)
		}
	} 
}