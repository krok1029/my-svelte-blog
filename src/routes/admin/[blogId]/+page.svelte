<script lang="ts">
	import { run } from 'svelte/legacy';

	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { marked } from 'marked';
	import {
		Save,
		ArrowLeft,
		FileText,
		Tag,
		AlignLeft,
		Loader2,
		Trash2,
		AlertTriangle,
		Clock,
		Calendar,
		User
	} from 'lucide-svelte';
	import type { ActionData } from './$types';

	// shadcn/ui components
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Alert, AlertDescription } from '$lib/components/ui/alert/index.js';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog/index.js';
	import { toast } from 'svelte-sonner';

	interface BlogPost {
		id: string;
		title: string;
		content: string;
		brief: string;
		tags: string[];
		createdAt: string | Date;
		updatedAt: string | Date;
	}

	interface Props {
		form: ActionData;
		data: {
			blogPost: BlogPost;
		};
	}

	let { form, data }: Props = $props();

	let {
		id,
		content = '',
		title = '',
		tags,
		brief = '',
		createdAt,
		updatedAt
	} = $state(data.blogPost);
	let inputTags: string = $state(tags?.join(',') || '');
	let isSubmitting = $state(false);
	let isDeleting = $state(false);
	let showDeleteModal = $state(false);
	let hasUnsavedChanges = $state(false);
	let activeTab = $state('write');

	// 原始資料，用於檢測變更
	const originalData = {
		title: data.blogPost.title || '',
		inputTags: data.blogPost.tags?.join(',') || '',
		brief: data.blogPost.brief || '',
		content: data.blogPost.content || ''
	};

	// 檢測是否有未儲存的變更
	run(() => {
		hasUnsavedChanges =
			title !== originalData.title ||
			inputTags !== originalData.inputTags ||
			brief !== originalData.brief ||
			content !== originalData.content;
	});

	const handleDelete = () => {
		showDeleteModal = true;
	};

	const goBack = () => {
		if (hasUnsavedChanges) {
			if (confirm('您有未儲存的變更，確定要離開嗎？')) {
				goto('/admin');
			}
		} else {
			goto('/admin');
		}
	};

	// 格式化日期
	const formatDate = (dateString: string | Date) => {
		if (!dateString) return '-';
		const date = new Date(dateString);
		return date.toLocaleString('zh-TW', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const handleSubmit = () => {
		isSubmitting = true;
		return async ({
			update,
			result
		}: {
			update: () => Promise<void>;
			result: { type?: string };
		}) => {
			await update();
			isSubmitting = false;

			if (result?.type === 'failure') {
				toast.error('儲存失敗，請重試');
			} else {
				toast.success('儲存成功！');
				// 更新原始資料狀態，避免 hasUnsavedChanges 卡住
				// 這裡不需要更新 originalData，因為它是常量
			}
		};
	};

	const handleDeleteSubmit = () => {
		isDeleting = true;
		return async ({
			update,
			result
		}: {
			update: () => Promise<void>;
			result: { type?: string };
		}) => {
			await update();
			isDeleting = false;
			showDeleteModal = false;

			if (result?.type === 'success') {
				toast.success('文章已刪除');
			} else {
				toast.error('刪除失敗，請重試');
			}
		};
	};

	// 計算標籤預覽
	let tagList = $derived(
		inputTags
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag)
	);
</script>

<svelte:head>
	<title>編輯文章 - {title || '未命名文章'} - Admin Dashboard</title>
	<meta name="description" content="編輯部落格文章" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="sticky top-0 z-50 border-b bg-white">
		<div class="flex items-center justify-between p-6">
			<div class="flex items-center gap-6">
				<Button variant="ghost" size="sm" onclick={goBack} class="gap-2">
					<ArrowLeft size={16} />
					返回列表
				</Button>
				<div>
					<h1 class="text-2xl font-bold text-gray-900">編輯文章</h1>
					<div class="mt-1 flex items-center gap-4 text-sm text-gray-600">
						<span class="flex items-center gap-1">
							<User size={14} />
							文章 ID: {id}
						</span>
						{#if hasUnsavedChanges}
							<span class="flex items-center gap-2 font-medium text-amber-600">
								<div class="h-2 w-2 animate-pulse rounded-full bg-amber-500"></div>
								有未儲存的變更
							</span>
						{/if}
					</div>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<Button
					variant="destructive"
					size="sm"
					onclick={handleDelete}
					disabled={isDeleting}
					class="gap-2"
				>
					<Trash2 size={16} />
					刪除
				</Button>

				<Button
					type="submit"
					form="edit-form"
					disabled={isSubmitting || !title.trim() || !content.trim()}
					class="gap-2"
					variant={hasUnsavedChanges ? 'default' : 'secondary'}
				>
					{#if isSubmitting}
						<Loader2 size={16} class="animate-spin" />
						儲存中...
					{:else}
						<Save size={16} />
						儲存變更
					{/if}
				</Button>
			</div>
		</div>
	</header>

	<div class="container mx-auto max-w-7xl p-6">
		<!-- 文章資訊卡片 -->
		<Card class="mb-6">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<Clock size={20} />
					文章資訊
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex items-center gap-3">
						<Calendar size={16} class="text-gray-500" />
						<div>
							<div class="text-xs font-medium text-gray-500">建立時間</div>
							<div class="text-sm font-medium text-gray-900">{formatDate(createdAt)}</div>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<Clock size={16} class="text-gray-500" />
						<div>
							<div class="text-xs font-medium text-gray-500">最後更新</div>
							<div class="text-sm font-medium text-gray-900">{formatDate(updatedAt)}</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		<form
			id="edit-form"
			method="POST"
			action="?/update"
			use:enhance={handleSubmit}
			class="space-y-6"
		>
			<!-- 基本資訊卡片 -->
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<FileText size={20} />
						文章基本資訊
					</CardTitle>
					<CardDescription>編輯文章的標題、標籤和摘要資訊</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<!-- 標題 -->
						<div class="space-y-2 lg:col-span-2">
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
								<div class="mt-2 flex flex-wrap gap-2">
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
							<div class="text-right text-xs text-gray-500">
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
				</CardContent>
			</Card>

			<!-- 內容編輯卡片 -->
			<Card class="flex-1">
				<CardHeader>
					<div class="flex items-center justify-between">
						<div>
							<CardTitle>文章內容</CardTitle>
							<CardDescription>使用 Markdown 語法編輯文章內容</CardDescription>
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
								class="resize-none font-mono text-sm"
							/>
						</TabsContent>

						<TabsContent value="preview" class="mt-4">
							<div class="min-h-[500px] rounded-lg border bg-white p-6">
								<div class="prose max-w-none">
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

<!-- Delete Confirmation Dialog -->
<Dialog bind:open={showDeleteModal}>
	<DialogContent class="sm:max-w-md">
		<DialogHeader>
			<div class="flex items-center gap-3">
				<AlertTriangle class="text-amber-500" size={24} />
				<DialogTitle>確認刪除</DialogTitle>
			</div>
			<DialogDescription class="text-left">
				您確定要刪除文章「{title}」嗎？
				<br />
				<span class="font-medium text-red-600">此操作無法復原。</span>
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="flex gap-2">
			<Button variant="outline" onclick={() => (showDeleteModal = false)} disabled={isDeleting}>
				取消
			</Button>
			<form method="POST" action="?/delete" use:enhance={handleDeleteSubmit} class="inline">
				<input type="hidden" name="id" value={id || ''} />
				<Button type="submit" variant="destructive" disabled={isDeleting} class="gap-2">
					{#if isDeleting}
						<Loader2 size={16} class="animate-spin" />
						刪除中...
					{:else}
						確認刪除
					{/if}
				</Button>
			</form>
		</DialogFooter>
	</DialogContent>
</Dialog>
