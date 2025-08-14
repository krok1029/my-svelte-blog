<script lang="ts">
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import type { Page } from '@sveltejs/kit';
	import { navbarList } from '$lib/const';
	interface Props {
		showDropdown: boolean;
	}

	let { showDropdown = $bindable() }: Props = $props();

	let dropdown: HTMLDivElement | undefined = $state();
	const handleClick = (event: MouseEvent) => {
		if (event.target instanceof Node && dropdown && !dropdown.contains(event.target)) {
			showDropdown = false;
		}
	};

	document.addEventListener('click', handleClick, true);

	onDestroy(() => document.removeEventListener('click', handleClick, true));

	const checkCurrentUrl = (current: Page, url: string) =>
		current.url.pathname === url
			? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 block rounded-md px-3 py-2 text-base font-medium'
			: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 block rounded-md px-3 py-2 text-base font-medium transition-colors';
</script>

<div bind:this={dropdown} class="sm:hidden" id="mobile-menu">
	<div class="space-y-1 px-2 pt-2 pb-3">
		{#each navbarList as navbar}
			<a href={navbar.link} class={checkCurrentUrl($page, navbar.link)}>{navbar.text}</a>
		{/each}
	</div>
</div>
