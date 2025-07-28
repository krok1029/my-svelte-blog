<script lang="ts">
	import PracticeLayout from '$components/PracticeLayout.svelte';
	import { onMount } from 'svelte';
	
	let date = new Date();
	let mounted = false;

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);
		
		return () => clearInterval(interval);
	});
	
	// 格式化時間，確保兩位數
	const formatTime = (time: number) => time.toString().padStart(2, '0');

	const practiceInfo = {
		id: 7,
		title: 'Digital Clock',
		description: '使用 CSS 和 JavaScript 製作數位時鐘，練習時間格式化和動態更新。',
		type: 'css' as const,
		difficulty: 'easy' as const,
		tags: ['clock', 'time', 'digital', 'javascript'],
		concepts: [
			'JavaScript Date 物件',
			'setInterval 定時器',
			'CSS Flexbox 佈局',
			'響應式設計'
		],
		codeExamples: [
			{
				title: 'HTML 結構',
				description: '建立時鐘的基本結構。',
				code: `<div class="clock-container">
  <div class="time-section">
    <span class="time">12</span>
    <span class="label">Hours</span>
  </div>
  <span class="separator">:</span>
  <div class="time-section">
    <span class="time">34</span>
    <span class="label">Minutes</span>
  </div>
  <span class="separator">:</span>
  <div class="time-section">
    <span class="time">56</span>
    <span class="label">Seconds</span>
  </div>
</div>`,
				language: 'html'
			},
			{
				title: 'CSS 樣式設計',
				description: '設計現代化的數位時鐘樣式。',
				code: `.time-section {
  width: 120px;
  background: linear-gradient(145deg, #0ea5e9, #0284c7);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: white;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.3);
}

.time {
  font-size: 3rem;
  padding: 8px;
}

.label {
  font-size: 1rem;
  background: #059669;
  width: 100%;
  text-align: center;
  padding: 12px;
}`,
				language: 'css'
			},
			{
				title: 'JavaScript 時間更新',
				description: '使用 JavaScript 實時更新時間顯示。',
				code: `let date = new Date();

// 每秒更新時間
setInterval(() => {
  date = new Date();
}, 1000);

// 格式化時間，確保兩位數顯示
const formatTime = (time) => {
  return time.toString().padStart(2, '0');
};

// 獲取格式化的時間
const hours = formatTime(date.getHours());
const minutes = formatTime(date.getMinutes());
const seconds = formatTime(date.getSeconds());`,
				language: 'javascript'
			}
		]
	};
</script>

<PracticeLayout {practiceInfo}>
	<div slot="demo" class="demo-wrapper">
		<div class="clock-container">
			<!-- 日期顯示 -->
			<div class="date-display">
				<div class="date-text">
					{#if mounted}
						{date.toLocaleDateString('zh-TW', { 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric',
							weekday: 'long'
						})}
					{/if}
				</div>
			</div>
			
			<!-- 時鐘主體 -->
			<div class="time-display">
				<div class="time-section">
					<span class="time">{mounted ? formatTime(date.getHours()) : '00'}</span>
					<span class="label">Hours</span>
				</div>
				<span class="separator">:</span>
				<div class="time-section">
					<span class="time">{mounted ? formatTime(date.getMinutes()) : '00'}</span>
					<span class="label">Minutes</span>
				</div>
				<span class="separator">:</span>
				<div class="time-section">
					<span class="time">{mounted ? formatTime(date.getSeconds()) : '00'}</span>
					<span class="label">Seconds</span>
				</div>
			</div>
			
			<!-- 時區顯示 -->
			<div class="timezone-display">
				<span class="timezone-text">
					{#if mounted}
						{Intl.DateTimeFormat().resolvedOptions().timeZone}
					{/if}
				</span>
			</div>
		</div>
	</div>
	
	<div slot="tips">
		<div class="space-y-4">
			<p class="text-gray-700">
				這個練習展示了如何結合 JavaScript 的 Date 物件和 CSS 樣式創建一個功能完整的數位時鐘。
			</p>
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h4 class="font-semibold text-blue-900 mb-2">💡 學習要點：</h4>
				<ul class="text-blue-800 text-sm space-y-1">
					<li>• setInterval 用於定時更新顯示</li>
					<li>• padStart() 方法確保時間格式一致</li>
					<li>• CSS Grid 和 Flexbox 的組合使用</li>
					<li>• 考慮時區和國際化顯示</li>
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
	
	.clock-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 30px;
		padding: 60px 40px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}
	
	.date-display {
		text-align: center;
	}
	
	.date-text {
		color: white;
		font-size: 1.2rem;
		font-weight: 300;
		letter-spacing: 1px;
		opacity: 0.9;
	}
	
	.time-display {
		display: flex;
		align-items: center;
		gap: 30px;
	}
	
	.time-section {
		width: 120px;
		background: linear-gradient(145deg, #0ea5e9, #0284c7);
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: 'Courier New', monospace;
		font-weight: 600;
		color: white;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(14, 165, 233, 0.3);
		transition: transform 0.3s ease;
	}
	
	.time-section:hover {
		transform: translateY(-5px);
	}
	
	.time {
		font-size: 3rem;
		padding: 8px;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}
	
	.label {
		font-size: 1rem;
		background: #059669;
		width: 100%;
		text-align: center;
		padding: 12px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
	
	.separator {
		color: white;
		font-size: 3rem;
		font-weight: bold;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
		animation: blink 2s infinite;
	}
	
	.timezone-display {
		text-align: center;
	}
	
	.timezone-text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		font-weight: 300;
		letter-spacing: 0.5px;
	}
	
	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0.3; }
	}
	
	@media (max-width: 768px) {
		.clock-container {
			padding: 40px 20px;
			gap: 30px;
		}
		
		.time-display {
			flex-direction: column;
			gap: 20px;
		}
		
		.time-section {
			width: 100px;
		}
		
		.time {
			font-size: 2.5rem;
		}
		
		.separator {
			font-size: 2rem;
			transform: rotate(90deg);
		}
		
		.date-text {
			font-size: 1rem;
		}
	}
</style>
