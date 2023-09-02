<script lang="ts">
	export let src: string;
	export let alt: string;
	export let size: 'lg' | 'md' | 'sm' = 'md';
</script>

<!-- <span title={alt}>
</span> -->
<img class=" {size}" {src} {alt} title={alt} />

<style lang="scss">
	.lg {
		width: 100px;
	}
	.md {
		width: 50px;
	}
	.sm {
		width: 25px;
	}
</style>
