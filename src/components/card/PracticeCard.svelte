<script lang="ts">
	import { goto } from '$app/navigation';
	import defaultImageUrl from '$asset/card-top.jpg';
	import { Code, Palette, ArrowRight, ExternalLink } from 'lucide-svelte';
	import type { PracticeCard } from '$type/Card';
	
	export let card: PracticeCard;
	
	const path = `/practices/${card.type}/${card.id}`;
	const go = () => goto(path);
	
	// 類型圖示映射
	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'css': return Palette;
			case 'js': return Code;
			default: return Code;
		}
	};

	const Icon = getTypeIcon(card.type);
	
	// 類型顏色映射
	const getTypeColor = (type: string) => {
		switch (type) {
			case 'css': return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'js': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			default: return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};
	
	// 類型名稱映射
	const getTypeName = (type: string) => {
		switch (type) {
			case 'css': return 'CSS';
			case 'js': return 'JavaScript';
			default: return type.toUpperCase();
		}
	};
	
	// 難度顏色映射
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case 'easy': return 'bg-green-100 text-green-800';
			case 'medium': return 'bg-yellow-100 text-yellow-800';
			case 'hard': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};
	
	// 難度名稱映射
	const getDifficultyName = (difficulty: string) => {
		switch (difficulty) {
			case 'easy': return '簡單';
			case 'medium': return '中等';
			case 'hard': return '困難';
			default: return difficulty;
		}
	};
</script>

<article class="practice-card group" on:click={go} on:keydown={() => {}}>
	<div class="flex h-full">
		<!-- Image Container -->
		<div class="relative w-1/3 flex-shrink-0">
			<div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 z-10"></div>
			<img 
				class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
				src={card?.image || defaultImageUrl} 
				alt={card.title}
				loading="lazy"
			/>
			{#if !card.image}
				<div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
					<Icon class="text-gray-400" size={48} />
				</div>
			{/if}
		</div>

		<!-- Content Container -->
		<div class="flex-1 p-6 flex flex-col justify-between">
			<div>
				<!-- Type Badge and Difficulty -->
				<div class="flex items-center gap-2 mb-3">
					<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border {getTypeColor(card.type)}">
						<Icon size={14} />
						{getTypeName(card.type)}
					</span>
					
					{#if card.difficulty}
						<span class="px-2 py-1 rounded-full text-xs font-medium {getDifficultyColor(card.difficulty)}">
							{getDifficultyName(card.difficulty)}
						</span>
					{/if}
				</div>

				<!-- Title -->
				<h3 class="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
					<a href={path} class="hover:underline">
						{card.title}
					</a>
				</h3>

				<!-- Description (if available) -->
				{#if card.description}
					<p class="text-gray-600 text-sm mb-4 line-clamp-2">
						{card.description}
					</p>
				{/if}
				
				<!-- Tags -->
				{#if card.tags && card.tags.length > 0}
					<div class="flex flex-wrap gap-1 mb-4">
						{#each card.tags.slice(0, 3) as tag}
							<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
								#{tag}
							</span>
						{/each}
						{#if card.tags.length > 3}
							<span class="text-xs text-gray-400">+{card.tags.length - 3}</span>
						{/if}
					</div>
				{/if}
			</div>

			<!-- Action Area -->
			<div class="flex items-center justify-between">
				<div class="text-xs text-gray-500">
					練習 #{card.id}
				</div>
				
				<div class="flex items-center gap-2">
					<a 
						href={path} 
						class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm group-hover:gap-3 transition-all"
					>
						查看練習
						<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</div>
		</div>
	</div>
</article>

<style lang="postcss">
	.practice-card {
		@apply bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer;
	}
	
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
