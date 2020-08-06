<script>
	import axios from 'axios';
	import Card from '../shared/Card.svelte';
	import PercentBar from './PercentBar.svelte';
	import DeletePoll from './DeletePoll.svelte';

	import { storePolls ,userData, api, storeOwnPolls } from '../stores/stores.js';

	export let poll = {}

	$: totalVotes = poll.votesA + poll.votesB;
	$: percentA = Math.floor( 100 / totalVotes * poll.votesA) || 0;
	$: percentB = Math.floor( 100 / totalVotes * poll.votesB) || 0;

	let submitting = false;
	const handleVote = async(answer, id) => {
		answer = answer.toLowerCase();
		const userVoteAlready = poll.userVotes.some(user => user.username === $userData.username );
		const voteAreDiferent = poll.userVotes.some(user =>( user.answer !== answer &&  user.username === $userData.username));
		if ($userData.username) {
			if (voteAreDiferent || !userVoteAlready) {
				try {
					submitting = true;
					const { data } = await axios.patch(`${api}/polls/vote/${id}`,{ answer });
					$storePolls = $storePolls.map((poll) => {
						if (poll._id === id) return data;
						else return poll;
					})
					$storeOwnPolls =$storeOwnPolls.map((poll) => {
						if (poll._id === id) return data;
						else return poll;
					})
					submitting = false;

				}catch(err){ 
					submitting = false;
					console.log(err.response)
				}
			}
		}		
	}
	
	let deleting = false;

</script>

<Card>
	<div class="poll" class:deleting={deleting}>
		{#if $userData.username === poll.createdBy }
		<div class="actions" >
			<DeletePoll id={poll._id} bind:deleting createdBy={poll.createdBy} />
		</div>
		{/if}
			<h3 class="question">{poll.question}</h3>
			<div class="porcents">
				<p class="total">Total Votes: ( {totalVotes} )</p>
				<PercentBar 
				on:click={()=> handleVote('a', poll._id)}
				disabled={submitting}
				percent={percentA}
				answer={poll.answerA}
				votes={poll.votesA}
				color="#5DDC76"
				answered={ poll.userVotes.some(user => user.answer === 'a' && user.username === $userData.username )}/>
				<PercentBar  
				on:click={() => handleVote('b', poll._id)}
				disabled={submitting}
				percent={percentB}
				answer={poll.answerB}
				votes={poll.votesB}
				answered={ poll.userVotes.some(user => user.answer === 'b' && user.username === $userData.username )} />
			</div>
			<div class="footer">
				<p>Created: {poll.createdAt}</p>
				<p>CratedBy: {poll.createdBy}</p>
			</div>
	</div>
</Card>

<style>
	/* .userNoRegister {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 900;
	} */

	.poll {
		position: relative;
		width: 100%;
	}

	.actions {
		position: absolute;
		right: 0;
		top: 0;
	}

	.deleting {
		pointer-events: none;
		opacity: .3;
	}

	.poll .question {
		color: #1196c1;
		font-size: 1.8rem;
	}
	
	.poll.question {
		color: #555;
	}

	.poll .total {
		margin-top: 70px;
	}

	.poll .porcents {
		width: 100%;
	}

	p {
		margin-top: 30px;
		font-size: 1rem;
		color: #aaa;
		font-weight: 450;
		text-shadow: 1px 1px 4px rgba(0,0,0, .3);

	}

	.poll .footer {
		display: flex;
		justify-content: space-between;
	}

	@media (max-width: 600px){

		html {
			font-size: .5rem;
		}

	}

	

</style>