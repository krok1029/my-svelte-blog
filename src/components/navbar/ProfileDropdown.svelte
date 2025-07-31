<script lang="ts">
	import { onDestroy } from 'svelte';
	import { authUser } from '$lib/authStore';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';

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
	const handleLogout = () => {
		signOut(firebaseAuth)
			.then(() => {
				$authUser = undefined;
				goto('/login');
			})
			.catch((error) => {
				console.error(error);
			});
	};
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
	{#if $authUser}
		<a
			href="/"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-0">Your Profile</a
		>
		<a
			href="/admin"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-1">Admin</a
		>
		<button
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			onclick={handleLogout}
			id="user-menu-item-1">Logout</button
		>
	{:else}
		<a
			href="/login"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-1">Login</a
		>
		<a
			href="/register"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-1">Register</a
		>
	{/if}
</div>
