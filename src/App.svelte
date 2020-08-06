<script>
	import { onMount } from 'svelte';
	import axios from 'axios';

	import Header from './components/Header.svelte';
	import SubHeader from './components/SubHeader.svelte';
	import Footer from './components/Footer.svelte';
	import PollList from './components/PollList.svelte';
	import Task from './shared/Task.svelte';
	import CreatePollForm from './components/CreatePollForm.svelte';
	import Loading from './components/Loading.svelte';
	
	import { storePolls, userData, storeOwnPolls, api } from './stores/stores.js';
	
	let activeItem = 'Current Polls';
	let especificIds = [];
	let footer;
	let currenPollPage = 1;
	let myPollsPage = 1;
	let limit = 20;
	let loadingUser = true;
	let noMoreItems = false;
	let loadingMorePolls = false;

	onMount(async () => {
		const token = localStorage.token;
		loadingUser = false;
		if (token) { 
			try {
				loadingUser = true;
				axios.defaults.headers.common['Authorization'] = localStorage.token;
				const { data } = await axios.get(`${api}/user`);
				$userData = data;
			}catch(err){
				loadingUser = false;
				console.log(err);
			}
		}
		createObserver(footer,handleObserver);
		$storeOwnPolls = getOwnPolls();
	})

	const getAllPolls = async () => {
		try{
			let { data } = await axios.get(`${api}/polls?limit=${limit}&page=${currenPollPage}`);
			$storePolls = data.results;	
		}catch(err){ console.log(err) }
	}

	const getOwnPolls = async () => {
		try{
			let { data } = await axios.get(`${api}/polls?limit=${limit}&page=${myPollsPage}&filter={"createdBy":"${$userData.username}"}`);
			$storeOwnPolls = data.results;
		}catch(err) { console.log(err)}
	}

	$storePolls = getAllPolls();

	const createObserver = (target,handleObserver) => {
		const options = {
			root: null,
			rootMargin:'0px',
			threshold: 0.5,
		}
		const observer = new IntersectionObserver((handleObserver), options);
		observer.observe(target)
	
	}

	const handleObserver = async (entries) => {
		if (!noMoreItems) {
			if(entries[0].isIntersecting && activeItem !== 'Add New Poll'){
				try {
					loadingMorePolls = true;
					let resData= null;
					if (activeItem === 'Current Polls'){
						const { data } = await axios.get(`${api}/polls?limit=${limit}&page=${++currenPollPage}`);
						resData = data;
					} 
					else if (activeItem === 'My Polls') {
						const { data } = await axios.get(`${api}/polls?limit=${limit}&page=${++myPollsPage}&filter={"createdBy":"${$userData.username}"}`);
						resData = data;
					}
					if (especificIds.length > 0) {
						if ( especificIds.some(id => resData.results.some(poll => poll._id === id))) {
							 especificIds = especificIds.filter(id => {
							 	if(resData.results.some(poll => poll._id === id)) {
									resData.results = resData.results.filter(poll =>  poll._id !== id )
							 	}else {
							 		return id;
							 	}
							})
						}
					}
					if (resData.next || resData.results.length > 0 ) {
						if (activeItem === 'Current Polls') {
							$storePolls = [...$storePolls,...resData.results];
							loadingMorePolls = false;
						}else if(activeItem === 'My Polls'){
							$storeOwnPolls = [...$storeOwnPolls,...resData.results];
							loadingMorePolls = false;
						}
					} else {
						loadingMorePolls = false;
						noMoreItems = true;
					}
				}catch(err){
					loadingMorePolls= false;
					console.log(err)
				}
			}
		}
	}

</script>

	<Header bind:activeItem bind:loadingUser bind:myPollsPage/>
	<SubHeader />
		<main class="main">
			<Task bind:activeItem  bind:especificIds bind:noMoreItems/>
			{#if activeItem === 'Current Polls'}
				{#await $storePolls}
				<div class="loading">
					<Loading />
				</div>
				{:then polls}
					<PollList { polls } bind:loadingMorePolls bind:noMoreItems/>
				{:catch error}
		  		<p>{error}</p>
				{/await}
			{:else if activeItem === 'Add New Poll'}
				<CreatePollForm bind:activeItem bind:especificIds/>
			{:else if activeItem === 'My Polls' && $userData.username}
				{#await $storeOwnPolls}
					<div class="loading">
						<Loading />
					</div>
				{:then polls}
					<PollList { polls } bind:loadingMorePolls bind:noMoreItems/>
				{:catch error}
		  		<p>{error}</p> 
				{/await}
			{/if} 
		</main>
	<Footer bind:footer={footer} />

<style>
 
	.loading {
		padding: 40px 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>