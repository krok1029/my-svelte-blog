<script lang="ts">
	import '../app.css';
	import Navbar from '$components/navbar/Navbar.svelte';
	import Footer from '$components/footer/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
	<Navbar />
	<ModeWatcher />
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
