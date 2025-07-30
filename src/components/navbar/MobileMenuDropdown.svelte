<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import type { Page } from '@sveltejs/kit';
	import { navbarList } from '$lib/const';
	export let showDropdown: boolean;

	let dropdown: HTMLDivElement;
	const handleClick = (event: MouseEvent) => {
		if (event.target instanceof Node && !dropdown.contains(event.target)) {
			showDropdown = false;
		}
	};

	document.addEventListener('click', handleClick, true);

	onDestroy(() => document.removeEventListener('click', handleClick, true));

	const checkCurrentUrl = (current: Page, url: string) =>
		current.url.pathname === url ? 'nav-bar-mobile-selected' : 'nav-bar-mobile-default';
</script>

<div bind:this={dropdown} class="sm:hidden" id="mobile-menu">
	<div class="space-y-1 px-2 pb-3 pt-2">
		<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
		{#each navbarList as navbar}
			<a href={navbar.link} class={checkCurrentUrl($page, navbar.link)}>{navbar.text}</a>
		{/each}
	</div>
</div>

<style lang="postcss">
	.nav-bar-mobile-selected {
		@apply bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium;
	}

	.nav-bar-mobile-default {
		@apply text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium;
	}
</style>
