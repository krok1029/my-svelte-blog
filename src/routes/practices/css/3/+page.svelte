<script lang="ts">
	import PracticeLayout from '../../components/PracticeLayout.svelte';

	let value1 = 10;
	let value2 = 65;
	let value3 = 90;

	const level = (value: number) => {
		if (value > 80) {
			return `#fd0a54`;
		} else if (value > 60) {
			return `#ffbc11`;
		} else {
			return `#0de5a8`;
		}
	};

	const label = (value: number) => `${value}%`;
	const items = ['HTML', 'CSS', 'JavaScript'];
	const values = [value1, value2, value3];

	const practiceInfo = {
		id: 3,
		title: 'Circular Progress Bar using CSS conic-gradient()',
		description: '使用 CSS conic-gradient() 函數製作圓形進度條，展示現代 CSS 的強大功能。',
		type: 'css' as const,
		difficulty: 'medium' as const,
		tags: ['progress-bar', 'conic-gradient', 'circular', 'css-functions'],
		concepts: [
			'CSS conic-gradient() 函數',
			'CSS 自定義屬性 (CSS Variables)',
			'圓形進度條設計',
			'動態顏色變化'
		],
		codeExamples: [
			{
				title: 'HTML 結構',
				description: '建立進度條的基本結構。',
				code: `<div class="container">
  <div class="box" style="--i: 10%; --clr: #0de5a8;">
    <div class="circle">
      <h2>10<small>%</small></h2>
    </div>
    <h3>HTML</h3>
  </div>
  <!-- 更多進度條... -->
</div>`,
				language: 'html'
			},
			{
				title: 'CSS conic-gradient 進度條',
				description: '使用 conic-gradient 創建圓形進度條效果。',
				code: `.circle {
  width: 150px;
  height: 150px;
  background: conic-gradient(
    from 0deg,
    var(--clr) 0%,
    var(--clr) 0% var(--i),
    #333 var(--i),
    #333 100%
  );
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle::before {
  content: '';
  position: absolute;
  inset: 10px;
  background-color: #1a252c;
  border-radius: 50%;
}`,
				language: 'css'
			},
			{
				title: 'JavaScript 動態控制',
				description: '使用 JavaScript 動態改變進度值和顏色。',
				code: `const level = (value) => {
  if (value > 80) return '#fd0a54';      // 紅色 - 高
  else if (value > 60) return '#ffbc11'; // 黃色 - 中
  else return '#0de5a8';                 // 綠色 - 低
};

// 動態更新進度條
function updateProgress(element, value) {
  element.style.setProperty('--i', value + '%');
  element.style.setProperty('--clr', level(value));
}`,
				language: 'javascript'
			}
		]
	};
</script>

<PracticeLayout {practiceInfo}>
	<div slot="demo" class="demo-wrapper">
		<div class="demo-container">
			{#each items as item, index}
				<div
					class="progress-box"
					style:--i={label(values[index])}
					style:--clr={level(values[index])}
				>
					<div class="circle">
						<h2 class="progress-text">{values[index]}<small>%</small></h2>
					</div>
					<h3 class="skill-name">{item}</h3>

					<!-- 控制滑桿 -->
					<div class="control-slider">
						<input type="range" min="0" max="100" bind:value={values[index]} class="slider" />
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div slot="tips">
		<div class="space-y-4">
			<p class="text-gray-700">
				這個練習展示了 CSS conic-gradient()
				的強大功能，可以創建各種圓形漸層效果，特別適合製作進度條和圖表。
			</p>
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h4 class="font-semibold text-blue-900 mb-2">💡 學習要點：</h4>
				<ul class="text-blue-800 text-sm space-y-1">
					<li>• conic-gradient() 從中心點開始的圓錐漸層</li>
					<li>• CSS 自定義屬性讓樣式更靈活</li>
					<li>• ::before 偽元素創造內圓效果</li>
					<li>• 動態顏色根據數值變化</li>
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
		background-color: #1a252c;
		padding: 40px 20px;
	}

	.demo-container {
		position: relative;
		display: flex;
		gap: 40px;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.progress-box {
		position: relative;
		width: 240px;
		padding: 40px 0;
		background-color: #1a252c;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.circle {
		position: relative;
		width: 150px;
		height: 150px;
		background: conic-gradient(
			from 0deg,
			var(--clr) 0%,
			var(--clr) 0% var(--i),
			#333 var(--i),
			#333 100%
		);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}

	.circle::before {
		content: '';
		position: absolute;
		inset: 10px;
		background-color: #1a252c;
		border-radius: 50%;
	}

	.progress-text {
		position: relative;
		text-align: center;
		font-size: 2.5em;
		color: #fff;
		font-weight: 600;
		z-index: 1;
	}

	.progress-text small {
		font-size: 0.5em;
		font-weight: 300;
	}

	.skill-name {
		color: #fff;
		text-transform: uppercase;
		font-weight: 500;
		letter-spacing: 0.1em;
		margin-bottom: 20px;
	}

	.control-slider {
		width: 80%;
	}

	.slider {
		width: 100%;
		height: 4px;
		border-radius: 2px;
		background: #333;
		outline: none;
		-webkit-appearance: none;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--clr);
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--clr);
		cursor: pointer;
		border: none;
	}

	@media (max-width: 768px) {
		.demo-container {
			flex-direction: column;
			gap: 30px;
		}

		.progress-box {
			width: 200px;
			padding: 30px 0;
		}

		.circle {
			width: 120px;
			height: 120px;
		}

		.progress-text {
			font-size: 2em;
		}
	}
</style>
