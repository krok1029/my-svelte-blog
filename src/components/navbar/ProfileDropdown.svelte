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

<div
	bind:this={dropdown}
	class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	role="menu"
	aria-orientation="vertical"
	aria-labelledby="user-menu-button"
	tabindex="-1"
>
	<!-- Active: "bg-gray-100", Not Active: "" -->
	<a
		href="#"
		class="block px-4 py-2 text-sm text-gray-700"
		role="menuitem"
		tabindex="-1"
		id="user-menu-item-0">Your Profile</a
	>
	<a
		href="#"
		class="block px-4 py-2 text-sm text-gray-700"
		role="menuitem"
		tabindex="-1"
		id="user-menu-item-1">Settings</a
	>
	<a
		href="login"
		class="block px-4 py-2 text-sm text-gray-700"
		role="menuitem"
		tabindex="-1"
		id="user-menu-item-1">Login / Sign in</a
	>
</div>
