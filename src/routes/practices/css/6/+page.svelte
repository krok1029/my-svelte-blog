<script lang="ts">
	import PracticeLayout from '../../components/PracticeLayout.svelte';

	const practiceInfo = {
		id: 6,
		title: 'Input Field Text Animation',
		description: '創造動態的輸入框文字動畫效果，提升表單的使用者體驗。',
		type: 'css' as const,
		difficulty: 'easy' as const,
		tags: ['input', 'animation', 'form', 'ux'],
		concepts: [
			'CSS :focus 和 :valid 偽類',
			'CSS Transform 動畫',
			'表單使用者體驗設計',
			'CSS Transition 過渡效果'
		],
		codeExamples: [
			{
				title: 'HTML 結構',
				description: '建立包含 label 的輸入框結構。',
				code: `<div class="inputBox">
  <input type="text" required />
  <span class="input_span">First Name</span>
</div>`,
				language: 'html'
			},
			{
				title: 'CSS 動畫效果',
				description: '使用 :focus 和 :valid 偽類創建標籤動畫。',
				code: `.inputBox {
  position: relative;
  width: 250px;
}

.inputBox input {
  width: 100%;
  padding: 10px;
  border: 1px solid #666;
  background: #1d2b3a;
  border-radius: 4px;
  outline: none;
  color: white;
  font-size: 16px;
}

.input_span {
  position: absolute;
  left: 0;
  padding: 10px;
  pointer-events: none;
  font-size: 16px;
  color: #666;
  text-transform: uppercase;
  transition: 0.3s;
}

/* 當輸入框獲得焦點或有效時 */
.inputBox input:focus ~ .input_span,
.inputBox input:valid ~ .input_span {
  color: #03a9f4;
  font-size: 12px;
  padding: 0 5px;
  transform: translateX(10px) translateY(-7px);
  background: #1d2b3a;
}`,
				language: 'css'
			}
		]
	};
</script>

<PracticeLayout {practiceInfo}>
	<div slot="demo" class="demo-wrapper">
		<div class="form-container">
			<h2 class="form-title">聯絡表單</h2>
			<form class="demo-form">
				<div class="inputBox">
					<input class="form-input" type="text" required />
					<span class="input_span style1">First Name</span>
				</div>

				<div class="inputBox">
					<input class="form-input" type="text" required />
					<span class="input_span style2">Last Name</span>
				</div>

				<div class="inputBox">
					<input class="form-input" type="email" required />
					<span class="input_span style3">Email Address</span>
				</div>

				<div class="inputBox">
					<textarea class="form-input" rows="4" required />
					<span class="input_span style4">Message</span>
				</div>

				<button type="submit" class="submit-btn"> Send Message </button>
			</form>
		</div>
	</div>

	<div slot="tips">
		<div class="space-y-4">
			<p class="text-gray-700">
				這個練習展示了如何使用 CSS 偽類選擇器創建流暢的表單動畫，提升使用者體驗。
			</p>
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h4 class="font-semibold text-blue-900 mb-2">💡 學習要點：</h4>
				<ul class="text-blue-800 text-sm space-y-1">
					<li>• :focus 偽類在元素獲得焦點時觸發</li>
					<li>• :valid 偽類在輸入內容有效時觸發</li>
					<li>• pointer-events: none 讓標籤不阻擋點擊</li>
					<li>• transform 比改變 position 性能更好</li>
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
		background: linear-gradient(135deg, #1d2b3a 0%, #2d3748 100%);
		padding: 40px 20px;
	}

	.form-container {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		padding: 40px;
		width: 100%;
		max-width: 500px;
	}

	.form-title {
		color: white;
		font-size: 2rem;
		font-weight: 600;
		text-align: center;
		margin-bottom: 30px;
	}

	.demo-form {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.inputBox {
		position: relative;
		width: 100%;
	}

	.form-input {
		width: 100%;
		padding: 15px;
		border: 2px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		outline: none;
		color: white;
		font-size: 16px;
		transition: all 0.3s ease;
		resize: vertical;
	}

	.form-input:focus {
		border-color: #03a9f4;
		box-shadow: 0 0 20px rgba(3, 169, 244, 0.3);
	}

	.form-input:valid {
		border-color: #4caf50;
	}

	.input_span {
		position: absolute;
		left: 15px;
		top: 15px;
		pointer-events: none;
		font-size: 16px;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		transition: all 0.3s ease;
		letter-spacing: 0.5px;
	}

	/* 不同樣式的標籤動畫 */
	.form-input:focus ~ .input_span.style1,
	.form-input:valid ~ .input_span.style1 {
		color: #03a9f4;
		font-size: 12px;
		padding: 0 8px;
		transform: translateX(-5px) translateY(-35px);
		background: #1d2b3a;
		border-radius: 4px;
	}

	.form-input:focus ~ .input_span.style2,
	.form-input:valid ~ .input_span.style2 {
		color: #e91e63;
		font-size: 12px;
		padding: 0 8px;
		transform: translateX(-5px) translateY(-35px);
		background: linear-gradient(45deg, #e91e63, #f06292);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.form-input:focus ~ .input_span.style3,
	.form-input:valid ~ .input_span.style3 {
		color: #4caf50;
		font-size: 12px;
		padding: 0 8px;
		transform: translateX(-5px) translateY(-35px);
		background: #1d2b3a;
		border-radius: 4px;
		box-shadow: 0 2px 10px rgba(76, 175, 80, 0.3);
	}

	.form-input:focus ~ .input_span.style4,
	.form-input:valid ~ .input_span.style4 {
		color: #ff9800;
		font-size: 12px;
		padding: 0 8px;
		transform: translateX(-5px) translateY(-35px);
		background: #1d2b3a;
		border-radius: 4px;
	}

	.submit-btn {
		background: linear-gradient(45deg, #03a9f4, #0288d1);
		color: white;
		border: none;
		padding: 15px 30px;
		border-radius: 10px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-top: 10px;
	}

	.submit-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(3, 169, 244, 0.4);
	}

	.submit-btn:active {
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.form-container {
			padding: 30px 20px;
			margin: 20px;
		}

		.form-title {
			font-size: 1.5rem;
		}

		.form-input {
			padding: 12px;
			font-size: 14px;
		}

		.input_span {
			font-size: 14px;
			left: 12px;
			top: 12px;
		}
	}
</style>
