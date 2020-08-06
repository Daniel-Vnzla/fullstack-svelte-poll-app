<script>
	export let type = '';
	export let disabled = false;
</script>

<button disabled={disabled} type={type}><slot /></button>


<style type="text/css" media="screen">
	button {
		padding: 6px 20px;
		align-self: center;
		width: 170px;
		margin-top: 10px;
		border-radius: var(--border-radius);
		background: #6CCAD1;
		color: #fff;
		font-size: 1.4rem;
		cursor: pointer;
	}

	button:hover {
		background: #4ebcc4;
	}
</style>