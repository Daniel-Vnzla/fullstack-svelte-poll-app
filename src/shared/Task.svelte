<script>
	import axios from 'axios';
	import { storePolls, api, userData } from '../stores/stores.js';

	export let activeItem = 'Current Polls';
	export let especificIds = [];
	export let noMoreItems = false;

	const items = ['My Polls', 'Current Polls', 'Add New Poll'];
	let value = "";
	let activeList = false;


	const onTabChange = (item)=> {
		window.scroll({
			  top: 370,
			  left: 100,
			  behavior: 'smooth'
		});
		activeItem = item;
		noMoreItems = false;
	}
	let questions = [];
	const handleSubmit = async (e) => {
		const value = e.target.elements[0].value
		try{
			const getQuestions = await axios.get(`${api}/polls/questions/${value ? value : '$'}`);
			questions = getQuestions.data;

		}catch(err) {
			console.log(err)
		}
	}
	let loadingPoll = false;
	const getSpecificPoll = async (id) => {
		activeItem = 'Current Polls';
		try{
			loadingPoll = true;
			if ($storePolls.find((poll) =>  poll._id === id)) {
					$storePolls = $storePolls.reduce((acc,curr) => {
						if (curr._id === id) {
							return acc = [curr, ...acc];
						}else {
						  return acc = [...acc, curr];
						}
					},[])
			loadingPoll = false;
			}else {
				const getPoll = await axios.get(`${api}/polls/poll/${id}`);
				especificIds.push(id);
				$storePolls = [ getPoll.data, ...$storePolls]
				loadingPoll = false;
			}
			activeList = false;
			window.scroll({
			  top: 400,
			  left: 100,
			  behavior: 'smooth'
			});
		}catch(err){
			loadingPoll = false;
			console.log(err)
		}
	} 

	const firstClick = async (e) => {
		const value = e.target.value
		try{
			const getQuestions = await axios.get(`${api}/polls/questions/${value ? value : '$'}`);
			questions = getQuestions.data;

		}catch(err) {
			console.log(err)
		}
	}

</script>

<div class="tabs">
	<div>
	
		<form on:submit|preventDefault={handleSubmit} >
			<input
				on:click={() => activeList = true}
				on:click|once={firstClick}
				class="search"
				bind:value
				type="text"
				name="search"
				placeholder="Search poll..."
				autocomplete="off"
		>
		</form>
	
		<ul>
			{#each items as item}
			{#if item === 'My Polls' && $userData.username}
				<li 
					on:click={() => onTabChange(item)}
					class:active={activeItem === item} >
					{item}
				</li>
			{:else if item !== 'My Polls' }
				<li 
					on:click={() => onTabChange(item)}
					class:active={activeItem === item} >
					{item}
				</li>
			{/if}
			{/each}
		</ul>
	</div>
		<div class="list" class:activeList >
			{#each questions as question}
				<div class:loadingPoll class="item" on:click={() => getSpecificPoll(question._id)}>{question.question}</div>
			{:else}
				<p>No results</p>
			{/each}
		</div>	
			<button class="closeList" class:activeList on:click={() => activeList = false}>X</button>
			
</div>

<style>

	.search {
		position: absolute;
    border-radius: 20px;
    padding: 10px;
    border: 1px solid #6ccad1;
    top: 16px;
    left: 10px;
	}

	.tabs {
		padding: 10px 0;
		background: #fff;
		position: sticky;
		top: 0;
		z-index: 600;
		border: 1px solid transparent;
		border-bottom-color: #d2d2d2;
	}

	ul {
		display: flex;
		justify-content: center;
	}

	li {
		display: block;
		font-size: 1.2rem;
		color: #555;
		cursor: pointer;
		padding: 10px 20px;
	}

	.active {
		color: var(--primary);
		border-bottom: 3px solid var(--primary);
	} 

	.closeList {
		font-weight: bold;
		color: #fff;
		font-size: 1.3rem;
    width: 100%;
    cursor: pointer;
    border: none;
    display: none;
    background: #6ccad1;
    max-height: 50px;
	}

	.list {
		margin-top: 10px;
		height: 0;
		max-height: 300px;
		overflow: auto;
		visibility: hidden;
		transition: height 300ms;
	}

	.activeList {
		height: 300px;
		display: block;
		visibility: visible;
	}

	.loadingPoll {
		pointer-events: none;
		opacity: .5;
	}

	.list .item {
		cursor: pointer;
		margin: 5px;
		padding: 10px;
	}

	.list .item:hover {
		background: #54c6eba8;
	}

</style>