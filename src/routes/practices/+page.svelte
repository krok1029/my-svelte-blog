<script lang="ts">
	import Card from './components/PracticeCard.svelte';
	import { Search, Filter, Code, Palette, Zap } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let searchQuery = '';
	let selectedType = '';

	// 獲取所有類型
	$: allTypes = [...new Set(data.practice.map((item) => item.type))];

	// 過濾練習
	$: filteredPractices = data.practice.filter((item) => {
		const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesType = !selectedType || item.type === selectedType;
		return matchesSearch && matchesType;
	});

	// 類型圖示映射
	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'css':
				return Palette;
			case 'js':
				return Code;
			default:
				return Zap;
		}
	};

	// 類型顏色映射
	const getTypeColor = (type: string) => {
		switch (type) {
			case 'css':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'js':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};
</script>

<svelte:head>
	<title>程式練習 - 李明峯 | Frontend Developer</title>
	<meta
		name="description"
		content="李明峯的前端程式練習集合，包含 CSS 和 JavaScript 的各種小練習"
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<div class="flex justify-center mb-6">
				<div
					class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center"
				>
					<Code class="text-white" size={32} />
				</div>
			</div>
			<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">程式練習</h1>
			<p class="text-xl text-gray-600 mb-8">日常的程式練習與實驗，記錄學習過程中的小作品</p>

			<!-- Search Bar -->
			<div class="max-w-2xl mx-auto">
				<div class="relative">
					<Search
						class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={20}
					/>
					<input
						type="text"
						placeholder="搜尋練習..."
						bind:value={searchQuery}
						class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Filter Section -->
<section class="py-8 bg-white border-b border-gray-100">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="flex flex-wrap items-center gap-4">
				<div class="flex items-center gap-2 text-gray-600">
					<Filter size={18} />
					<span class="font-medium">篩選類型：</span>
				</div>

				<button
					on:click={() => (selectedType = '')}
					class="filter-tag {selectedType === '' ? 'active' : ''}"
				>
					<Zap size={14} />
					全部
				</button>

				{#each allTypes as type}
					{@const Icon = getTypeIcon(type)}
					<button
						on:click={() => (selectedType = type)}
						class="filter-tag {selectedType === type ? 'active' : ''}"
					>
						<Icon size={14} />
						{type.toUpperCase()}
					</button>
				{/each}
			</div>

			<div class="mt-4 text-sm text-gray-500">
				共找到 {filteredPractices.length} 個練習
			</div>
		</div>
	</div>
</section>

<!-- Practice Grid -->
<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			{#if filteredPractices.length > 0}
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{#each filteredPractices as card}
						<div class="practice-card-wrapper">
							<Card {card} />
						</div>
					{/each}
				</div>
			{:else}
				<div class="text-center py-16">
					<div
						class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center"
					>
						<Search class="text-gray-400" size={32} />
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-2">找不到相關練習</h3>
					<p class="text-gray-600 mb-6">試試調整搜尋關鍵字或選擇不同的類型</p>
					<button
						on:click={() => {
							searchQuery = '';
							selectedType = '';
						}}
						class="btn-primary"
					>
						清除篩選條件
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">練習統計</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="stat-card">
					<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
						<Palette class="text-blue-600" size={24} />
					</div>
					<div class="text-3xl font-bold text-gray-900 mb-2">
						{data.practice.filter((p) => p.type === 'css').length}
					</div>
					<div class="text-gray-600">CSS 練習</div>
				</div>

				<div class="stat-card">
					<div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
						<Code class="text-yellow-600" size={24} />
					</div>
					<div class="text-3xl font-bold text-gray-900 mb-2">
						{data.practice.filter((p) => p.type === 'js').length}
					</div>
					<div class="text-gray-600">JavaScript 練習</div>
				</div>

				<div class="stat-card">
					<div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
						<Zap class="text-emerald-600" size={24} />
					</div>
					<div class="text-3xl font-bold text-gray-900 mb-2">
						{data.practice.length}
					</div>
					<div class="text-gray-600">總練習數</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.filter-tag {
		@apply inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-all;
	}

	.filter-tag.active {
		@apply bg-emerald-100 border-emerald-300 text-emerald-700;
	}

	.practice-card-wrapper {
		@apply transform transition-all duration-300 hover:-translate-y-1;
	}

	.stat-card {
		@apply bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow;
	}
</style>
