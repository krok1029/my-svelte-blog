<script>
	import '../app.css';
	// import Test from "$components/Test.svelte"
	import Navbar from '$components/navbar/Navbar.svelte';
	import Footer from '$components/footer/Footer.svelte';

	import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { signOut } from 'firebase/auth';
  import { firebaseAuth } from '$lib/firebase';
  import { authUser } from '$lib/authStore';
 
  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        $authUser = undefined;
        goto('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

<div class="root min-h-screen flex flex-col">
	<Navbar />
	<header class="space-y-4">
		<a href="/" class="font-bold hover:underline">Home</a>
	 
		<nav class="flex gap-4">
			{#if $authUser}
				<a
					href="/protected"
					class="hover:underline"
					class:active={$page.url.pathname === '/protected'}>Protected</a
				>
				<button class="hover:underline" on:click={handleLogout}>Logout</button>
			{:else}
				<a href="/register" class="hover:underline" class:active={$page.url.pathname === '/register'}
					>Register</a
				>
				<a href="/login" class="hover:underline" class:active={$page.url.pathname === '/login'}
					>Login</a
				>
			{/if}
		</nav>
	</header>

	<slot />
	<Footer />
</div>
<style lang="postcss">
	:global(html) {
		/* background-color: theme(colors.orange.100); */
	}
</style>