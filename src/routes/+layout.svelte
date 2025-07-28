<script>
	import '../app.css';

	import Navbar from '$components/navbar/Navbar.svelte';
	import Footer from '$components/footer/Footer.svelte';
</script>

<div class="root min-h-screen flex flex-col">
	<Navbar />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		scroll-behavior: smooth;
	}
	
	:global(body) {
		@apply bg-white text-gray-900;
	}
</style>
