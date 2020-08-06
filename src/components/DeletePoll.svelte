<script>
	import axios from 'axios';
	import { fade } from 'svelte/transition';
	import { userData, api, storePolls, storeOwnPolls } from '../stores/stores.js';

	export let deleting = false;
	export let id;
	export let createdBy;
	
	let modalActions =  false;
	const deletePoll = async () => {
		if ($userData.username === createdBy) {
			try{
				modalActions = false;
				deleting = true;
				const res = await axios.delete(`${api}/polls/${id}`);
				$storePolls = $storePolls.filter(poll => poll._id !== id);
				$storeOwnPolls = $storeOwnPolls.filter(poll => poll._id !== id);
				deleting = false;
			}catch(err){
				deleting = false;
				console.log(err.response)
			}
		}
	}

</script>

<div class="actions" on:click={() => modalActions = true} >
	<div class="img">
		<img src="/img/delete-icon.jpg" alt="delete">	
	</div>
</div>

{#if modalActions}
	<div class="modalDelete" transition:fade>
		<div class="content">
			<p>Do you want delete this poll?</p>
			<button class="not" on:click={() => modalActions = false}>Not wait</button>
			<button class="yes" on:click={deletePoll} >Yes delete</button>
		</div>
	</div>
{/if}

<style>
	.actions {
		position: relative;
	}
	.actions .img {
		position: relative;
		cursor: pointer;
	}

	.actions .img::after {
		position: absolute;
    top: -18px;
    left: 50%;
    content: "Delete";
    background: #E88A8A;
    color: #f9f9f9;
    padding: 6px 18px;
    transform: translate(-50%, -100%);
    border-radius: var(--border-radius);
    opacity: 0;
    visibility: hidden;
    transition: 300ms opacity;
	}

	.actions .img::before {
		position: absolute;
    top: 0;
    left: 50%;
    content: "";
    border: solid 9px transparent;
    border-top-color: #E88A8A;
    transform: translate(-50%, -100%);
    opacity: 0;
    visibility: hidden;
    transition: 300ms opacity;
	}

	.actions:hover .img::before, 
	.actions:hover .img::after {
		visibility: visible;
		opacity: 1;
	}

	.actions img {
		width: 20px;
		height: 20px;
	}

	.modalDelete {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: grid;
		place-items: center;
		background: rgba(0,0,0, .6);
		z-index: 20000;
	}

	.modalDelete .content {
		padding: 20px 40px;
		font-size: 1.2rem;
		background: #f9f9f9;
		border-radius: var(--border-radius);
	}

	.modalDelete .content p {
		font-size: 1.4rem;
	}

	.modalDelete .content button {
		color: #f9f9f9;
		background: none;
		border-style: none;
		border-radius: var(--border-radius);
		margin: 10px;
		padding: .4em 1em;
		cursor: pointer;
	}

	.modalDelete .content .yes {
		background: var(--secondary);
	}

	.modalDelete .content .not {
		background: #E88A8A;
	}
</style>