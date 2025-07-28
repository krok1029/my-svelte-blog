<script lang="ts">
	import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import {
		Save,
		ArrowLeft,
		Eye,
		EyeOff,
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

	export let data;

	let { id, content = '', title = '', tags, brief = '', createdAt, updatedAt } = data.blogPost;
	let inputTags: string = tags?.join(',') || '';
	let showPreview = true;
	let isSaving = false;
	let isDeleting = false;
	let saveMessage = '';
	let showDeleteModal = false;
	let hasUnsavedChanges = false;

	// 原始資料，用於檢測變更
	let originalData = {
		title: title || '',
		inputTags: inputTags || '',
		brief: brief || '',
		content: content || ''
	};

	// 檢測是否有未儲存的變更
	$: hasUnsavedChanges =
		title !== originalData.title ||
		inputTags !== originalData.inputTags ||
		brief !== originalData.brief ||
		content !== originalData.content;

	const handleSave = async () => {
		if (!title.trim()) {
			saveMessage = '請輸入文章標題';
			return;
		}

		if (!content.trim()) {
			saveMessage = '請輸入文章內容';
			return;
		}

		isSaving = true;
		saveMessage = '';

		try {
			const res = await blogRepo.updateBlogPost(
				id,
				title.trim(),
				inputTags
					? inputTags
							.split(',')
							.map((tag) => tag.trim())
							.filter((tag) => tag)
					: [],
				content.trim()
			);

			if (res) {
				saveMessage = '文章更新成功！';
				// 更新原始資料
				originalData = {
					title: title.trim(),
					inputTags: inputTags,
					brief: brief.trim(),
					content: content.trim()
				};

				// 清除未儲存變更標記
				hasUnsavedChanges = false;

				setTimeout(() => {
					saveMessage = '';
				}, 3000);
			}
		} catch (error) {
			console.error('更新文章失敗:', error);
			saveMessage = '更新失敗，請稍後再試';
		} finally {
			isSaving = false;
		}
	};

	const handleDelete = () => {
		showDeleteModal = true;
	};

	const confirmDelete = async () => {
		isDeleting = true;
		try {
			const res = await blogRepo.deleteBlogPost(Number(id));
			if (res) {
				goto('/admin');
			}
		} catch (error) {
			console.error('刪除失敗:', error);
			saveMessage = '刪除失敗，請稍後再試';
		} finally {
			isDeleting = false;
			showDeleteModal = false;
		}
	};

	const cancelDelete = () => {
		showDeleteModal = false;
	};

	const togglePreview = () => {
		showPreview = !showPreview;
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
</script>

<svelte:head>
	<title>編輯文章 - {title || '未命名文章'} - Admin Dashboard</title>
	<meta name="description" content="編輯部落格文章" />
</svelte:head>

<div class="edit-container">
	<!-- Header -->
	<header class="edit-header">
		<div class="header-left">
			<button class="back-btn" on:click={goBack}>
				<ArrowLeft size={20} />
				<span>返回列表</span>
			</button>
			<div class="header-info">
				<h1 class="page-title">編輯文章</h1>
				<div class="page-meta">
					<span class="meta-item">
						<User size={14} />
						文章 ID: {id}
					</span>
					{#if hasUnsavedChanges}
						<span class="unsaved-indicator">
							<div class="unsaved-dot" />
							有未儲存的變更
						</span>
					{/if}
				</div>
			</div>
		</div>

		<div class="header-actions">
			<button class="preview-toggle" on:click={togglePreview}>
				{#if showPreview}
					<EyeOff size={18} />
					<span>隱藏預覽</span>
				{:else}
					<Eye size={18} />
					<span>顯示預覽</span>
				{/if}
			</button>

			<button class="delete-btn" on:click={handleDelete} disabled={isDeleting}>
				<Trash2 size={18} />
				<span>刪除</span>
			</button>

			<button
				class="save-btn"
				class:has-changes={hasUnsavedChanges}
				on:click={handleSave}
				disabled={isSaving || !title.trim() || !content.trim()}
			>
				{#if isSaving}
					<Loader2 size={18} class="animate-spin" />
					<span>儲存中...</span>
				{:else}
					<Save size={18} />
					<span>儲存變更</span>
				{/if}
			</button>
		</div>
	</header>

	<!-- Article Info -->
	<div class="article-info">
		<div class="info-grid">
			<div class="info-item">
				<Calendar size={16} />
				<div class="info-content">
					<span class="info-label">建立時間</span>
					<span class="info-value">{formatDate(createdAt)}</span>
				</div>
			</div>
			<div class="info-item">
				<Clock size={16} />
				<div class="info-content">
					<span class="info-label">最後更新</span>
					<span class="info-value">{formatDate(updatedAt)}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Form Fields -->
	<div class="form-section">
		<div class="form-grid">
			<!-- Title -->
			<div class="form-group full-width">
				<label for="title" class="form-label">
					<FileText size={16} />
					<span>文章標題</span>
					<span class="required">*</span>
				</label>
				<input
					id="title"
					type="text"
					placeholder="輸入吸引人的文章標題..."
					class="form-input"
					bind:value={title}
					required
				/>
			</div>

			<!-- Tags -->
			<div class="form-group">
				<label for="tags" class="form-label">
					<Tag size={16} />
					<span>標籤</span>
				</label>
				<input
					id="tags"
					type="text"
					placeholder="用逗號分隔標籤，例如：JavaScript, React, 前端"
					class="form-input"
					bind:value={inputTags}
				/>
				<div class="form-hint">
					{#if inputTags}
						<div class="tags-preview">
							{#each inputTags
								.split(',')
								.map((tag) => tag.trim())
								.filter((tag) => tag) as tag}
								<span class="tag-preview">{tag}</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Brief -->
			<div class="form-group">
				<label for="brief" class="form-label">
					<AlignLeft size={16} />
					<span>文章摘要</span>
				</label>
				<textarea
					id="brief"
					placeholder="簡短描述文章內容，將顯示在文章列表中..."
					class="form-textarea"
					rows="3"
					bind:value={brief}
				/>
				<div class="char-count">
					{brief.length} / 200 字符
				</div>
			</div>
		</div>

		<!-- Status Message -->
		{#if saveMessage}
			<div
				class="status-message"
				class:success={saveMessage.includes('成功')}
				class:error={saveMessage.includes('失敗')}
			>
				{saveMessage}
			</div>
		{/if}
	</div>

	<!-- Editor -->
	<div class="editor-section">
		<div class="editor-header">
			<h2 class="editor-title">文章內容</h2>
			<div class="editor-info">
				<span class="word-count">{content.length} 字符</span>
				<span class="format-hint">支援 Markdown 語法</span>
			</div>
		</div>

		<div class="editor-container" class:preview-mode={showPreview}>
			<!-- Editor Panel -->
			<div class="editor-panel">
				<div class="editor-toolbar">
					<span class="toolbar-title">編輯器</span>
					<div class="toolbar-actions">
						<button
							class="toolbar-btn"
							title="粗體"
							on:click={() => {
								const textarea = document.querySelector('.editor-textarea');
								const start = textarea.selectionStart;
								const end = textarea.selectionEnd;
								const selectedText = content.substring(start, end);
								const newText =
									content.substring(0, start) + `**${selectedText}**` + content.substring(end);
								content = newText;
							}}
						>
							<strong>B</strong>
						</button>
						<button
							class="toolbar-btn"
							title="斜體"
							on:click={() => {
								const textarea = document.querySelector('.editor-textarea');
								const start = textarea.selectionStart;
								const end = textarea.selectionEnd;
								const selectedText = content.substring(start, end);
								const newText =
									content.substring(0, start) + `*${selectedText}*` + content.substring(end);
								content = newText;
							}}
						>
							<em>I</em>
						</button>
						<button
							class="toolbar-btn"
							title="程式碼"
							on:click={() => {
								const textarea = document.querySelector('.editor-textarea');
								const start = textarea.selectionStart;
								const end = textarea.selectionEnd;
								const selectedText = content.substring(start, end);
								const newText =
									content.substring(0, start) + `\`${selectedText}\`` + content.substring(end);
								content = newText;
							}}
						>
							<code>&lt;/&gt;</code>
						</button>
					</div>
				</div>
				<textarea
					class="editor-textarea"
					bind:value={content}
					placeholder="開始撰寫您的文章內容..."
				/>
			</div>

			<!-- Preview Panel -->
			{#if showPreview}
				<div class="preview-panel">
					<div class="preview-header">
						<span class="toolbar-title">預覽</span>
						<a href={`/blog/${id}`} target="_blank" class="preview-link">
							<Eye size={14} />
							<span>前台預覽</span>
						</a>
					</div>
					<div class="preview-content prose">
						{@html marked(content, { mangle: false, headerIds: false })}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteModal}
	<div class="modal-overlay" on:click={cancelDelete}>
		<div class="modal-content" on:click|stopPropagation>
			<div class="modal-header">
				<AlertTriangle class="modal-icon" size={24} />
				<h3 class="modal-title">確認刪除文章</h3>
			</div>
			<div class="modal-body">
				<p>您確定要刪除文章「<strong>{title}</strong>」嗎？</p>
				<p class="modal-warning">此操作無法復原，文章將永久刪除。</p>
			</div>
			<div class="modal-actions">
				<button class="modal-btn cancel-btn" on:click={cancelDelete} disabled={isDeleting}>
					取消
				</button>
				<button class="modal-btn confirm-btn" on:click={confirmDelete} disabled={isDeleting}>
					{#if isDeleting}
						<div class="btn-spinner" />
						刪除中...
					{:else}
						確認刪除
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.edit-container {
		min-height: 100vh;
		background: #f8fafc;
		display: flex;
		flex-direction: column;
	}

	/* Header */
	.edit-header {
		background: white;
		border-bottom: 1px solid #e2e8f0;
		padding: 24px 32px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		color: #64748b;
		cursor: pointer;
		padding: 8px 12px;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.back-btn:hover {
		background: #f1f5f9;
		color: #1e293b;
	}

	.page-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 4px;
	}

	.page-meta {
		display: flex;
		align-items: center;
		gap: 16px;
		font-size: 0.8rem;
		color: #64748b;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.unsaved-indicator {
		display: flex;
		align-items: center;
		gap: 6px;
		color: #f59e0b;
		font-weight: 500;
	}

	.unsaved-dot {
		width: 6px;
		height: 6px;
		background: #f59e0b;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.header-actions {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.preview-toggle {
		display: flex;
		align-items: center;
		gap: 8px;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		color: #64748b;
		padding: 8px 16px;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.preview-toggle:hover {
		background: #f1f5f9;
		border-color: #cbd5e0;
	}

	.delete-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #dc2626;
		padding: 8px 16px;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.delete-btn:hover:not(:disabled) {
		background: #fee2e2;
		border-color: #f87171;
	}

	.delete-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.save-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(45deg, #3b82f6, #1d4ed8);
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.save-btn.has-changes {
		background: linear-gradient(45deg, #10b981, #059669);
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
	}

	.save-btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
	}

	.save-btn.has-changes:hover:not(:disabled) {
		box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
	}

	.save-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	/* Article Info */
	.article-info {
		background: white;
		border-bottom: 1px solid #f1f5f9;
		padding: 16px 32px;
	}

	.info-grid {
		display: flex;
		gap: 32px;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #64748b;
		font-size: 0.9rem;
	}

	.info-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.info-label {
		font-size: 0.75rem;
		color: #9ca3af;
		font-weight: 500;
	}

	.info-value {
		color: #374151;
		font-weight: 500;
	}

	/* Form Section */
	.form-section {
		padding: 32px;
		background: white;
		border-bottom: 1px solid #e2e8f0;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 24px;
		margin-bottom: 24px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	.form-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		color: #374151;
		font-size: 0.9rem;
	}

	.required {
		color: #dc2626;
	}

	.form-input,
	.form-textarea {
		padding: 12px 16px;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s ease;
		background: white;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
		font-family: inherit;
	}

	.form-hint {
		margin-top: 8px;
	}

	.tags-preview {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tag-preview {
		background: #eff6ff;
		color: #3b82f6;
		padding: 2px 8px;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.char-count {
		font-size: 0.8rem;
		color: #9ca3af;
		text-align: right;
	}

	.status-message {
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 0.9rem;
		text-align: center;
	}

	.status-message.success {
		background: #f0fdf4;
		color: #16a34a;
		border: 1px solid #bbf7d0;
	}

	.status-message.error {
		background: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	/* Editor Section */
	.editor-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: white;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 32px 16px;
		border-bottom: 1px solid #f1f5f9;
	}

	.editor-title {
		font-size: 1.2rem;
		font-weight: 600;
		color: #1e293b;
	}

	.editor-info {
		display: flex;
		gap: 16px;
		align-items: center;
		font-size: 0.8rem;
		color: #64748b;
	}

	.word-count {
		font-weight: 500;
	}

	.format-hint {
		opacity: 0.8;
	}

	.editor-container {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr;
		min-height: 500px;
	}

	.editor-container.preview-mode {
		grid-template-columns: 1fr 1fr;
	}

	.editor-panel,
	.preview-panel {
		display: flex;
		flex-direction: column;
		border-right: 1px solid #f1f5f9;
	}

	.preview-panel {
		border-right: none;
		border-left: 1px solid #f1f5f9;
	}

	.editor-toolbar,
	.preview-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 24px;
		background: #f8fafc;
		border-bottom: 1px solid #f1f5f9;
	}

	.toolbar-title {
		font-size: 0.9rem;
		font-weight: 600;
		color: #374151;
	}

	.toolbar-actions {
		display: flex;
		gap: 8px;
	}

	.toolbar-btn {
		width: 28px;
		height: 28px;
		border: 1px solid #d1d5db;
		background: white;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		transition: all 0.2s ease;
	}

	.toolbar-btn:hover {
		background: #f3f4f6;
		border-color: #9ca3af;
	}

	.preview-link {
		display: flex;
		align-items: center;
		gap: 6px;
		color: #3b82f6;
		text-decoration: none;
		font-size: 0.8rem;
		padding: 4px 8px;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.preview-link:hover {
		background: #eff6ff;
	}

	.editor-textarea {
		flex: 1;
		border: none;
		padding: 24px;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.9rem;
		line-height: 1.6;
		resize: none;
		background: #fafbfc;
		color: #1e293b;
	}

	.editor-textarea:focus {
		outline: none;
		background: white;
	}

	.preview-content {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
		background: white;
	}

	/* Prose styles for preview */
	.prose {
		max-width: none;
		color: #374151;
		line-height: 1.7;
	}

	.prose h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 1rem;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	.prose h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1e293b;
		margin: 2rem 0 1rem;
	}

	.prose h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1e293b;
		margin: 1.5rem 0 0.75rem;
	}

	.prose p {
		margin-bottom: 1rem;
	}

	.prose ul,
	.prose ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.prose li {
		margin-bottom: 0.5rem;
	}

	.prose blockquote {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}

	.prose code {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		color: #dc2626;
	}

	.prose pre {
		background: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	.prose pre code {
		background: none;
		color: inherit;
		padding: 0;
	}

	.prose strong {
		font-weight: 600;
		color: #1e293b;
	}

	.prose em {
		font-style: italic;
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

	.modal-icon {
		color: #f59e0b;
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

	.animate-spin {
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
		.edit-header {
			padding: 16px 20px;
			flex-direction: column;
			gap: 16px;
			align-items: stretch;
		}

		.header-left {
			flex-direction: column;
			gap: 12px;
			align-items: flex-start;
		}

		.article-info {
			padding: 12px 20px;
		}

		.info-grid {
			flex-direction: column;
			gap: 12px;
		}

		.form-section {
			padding: 20px;
		}

		.form-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.editor-header {
			padding: 16px 20px 12px;
			flex-direction: column;
			gap: 12px;
			align-items: flex-start;
		}

		.editor-container.preview-mode {
			grid-template-columns: 1fr;
		}

		.preview-panel {
			display: none;
		}

		.editor-textarea {
			padding: 16px;
		}

		.preview-content {
			padding: 16px;
		}
	}
</style>
