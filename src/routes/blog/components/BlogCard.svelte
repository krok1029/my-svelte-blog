<script lang="ts">
	import defaultImageUrl from '$asset/card-top.jpg';
	import { ArrowRight, Tag } from 'lucide-svelte';
	import type { BlogCard } from '$type/Card';

	interface Props {
		card: BlogCard;
	}

	let { card }: Props = $props();
</script>

<article
	class="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/50"
>
	<!-- Image Container -->
	<div class="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-50 to-blue-50">
		<img
			class="h-48 w-full object-cover transition-all duration-500 group-hover:scale-110"
			src={card?.image || defaultImageUrl}
			alt={card.title}
			loading="lazy"
		/>
		<!-- Enhanced overlay for default images -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80"
		></div>
		<!-- Decorative corner accent -->
		<div class="absolute top-4 right-4 h-2 w-2 rounded-full bg-white/30 backdrop-blur-sm"></div>
	</div>

	<!-- Content Container -->
	<div class="flex flex-1 flex-col bg-gradient-to-b from-white to-gray-50/30 p-6">
		<!-- Title -->
		<h2
			class="mb-3 line-clamp-2 text-xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-purple-700"
		>
			<a
				href={`/blog/${card.id}`}
				class="decoration-purple-300 decoration-2 underline-offset-2 hover:underline"
			>
				{card.title}
			</a>
		</h2>

		<!-- Brief -->
		<p class="mb-4 line-clamp-3 flex-1 text-base leading-relaxed text-gray-600">
			{card.brief}
		</p>

		<!-- Tags -->
		{#if card.tags && card.tags.length > 0}
			<div class="mb-5 flex flex-wrap gap-2">
				{#each card.tags.slice(0, 3) as tag}
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1.5 text-xs font-medium text-purple-700 transition-all hover:scale-105 hover:shadow-sm"
					>
						<Tag size={12} class="text-purple-500" />
						{tag}
					</span>
				{/each}
				{#if card.tags.length > 3}
					<span class="self-center text-xs font-medium text-gray-400"
						>+{card.tags.length - 3} 更多</span
					>
				{/if}
			</div>
		{/if}

		<!-- Read More Button -->
		<div class="mt-auto border-t border-gray-100 pt-2">
			<a
				href={`/blog/${card.id}`}
				class="inline-flex items-center gap-2 py-2 text-sm font-semibold text-purple-600 transition-all duration-300 group-hover:gap-3 hover:text-purple-700"
			>
				<span class="relative">
					閱讀更多
					<span
						class="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"
					></span>
				</span>
				<ArrowRight
					size={16}
					class="transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-700"
				/>
			</a>
		</div>
	</div>
</article>

<style lang="postcss">
	@reference "tailwindcss";
</style>
