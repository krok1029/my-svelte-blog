<script lang="ts">
	import { goto } from '$app/navigation';
	import defaultImageUrl from '$asset/card-top.jpg';
	import { Code, Palette, ArrowRight } from 'lucide-svelte';
	import type { PracticeCard } from '$type/Card';

	interface Props {
		card: PracticeCard;
	}

	let { card }: Props = $props();

	const path = `/practices/${card.type}/${card.id}`;
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

<button class="practice-card group w-full text-left" onclick={go}>
	<div class="flex h-full">
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
		<div class="flex flex-1 flex-col justify-between p-6">
			<div>
				<!-- Type Badge and Difficulty -->
				<div class="mb-3 flex items-center gap-2">
					<span
						class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium {getTypeColor(
							card.type
						)}"
					>
						<Icon size={14} />
						{getTypeName(card.type)}
					</span>

					{#if card.difficulty}
						<span
							class="rounded-full px-2 py-1 text-xs font-medium {getDifficultyColor(
								card.difficulty
							)}"
						>
							{getDifficultyName(card.difficulty)}
						</span>
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
							<span
								class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
							>
								#{tag}
							</span>
						{/each}
						{#if card.tags.length > 3}
							<span class="text-xs text-gray-400 dark:text-gray-500">+{card.tags.length - 3}</span>
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
		</div>
	</div>
</button>

<style lang="postcss">
	@reference "tailwindcss";

	.practice-card {
		@apply cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
