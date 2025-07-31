<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		size?: 'lg' | 'md' | 'sm';
	}

	let { src, alt, size = 'md' }: Props = $props();

	// 根據 size 決定 Tailwind 類別
	const sizeClasses = {
		lg: 'w-24 h-24', // 100px -> w-24 (96px)
		md: 'w-12 h-12', // 50px -> w-12 (48px)
		sm: 'w-6 h-6' // 25px -> w-6 (24px)
	};
</script>

<img class="rounded object-cover {sizeClasses[size]}" {src} {alt} title={alt} />
