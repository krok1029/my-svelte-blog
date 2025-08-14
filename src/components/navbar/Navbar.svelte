<script lang="ts">
	import { User2, Menu, X } from 'lucide-svelte';

	import { page } from '$app/state';
	import type { Page } from '@sveltejs/kit';
	import ProfileDropdown from './ProfileDropdown.svelte';
	import MobileMenuDropdown from './MobileMenuDropdown.svelte';
	import { navbarList } from '$lib/const';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';

	let showMainMenu = $state(false);
	const handleMainIconClick = () => {
		showMainMenu = !showMainMenu;
	};

	let showUserMenu = $state(false);
	const handleUserIconClick = () => {
		showUserMenu = !showUserMenu;
	};
	const checkCurrentUrl = (current: Page, url: string) =>
		current.url.pathname === url
			? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
			: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100';
</script>

<nav class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					onclick={handleMainIconClick}
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-inset"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					{#if showMainMenu}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>

			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<a
						href="/"
						class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
					>
						李明峯
					</a>
				</div>
				<div class="hidden sm:ml-8 sm:block">
					<div class="flex space-x-1">
						{#each navbarList as navbar}
							<a
								href={navbar.link}
								class="rounded-lg px-3 py-2 text-sm font-medium transition-colors {checkCurrentUrl(
									page,
									navbar.link
								)}">{navbar.text}</a
							>
						{/each}
					</div>
				</div>
			</div>
			<Button onclick={toggleMode} variant="outline" size="icon">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<!-- Profile dropdown -->
				<div class="relative ml-3">
					<div>
						<button
							onclick={handleUserIconClick}
							type="button"
							class="flex rounded-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
						>
							<span class="sr-only">Open user menu</span>
							<User2 class="h-6 w-6" />
						</button>
					</div>

					{#if showUserMenu}
						<ProfileDropdown bind:showDropdown={showUserMenu} />
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if showMainMenu}
		<MobileMenuDropdown bind:showDropdown={showMainMenu} />
	{/if}
</nav>
