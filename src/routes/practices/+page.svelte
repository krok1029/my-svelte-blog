<script lang="ts">
	import Card from './components/PracticeCard.svelte';
	import { Search, Filter, Code, Palette, Zap } from 'lucide-svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let searchQuery = $state('');
	let selectedType = $state('');

	// 獲取所有類型
	let allTypes = $derived([...new Set(data.practice.map((item) => item.type))]);

	// 過濾練習
	let filteredPractices = $derived(
		data.practice.filter((item) => {
			const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesType = !selectedType || item.type === selectedType;
			return matchesSearch && matchesType;
		})
	);

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
		<div class="mx-auto max-w-4xl text-center">
			<div class="mb-6 flex justify-center">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
				>
					<Code class="text-white" size={32} />
				</div>
			</div>
			<h1 class="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">程式練習</h1>
			<p class="mb-8 text-xl text-gray-600">日常的程式練習與實驗，記錄學習過程中的小作品</p>

			<!-- Search Bar -->
			<div class="mx-auto max-w-2xl">
				<div class="relative">
					<Search
						class="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400"
						size={20}
					/>
					<input
						type="text"
						placeholder="搜尋練習..."
						bind:value={searchQuery}
						class="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-12 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Filter Section -->
<section class="border-b border-gray-100 bg-white py-8">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<div class="flex flex-wrap items-center gap-4">
				<div class="flex items-center gap-2 text-gray-600">
					<Filter size={18} />
					<span class="font-medium">篩選類型：</span>
				</div>

				<button
					onclick={() => (selectedType = '')}
					class="filter-tag {selectedType === '' ? 'active' : ''}"
				>
					<Zap size={14} />
					全部
				</button>

				{#each allTypes as type}
					{@const Icon = getTypeIcon(type)}
					<button
						onclick={() => (selectedType = type)}
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
<section class="bg-gray-50 py-16">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			{#if filteredPractices.length > 0}
				<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{#each filteredPractices as card}
						<div class="practice-card-wrapper">
							<Card {card} />
						</div>
					{/each}
				</div>
			{:else}
				<div class="py-16 text-center">
					<div
						class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200"
					>
						<Search class="text-gray-400" size={32} />
					</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">找不到相關練習</h3>
					<p class="mb-6 text-gray-600">試試調整搜尋關鍵字或選擇不同的類型</p>
					<button
						onclick={() => {
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
<section class="bg-white py-16">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-8 text-center text-2xl font-bold text-gray-900">練習統計</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="stat-card">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
						<Palette class="text-blue-600" size={24} />
					</div>
					<div class="mb-2 text-3xl font-bold text-gray-900">
						{data.practice.filter((p) => p.type === 'css').length}
					</div>
					<div class="text-gray-600">CSS 練習</div>
				</div>

				<div class="stat-card">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
						<Code class="text-yellow-600" size={24} />
					</div>
					<div class="mb-2 text-3xl font-bold text-gray-900">
						{data.practice.filter((p) => p.type === 'js').length}
					</div>
					<div class="text-gray-600">JavaScript 練習</div>
				</div>

				<div class="stat-card">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
						<Zap class="text-emerald-600" size={24} />
					</div>
					<div class="mb-2 text-3xl font-bold text-gray-900">
						{data.practice.length}
					</div>
					<div class="text-gray-600">總練習數</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.filter-tag {
		@apply inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-all hover:border-emerald-300 hover:text-emerald-600;
	}

	.filter-tag.active {
		@apply border-emerald-300 bg-emerald-100 text-emerald-700;
	}

	.practice-card-wrapper {
		@apply transform transition-all duration-300 hover:-translate-y-1;
	}

	.stat-card {
		@apply rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md;
	}
</style>
