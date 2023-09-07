<script lang="ts">
	import Box from './Box.svelte';
	const boxesArray = new Array(60);
</script>

<div class="main">
	<section>
		<h2 class="text-xl">Scroll to Reveal</h2>
	</section>

	<div class="container">
		{#each boxesArray as _box}
			<Box />
		{/each}
	</div>
</div>

<style>
	.main {
		display: flex;
		justify-content: center;
		align-items: center;

		flex-direction: column;
		background-color: #111;
		overflow: hidden;
	}
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}
	section h2 {
		position: relative;
		color: white;
		font-size: 8vw;
		font-weight: 500;
	}
	.container {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 30px;
		width: 700px;
		top: -200px;
	}
</style>
