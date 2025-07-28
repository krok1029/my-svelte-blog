<script lang="ts">
	import {
		react,
		html5,
		css3,
		javascript,
		typescript,
		redux,
		storybook,
		webpack
	} from '$asset/logo/index';
	import ImageBlock from '$components/ImageBlock.svelte';
	import SideProjectCard from '$components/card/SideProjectCard.svelte';
	import { Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-svelte';
</script>

<svelte:head>
	<title>李明峯 - 前端工程師 | Frontend Developer</title>
	<meta name="description" content="李明峯的個人網站，前端工程師，專精於 React、Vue、Svelte 等現代前端技術" />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
	<div class="absolute inset-0 bg-black/20"></div>
	<div class="relative container mx-auto px-4 py-20 lg:py-32">
		<div class="max-w-4xl mx-auto text-center">
			<div class="mb-8">
				<div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
					<div class="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold">
						李
					</div>
				</div>
				<h1 class="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
					李明峯
				</h1>
				<p class="text-xl lg:text-2xl text-gray-300 mb-2">Frontend Developer</p>
				<p class="text-lg text-gray-400">熱愛創造優質使用者體驗的前端工程師</p>
			</div>
			
			<p class="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
				嗨！我是李明峯，我熱愛將想法轉化為動態且具有吸引力的網頁應用程序。在過去的三年中，我積極參與了各種前端項目，從簡單的網站到複雜的 Web 應用程式，我都有豐富的實踐經驗。我喜歡追求技術的最新趨勢，並將其應用於我的工作中。
			</p>
			
			<div class="flex flex-wrap justify-center gap-4 mb-8">
				<a href="#contact" class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
					<Mail size={20} />
					聯絡我
				</a>
				<a href="/resume.pdf" class="inline-flex items-center gap-2 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
					<Download size={20} />
					下載履歷
				</a>
			</div>
			
			<div class="flex justify-center gap-6">
				<a href="https://github.com/krok1029" class="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
					<Github size={24} />
				</a>
				<a href="https://linkedin.com/in/your-profile" class="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
					<Linkedin size={24} />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Skills Section -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">技術技能</h2>
				<p class="text-lg text-gray-600">我熟悉的前端技術與工具</p>
			</div>
			
			<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
				<div class="skill-item group">
					<ImageBlock src={html5} alt="HTML5" />
					<span class="skill-label">HTML5</span>
				</div>
				<div class="skill-item group">
					<ImageBlock src={css3} alt="CSS3" />
					<span class="skill-label">CSS3</span>
				</div>
				<div class="skill-item group">
					<ImageBlock src={javascript} alt="JavaScript" />
					<span class="skill-label">JavaScript</span>
				</div>
				<div class="skill-item group">
					<ImageBlock src={typescript} alt="TypeScript" />
					<span class="skill-label">TypeScript</span>
				</div>
				<div class="skill-item group">
					<ImageBlock src={react} alt="React" />
					<span class="skill-label">React</span>
				</div>
				<div class="skill-item group">
					<ImageBlock src={redux} alt="Redux" />
					<span class="skill-label">Redux</span>
				</div>
				<div class="skill-item group">
					<ImageBlock src={storybook} alt="Storybook" />
					<span class="skill-label">Storybook</span>
				</div>
				<div class="skill-item group">
					<ImageBlock src={webpack} alt="Webpack" />
					<span class="skill-label">Webpack</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">精選專案</h2>
				<p class="text-lg text-gray-600">我開發的一些有趣的 Side Projects</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div class="project-card group">
					<SideProjectCard
						projecName="React Snake Game"
						path="https://krok1029.github.io/react-snake-game/"
						imgPath="https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.50.19.png?raw=true"
						description="使用 React 開發的經典貪食蛇遊戲，具有響應式設計和流暢的遊戲體驗。"
						technologies={['React', 'JavaScript', 'CSS3']}
						githubUrl="https://github.com/krok1029/react-snake-game"
					/>
				</div>
				<div class="project-card group">
					<SideProjectCard
						projecName="Vue 新北都更查詢地圖"
						path="https://krok1029.github.io/xinbei-map/"
						imgPath="https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.49.05.png?raw=true"
						description="整合政府開放資料的互動式地圖應用，提供新北市都更資訊查詢功能。"
						technologies={['Vue.js', 'Leaflet', 'API Integration']}
						githubUrl="https://github.com/krok1029/xinbei-map"
					/>
				</div>
				<div class="project-card group">
					<SideProjectCard
						projecName="Svelte Todos"
						path="https://sveltekit-todos-3yz9a28on-leolees-projects.vercel.app/todos/"
						imgPath="https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.47.38.png?raw=true"
						description="使用 SvelteKit 建構的現代化待辦事項應用，具有直觀的使用者介面。"
						technologies={['Svelte', 'SvelteKit', 'TypeScript']}
						githubUrl="https://github.com/krok1029/svelte-todos"
					/>
				</div>
				<div class="project-card group">
					<SideProjectCard
						projecName="Fight Game"
						path="https://fight-game-steel.vercel.app/"
						imgPath="https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.44.51.png?raw=true"
						description="JavaScript 開發的格鬥遊戲，展示動畫和遊戲邏輯的實作技巧。"
						technologies={['JavaScript', 'Canvas API', 'Game Development']}
						githubUrl="https://github.com/krok1029/fight-game"
					/>
				</div>
				<div class="project-card group">
					<SideProjectCard
						projecName="Svelte Weather App"
						path="https://my-svelte-weather.vercel.app/"
						imgPath="https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96_2024-08-03.png?raw=true"
						description="整合天氣 API 的 Svelte 應用程式，提供即時天氣資訊和預報功能。"
						technologies={['Svelte', 'Weather API', 'Responsive Design']}
						githubUrl="https://github.com/krok1029/svelte-weather-app"
					/>
				</div>
			</div>
			
			<div class="text-center mt-12">
				<a href="/blog" class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
					查看更多專案
					<ExternalLink size={16} />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-20 bg-slate-900 text-white">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl lg:text-4xl font-bold mb-4">讓我們一起合作</h2>
			<p class="text-lg text-gray-300 mb-8">
				如果您對我的工作感興趣，或有任何合作機會，歡迎與我聯絡！
			</p>
			
			<div class="flex flex-wrap justify-center gap-6">
				<a href="mailto:your.email@example.com" class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
					<Mail size={20} />
					發送郵件
				</a>
				<a href="https://github.com/krok1029" class="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors" target="_blank" rel="noopener noreferrer">
					<Github size={20} />
					GitHub
				</a>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.skill-item {
		@apply flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1;
	}
	
	.skill-label {
		@apply mt-3 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors;
	}
	
	.project-card {
		@apply transform transition-all duration-300 hover:-translate-y-2;
	}
</style>
