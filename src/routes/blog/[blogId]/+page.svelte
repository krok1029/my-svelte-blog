<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { Calendar, Clock, ArrowLeft, Share2, Tag, User } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	// shadcn/ui components
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Card, CardContent } from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { toast } from 'svelte-sonner';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
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
			try {
				await navigator.clipboard.writeText(window.location.href);
				toast.success('連結已複製到剪貼簿！');
			} catch (err) {
				toast.error('複製失敗，請手動複製網址');
			}
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

<div class="min-h-screen bg-gray-50">
	<!-- Back Button -->
	<div class="bg-white border-b">
		<div class="container mx-auto px-4 py-4">
			<Button variant="ghost" onclick={() => goto('/blog')} class="gap-2">
				<ArrowLeft size={18} />
				回到部落格列表
			</Button>
		</div>
	</div>

	<!-- Article Header -->
	<header class="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
		<div class="container mx-auto px-4">
			<div class="max-w-4xl mx-auto">
				<!-- Meta Information -->
				<div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
					<div class="flex items-center gap-2">
						<User size={16} />
						<span>李明峯</span>
					</div>
					{#if createdAt}
						<Separator orientation="vertical" class="h-4" />
						<div class="flex items-center gap-2">
							<Calendar size={16} />
							<span>{formatDate(createdAt)}</span>
						</div>
					{/if}
					<Separator orientation="vertical" class="h-4" />
					<div class="flex items-center gap-2">
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
							<Badge variant="secondary" class="gap-1">
								<Tag size={12} />
								{tag}
							</Badge>
						{/each}
					</div>
				{/if}

				<!-- Share Button -->
				<div class="flex items-center gap-4">
					<Button variant="outline" onclick={shareArticle} class="gap-2">
						<Share2 size={16} />
						分享文章
					</Button>
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
			<Card class="p-8">
				<CardContent class="p-0">
					<div class="prose prose-lg lg:prose-xl max-w-none">
						{@html marked(content, { mangle: false, headerIds: false })}
					</div>
				</CardContent>
			</Card>
		</article>
	</main>

	<!-- Article Footer -->
	<footer class="bg-gray-100 py-12">
		<div class="container mx-auto px-4">
			<div class="max-w-4xl mx-auto">
				<Card>
					<CardContent class="p-8">
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
							<Button onclick={shareArticle} class="gap-2">
								<Share2 size={16} />
								分享這篇文章
							</Button>
							<Button variant="outline" onclick={() => goto('/blog')}>
								查看更多文章
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</footer>
</div>

<style>
	/* 自定義 prose 樣式 */
	:global(.prose) {
		color: #374151;
		line-height: 1.7;
	}

	:global(.prose h1) {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		margin: 2rem 0 1rem;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	:global(.prose h2) {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1e293b;
		margin: 2rem 0 1rem;
		border-bottom: 1px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	:global(.prose h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1e293b;
		margin: 1.5rem 0 0.75rem;
	}

	:global(.prose p) {
		margin-bottom: 1rem;
		color: #4b5563;
	}

	:global(.prose ul),
	:global(.prose ol) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose blockquote) {
		border-left: 4px solid #a855f7;
		background: #faf5ff;
		padding: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}

	:global(.prose code) {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		color: #a855f7;
	}

	:global(.prose pre) {
		background: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	:global(.prose pre code) {
		background: none;
		color: inherit;
		padding: 0;
	}

	:global(.prose strong) {
		font-weight: 600;
		color: #1e293b;
	}

	:global(.prose em) {
		font-style: italic;
	}

	:global(.prose a) {
		color: #a855f7;
		text-decoration: none;
	}

	:global(.prose a:hover) {
		text-decoration: underline;
	}

	:global(.prose img) {
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		margin: 2rem 0;
	}

	:global(.prose table) {
		border-collapse: collapse;
		border: 1px solid #d1d5db;
		margin: 1.5rem 0;
		width: 100%;
	}

	:global(.prose th) {
		background: #f9fafb;
		border: 1px solid #d1d5db;
		padding: 0.75rem 1rem;
		font-weight: 600;
		text-align: left;
	}

	:global(.prose td) {
		border: 1px solid #d1d5db;
		padding: 0.75rem 1rem;
	}
</style>
