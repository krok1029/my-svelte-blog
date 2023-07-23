<script>
	import '../app.css';

	import Navbar from '$components/navbar/Navbar.svelte';
	import Footer from '$components/footer/Footer.svelte';
</script>

<div class="root min-h-screen flex flex-col">
	<Navbar />
	<div class="p-4">
		<slot />
	</div>
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		/* background-color: theme(colors.orange.100); */
	}
</style>
