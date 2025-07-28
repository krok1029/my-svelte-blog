<script lang="ts">
	import PracticeLayout from '$components/PracticeLayout.svelte';
	import inagea from '$asset/image/pokemon/001_妙蛙種子.png';
	import inageb from '$asset/image/pokemon/004_小火龍.png';
	import inagec from '$asset/image/pokemon/007_傑尼龜.png';
	import inaged from '$asset/image/pokemon/010_綠毛蟲.png';
	import inagee from '$asset/image/pokemon/013_獨角蟲.png';

	const practiceInfo = {
		id: 2,
		title: 'CSS :not(:hover) Effects',
		description: '探索 CSS :not() 偽類選擇器與 :hover 的組合應用，創造有趣的反向懸停效果。',
		type: 'css' as const,
		difficulty: 'easy' as const,
		tags: ['pseudo-class', 'hover', 'effects', 'css-selectors'],
		concepts: [
			':not() 偽類選擇器',
			':hover 偽類狀態',
			'CSS 選擇器組合',
			'視覺互動效果'
		],
		codeExamples: [
			{
				title: 'HTML 結構',
				description: '建立包含多個圖片元素的容器。',
				code: `<div class="container">
  <div class="box">
    <img src="image1.png" alt="Pokemon 1" />
  </div>
  <div class="box">
    <img src="image2.png" alt="Pokemon 2" />
  </div>
  <!-- 更多圖片... -->
</div>`,
				language: 'html'
			},
			{
				title: 'CSS :not(:hover) 效果',
				description: '使用 :not(:hover) 選擇器創造反向懸停效果。',
				code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

.container .box {
  width: 120px;
  height: 120px;
  transition: 0.5s;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0002);
}

/* 當容器被懸停時，非懸停的元素會縮小和旋轉 */
.container:hover > :not(:hover) {
  margin: 0 -20px;
  filter: drop-shadow(0 0 25px #000) drop-shadow(0 0 45px #000);
  transform: perspective(500px) rotateY(45deg) scale(0.95);
}

/* 懸停的元素會放大 */
.container .box:hover {
  transform: perspective(500px) rotateY(0) scale(1.5);
}`,
				language: 'css'
			}
		]
	};
</script>

<PracticeLayout {practiceInfo}>
	<div slot="demo" class="demo-wrapper">
		<div class="demo-container">
			<div class="box">
				<img class="pokemon-img" src={inagea} alt="001_妙蛙種子" />
			</div>
			<div class="box">
				<img class="pokemon-img" src={inageb} alt="004_小火龍" />
			</div>
			<div class="box">
				<img class="pokemon-img" src={inagec} alt="007_傑尼龜" />
			</div>
			<div class="box">
				<img class="pokemon-img" src={inaged} alt="010_綠毛蟲" />
			</div>
			<div class="box">
				<img class="pokemon-img" src={inagee} alt="013_獨角蟲" />
			</div>
		</div>
	</div>
	
	<div slot="tips">
		<div class="space-y-4">
			<p class="text-gray-700">
				這個練習展示了 CSS :not() 偽類選擇器的強大功能，通過組合 :hover 狀態創造出獨特的互動效果。
			</p>
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h4 class="font-semibold text-blue-900 mb-2">💡 學習要點：</h4>
				<ul class="text-blue-800 text-sm space-y-1">
					<li>• :not() 選擇器可以排除特定狀態的元素</li>
					<li>• 組合偽類選擇器創造複雜的互動效果</li>
					<li>• CSS transform 和 transition 的配合使用</li>
					<li>• -webkit-box-reflect 創造倒影效果</li>
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
	}
	
	.demo-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
		gap: 10px;
	}
	
	.demo-container .box {
		position: relative;
		width: 120px;
		height: 120px;
		transition: 0.5s;
		-webkit-box-reflect: below 1px linear-gradient(transparent, #0002);
	}
	
	.pokemon-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
	}
	
	.demo-container:hover > :not(:hover) {
		margin: 0 -20px;
		filter: drop-shadow(0 0 25px #000) drop-shadow(0 0 45px #000);
		transform: perspective(500px) rotateY(45deg) scale(0.95);
	}
	
	.demo-container .box:hover ~ .box {
		transform: perspective(500px) rotateY(-45deg) scale(0.95);
	}
	
	.demo-container .box:hover {
		transform: perspective(500px) rotateY(0) scale(1.5);
		z-index: 10;
	}
	
	@media (max-width: 768px) {
		.demo-container {
			flex-wrap: wrap;
			gap: 20px;
		}
		
		.demo-container .box {
			width: 100px;
			height: 100px;
		}
		
		.demo-container:hover > :not(:hover) {
			margin: 0;
			transform: scale(0.8);
		}
		
		.demo-container .box:hover {
			transform: scale(1.2);
		}
	}
</style>
