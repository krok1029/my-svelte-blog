<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import type { Page } from '@sveltejs/kit';
	import { navbarList } from '$lib/const';
	interface Props {
		showDropdown: boolean;
	}

	let { showDropdown = $bindable() }: Props = $props();

	let dropdown: HTMLDivElement = $state();
	const handleClick = (event: MouseEvent) => {
		if (event.target instanceof Node && !dropdown.contains(event.target)) {
			showDropdown = false;
		}
	};

	document.addEventListener('click', handleClick, true);

	onDestroy(() => document.removeEventListener('click', handleClick, true));

	const checkCurrentUrl = (current: Page, url: string) =>
		current.url.pathname === url 
			? 'bg-purple-100 text-purple-700 block rounded-md px-3 py-2 text-base font-medium' 
			: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium transition-colors';
</script>

<div bind:this={dropdown} class="sm:hidden" id="mobile-menu">
	<div class="space-y-1 px-2 pb-3 pt-2">
		{#each navbarList as navbar}
			<a href={navbar.link} class={checkCurrentUrl($page, navbar.link)}>{navbar.text}</a>
		{/each}
	</div>
</div>
