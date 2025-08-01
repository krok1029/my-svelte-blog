<script lang="ts">
	let scrollY: number = $state(0);
	let height: number = $state(0);
	let element: HTMLElement | undefined = $state();

	let offset = $derived(element && element.offsetTop);
	const random256 = () => Math.floor(Math.random() * 256);
	const color = `rgb(${random256()}, ${random256()}, ${random256()})`;
</script>

<svelte:window bind:scrollY />

<div
	class="box"
	style:background-color={color}
	bind:this={element}
	bind:clientHeight={height}
	class:active={offset && offset + 10 < scrollY}
></div>

<style>
	.box {
		position: relative;
		top: 50vh;
		width: 200px;
		height: 200px;
		transition: 0.5s;
		background-color: rgb(0, 0, 0);
		border-radius: 10px;
	}
	.box:nth-child(3n + 1) {
		transform: translate(-400px, 0) scale(0);
	}
	.box:nth-child(3n + 2) {
		transform: translate(0, 0) scale(0);
	}
	.box:nth-child(3n + 3) {
		transform: translate(400px, 0) scale(0);
	}
	.box.active {
		transform: translate(0, 0) scale(1);
	}
</style>
