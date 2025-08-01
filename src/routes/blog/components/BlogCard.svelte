<script lang="ts">
	import defaultImageUrl from '$asset/card-top.jpg';
	import { Calendar, Clock, ArrowRight, Tag } from 'lucide-svelte';
	import type { BlogCard } from '$type/Card';

	interface Props {
		card: BlogCard;
	}

	let { card }: Props = $props();

	// 格式化日期
	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	// 估算閱讀時間
	const estimateReadingTime = (content: string) => {
		const wordsPerMinute = 200;
		const wordCount = content.length / 2; // 中文字符估算
		return Math.ceil(wordCount / wordsPerMinute);
	};
</script>

<article
	class="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
>
	<!-- Image Container -->
	<div class="relative overflow-hidden rounded-t-xl">
		<img
			class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
			src={card?.image || defaultImageUrl}
			alt={card.title}
			loading="lazy"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
	</div>

	<!-- Content Container -->
	<div class="flex flex-1 flex-col p-6">
		<!-- Meta Information -->
		<div class="mb-3 flex items-center gap-4 text-sm text-gray-500">
			{#if card.createdAt}
				<div class="flex items-center gap-1">
					<Calendar size={14} />
					<span>{formatDate(card.createdAt)}</span>
				</div>
			{/if}
			{#if card.content}
				<div class="flex items-center gap-1">
					<Clock size={14} />
					<span>{estimateReadingTime(card.content)} 分鐘閱讀</span>
				</div>
			{/if}
		</div>

		<!-- Title -->
		<h2
			class="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-600"
		>
			<a href={`/blog/${card.id}`} class="hover:underline">
				{card.title}
			</a>
		</h2>

		<!-- Brief -->
		<p class="mb-4 line-clamp-3 flex-1 text-base text-gray-600">
			{card.brief}
		</p>

		<!-- Tags -->
		{#if card.tags && card.tags.length > 0}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each card.tags.slice(0, 3) as tag}
					<span
						class="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700"
					>
						<Tag size={12} />
						{tag}
					</span>
				{/each}
				{#if card.tags.length > 3}
					<span class="text-xs text-gray-400">+{card.tags.length - 3} 更多</span>
				{/if}
			</div>
		{/if}

		<!-- Read More Button -->
		<div class="mt-auto">
			<a
				href={`/blog/${card.id}`}
				class="inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition-all group-hover:gap-3 hover:text-purple-700"
			>
				閱讀更多
				<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
			</a>
		</div>
	</div>
</article>

<style lang="postcss">
	@reference "tailwindcss";
</style>
