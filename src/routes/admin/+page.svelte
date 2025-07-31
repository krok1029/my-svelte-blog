<script lang="ts">
	import { run } from 'svelte/legacy';

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
	run(() => {
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
	run(() => {
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
	run(() => {
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
			<div class="success-message">
				{successMessage}
			</div>
		{/if}

		<!-- Stats Cards -->
		<div class="stats-grid">
			<div class="stat-card">
				<div class="stat-icon">
					<FileText size={24} />
				</div>
				<div class="stat-content">
					<div class="stat-number">{totalPosts}</div>
					<div class="stat-label">總文章數</div>
				</div>
			</div>
			<div class="stat-card">
				<div class="stat-icon">
					<Tag size={24} />
				</div>
				<div class="stat-content">
					<div class="stat-number">{allTags.length}</div>
					<div class="stat-label">標籤數量</div>
				</div>
			</div>
			<div class="stat-card">
				<div class="stat-icon">
					<Calendar size={24} />
				</div>
				<div class="stat-content">
					<div class="stat-number">{recentPosts.length}</div>
					<div class="stat-label">最近文章</div>
				</div>
			</div>
		</div>

		<!-- Filters -->
		<div class="filters-section">
			<div class="search-box">
				<Search size={20} />
				<input
					type="text"
					placeholder="搜尋文章標題或內容..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>

			<div class="filter-group">
				<Filter size={16} />
				<select bind:value={selectedTag} class="tag-filter">
					<option value="">所有標籤</option>
					{#each allTags as tag}
						<option value={tag}>{tag}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Posts Table -->
		<div class="table-container">
			{#if isLoading}
				<div class="loading-state">
					<div class="loading-spinner"></div>
					<p>載入中...</p>
				</div>
			{:else if filteredPosts.length === 0}
				<div class="empty-state">
					<FileText size={48} />
					<h3>沒有找到文章</h3>
					<p>試試調整搜尋條件或建立新文章</p>
					<a href="/admin/create" class="empty-action-btn">
						<Plus size={16} />
						建立第一篇文章
					</a>
				</div>
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
													<span class="tag-badge">{tag}</span>
												{/each}
												{#if post.tags.length > 2}
													<span class="tag-more">+{post.tags.length - 2}</span>
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
											<a href={`/blog/${post.id}`} class="action-btn view-btn" target="_blank">
												<Eye size={16} />
											</a>
											<a href={`/admin/${post.id}`} class="action-btn edit-btn">
												<Edit size={16} />
											</a>
											<button class="action-btn delete-btn" onclick={() => handleDelete(post)}>
												<Trash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</main>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteModal && postToDelete}
	<div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
		<div class="modal-content" role="document">
			<div class="modal-header">
				<AlertTriangle size={24} />
				<h3 id="modal-title" class="modal-title">確認刪除</h3>
			</div>
			<div class="modal-body">
				<p>您確定要刪除文章「{postToDelete.title}」嗎？</p>
				<p class="modal-warning">此操作無法復原。</p>
			</div>
			<div class="modal-actions">
				<button
					type="button"
					class="modal-btn cancel-btn"
					onclick={cancelDelete}
					disabled={isDeleting}
				>
					取消
				</button>
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
				>
					<input type="hidden" name="id" value={postToDelete?.id || ''} />
					<button type="submit" class="modal-btn confirm-btn" disabled={isDeleting}>
						{#if isDeleting}
							<div class="btn-spinner"></div>
							刪除中...
						{:else}
							確認刪除
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

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

	.success-message {
		background: #f0fdf4;
		color: #16a34a;
		border: 1px solid #bbf7d0;
		padding: 12px 16px;
		border-radius: 8px;
		margin-bottom: 24px;
		font-size: 0.9rem;
		text-align: center;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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

	.stat-card {
		background: white;
		border-radius: 12px;
		padding: 24px;
		border: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		gap: 16px;
		transition: all 0.2s ease;
	}

	.stat-card:hover {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		background: #eff6ff;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #3b82f6;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		line-height: 1;
	}

	.stat-label {
		color: #64748b;
		font-size: 0.9rem;
		margin-top: 4px;
	}

	/* Filters */
	.filters-section {
		display: flex;
		gap: 16px;
		margin-bottom: 24px;
		align-items: center;
	}

	.search-box {
		position: relative;
		flex: 1;
		max-width: 400px;
	}

	.search-input {
		width: 100%;
		padding: 12px 12px 12px 44px;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
	.table-container {
		background: white;
		border-radius: 12px;
		border: 1px solid #e2e8f0;
		overflow: hidden;
	}

	.loading-state,
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		color: #64748b;
	}

	.loading-spinner {
		width: 32px;
		height: 32px;
		border: 3px solid #e2e8f0;
		border-top: 3px solid #3b82f6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 16px;
	}

	.empty-state h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #374151;
		margin: 16px 0 8px;
	}

	.empty-action-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #3b82f6;
		color: white;
		padding: 10px 16px;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.9rem;
		margin-top: 16px;
		transition: background 0.2s ease;
	}

	.empty-action-btn:hover {
		background: #1d4ed8;
	}

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

	.tag-badge {
		background: #eff6ff;
		color: #3b82f6;
		padding: 2px 8px;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.tag-more {
		color: #64748b;
		font-size: 0.75rem;
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

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.view-btn {
		background: #f0f9ff;
		color: #0ea5e9;
	}

	.view-btn:hover {
		background: #e0f2fe;
	}

	.edit-btn {
		background: #fef3c7;
		color: #d97706;
	}

	.edit-btn:hover {
		background: #fde68a;
	}

	.delete-btn {
		background: #fef2f2;
		color: #dc2626;
	}

	.delete-btn:hover {
		background: #fee2e2;
	}

	/* Modal */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		background: white;
		border-radius: 12px;
		padding: 24px;
		width: 90%;
		max-width: 400px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.modal-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}

	.modal-title {
		font-size: 1.2rem;
		font-weight: 600;
		color: #1e293b;
	}

	.modal-body {
		margin-bottom: 24px;
		color: #64748b;
		line-height: 1.6;
	}

	.modal-warning {
		color: #dc2626;
		font-size: 0.9rem;
		margin-top: 8px;
	}

	.modal-actions {
		display: flex;
		gap: 12px;
		justify-content: flex-end;
	}

	.modal-actions form {
		display: contents;
	}

	.modal-btn {
		padding: 8px 16px;
		border-radius: 6px;
		border: none;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.cancel-btn {
		background: #f1f5f9;
		color: #64748b;
	}

	.cancel-btn:hover:not(:disabled) {
		background: #e2e8f0;
	}

	.confirm-btn {
		background: #dc2626;
		color: white;
	}

	.confirm-btn:hover:not(:disabled) {
		background: #b91c1c;
	}

	.modal-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.btn-spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
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
