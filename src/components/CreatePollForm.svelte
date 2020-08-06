<script>
	import axios from 'axios';

	import { api, storePolls, userData, storeOwnPolls } from '../stores/stores.js';
	import { validationPolls } from '../utils/validation.js';

	let fields = { question: '', answerA: '', answerB: ''}
	let submitting = false;
	export let especificIds = [];
	export let activeItem;
	let errors = {};
	const handleSubmit = async () => {

		submitting = true;
		const { errs, valid } = validationPolls(fields);
		errors = errs;
		if (valid && $userData.username) {
			try {
				const res = await axios.post(`${api}/polls/add`,fields);
				especificIds.push(res.data._id);
				$storePolls = [ res.data, ...$storePolls];
				$storeOwnPolls = [ res.data, ...$storeOwnPolls];
				activeItem = 'Current Polls'
			}catch(err){
				const { question, answerA, answerB } = err.response.data.message;
				if (question) errors.question = question.message;
				if (answerA) errors.answerA = answerA.message;
				if (answerB) errors.answerB = answerB.message;
			}
		}
		setTimeout(() => submitting = false, 2000);
	}
</script>

<div class="container">
	<h2 class="head">Make a question that another can answer</h2>
	<form on:submit|preventDefault={handleSubmit}>
	<div class="form-field" data-error={errors.question}>
		<label for="Question">Question Poll</label>
		<input maxlength="40" type="text" bind:value={fields.question}>
		<p class="length">{fields.question.length}/40</p>
	</div>
	<div class="form-field" data-error={errors.answerA}>
		<label for="Answer A">Answer A:</label>
		<input maxlength="25" type="text" bind:value={fields.answerA}>
		<p class="length">{fields.answerA.length}/25</p>
	</div>
	<div class="form-field" data-error={errors.answerB}>
		<label for="Answer B">Answer B:</label>
		<input maxlength="25" type="text" bind:value={fields.answerB}>
		<p class="length">{fields.answerB.length}/25</p>
	</div>
	<button disabled={submitting || !$userData.username} type="submit">Add Poll</button>
</form>
</div>


<style>
	.container {
		padding-top: 50px;
		width: 90%;
		margin: 0 auto;
	}

	.head {
		text-align: center;
		color: var(--primary);
		font-size: 2rem;
	}

	form {
		color: var(--primary);
		font-weight: bold;
		width: 600px;
		text-align: center;
	}


	.form-field {
		position: relative;
		margin: 18px auto;
	}

	.form-field::before {
		position: absolute;
    content: attr(data-error);
    left: 5px;
    bottom: -12px;
    font-size: .8rem;
    color: #ff5050;
	}

	.form-field label {
		font-size: 1.6rem;
	}

	.form-field .length {
		font-size: .8rem;
		float: right;
	}

	input {
		color: var(--primary);
		width: 100%;
		font-size: 1.7rem;
		padding: 10px 10px;
		border: solid 1px var(--primary);
		border-radius: 6px;
	}

	label {
		margin: 10px auto;
		text-align: left;
	}

	button {
		font-weight: bold;
		background: var(--primary);
		color: #fff;
		border-radius: 6px;
		padding: 10px 22px;
		cursor: pointer;
	}

</style>