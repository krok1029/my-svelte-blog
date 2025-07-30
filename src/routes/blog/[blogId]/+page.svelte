<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { Calendar, Clock, ArrowLeft, Share2, Tag, User } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const { title, content, createdAt, tags, image, brief } = data.blogPost;

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
		const wordCount = content.length / 2;
		return Math.ceil(wordCount / wordsPerMinute);
	};

	// 分享功能
	const shareArticle = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: title,
					text: brief,
					url: window.location.href
				});
			} catch (err) {
				console.log('分享失敗:', err);
			}
		} else {
			// 複製到剪貼簿
			navigator.clipboard.writeText(window.location.href);
			alert('連結已複製到剪貼簿！');
		}
	};
</script>

<svelte:head>
	<title>{title} - 李明峯的部落格</title>
	<meta name="description" content={brief || title} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={brief || title} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
</svelte:head>

<!-- Back Button -->
<div class="bg-white border-b border-gray-100">
	<div class="container mx-auto px-4 py-4">
		<button
			on:click={() => goto('/blog')}
			class="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
		>
			<ArrowLeft size={18} />
			回到部落格列表
		</button>
	</div>
</div>

<!-- Article Header -->
<header class="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<!-- Meta Information -->
			<div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
				<div class="flex items-center gap-1">
					<User size={16} />
					<span>李明峯</span>
				</div>
				{#if createdAt}
					<div class="flex items-center gap-1">
						<Calendar size={16} />
						<span>{formatDate(createdAt)}</span>
					</div>
				{/if}
				<div class="flex items-center gap-1">
					<Clock size={16} />
					<span>{estimateReadingTime(content)} 分鐘閱讀</span>
				</div>
			</div>

			<!-- Title -->
			<h1 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
				{title}
			</h1>

			<!-- Brief -->
			{#if brief}
				<p class="text-xl text-gray-600 mb-8 leading-relaxed">
					{brief}
				</p>
			{/if}

			<!-- Tags -->
			{#if tags && tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-8">
					{#each tags as tag}
						<span
							class="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm text-purple-700 rounded-full px-3 py-1 text-sm font-medium border border-purple-200"
						>
							<Tag size={12} />
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			<!-- Share Button -->
			<div class="flex items-center gap-4">
				<button
					on:click={shareArticle}
					class="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-colors"
				>
					<Share2 size={16} />
					分享文章
				</button>
			</div>
		</div>
	</div>
</header>

<!-- Featured Image -->
{#if image}
	<div class="container mx-auto px-4 -mt-8 mb-12">
		<div class="max-w-4xl mx-auto">
			<div class="relative rounded-xl overflow-hidden shadow-lg">
				<img src={image} alt={title} class="w-full h-64 lg:h-96 object-cover" />
			</div>
		</div>
	</div>
{/if}

<!-- Article Content -->
<main class="container mx-auto px-4 pb-16">
	<article class="max-w-4xl mx-auto">
		<div
			class="prose prose-lg lg:prose-xl mx-auto prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
		>
			{@html marked(content, { mangle: false, headerIds: false })}
		</div>
	</article>
</main>

<!-- Article Footer -->
<footer class="bg-gray-50 py-12">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<div class="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
				<div class="flex items-center gap-4 mb-4">
					<div
						class="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold"
					>
						李
					</div>
					<div>
						<h3 class="text-xl font-semibold text-gray-900">李明峯</h3>
						<p class="text-gray-600">Frontend Developer</p>
					</div>
				</div>
				<p class="text-gray-700 mb-6">
					熱愛前端技術的工程師，專注於創造優質的使用者體驗。喜歡分享技術心得與學習過程。
				</p>
				<div class="flex gap-4">
					<button on:click={shareArticle} class="btn-primary">
						<Share2 size={16} />
						分享這篇文章
					</button>
					<button on:click={() => goto('/blog')} class="btn-secondary"> 查看更多文章 </button>
				</div>
			</div>
		</div>
	</div>
</footer>

<style lang="postcss">
	/* 自定義 prose 樣式 */
	:global(.prose h1) {
		@apply text-3xl font-bold mt-8 mb-4;
	}

	:global(.prose h2) {
		@apply text-2xl font-semibold mt-8 mb-4 border-b border-gray-200 pb-2;
	}

	:global(.prose h3) {
		@apply text-xl font-semibold mt-6 mb-3;
	}

	:global(.prose blockquote) {
		@apply border-l-4 border-purple-300 bg-purple-50 pl-4 py-2 my-6 italic;
	}

	:global(.prose code) {
		@apply text-gray-200 bg-transparent px-0;
	}

	:global(.prose ul) {
		@apply my-4;
	}

	:global(.prose li) {
		@apply my-2;
	}

	:global(.prose img) {
		@apply rounded-lg shadow-md my-8;
	}

	:global(.prose table) {
		@apply border-collapse border border-gray-300 my-6;
	}

	:global(.prose th) {
		@apply bg-gray-50 border border-gray-300 px-4 py-2 font-semibold;
	}

	:global(.prose td) {
		@apply border border-gray-300 px-4 py-2;
	}
</style>
