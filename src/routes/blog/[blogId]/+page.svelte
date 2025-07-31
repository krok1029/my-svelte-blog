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
