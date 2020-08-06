<script>
	export let footer;	

</script>
<footer bind:this={footer}>
	<h6 class="copyright">Copyright 2020 Poll Ninja</h6>
</footer>
<style type="text/css" media="screen">
	footer {
		padding: 40px;
		text-align: center;
	}

	.copyright {
		width: 100%;
		color: #aaa;
		font-size: 14px;
		display: inline-block;
		padding: 20px 0px;
		border-top: 1px solid #ddd
	}
</style>