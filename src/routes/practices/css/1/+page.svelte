<script lang="ts">
	import Box from './Box.svelte';
	import PracticeLayout from '../../components/PracticeLayout.svelte';

	const boxesArray = new Array(60);

	const practiceInfo = {
		id: 1,
		title: 'Reveal Elements on Page Scroll with Animation using Vanilla Javascript',
		description:
			'使用純 JavaScript 實現滾動時元素顯示動畫效果，結合 CSS 過渡動畫創造流暢的視覺體驗。',
		type: 'css' as const,
		difficulty: 'medium' as const,
		tags: ['animation', 'scroll', 'vanilla-js', 'intersection-observer'],
		concepts: [
			'Intersection Observer API',
			'CSS Transform 和 Transition',
			'JavaScript 事件處理',
			'響應式動畫設計'
		],
		codeExamples: [
			{
				title: 'HTML 結構',
				description: '建立基本的 HTML 結構，包含多個需要動畫的元素容器。',
				code: `<div class="container">
  <div class="box">Content 1</div>
  <div class="box">Content 2</div>
  <!-- 更多元素... -->
</div>`,
				language: 'html'
			},
			{
				title: 'CSS 動畫設定',
				description: '使用 CSS Transform 和 Transition 屬性設定動畫效果。',
				code: `.box {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

.box.show {
  opacity: 1;
  transform: translateY(0);
}`,
				language: 'css'
			},
			{
				title: 'JavaScript 滾動偵測',
				description: '使用 Intersection Observer API 偵測元素進入視窗的時機。',
				code: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.box').forEach(box => {
  observer.observe(box);
});`,
				language: 'javascript'
			}
		]
	};
</script>

<PracticeLayout {practiceInfo}>
	{#snippet demo()}
		<div  class="demo-content">
			<section class="hero-section">
				<h2 class="hero-title">Scroll to Reveal</h2>
			</section>

			<div class="boxes-container">
				{#each boxesArray as _box}
					<Box />
				{/each}
			</div>
		</div>
	{/snippet}

	{#snippet tips()}
		<div >
			<div class="space-y-4">
				<p class="text-gray-700">
					這個練習展示了如何使用現代的 Intersection Observer API 來創建滾動動畫效果，相比傳統的 scroll
					事件監聽，具有更好的性能表現。
				</p>
				<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<h4 class="font-semibold text-blue-900 mb-2">💡 學習要點：</h4>
					<ul class="text-blue-800 text-sm space-y-1">
						<li>• Intersection Observer 比 scroll 事件更高效</li>
						<li>• CSS transform 比改變 position 屬性性能更好</li>
						<li>• 適當的 transition timing 讓動畫更自然</li>
						<li>• 考慮用戶的動畫偏好設定（prefers-reduced-motion）</li>
					</ul>
				</div>
			</div>
		</div>
	{/snippet}
</PracticeLayout>

<style>
	.demo-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #111;
		overflow: hidden;
		min-height: 100vh;
	}

	.hero-section {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.hero-title {
		position: relative;
		color: white;
		font-size: 8vw;
		font-weight: 500;
		text-align: center;
	}

	.boxes-container {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 30px;
		width: 700px;
		max-width: 90%;
		top: -200px;
		padding-bottom: 200px;
	}

	@media (max-width: 768px) {
		.boxes-container {
			grid-template-columns: 1fr;
			width: 90%;
		}

		.hero-title {
			font-size: 12vw;
		}
	}
</style>
