<script>
	import '../app.css';
	// import Test from "$components/Test.svelte"
	import Navbar from '$components/navbar/Navbar.svelte';
	import Footer from '$components/footer/Footer.svelte';
</script>

<div class="root min-h-screen flex flex-col">
	<Navbar />

	<slot />
	<Footer />
</div>
