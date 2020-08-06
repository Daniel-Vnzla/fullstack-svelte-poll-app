<script>
	import SingIn from './SingIn.svelte';
	import SingUp from './SingUp.svelte';
	import Button from '../shared/Button.svelte';

	import { userData, storeOwnPolls } from '../stores/stores.js';

	export let loadingUser = true;
	export let activeItem;
	export let myPollsPage = 0;

	let activeSingIn = false;
	let activeSingUp = false;
 bind:loadingUser 
	let activeB = false;
	let activeA = false;

	$: if (activeSingIn) {
			activeSingIn = true;
			activeSingUp = false;
		} 
	$: if(activeSingUp) {
			activeSingIn = false;
			activeSingUp = true;
	}

	const logout = () => {
		activeItem = 'Current Polls';
		setTimeout(() => {
			delete localStorage.token;
			$userData.username = '';
			myPollsPage = 0;
			$storeOwnPolls = [];
			loadingUser = false;
		}, 1000);
	}

</script>

<header class="container">
	<h1>Poll</h1>
	{#if $userData.username}
	<div class="user">
		<span>{$userData.username}</span>
		<button on:click={logout} class="logout">Log out</button>
	</div>
	{:else}
		<nav class="menu" >
			<ul class:loadingUser class="menu-wrapper " >
				<SingIn bind:active={activeSingIn} bind:loadingUser />
				<SingUp bind:active={activeSingUp} bind:loadingUser />
			</ul>
		</nav>
	{/if}
		
</header>

<style type="text/css" media="screen">

	.user .logout {
		color: #f9f9f9;
    background: #6CCAD1;
    outline: none;
    border-style: none;
    padding: 8px 20px;
    margin: 0 10px;
    cursor: pointer;
    border-radius: var(--border-radius);
	}

	header {
		position: relative;
		font-size: 1.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		height: 60px;
		background: #f7f7f7;
		padding: 10px;
	}

	header h1 {
		color: #5DDC76;
		font-weight: bold;
		font-size: 2.8rem;
	}

	.loadingUser {
		pointer-events: none;
		opacity: .7;
		z-index: 10000;
	}

	.manu .menu-wrapper{
		display: flex;
	}
	


	
</style>