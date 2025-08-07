<script>
	import SideProjectCard from '../SideProjectCard.svelte';
	import { ExternalLink } from 'lucide-svelte';

	const projects = [
		{
			name: 'React Snake Game',
			path: 'https://krok1029.github.io/react-snake-game/',
			imgPath:
				'https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.50.19.png?raw=true',
			description: '使用 React 開發的經典貪食蛇遊戲，具有響應式設計和流暢的遊戲體驗。',
			technologies: ['React', 'JavaScript', 'CSS3'],
			githubUrl: 'https://github.com/krok1029/react-snake-game'
		},
		{
			name: 'Vue 新北都更查詢地圖',
			path: 'https://krok1029.github.io/xinbei-map/',
			imgPath:
				'https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.49.05.png?raw=true',
			description: '整合政府開放資料的互動式地圖應用，提供新北市都更資訊查詢功能。',
			technologies: ['Vue.js', 'Leaflet', 'API Integration'],
			githubUrl: 'https://github.com/krok1029/xinbei-map'
		},
		{
			name: 'Svelte Todos',
			path: 'https://sveltekit-todos-3yz9a28on-leolees-projects.vercel.app/todos/',
			imgPath:
				'https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.47.38.png?raw=true',
			description: '使用 SvelteKit 建構的現代化待辦事項應用，具有直觀的使用者介面。',
			technologies: ['Svelte', 'SvelteKit', 'TypeScript'],
			githubUrl: 'https://github.com/krok1029/svelte-todos'
		},
		{
			name: 'Fight Game',
			path: 'https://fight-game-steel.vercel.app/',
			imgPath:
				'https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96%202024-03-10%20%E4%B8%8B%E5%8D%883.44.51.png?raw=true',
			description: 'JavaScript 開發的格鬥遊戲，展示動畫和遊戲邏輯的實作技巧。',
			technologies: ['JavaScript', 'Canvas API', 'Game Development'],
			githubUrl: 'https://github.com/krok1029/fight-game'
		},
		{
			name: 'Svelte Weather App',
			path: 'https://my-svelte-weather.vercel.app/',
			imgPath:
				'https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/%E6%88%AA%E5%9C%96_2024-08-03.png?raw=true',
			description: '整合天氣 API 的 Svelte 應用程式，提供即時天氣資訊和預報功能。',
			technologies: ['Svelte', 'Weather API', 'Responsive Design'],
			githubUrl: 'https://github.com/krok1029/svelte-weather-app'
		},
		{
			name: 'Vocabulary Flashcards',
			path: 'https://github.com/krok1029/vocab-flashcards',
			imgPath:
				'https://github.com/krok1029/my-svelte-blog/blob/image/src/assets/image/vocab-flashcard.png?raw=true',
			description:
				'一款基於 Tauri 與 SvelteKit 的智慧單字卡工具，具備字典查詢、批次匯入、熟悉度管理與智能複習等功能。',
			technologies: ['Tauri', 'SvelteKit', 'TypeScript', 'Rust', 'SQLite'],
			githubUrl: 'https://github.com/krok1029/vocab-flashcards'
		}
	];
</script>

<section class="bg-gray-50 py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">精選專案</h2>
				<p class="text-lg text-gray-600">我開發的一些有趣的 Side Projects</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each projects as project}
					<div class="group transform transition-all duration-300 hover:-translate-y-2">
						<SideProjectCard
							projectName={project.name}
							path={project.path}
							imgPath={project.imgPath}
							description={project.description}
							technologies={project.technologies}
							githubUrl={project.githubUrl}
						/>
					</div>
				{/each}
			</div>

			<div class="mt-12 text-center">
				<a
					href="/blog"
					class="inline-flex items-center gap-2 font-medium text-purple-600 hover:text-purple-700"
				>
					查看更多專案
					<ExternalLink size={16} />
				</a>
			</div>
		</div>
	</div>
</section>
