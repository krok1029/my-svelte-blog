<script>
	import { Github, Linkedin, Mail, Download } from 'lucide-svelte';
</script>

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
