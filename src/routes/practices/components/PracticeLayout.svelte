<script lang="ts">
	import { ArrowLeft, Code, Palette, Info, Lightbulb, ChevronDown, ChevronUp } from 'lucide-svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { goto } from '$app/navigation';

	interface Props {
		practiceInfo: {
			id: number;
			title: string;
			description: string;
			type: 'css' | 'js';
			difficulty: 'easy' | 'medium' | 'hard';
			tags: string[];
			concepts: string[];
			codeExamples?: Array<{
				title: string;
				description: string;
				code: string;
				language: string;
			}>;
		};
		demo?: import('svelte').Snippet;
		tips?: import('svelte').Snippet;
	}

	let { practiceInfo, demo, tips }: Props = $props();
	let open = $state(false);

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

	const Icon = getTypeIcon(practiceInfo.type);

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

	// 難度顏色映射
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case 'easy':
				return 'bg-green-100 text-green-800';
			case 'medium':
				return 'bg-yellow-100 text-yellow-800';
			case 'hard':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
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
</script>

<svelte:head>
	<title>{practiceInfo.title} - 程式練習</title>
	<meta name="description" content={practiceInfo.description} />
</svelte:head>

<!-- Header -->
<header class="sticky top-0 z-50 border-b border-gray-200 bg-white">
	<div class="container mx-auto px-4 py-4">
		<div class="flex items-center justify-between">
			<button
				onclick={() => goto('/practices')}
				class="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
			>
				<ArrowLeft size={18} />
				回到練習列表
			</button>

			<div class="flex items-center gap-3">
				<span
					class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium {getTypeColor(
						practiceInfo.type
					)}"
				>
					<Icon size={14} />
					{getTypeName(practiceInfo.type)}
				</span>
				<span
					class="rounded-full px-2 py-1 text-xs font-medium {getDifficultyColor(
						practiceInfo.difficulty
					)}"
				>
					{getDifficultyName(practiceInfo.difficulty)}
				</span>
			</div>
		</div>
	</div>
</header>

<!-- Practice Info -->
<Collapsible.Root>
	<Collapsible.Trigger onclick={() => (open = !open)} class="flex items-center justify-between">
		<div class="flex items-center gap-2 px-3 py-2 text-gray-500">
			<span class="text-gray-600 transition-colors hover:text-gray-900">練習重點</span>

			{#if open}
				<ChevronUp size={18} />
			{:else}
				<ChevronDown size={18} />
			{/if}
		</div>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<section class="bg-gradient-to-br from-gray-50 to-blue-50 py-12">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-4xl">
					<div class="mb-4 flex items-center gap-2 text-sm text-gray-600">
						<span>練習 #{practiceInfo.id}</span>
						<span>•</span>
						<span>{getTypeName(practiceInfo.type)} 練習</span>
					</div>

					<h1 class="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
						{practiceInfo.title}
					</h1>
					<p class="mb-6 text-lg text-gray-600">
						{practiceInfo.description}
					</p>

					<!-- Tags -->
					<div class="mb-6 flex flex-wrap gap-2">
						{#each practiceInfo.tags as tag}
							<span
								class="rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-sm text-gray-700 backdrop-blur-sm"
							>
								#{tag}
							</span>
						{/each}
					</div>

					<!-- Key Concepts -->
					<div class="rounded-xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm">
						<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
							<Lightbulb size={20} />
							主要概念
						</h3>
						<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
							{#each practiceInfo.concepts as concept}
								<div class="flex items-center gap-2 text-gray-700">
									<div class="h-2 w-2 rounded-full bg-blue-500"></div>
									{concept}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</section>
	</Collapsible.Content>
</Collapsible.Root>

<!-- Practice Demo -->
<section class="practice-demo-section">
	<div class="demo-container">
		{@render demo?.()}
	</div>
</section>

<!-- Code Explanation -->
{#if practiceInfo.codeExamples && practiceInfo.codeExamples.length > 0}
	<section class="bg-white py-16">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<h2 class="mb-8 flex items-center gap-2 text-2xl font-bold text-gray-900">
					<Code size={24} />
					實作說明
				</h2>

				<div class="space-y-8">
					{#each practiceInfo.codeExamples as example, index}
						<div class="rounded-xl bg-gray-50 p-6">
							<h3 class="mb-4 text-lg font-semibold text-gray-900">
								{index + 1}. {example.title}
							</h3>
							<p class="mb-4 text-gray-700">
								{example.description}
							</p>
							<pre class="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"><code
									>{example.code}</code
								></pre>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}

<!-- Tips Section -->
<section class="bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="rounded-xl border border-blue-200 bg-white/80 p-6 backdrop-blur-sm">
				<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
					<Info size={20} />
					學習重點
				</h3>
				{#if tips}{@render tips()}{:else}
					<p class="text-gray-700">
						這個練習幫助你理解 {getTypeName(practiceInfo.type)} 的核心概念，通過實際操作加深對相關技術的理解。
					</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.practice-demo-section {
		@apply min-h-screen bg-gray-900;
	}

	.demo-container {
		@apply h-full w-full;
	}

	/* 響應式設計 */
	@media (max-width: 768px) {
		.practice-demo-section {
			@apply min-h-[70vh];
		}
	}
</style>
