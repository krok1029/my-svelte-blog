<script lang="ts">
	import { onDestroy } from 'svelte';
	export let showDropdown: boolean;

	let dropdown: HTMLDivElement;
	const handleClick = (event: MouseEvent) => {
		if (event.target instanceof Node && !dropdown.contains(event.target)) {
			showDropdown = false;
		}
	};

	document.addEventListener('click', handleClick, true);

	onDestroy(() => document.removeEventListener('click', handleClick, true));
</script>

<div bind:this={dropdown} class="sm:hidden" id="mobile-menu">
	<div class="space-y-1 px-2 pb-3 pt-2">
		<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
		<a
			href="#"
			class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
			aria-current="page">Home</a
		>
		<a
			href="#"
			class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
			>My Blog</a
		>
		<a
			href="#"
			class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
			>About</a
		>
		<a
			href="#"
			class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
			>Contact</a
		>
	</div>
</div>
