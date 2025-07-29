<script lang="ts">
	import PracticeLayout from '../../components/PracticeLayout.svelte';
	import { Share2, Copy, Check, Smartphone, Globe, Link } from 'lucide-svelte';
	
	let shareStatus = '';
	let copied = false;
	
	const shareData = {
		title: '李明峯的程式練習',
		text: '查看這個很棒的 Web Share API 練習！',
		url: window?.location?.href || 'https://example.com'
	};
	
	const share = async () => {
		shareStatus = '';
		
		if (navigator.share) {
			try {
				await navigator.share(shareData);
				shareStatus = '分享成功！';
				console.log('分享成功');
			} catch (error) {
				if (error.name !== 'AbortError') {
					shareStatus = '分享失敗：' + error.message;
					console.error('分享失敗', error);
				}
			}
		} else {
			shareStatus = 'Web Share API 不支援在這個瀏覽器上運行';
			console.log('Web Share API 不支援在這個瀏覽器上運行');
		}
	};
	
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareData.url);
			copied = true;
			shareStatus = '連結已複製到剪貼簿！';
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			shareStatus = '複製失敗：' + error.message;
		}
	};

	const practiceInfo = {
		id: 8,
		title: 'Navigator Share API',
		description: '實作瀏覽器原生分享功能，學習 Web Share API 的使用方法。',
		type: 'js' as const,
		difficulty: 'easy' as const,
		tags: ['share', 'web-api', 'native', 'clipboard'],
		concepts: [
			'Web Share API',
			'Clipboard API',
			'瀏覽器功能檢測',
			'錯誤處理'
		],
		codeExamples: [
			{
				title: '基本分享功能',
				description: '使用 navigator.share() 實現原生分享。',
				code: `const shareData = {
  title: '頁面標題',
  text: '分享描述',
  url: window.location.href
};

const share = async () => {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log('分享成功');
    } catch (error) {
      console.error('分享失敗', error);
    }
  } else {
    console.log('不支援 Web Share API');
  }
};`,
				language: 'javascript'
			},
			{
				title: '功能檢測與備用方案',
				description: '檢測瀏覽器支援度並提供備用方案。',
				code: `const shareOrCopy = async () => {
  if (navigator.share) {
    // 支援原生分享
    try {
      await navigator.share(shareData);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('分享失敗', error);
      }
    }
  } else if (navigator.clipboard) {
    // 備用方案：複製到剪貼簿
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert('連結已複製到剪貼簿！');
    } catch (error) {
      console.error('複製失敗', error);
    }
  } else {
    // 最後備用方案
    prompt('請複製此連結：', shareData.url);
  }
};`,
				language: 'javascript'
			},
			{
				title: '分享不同類型內容',
				description: '分享文字、連結或檔案。',
				code: `// 分享文字和連結
const shareText = async () => {
  await navigator.share({
    title: '文章標題',
    text: '這是一篇很棒的文章',
    url: 'https://example.com/article'
  });
};

// 分享檔案（需要支援）
const shareFile = async (file) => {
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: '分享檔案',
      text: '查看這個檔案'
    });
  }
};`,
				language: 'javascript'
			}
		]
	};
</script>

