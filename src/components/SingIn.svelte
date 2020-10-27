<script>
	import axios from 'axios';
	import { scale } from 'svelte/transition';

	import Button from '../shared/Button.svelte';
	import { validationSingIn } from '../utils/validation.js';

	import { api, userData } from '../stores/stores.js';

	export let active = false;
	export let loadingUser = false;

	let fields = {
		username: '',
		password: ''
	}
	let errors = {};
	let submitting = false;
	const handleSubmit = async () => {
		const { errs, valid } = validationSingIn(fields);
		errors = errs; 
		if (valid) {
			try{
				submitting = true;
				loadingUser = true;
				const { data: { accessToken } } = await axios.post(`${api}/user/login`,fields);
				if (accessToken) {
					localStorage.setItem('token', `Bearer ${accessToken}`);
					axios.defaults.headers.common['Authorization'] = localStorage.token;
					const { data } = await axios.get(`${api}/user`);
					active = false;
					setTimeout(() => $userData = data, 2000)
				}
			}catch(err){
				submitting = false;
				loadingUser = false;
				const { username, password } = err.response.data;
				errors.username = username;
				errors.password = password;
			}
		}
	}

	const activeModal = () => {
		active = !active;
	}		
</script>

<div class="container">
	<a class="button" class:active href="#" on:click={activeModal}>Sing In</a>
	{#if active}
		<form on:submit|preventDefault={handleSubmit} transition:scale >
			<div class="close" on:click={activeModal}>X</div>
			<h2 class="title">Sing In</h2>
			<div class="input-field" data-error={errors.username}>
				<label>Username</label>
				<input type="text" bind:value={fields.username}>
			</div>
			<div class="input-field" data-error={errors.password}>
				<label>Password</label>
				<input type="password" bind:value={fields.password}>
			</div>
			<Button disabled={submitting} type="submit">Sing In</Button>
		</form>
	{/if}
</div>


<style>

	.container {
		display: inline-block;
		position: relative;
	}

	.container .active {
		background: #6CCAD1;
		color: #f9f9f9;
	}

	.button {
		font-weight: bold;
		text-decoration: none;
		color: #6CCAD1;
		margin: 10px;
		padding: 8px 20px;
		border-radius: var(--border-radius);
		transition: 300ms background;
	}

	.button:hover {
		color: #f9f9f9;
		background: #6CCAD1;
	}
	form {
		position: absolute;
		bottom: -30px;
		right: 0;
		color: #6CCAD1;
		padding: 20px 30px;
		padding-top: 30px;
		width: 320px;
		border-radius: var(--border-radius);
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		box-shadow: 3px 3px 5px 2px rgba(0,0,0, .5);
		font-weight: bold;
		transform: translate(35%,100%);

	}
	form::before {
		position: absolute;
		top: 0;
		left: 50%;
		content: "";
		background: #fff;
		width: 20px;
		height: 20px;
		transform: translate(-50%, -50%) rotate(135deg);
	}

	.title {
		font-size: 2.2rem;
	}

	.input-field {
		position: relative;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.input-field:after {
		position: absolute;
		bottom: -7px;
		left: 5px;
		font-size: .9rem;
		font-weight: 300;
		content: attr(data-error);
		color: red;
	}

	.input-field input:focus {
		border-color: #6CCAD1;
	}

	.input-field label {
		text-align: left;

	}

	.input-field input {
		outline: none;
		color: #6CCAD1;
		border-radius: var(--border-radius);
	}


	form .close {  
		padding: 8px 18px;
		position: absolute;
		font-weight: bold;
		right: 0;
		top: 0; 
		color: #aaa; 
		background: none;
		border-style: none;
		cursor: pointer;
		outline: none;
	}



	@media (max-width: 600px){

		form {
			position: fixed;
			width: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			transform: translate(0,0);
			z-index: 10000;
		}
	
	}
</style>