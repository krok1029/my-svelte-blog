<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		size?: 'lg' | 'md' | 'sm';
	}

	let { src, alt, size = 'md' }: Props = $props();
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
