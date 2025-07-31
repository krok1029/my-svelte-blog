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

<article class="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full group">
	<!-- Image Container -->
	<div class="relative overflow-hidden rounded-t-xl">
		<img
			class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
			src={card?.image || defaultImageUrl}
			alt={card.title}
			loading="lazy"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
		></div>
	</div>

	<!-- Content Container -->
	<div class="p-6 flex-1 flex flex-col">
		<!-- Meta Information -->
		<div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
			class="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors"
		>
			<a href={`/blog/${card.id}`} class="hover:underline">
				{card.title}
			</a>
		</h2>

		<!-- Brief -->
		<p class="text-gray-600 text-base mb-4 line-clamp-3 flex-1">
			{card.brief}
		</p>

		<!-- Tags -->
		{#if card.tags && card.tags.length > 0}
			<div class="flex flex-wrap gap-2 mb-4">
				{#each card.tags.slice(0, 3) as tag}
					<span class="inline-flex items-center gap-1 bg-purple-50 text-purple-700 rounded-full px-2 py-1 text-xs font-medium">
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
				class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:gap-3 transition-all"
			>
				閱讀更多
				<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
			</a>
		</div>
	</div>
</article>
