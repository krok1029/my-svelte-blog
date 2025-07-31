<script lang="ts">
	import { run } from 'svelte/legacy';

	import { goto } from '$app/navigation';
	import { marked } from 'marked';
	import { enhance } from '$app/forms';
	import { Save, ArrowLeft, Eye, EyeOff, FileText, Tag, AlignLeft, Loader2 } from 'lucide-svelte';
	import type { ActionData } from './$types';

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
	let showPreview = $state(true);
	let isSubmitting = $state(false);

	// 如果有 form 數據，恢復表單狀態
	run(() => {
		if (form) {
			title = form.title || title;
			inputTags = form.tags || inputTags;
			brief = form.brief || brief;
			content = form.content || content;
		}
	});

	const togglePreview = () => {
		showPreview = !showPreview;
	};

	const goBack = () => {
		goto('/admin');
	};

	// Form enhancement
	const handleSubmit = () => {
		isSubmitting = true;
		return async ({ update }) => {
			isSubmitting = false;
			await update();
		};
	};
</script>

<svelte:head>
	<title>建立新文章 - Admin Dashboard</title>
	<meta name="description" content="建立新的部落格文章" />
</svelte:head>

<div class="create-container">
	<!-- Header -->
	<header class="create-header">
		<div class="header-left">
			<button class="back-btn" onclick={goBack}>
				<ArrowLeft size={20} />
				<span>返回列表</span>
			</button>
			<div class="header-info">
				<h1 class="page-title">建立新文章</h1>
				<p class="page-subtitle">撰寫並發布您的部落格文章</p>
			</div>
		</div>

		<div class="header-actions">
			<button class="preview-toggle" onclick={togglePreview}>
				{#if showPreview}
					<EyeOff size={18} />
					<span>隱藏預覽</span>
				{:else}
					<Eye size={18} />
					<span>顯示預覽</span>
				{/if}
			</button>
		</div>
	</header>

	<!-- Form -->
	<form method="POST" action="?/create" use:enhance={handleSubmit}>
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
						name="title"
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
						name="tags"
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
						name="brief"
						placeholder="簡短描述文章內容，將顯示在文章列表中..."
						class="form-textarea"
						rows="3"
						bind:value={brief}
					></textarea>
					<div class="char-count">
						{brief.length} / 200 字符
					</div>
				</div>
			</div>

			<!-- Status Message -->
			{#if form?.error}
				<div class="status-message error">
					{form.error}
				</div>
			{/if}

			<!-- Submit Button -->
			<div class="submit-section">
				<button
					type="submit"
					class="save-btn"
					disabled={isSubmitting || !title.trim() || !content.trim()}
				>
					{#if isSubmitting}
						<Loader2 size={18} class="animate-spin" />
						<span>發布中...</span>
					{:else}
						<Save size={18} />
						<span>發布文章</span>
					{/if}
				</button>
			</div>
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
								type="button"
								class="toolbar-btn"
								title="粗體"
								onclick={() => {
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
								type="button"
								class="toolbar-btn"
								title="斜體"
								onclick={() => {
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
						</div>
					</div>
					<textarea
						name="content"
						class="editor-textarea"
						bind:value={content}
						placeholder="開始撰寫您的文章內容..."
						required
					></textarea>
				</div>

				<!-- Preview Panel -->
				{#if showPreview}
					<div class="preview-panel">
						<div class="preview-header">
							<span class="toolbar-title">預覽</span>
						</div>
						<div class="preview-content prose">
							<!-- svelte-ignore svelte/no_at_html_tags -->
							{@html marked(content, { mangle: false, headerIds: false })}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</form>
</div>

<style>
	.create-container {
		min-height: 100vh;
		background: #f8fafc;
		display: flex;
		flex-direction: column;
	}

	/* Header */
	.create-header {
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
		margin-bottom: 2px;
	}

	.page-subtitle {
		color: #64748b;
		font-size: 0.9rem;
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
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
		margin-bottom: 16px;
	}

	.status-message.error {
		background: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.submit-section {
		display: flex;
		justify-content: flex-end;
	}

	.save-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(45deg, #10b981, #059669);
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
	}

	.save-btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
	}

	.save-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
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

	/* svelte-ignore css-unused-selector */
	.prose h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 1rem;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	/* svelte-ignore css-unused-selector */
	.prose h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1e293b;
		margin: 2rem 0 1rem;
	}

	/* svelte-ignore css-unused-selector */
	.prose h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1e293b;
		margin: 1.5rem 0 0.75rem;
	}

	/* svelte-ignore css-unused-selector */
	.prose p {
		margin-bottom: 1rem;
	}

	/* svelte-ignore css-unused-selector */
	.prose ul,
	/* svelte-ignore css-unused-selector */
	.prose ol {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	/* svelte-ignore css-unused-selector */
	.prose li {
		margin-bottom: 0.5rem;
	}

	/* svelte-ignore css-unused-selector */
	.prose blockquote {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: #6b7280;
	}

	/* svelte-ignore css-unused-selector */
	.prose code {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		color: #dc2626;
	}

	/* svelte-ignore css-unused-selector */
	.prose pre {
		background: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
	}

	/* svelte-ignore css-unused-selector */
	.prose pre code {
		background: none;
		color: inherit;
		padding: 0;
	}

	/* svelte-ignore css-unused-selector */
	.prose strong {
		font-weight: 600;
		color: #1e293b;
	}

	/* svelte-ignore css-unused-selector */
	.prose em {
		font-style: italic;
	}

	/* svelte-ignore css-unused-selector */
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
		.create-header {
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
