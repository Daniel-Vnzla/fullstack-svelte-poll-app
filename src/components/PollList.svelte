<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PollDetails from './PollDetails.svelte';
	import Loading from './Loading.svelte';

	export let polls = [];
	export let loadingMorePolls = false;
	export let noMoreItems = false;

</script>

<div class="poll-list">
	{#each polls as poll (poll._id)}
		<div in:fade out:scale|local animate:flip={{duration: 500}}>
			<PollDetails poll={poll} />
		</div>
	{:else}
		<p>No hay encuestas actualmente</p>
	{/each}
	
</div>
{#if loadingMorePolls}
	<div class="loading">
		<Loading />
	</div>
{/if}
{#if noMoreItems}
	<p class="noMorePolls">No more Polls</p>
{/if}


<style>
	.poll-list {
		display: grid;
		margin: 0 auto;
		width: 90%;
		margin-top: 80px;
		grid-template-columns: repeat(2,1fr);
		grid-gap: 20px;
	}

	.loading {
		padding: 40px 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.noMorePolls {
		padding: 40px 0;
		color: #6CCAD1;
		text-align: center;
		font-size: 2rem;
	}

	@media (max-width: 600px){

		.poll-list {
			grid-template-columns: repeat(1,1fr);
		}
	}
</style>