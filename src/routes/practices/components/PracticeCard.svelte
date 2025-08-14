<script lang="ts">
	import { goto } from '$app/navigation';
	import defaultImageUrl from '$asset/card-top.jpg';
	import { Code, Palette, ArrowRight } from 'lucide-svelte';
	import { Card as CardRoot, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';
	import type { PracticeCard } from '$type/Card';

	interface Props {
		card: PracticeCard;
	}

	let { card }: Props = $props();

	const path = $derived(`/practices/${card.type}/${card.id}`);
	const go = () => goto(path);

	// 類型圖示映射
	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'css':
				return Palette;
			case 'js':
				return Code;
			default:
				return Code;
		}
	};

	const Icon = getTypeIcon(card.type);

	// 類型顏色映射
	const getTypeColor = (type: string) => {
		switch (type) {
			case 'css':
				return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
			case 'js':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
		}
	};

	// 類型名稱映射
	const getTypeName = (type: string) => {
		switch (type) {
			case 'css':
				return 'CSS';
			case 'js':
				return 'JavaScript';
			default:
				return type.toUpperCase();
		}
	};

	// 難度顏色映射
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case 'easy':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			case 'medium':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
			case 'hard':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
		}
	};

	// 難度名稱映射
	const getDifficultyName = (difficulty: string) => {
		switch (difficulty) {
			case 'easy':
				return '簡單';
			case 'medium':
				return '中等';
			case 'hard':
				return '困難';
			default:
				return difficulty;
		}
	};
</script>

<CardRoot
	class="group w-full cursor-pointer flex-row gap-0 overflow-hidden p-0 text-left transition-all duration-300 hover:shadow-lg"
	onclick={go}
>
	<!-- Image Container -->
	<div class="relative w-1/3 flex-shrink-0">
		<div class="absolute inset-0 z-10 bg-gradient-to-r from-transparent to-black/10"></div>
		<img
			class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			src={card?.image || defaultImageUrl}
			alt={card.title}
			loading="lazy"
		/>
		{#if !card.image}
			<div
				class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
			>
				<Icon class="text-gray-400 dark:text-gray-500" size={48} />
			</div>
		{/if}
	</div>

	<!-- Content Container -->
	<CardContent class="flex flex-1 flex-col justify-between p-6">
		<div>
			<!-- Type Badge and Difficulty -->
			<div class="mb-3 flex items-center gap-2">
				<Badge variant="outline" class={cn('gap-1', getTypeColor(card.type))}>
					<Icon size={14} />
					{getTypeName(card.type)}
				</Badge>

				{#if card.difficulty}
					<Badge variant="secondary" class={cn('text-xs', getDifficultyColor(card.difficulty))}>
						{getDifficultyName(card.difficulty)}
					</Badge>
				{/if}
			</div>

			<!-- Title -->
			<h3
				class="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-emerald-600 dark:text-gray-100 dark:group-hover:text-emerald-400"
			>
				<a href={path} class="hover:underline">
					{card.title}
				</a>
			</h3>

			<!-- Description (if available) -->
			{#if card.description}
				<p class="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
					{card.description}
				</p>
			{/if}

			<!-- Tags -->
			{#if card.tags && card.tags.length > 0}
				<div class="mb-4 flex flex-wrap gap-1">
					{#each card.tags.slice(0, 3) as tag}
						<Badge variant="secondary" class="text-xs">#{tag}</Badge>
					{/each}
					{#if card.tags.length > 3}
						<Badge variant="outline" class="text-xs">+{card.tags.length - 3}</Badge>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Action Area -->
		<div class="flex items-center justify-between">
			<div class="text-xs text-gray-500 dark:text-gray-400">
				練習 #{card.id}
			</div>

			<div class="flex items-center gap-2">
				<a
					href={path}
					class="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 transition-all group-hover:gap-3 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
				>
					查看練習
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</div>
	</CardContent>
</CardRoot>
