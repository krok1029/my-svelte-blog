<script lang="ts">
	import { run } from 'svelte/legacy';

	import { goto } from '$app/navigation';
	import { marked } from 'marked';
	import { enhance } from '$app/forms';
	import { Save, ArrowLeft, FileText, Tag, AlignLeft, Loader2 } from 'lucide-svelte';
	import type { ActionData } from './$types';

	// shadcn/ui components
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { toast } from 'svelte-sonner';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	let content = $state(`# 我的新文章

歡迎來到我的部落格！這裡是文章內容的開始...

## 段落標題

您可以在這裡撰寫您的內容。支援 **粗體**、*斜體* 和 \`程式碼\` 等 Markdown 語法。

### 程式碼範例

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

### 清單範例

- 項目一
- 項目二
- 項目三

> 這是一個引用區塊
`);

	let title = $state('');
	let inputTags = $state('');
	let brief = $state('');
	let isSubmitting = $state(false);
	let activeTab = $state('write');

	// 如果有 form 數據，恢復表單狀態
	run(() => {
		if (form) {
			title = form.title || title;
			inputTags = form.tags || inputTags;
			brief = form.brief || brief;
			content = form.content || content;
		}
	});

	const goBack = () => {
		goto('/admin');
	};

	// Form enhancement
	const handleSubmit = () => {
		isSubmitting = true;
		return async ({ update, result }) => {
			isSubmitting = false;
			await update();
			
			if (result.type === 'success') {
				toast.success('文章發布成功！');
			} else if (result.type === 'failure') {
				toast.error('發布失敗，請重試');
			}
		};
	};

	// 計算標籤預覽
	$: tagList = inputTags
		.split(',')
		.map((tag) => tag.trim())
		.filter((tag) => tag);
</script>

<svelte:head>
	<title>建立新文章 - Admin Dashboard</title>
	<meta name="description" content="建立新的部落格文章" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="sticky top-0 z-50 bg-white border-b">
		<div class="flex items-center justify-between p-6">
			<div class="flex items-center gap-6">
				<Button variant="ghost" size="sm" onclick={goBack} class="gap-2">
					<ArrowLeft size={16} />
					返回列表
				</Button>
				<div>
					<h1 class="text-2xl font-bold text-gray-900">建立新文章</h1>
					<p class="text-sm text-gray-600">撰寫並發布您的部落格文章</p>
				</div>
			</div>
		</div>
	</header>

	<div class="container mx-auto p-6 max-w-7xl">
		<form method="POST" action="?/create" use:enhance={handleSubmit} class="space-y-6">
			<!-- 基本資訊卡片 -->
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<FileText size={20} />
						文章基本資訊
					</CardTitle>
					<CardDescription>
						填寫文章的標題、標籤和摘要資訊
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<!-- 標題 -->
						<div class="lg:col-span-2 space-y-2">
							<Label for="title" class="flex items-center gap-2">
								<FileText size={16} />
								文章標題
								<span class="text-red-500">*</span>
							</Label>
							<Input
								id="title"
								name="title"
								placeholder="輸入吸引人的文章標題..."
								bind:value={title}
								required
								class="text-lg"
							/>
						</div>

						<!-- 標籤 -->
						<div class="space-y-2">
							<Label for="tags" class="flex items-center gap-2">
								<Tag size={16} />
								標籤
							</Label>
							<Input
								id="tags"
								name="tags"
								placeholder="用逗號分隔標籤，例如：JavaScript, React, 前端"
								bind:value={inputTags}
							/>
							{#if tagList.length > 0}
								<div class="flex flex-wrap gap-2 mt-2">
									{#each tagList as tag}
										<Badge variant="secondary">{tag}</Badge>
									{/each}
								</div>
							{/if}
						</div>

						<!-- 摘要 -->
						<div class="space-y-2">
							<Label for="brief" class="flex items-center gap-2">
								<AlignLeft size={16} />
								文章摘要
							</Label>
							<Textarea
								id="brief"
								name="brief"
								placeholder="簡短描述文章內容，將顯示在文章列表中..."
								bind:value={brief}
								rows={3}
								class="resize-none"
							/>
							<div class="text-xs text-gray-500 text-right">
								{brief.length} / 200 字符
							</div>
						</div>
					</div>

					<!-- 錯誤訊息 -->
					{#if form?.error}
						<Alert variant="destructive">
							<AlertDescription>{form.error}</AlertDescription>
						</Alert>
					{/if}

					<!-- 提交按鈕 -->
					<div class="flex justify-end">
						<Button
							type="submit"
							disabled={isSubmitting || !title.trim() || !content.trim()}
							class="gap-2"
						>
							{#if isSubmitting}
								<Loader2 size={18} class="animate-spin" />
								發布中...
							{:else}
								<Save size={18} />
								發布文章
							{/if}
						</Button>
					</div>
				</CardContent>
			</Card>

			<!-- 內容編輯卡片 -->
			<Card class="flex-1">
				<CardHeader>
					<div class="flex items-center justify-between">
						<div>
							<CardTitle>文章內容</CardTitle>
							<CardDescription>
								使用 Markdown 語法撰寫文章內容
							</CardDescription>
						</div>
						<div class="flex items-center gap-4 text-sm text-gray-500">
							<span>{content.length} 字符</span>
							<Separator orientation="vertical" class="h-4" />
							<span>支援 Markdown</span>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs bind:value={activeTab} class="w-full">
						<TabsList class="grid w-full grid-cols-2">
							<TabsTrigger value="write">編輯</TabsTrigger>
							<TabsTrigger value="preview">預覽</TabsTrigger>
						</TabsList>
						
						<TabsContent value="write" class="mt-4">
							<Textarea
								name="content"
								bind:value={content}
								placeholder="開始撰寫您的文章內容..."
								required
								rows={20}
								class="font-mono text-sm resize-none"
							/>
						</TabsContent>
						
						<TabsContent value="preview" class="mt-4">
							<div class="border rounded-lg p-6 bg-white min-h-[500px]">
								<div class="prose prose-gray max-w-none">
									{@html marked(content, { mangle: false, headerIds: false })}
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</form>
	</div>
</div>

<style>
	/* Prose styles for preview */
	:global(.prose) {
		color: #374151;
		line-height: 1.7;
	}

	:global(.prose h1) {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 1rem;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	:global(.prose h2) {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1e293b;
		margin: 2rem 0 1rem;
	}

	:global(.prose h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1e293b;
		margin: 1.5rem 0 0.75rem;
	}

	:global(.prose p) {
		margin-bottom: 1rem;
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
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}

	:global(.prose code) {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		color: #dc2626;
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
</style>
