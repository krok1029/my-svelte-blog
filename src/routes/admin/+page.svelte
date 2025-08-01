<script lang="ts">
	import { page } from '$app/stores';
	import { authUser } from '$lib/authStore';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { BlogPost } from '$lib/types/BlogPost';
	import type { PageData, ActionData } from './$types';
	import {
		Plus,
		Edit,
		Trash2,
		Search,
		Filter,
		Calendar,
		Tag,
		FileText,
		LogOut,
		User,
		BarChart3,
		Settings,
		Eye,
		AlertTriangle
	} from 'lucide-svelte';
	import type { Timestamp } from 'firebase/firestore';

	// shadcn/ui components
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();

	let blogPosts: BlogPost[] = $state(data.blogPosts || []);
	let filteredPosts: BlogPost[] = $state([]);
	let searchQuery = $state('');
	let selectedTag = $state('');
	let isLoading = false;
	let showDeleteModal = $state(false);
	let postToDelete: BlogPost | null = $state(null);
	let isDeleting = $state(false);
	let successMessage = $state('');

	// 檢查 URL 參數中的成功訊息
	$effect(() => {
		if ($page.url.searchParams.get('success')) {
			successMessage = $page.url.searchParams.get('success') || '';
			// 3秒後清除訊息
			setTimeout(() => {
				successMessage = '';
				// 清除 URL 參數
				const url = new URL($page.url);
				url.searchParams.delete('success');
				goto(url.pathname, { replaceState: true });
			}, 3000);
		}
	});

	// 統計資料
	let totalPosts = $derived(blogPosts.length);
	let allTags = $derived([...new Set(blogPosts.flatMap((post) => post.tags || []))]);
	let recentPosts = $derived(blogPosts.slice(0, 5));

	// 過濾邏輯
	$effect(() => {
		filteredPosts = blogPosts.filter((post) => {
			const matchesSearch =
				!searchQuery ||
				post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.brief?.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
			return matchesSearch && matchesTag;
		});
	});

	const handleDelete = async (post: BlogPost) => {
		postToDelete = post;
		showDeleteModal = true;
	};

	const cancelDelete = () => {
		showDeleteModal = false;
		postToDelete = null;
	};

	// 處理刪除成功後的更新
	$effect(() => {
		if (form?.success) {
			// 重新載入頁面數據或從列表中移除已刪除的項目
			if (postToDelete) {
				blogPosts = blogPosts.filter((p) => p.id !== postToDelete?.id);
				showDeleteModal = false;
				postToDelete = null;
			}
		}
	});

	const logout = () => {
		$authUser = undefined;
		goto('/login');
	};

	const formatDate = (dateString?: string | Date | Timestamp) => {
		if (!dateString) return '-';
		const date = new Date(dateString.toLocaleString());
		return date.toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>部落格管理 - Admin Dashboard</title>
	<meta name="description" content="部落格文章管理系統" />
</svelte:head>

<div class="admin-container">
	<!-- Sidebar -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<div class="logo">
				<User size={24} />
				<span class="logo-text">Admin Panel</span>
			</div>
		</div>

		<nav class="sidebar-nav">
			<a href="/admin" class="nav-item active">
				<FileText size={20} />
				<span>文章管理</span>
			</a>
			<a href="/admin/analytics" class="nav-item">
				<BarChart3 size={20} />
				<span>統計分析</span>
			</a>
			<a href="/admin/settings" class="nav-item">
				<Settings size={20} />
				<span>系統設定</span>
			</a>
		</nav>

		<div class="sidebar-footer">
			<button class="logout-btn" onclick={logout}>
				<LogOut size={18} />
				<span>登出</span>
			</button>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="main-content">
		<!-- Header -->
		<header class="content-header">
			<div class="header-left">
				<h1 class="page-title">文章管理</h1>
				<p class="page-subtitle">管理您的部落格文章內容</p>
			</div>
			<div class="header-right">
				<a href="/admin/create" class="create-btn">
					<Plus size={20} />
					<span>新增文章</span>
				</a>
			</div>
		</header>

		<!-- Success Message -->
		{#if successMessage}
			<Alert class="mb-6 border-green-200 bg-green-50">
				<AlertDescription class="text-green-800">{successMessage}</AlertDescription>
			</Alert>
		{/if}

		<!-- Stats Cards -->
		<div class="stats-grid">
			<Card class="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
				<CardContent class="flex items-center gap-4 p-6">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
						<FileText size={24} class="text-blue-600" />
					</div>
					<div>
						<div class="text-2xl font-bold text-gray-900">{totalPosts}</div>
						<div class="text-sm text-gray-600">總文章數</div>
					</div>
				</CardContent>
			</Card>

			<Card class="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
				<CardContent class="flex items-center gap-4 p-6">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
						<Tag size={24} class="text-green-600" />
					</div>
					<div>
						<div class="text-2xl font-bold text-gray-900">{allTags.length}</div>
						<div class="text-sm text-gray-600">標籤數量</div>
					</div>
				</CardContent>
			</Card>

			<Card class="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
				<CardContent class="flex items-center gap-4 p-6">
					<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
						<Calendar size={24} class="text-purple-600" />
					</div>
					<div>
						<div class="text-2xl font-bold text-gray-900">{recentPosts.length}</div>
						<div class="text-sm text-gray-600">最近文章</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Filters -->
		<div class="filters-section">
			<div class="search-box">
				<div class="relative">
					<Search
						size={20}
						class="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
					/>
					<Input
						type="text"
						placeholder="搜尋文章標題或內容..."
						bind:value={searchQuery}
						class="pl-10"
					/>
				</div>
			</div>

			<div class="filter-group">
				<Filter size={16} class="text-gray-500" />
				<select bind:value={selectedTag} class="tag-filter">
					<option value="">所有標籤</option>
					{#each allTags as tag}
						<option value={tag}>{tag}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Posts Table -->
		<Card>
			{#if isLoading}
				<CardContent class="p-6">
					<div class="space-y-4">
						<Skeleton class="h-4 w-full" />
						<Skeleton class="h-4 w-3/4" />
						<Skeleton class="h-4 w-1/2" />
						<Skeleton class="h-4 w-2/3" />
					</div>
				</CardContent>
			{:else if filteredPosts.length === 0}
				<CardContent class="flex flex-col items-center justify-center py-16">
					<FileText size={48} class="mb-4 text-gray-400" />
					<h3 class="mb-2 text-lg font-semibold text-gray-900">沒有找到文章</h3>
					<p class="mb-6 text-gray-600">試試調整搜尋條件或建立新文章</p>
					<a
						href="/admin/create"
						class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					>
						<Plus size={16} />
						建立第一篇文章
					</a>
				</CardContent>
			{:else}
				<div class="table-wrapper">
					<table class="posts-table">
						<thead>
							<tr>
								<th>標題</th>
								<th>標籤</th>
								<th>摘要</th>
								<th>建立時間</th>
								<th>更新時間</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredPosts as post}
								<tr class="table-row">
									<td class="title-cell">
										<a href={`/admin/${post.id}`} class="post-title-link">
											{post.title || '未命名文章'}
										</a>
									</td>
									<td class="tags-cell">
										{#if post.tags && post.tags.length > 0}
											<div class="tags-container">
												{#each post.tags.slice(0, 2) as tag}
													<Badge variant="secondary" class="text-xs">{tag}</Badge>
												{/each}
												{#if post.tags.length > 2}
													<Badge variant="outline" class="text-xs">+{post.tags.length - 2}</Badge>
												{/if}
											</div>
										{:else}
											<span class="no-tags">無標籤</span>
										{/if}
									</td>
									<td class="brief-cell">
										<div class="brief-text">
											{post.brief || '無摘要'}
										</div>
									</td>

									<td class="date-cell">
										{formatDate(post.createdAt)}
									</td>

									<td class="date-cell">
										{formatDate(post.updatedAt)}
									</td>

									<td class="actions-cell">
										<div class="action-buttons">
											<a
												href={`/blog/${post.id}`}
												target="_blank"
												class="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
											>
												<Eye size={16} />
											</a>
											<a
												href={`/admin/${post.id}`}
												class="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
											>
												<Edit size={16} />
											</a>
											<Button
												variant="ghost"
												size="sm"
												onclick={() => handleDelete(post)}
												class="p-2 text-red-600 hover:bg-red-50 hover:text-red-700"
											>
												<Trash2 size={16} />
											</Button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</Card>
	</main>
</div>

<!-- Delete Confirmation Dialog -->
<Dialog bind:open={showDeleteModal}>
	<DialogContent class="sm:max-w-md">
		<DialogHeader>
			<DialogTitle class="flex items-center gap-2">
				<AlertTriangle size={20} class="text-red-600" />
				確認刪除
			</DialogTitle>
			<DialogDescription>
				您確定要刪除文章「{postToDelete?.title}」嗎？
				<br />
				<span class="font-medium text-red-600">此操作無法復原。</span>
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="gap-2">
			<Button variant="outline" onclick={cancelDelete} disabled={isDeleting}>取消</Button>
			<form
				method="POST"
				action="?/delete"
				use:enhance={() => {
					isDeleting = true;
					return async ({ update }) => {
						isDeleting = false;
						await update();
					};
				}}
				class="inline"
			>
				<input type="hidden" name="id" value={postToDelete?.id || ''} />
				<Button type="submit" variant="destructive" disabled={isDeleting} class="gap-2">
					{#if isDeleting}
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
						></div>
						刪除中...
					{:else}
						確認刪除
					{/if}
				</Button>
			</form>
		</DialogFooter>
	</DialogContent>
</Dialog>

<style>
	.admin-container {
		display: grid;
		grid-template-columns: 280px 1fr;
		min-height: 100vh;
		background: #f8fafc;
	}

	/* Sidebar */
	.sidebar {
		background: white;
		border-right: 1px solid #e2e8f0;
		display: flex;
		flex-direction: column;
	}

	.sidebar-header {
		padding: 24px;
		border-bottom: 1px solid #e2e8f0;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 12px;
		font-weight: 600;
		color: #1e293b;
	}

	.sidebar-nav {
		flex: 1;
		padding: 24px 0;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 24px;
		color: #64748b;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.nav-item:hover {
		background: #f1f5f9;
		color: #1e293b;
	}

	.nav-item.active {
		background: #eff6ff;
		color: #3b82f6;
		border-right: 3px solid #3b82f6;
	}

	.sidebar-footer {
		padding: 24px;
		border-top: 1px solid #e2e8f0;
	}

	.logout-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 12px;
		background: none;
		border: none;
		color: #64748b;
		cursor: pointer;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.logout-btn:hover {
		background: #fef2f2;
		color: #dc2626;
	}

	/* Main Content */
	.main-content {
		padding: 32px;
		overflow-y: auto;
	}

	.content-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 32px;
	}

	.page-title {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 4px;
	}

	.page-subtitle {
		color: #64748b;
		font-size: 1rem;
	}

	.create-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(45deg, #3b82f6, #1d4ed8);
		color: white;
		padding: 12px 20px;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.create-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 24px;
		margin-bottom: 32px;
	}

	/* Filters */
	.filters-section {
		display: flex;
		gap: 16px;
		margin-bottom: 24px;
		align-items: center;
	}

	.search-box {
		flex: 1;
		max-width: 400px;
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #64748b;
	}

	.tag-filter {
		padding: 8px 12px;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 0.9rem;
		background: white;
	}

	/* Table */
	.table-wrapper {
		overflow-x: auto;
	}

	.posts-table {
		width: 100%;
		border-collapse: collapse;
	}

	.posts-table th {
		background: #f8fafc;
		padding: 16px;
		text-align: left;
		font-weight: 600;
		color: #374151;
		border-bottom: 1px solid #e2e8f0;
		font-size: 0.9rem;
	}

	.posts-table td {
		padding: 16px;
		border-bottom: 1px solid #f1f5f9;
		vertical-align: top;
	}

	.table-row:hover {
		background: #f8fafc;
	}

	.post-title-link {
		color: #1e293b;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.post-title-link:hover {
		color: #3b82f6;
	}

	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.no-tags {
		color: #9ca3af;
		font-size: 0.9rem;
		font-style: italic;
	}

	.brief-text {
		max-width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #64748b;
		font-size: 0.9rem;
	}

	.date-cell {
		color: #64748b;
		font-size: 0.9rem;
		white-space: nowrap;
	}

	.action-buttons {
		display: flex;
		gap: 8px;
	}

	@media (max-width: 768px) {
		.admin-container {
			grid-template-columns: 1fr;
		}

		.sidebar {
			display: none;
		}

		.main-content {
			padding: 20px;
		}

		.content-header {
			flex-direction: column;
			gap: 16px;
			align-items: stretch;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.filters-section {
			flex-direction: column;
			align-items: stretch;
		}

		.search-box {
			max-width: none;
		}
	}
</style>