<PracticeLayout {practiceInfo}>
	<div slot="demo" class="demo-wrapper">
		<div class="share-container">
			<div class="content-card">
				<div class="card-header">
					<Globe class="header-icon" />
					<h2 class="card-title">Web Share API 練習</h2>
				</div>
				
				<div class="card-content">
					<p class="content-text">
						這個練習展示了如何使用現代瀏覽器的原生分享功能。點擊下方按鈕體驗不同的分享方式！
					</p>
					
					<div class="share-info">
						<div class="info-item">
							<strong>標題：</strong> {shareData.title}
						</div>
						<div class="info-item">
							<strong>描述：</strong> {shareData.text}
						</div>
						<div class="info-item">
							<strong>連結：</strong> 
							<span class="url-text">{shareData.url}</span>
						</div>
					</div>
				</div>
				
				<div class="card-actions">
					<button on:click={share} class="share-btn primary">
						<Share2 size={20} />
						原生分享
						<Smartphone size={16} class="mobile-icon" />
					</button>
					
					<button on:click={copyToClipboard} class="share-btn secondary">
						{#if copied}
							<Check size={20} />
							已複製
						{:else}
							<Copy size={20} />
							複製連結
						{/if}
					</button>
				</div>
				
				{#if shareStatus}
					<div class="status-message" class:success={shareStatus.includes('成功')} class:error={shareStatus.includes('失敗')}>
						{shareStatus}
					</div>
				{/if}
			</div>
			
			<!-- 支援度檢測 -->
			<div class="support-info">
				<h3 class="support-title">瀏覽器支援度</h3>
				<div class="support-grid">
					<div class="support-item" class:supported={typeof navigator !== 'undefined' && navigator.share}>
						<Share2 size={16} />
						<span>Web Share API</span>
						<span class="support-status">
							{typeof navigator !== 'undefined' && navigator.share ? '✅' : '❌'}
						</span>
					</div>
					<div class="support-item" class:supported={typeof navigator !== 'undefined' && navigator.clipboard}>
						<Copy size={16} />
						<span>Clipboard API</span>
						<span class="support-status">
							{typeof navigator !== 'undefined' && navigator.clipboard ? '✅' : '❌'}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div slot="tips">
		<div class="space-y-4">
			<p class="text-gray-700">
				Web Share API 讓網頁可以使用裝置的原生分享功能，提供更好的使用者體驗，特別是在行動裝置上。
			</p>
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h4 class="font-semibold text-blue-900 mb-2">💡 學習要點：</h4>
				<ul class="text-blue-800 text-sm space-y-1">
					<li>• Web Share API 主要在行動裝置上支援</li>
					<li>• 需要 HTTPS 環境才能使用</li>
					<li>• 總是要提供備用方案（如複製到剪貼簿）</li>
					<li>• 使用 navigator.canShare() 檢查檔案分享支援</li>
				</ul>
			</div>
		</div>
	</div>
</PracticeLayout>

<style>
	.demo-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 40px 20px;
	}
	
	.share-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
		width: 100%;
		max-width: 600px;
	}
	
	.content-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 20px;
		padding: 30px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
	}
	
	.card-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
	}
	
	.header-icon {
		color: #667eea;
	}
	
	.card-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2d3748;
		margin: 0;
	}
	
	.card-content {
		margin-bottom: 30px;
	}
	
	.content-text {
		color: #4a5568;
		line-height: 1.6;
		margin-bottom: 20px;
	}
	
	.share-info {
		background: #f7fafc;
		border-radius: 12px;
		padding: 20px;
		border-left: 4px solid #667eea;
	}
	
	.info-item {
		margin-bottom: 8px;
		color: #2d3748;
		font-size: 0.9rem;
	}
	
	.info-item:last-child {
		margin-bottom: 0;
	}
	
	.url-text {
		color: #667eea;
		word-break: break-all;
	}
	
	.card-actions {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
	}
	
	.share-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		border: none;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.9rem;
		flex: 1;
		justify-content: center;
		min-width: 140px;
	}
	
	.share-btn.primary {
		background: linear-gradient(45deg, #667eea, #764ba2);
		color: white;
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
	}
	
	.share-btn.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
	}
	
	.share-btn.secondary {
		background: #e2e8f0;
		color: #4a5568;
		border: 2px solid #cbd5e0;
	}
	
	.share-btn.secondary:hover {
		background: #cbd5e0;
		transform: translateY(-1px);
	}
	
	.mobile-icon {
		opacity: 0.7;
	}
	
	.status-message {
		margin-top: 20px;
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 0.9rem;
		text-align: center;
	}
	
	.status-message.success {
		background: #c6f6d5;
		color: #22543d;
		border: 1px solid #9ae6b4;
	}
	
	.status-message.error {
		background: #fed7d7;
		color: #742a2a;
		border: 1px solid #fc8181;
	}
	
	.support-info {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: 25px;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}
	
	.support-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: #2d3748;
		margin-bottom: 15px;
		text-align: center;
	}
	
	.support-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 15px;
	}
	
	.support-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px;
		background: #f7fafc;
		border-radius: 8px;
		font-size: 0.85rem;
		color: #4a5568;
	}
	
	.support-item.supported {
		background: #c6f6d5;
		color: #22543d;
	}
	
	.support-status {
		margin-left: auto;
		font-size: 1rem;
	}
	
	@media (max-width: 768px) {
		.content-card {
			padding: 25px 20px;
		}
		
		.card-actions {
			flex-direction: column;
		}
		
		.share-btn {
			flex: none;
		}
		
		.support-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
