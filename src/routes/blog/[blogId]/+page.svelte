<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { ArrowLeft, Share2, Tag } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	// shadcn/ui components
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { title, content, tags, image, brief } = data.blogPost || {};

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
				console.error('複製失敗:', err);
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

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Back Button -->
	<div class="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
		<div class="container mx-auto px-4 py-4">
			<Button variant="ghost" onclick={() => goto('/blog')} class="gap-2">
				<ArrowLeft size={18} />
				回到部落格列表
			</Button>
		</div>
	</div>

	<!-- Article Header -->
	<header
		class="bg-gradient-to-br from-purple-50 to-pink-50 py-16 dark:from-purple-900 dark:to-gray-900"
	>
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<!-- Title -->
				<h1
					class="mb-6 text-3xl leading-tight font-bold text-gray-900 lg:text-5xl dark:text-gray-100"
				>
					{title}
				</h1>

				<!-- Brief -->
				{#if brief}
					<p class="mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
						{brief}
					</p>
				{/if}

				<!-- Tags -->
				{#if tags && tags.length > 0}
					<div class="mb-8 flex flex-wrap gap-2">
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
		<div class="container mx-auto -mt-8 mb-12 px-4">
			<div class="mx-auto max-w-4xl">
				<div class="relative overflow-hidden rounded-xl shadow-lg">
					<img src={image} alt={title} class="h-64 w-full object-cover lg:h-96" />
				</div>
			</div>
		</div>
	{/if}

	<!-- Article Content -->
	<main class="container mx-auto px-4 pb-16">
		<article class="mx-auto max-w-4xl">
			<Card class="p-8">
				<CardContent class="p-0">
					<div class="prose prose-lg lg:prose-xl max-w-none">
						{@html marked(content || '', { mangle: false, headerIds: false })}
					</div>
				</CardContent>
			</Card>
		</article>
	</main>

	<!-- Article Footer -->
	<footer class="bg-gray-100 py-12 dark:bg-gray-800">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl">
				<Card>
					<CardContent class="p-8">
						<div class="mb-4 flex items-center gap-4">
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-xl font-bold text-white"
							>
								李
							</div>
							<div>
								<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">李明峯</h3>
								<p class="text-gray-600 dark:text-gray-300">Frontend Developer</p>
							</div>
						</div>
						<p class="mb-6 text-gray-700 dark:text-gray-300">
							熱愛前端技術的工程師，專注於創造優質的使用者體驗。喜歡分享技術心得與學習過程。
						</p>
						<div class="flex gap-4">
							<Button onclick={shareArticle} class="gap-2">
								<Share2 size={16} />
								分享這篇文章
							</Button>
							<Button variant="outline" onclick={() => goto('/blog')}>查看更多文章</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</footer>
</div>

<style lang="postcss">
	@reference "tailwindcss";
</style>
