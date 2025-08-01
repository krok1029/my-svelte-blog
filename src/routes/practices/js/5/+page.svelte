<script lang="ts">
	import { run } from 'svelte/legacy';

	import PracticeLayout from '../../components/PracticeLayout.svelte';
	import { Upload, Copy, Check, Image, Eye } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();

	let files: FileList | undefined = $state();
	let imgSrc: string = $state('');
	let uploading = $state(false);
	let copiedIndex = $state(-1);

	const reader = $state(new FileReader());

	run(() => {
		if (files) {
			for (const file of files) {
				console.log(`${file.name}: ${file.size} bytes`);
			}
			if (files[0]) {
				reader.readAsDataURL(files[0]);
			}
		}
	});

	reader.onload = (e) => {
		const base64 = e.target?.result;
		if (typeof base64 === 'string') {
			imgSrc = base64;
		}
	};

	// 從 server load 函數獲取圖片列表
	let imgArr = $derived(data.images || []);

	const copyImageUrl = async (path: string, index: number) => {
		const url = `https://raw.githubusercontent.com/krok1029/my-svelte-blog/image/${path}`;
		try {
			await navigator.clipboard.writeText(url);
			copiedIndex = index;
			setTimeout(() => {
				copiedIndex = -1;
			}, 2000);
		} catch (error) {
			console.error('複製失敗:', error);
		}
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const practiceInfo = {
		id: 5,
		title: 'Image Hosting',
		description: '實作簡單的圖片上傳和託管功能，練習檔案處理和 API 串接。',
		type: 'js' as const,
		difficulty: 'hard' as const,
		tags: ['file-upload', 'api', 'image-processing', 'github-api'],
		concepts: ['FileReader API 檔案讀取', 'Base64 編碼轉換', 'GitHub API 整合', '拖放上傳功能'],
		codeExamples: [
			{
				title: '檔案讀取',
				description: '使用 FileReader API 讀取使用者選擇的圖片檔案。',
				code: `const reader = new FileReader();

// 當檔案選擇改變時
if (files && files[0]) {
  reader.readAsDataURL(files[0]);
}

// 讀取完成後的處理
reader.onload = (e) => {
  const base64 = e.target?.result;
  if (typeof base64 === 'string') {
    imgSrc = base64; // 顯示預覽
  }
};`,
				language: 'javascript'
			},
			{
				title: 'GitHub API 上傳',
				description: '將 Base64 編碼的圖片上傳到 GitHub Repository。',
				code: `const uploadToGithub = async (filename, content) => {
  const apiUrl = 'https://api.github.com/repos/user/repo/contents/';
  
  const response = await fetch(apiUrl + filename, {
    method: 'PUT',
    headers: {
      'Authorization': 'token YOUR_TOKEN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Upload image: ' + filename,
      content: content.split(',')[1], // 移除 data:image/... 前綴
    })
  });
  
  return response.json();
};`,
				language: 'javascript'
			},
			{
				title: '拖放上傳',
				description: '實作拖放功能讓使用者更方便上傳檔案。',
				code: `const handleDrop = (e) => {
  e.preventDefault();
  const droppedFiles = e.dataTransfer.files;
  
  if (droppedFiles.length > 0) {
    const file = droppedFiles[0];
    
    // 檢查檔案類型
    if (file.type.startsWith('image/')) {
      files = droppedFiles;
    } else {
      alert('請選擇圖片檔案');
    }
  }
};

const handleDragOver = (e) => {
  e.preventDefault();
};`,
				language: 'javascript'
			}
		]
	};
</script>

<PracticeLayout {practiceInfo}>
	{#snippet demo()}
		<div class="demo-wrapper">
			<div class="image-hosting-container">
				<!-- Upload Section -->
				<div class="upload-section">
					<h2 class="section-title">
						<Upload size={24} />
						圖片上傳
					</h2>
					<form
						method="POST"
						action="?/upload"
						enctype="multipart/form-data"
						use:enhance={() => {
							uploading = true;
							return async ({ update }) => {
								await update();
								uploading = false;
								// 清除預覽
								files = undefined;
								imgSrc = '';
							};
						}}
					>
						<div class="upload-area">
							<div class="file-input-wrapper">
								<input
									bind:files
									type="file"
									name="image"
									id="image_input"
									accept="image/*"
									class="file-input"
								/>
								<label for="image_input" class="file-label">
									<Image size={32} />
									<span>點擊選擇圖片</span>
									<span class="file-hint">支援 JPG, PNG, GIF 格式</span>
								</label>
							</div>

							{#if imgSrc}
								<div class="preview-section">
									<div class="preview-image">
										<img src={imgSrc} alt="預覽" />
									</div>
									<div class="file-info">
										{#if files && files[0]}
											<div class="file-details">
												<div class="file-name">{files[0].name}</div>
												<div class="file-size">{formatFileSize(files[0].size)}</div>
											</div>
										{/if}

										<button
											type="submit"
											class="upload-btn"
											class:loading={uploading}
											disabled={uploading || !files || !files[0]}
										>
											{#if uploading}
												<div class="spinner"></div>
												上傳中...
											{:else}
												<Upload size={16} />
												上傳圖片
											{/if}
										</button>
									</div>
								</div>
							{/if}

							{#if form?.error || form?.success || data.error}
								<div
									class="status-message"
									class:success={form?.success}
									class:error={form?.error || data.error}
								>
									{form?.success || form?.error || data.error}
								</div>
							{/if}
						</div>
					</form>
				</div>

				<!-- Gallery Section -->
				<div class="gallery-section">
					<h2 class="section-title">
						<Eye size={24} />
						圖片庫
						<span class="image-count">({imgArr.length} 張圖片)</span>
					</h2>

					<div class="gallery-hint">點擊圖片複製連結</div>

					<div class="image-grid">
						{#each imgArr as { name, path }, i}
							<div class="image-card">
								<div class="image-wrapper">
									<img
										src={`https://raw.githubusercontent.com/krok1029/my-svelte-blog/image/${path}`}
										alt={name}
										title={name}
										loading="lazy"
									/>
									<div class="image-overlay">
										<button class="overlay-btn copy-btn" onclick={() => copyImageUrl(path, i)}>
											{#if copiedIndex === i}
												<Check size={16} />
											{:else}
												<Copy size={16} />
											{/if}
										</button>
										<a
											href={`https://raw.githubusercontent.com/krok1029/my-svelte-blog/image/${path}`}
											target="_blank"
											rel="noopener noreferrer"
											class="overlay-btn view-btn"
										>
											<Eye size={16} />
										</a>
									</div>
								</div>
								<div class="image-info">
									<div class="image-name" title={name}>{name}</div>
								</div>
							</div>
						{/each}
					</div>

					{#if imgArr.length === 0}
						<div class="empty-state">
							<Image size={48} />
							<p>還沒有上傳任何圖片</p>
							<p class="empty-hint">上傳第一張圖片開始使用吧！</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/snippet}

	{#snippet tips()}
		<div>
			<div class="space-y-4">
				<p class="text-gray-700">
					這個圖片託管工具展示了如何整合多個 Web API
					來創建完整的檔案上傳功能，包括檔案讀取、編碼轉換和遠端儲存。
				</p>
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<h4 class="mb-2 font-semibold text-blue-900">💡 學習要點：</h4>
					<ul class="space-y-1 text-sm text-blue-800">
						<li>• FileReader.readAsDataURL() 將檔案轉為 Base64</li>
						<li>• GitHub API 可以作為簡單的檔案儲存服務</li>
						<li>• 適當的錯誤處理和載入狀態很重要</li>
						<li>• 檔案大小和類型驗證提升使用者體驗</li>
					</ul>
				</div>
			</div>
		</div>
	{/snippet}
</PracticeLayout>

<style>
	.demo-wrapper {
		min-height: 100vh;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
		padding: 20px;
	}

	.image-hosting-container {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 30px;
		height: 100%;
	}

	.upload-section,
	.gallery-section {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		padding: 30px;
		height: fit-content;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 1.5rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 20px;
	}

	.image-count {
		font-size: 0.9rem;
		color: #64748b;
		font-weight: 400;
	}

	.upload-area {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.file-input-wrapper {
		position: relative;
	}

	.file-input {
		position: absolute;
		opacity: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	.file-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 40px 20px;
		border: 2px dashed #cbd5e0;
		border-radius: 12px;
		background: #f8fafc;
		cursor: pointer;
		transition: all 0.3s ease;
		color: #64748b;
	}

	.file-label:hover {
		border-color: #3b82f6;
		background: #eff6ff;
		color: #3b82f6;
	}

	.file-hint {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.preview-section {
		display: flex;
		gap: 20px;
		align-items: flex-start;
	}

	.preview-image {
		flex-shrink: 0;
		width: 120px;
		height: 120px;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid #e2e8f0;
	}

	.preview-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.file-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.file-details {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.file-name {
		font-weight: 600;
		color: #1e293b;
		word-break: break-all;
	}

	.file-size {
		font-size: 0.9rem;
		color: #64748b;
	}

	.upload-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: linear-gradient(45deg, #3b82f6, #1d4ed8);
		color: white;
		border: none;
		border-radius: 8px;
		padding: 10px 20px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		width: fit-content;
	}

	.upload-btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
	}

	.upload-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
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

	.status-message {
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 0.9rem;
		text-align: center;
	}

	.status-message.success {
		background: #dcfce7;
		color: #166534;
		border: 1px solid #bbf7d0;
	}

	.status-message.error {
		background: #fef2f2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.gallery-hint {
		color: #64748b;
		font-size: 0.9rem;
		margin-bottom: 20px;
		text-align: center;
	}

	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
		max-height: 60vh;
		overflow-y: auto;
	}

	.image-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid #e2e8f0;
		transition: all 0.3s ease;
	}

	.image-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
	}

	.image-wrapper {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.image-wrapper:hover img {
		transform: scale(1.05);
	}

	.image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.image-wrapper:hover .image-overlay {
		opacity: 1;
	}

	.overlay-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
		color: #374151;
		text-decoration: none;
	}

	.overlay-btn:hover {
		background: white;
		transform: scale(1.1);
	}

	.copy-btn:hover {
		color: #3b82f6;
	}

	.view-btn:hover {
		color: #10b981;
	}

	.image-info {
		padding: 12px;
	}

	.image-name {
		font-size: 0.85rem;
		color: #374151;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 20px;
		color: #9ca3af;
		text-align: center;
	}

	.empty-state p {
		margin: 8px 0;
	}

	.empty-hint {
		font-size: 0.9rem;
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		.image-hosting-container {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.upload-section,
		.gallery-section {
			padding: 20px;
		}

		.preview-section {
			flex-direction: column;
		}

		.preview-image {
			width: 100%;
			height: 200px;
		}

		.image-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: 15px;
		}
	}
</style>
