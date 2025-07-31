<script lang="ts">
	import '../app.css';
	import Navbar from '$components/navbar/Navbar.svelte';
	import Footer from '$components/footer/Footer.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex min-h-screen flex-col bg-white text-gray-900">
	<Navbar />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<Footer />
</div>

<style lang="postcss">
	@reference "tailwindcss";
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
