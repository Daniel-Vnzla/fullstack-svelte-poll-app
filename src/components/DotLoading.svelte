
<script>
	export let diametre = '60px';
	export let time = 1200;
	export let waveColor = '#6CCAD1';
	export let background = '#fff';
	export let delay = 0;
	
</script>
<div class="dot" style={`
		 --diametre: ${diametre};
		 --time: ${time}ms;
		 --waveColor: ${waveColor};
		 --background: ${background};
		 --delay: ${delay}ms;
		 `}></div>

<style>
	:root {
		--diametre: 60px;
		--time: 1200ms;
		--wave-color: #6CCAD1;
		--background: #fff;
		--delay: 0;
	} 
	
	
	.dot {
		display: inline-block;
		margin: 5px;
		position: relative;
		width: var(--diametre);
		height: var(--diametre);
		border-radius: 50%;
		background-color: var(--wave-color);
		animation: dot calc(var(--time) - var(--delay)) ease-in-out infinite;
		animation-delay: --delay;
	}
	
	.dot::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		background-color: var(--background);
		width: var(--diametre);
		height: var(--diametre);
		border-radius: 50%;
		transform-origin: center;
		transform: scale(1);
		animation: dot calc(var(--time) - var(--delay)) infinite;
	}
	
	@keyframes dot {
		0%,100%{
			transform: scale(0)
				
		}
		100% {
			transform: scale(1)
		}
		
	}
	
</style>