<script>
	import { slide } from 'svelte/transition';
	import { storePolls, userData } from '../stores/stores.js';
	export let percent = 0;
	export let answer;
	export let votes;
	export let color = '#6CCAD1';
	export let answered = false;
	export let disabled = false;

</script>
<div class="container">
	<div>
		{#if answered}
			<div class="arrow" transition:slide></div>
		{/if}
	</div>
	<button disabled={disabled} 
	style="--width: {percent}%;--background: {color}" 
	class="answer" 
	data-percent={`${percent}%`}
	on:click>
	<p>{answer} ({votes})</p>
	
	{#if !$userData.username}
		<div class="tooltip" >You must be register to voted</div>
	{/if}
</button>
</div>



<style type="text/css" media="screen">
	.container {
		display: flex;
    align-items: center;
	}

	.arrow {
		margin-right: -10px;
    border: solid 20px transparent;
    border-left-color: #9d5cd9;
	}

	:root {
		--width: 25%;
		--background: #6CCAD1;
	}

	.answer {
		font-size: 1.4rem;
		background: #c9c9c9;
		font-weight: bold;
		color: #f9f9f9;
		cursor: pointer;
		margin: 5px auto;
		position: relative;
		border-style: none;
		width: 100%;
		text-align: left;
		padding: 20px 15px;
		z-index: 10;
		text-shadow: 1px 1px 1px rgba(0,0,0, .3);

	}

	.answer::before {
		z-index: -1;
		position: absolute;
		content: "";
		left: 0;
		top: 0;
		width: var(--width);
		height: 100%;
		background: var(--background, 100%);
		border-left: 5px solid rgba(0,0,0, .3);
		transition: width 300ms;
		box-shadow: 0 2px 4px rgba(0,0,0, .4);
	}

	.answer::after {
		position: absolute;
		content: attr(data-percent);
		right: 20px;
		top: 50%;
		font-weight: 700;
		font-size: 2rem;
		color: rgba(255,255,255, .7);
		transform: translateY(-50%);
		z-index: -1;
	}

	.answer:not(disabled):hover {
		opacity: .9;

	}

	.tooltip {
		position: absolute;
    top: -15px;
    left: 50%;
    font-size: 1rem;
    padding: 4px 12px;
    width: max-content;
    border-radius: 6px;
    background: #6CCAD1;
    opacity: 0;
    transform: translate(-50%, -100%);
    transition: 300ms opacity;
	}

	.tooltip::before{
		position: absolute;
    content: "";
    bottom: 0;
    left: 50%;
    border: solid 12px transparent;
    border-top-color: #6CCAD1;
    transform: translate(-50%, 100%);
	}

	.answer:hover .tooltip {
		visibility: visible;
		opacity: 1;
	}

	@media (max-width: 600px){

		.answer {
			font-size: 1.2rem;
			padding: 15px 15px;
		}

		.answer::after {
			font-size: 1.5rem;
		}
 
	}


	
</style>