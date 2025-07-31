<script>
	import { Github, Linkedin, Mail, Download } from 'lucide-svelte';
</script>

<section class="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
	<div class="absolute inset-0 bg-black/20"></div>
	<div class="relative container mx-auto px-4 py-20 lg:py-32">
		<div class="mx-auto max-w-4xl text-center">
			<div class="mb-8">
				<div
					class="mx-auto mb-6 h-32 w-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1"
				>
					<div
						class="flex h-full w-full items-center justify-center rounded-full bg-slate-800 text-4xl font-bold"
					>
						李
					</div>
				</div>
				<h1
					class="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent lg:text-6xl"
				>
					李明峯
				</h1>
				<p class="mb-2 text-xl text-gray-300 lg:text-2xl">Frontend Developer</p>
				<p class="text-lg text-gray-400">熱愛創造優質使用者體驗的前端工程師</p>
			</div>

			<p class="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl">
				嗨！我是李明峯，我熱愛將想法轉化為動態且具有吸引力的網頁應用程序。在過去的三年中，我積極參與了各種前端項目，從簡單的網站到複雜的
				Web 應用程式，我都有豐富的實踐經驗。我喜歡追求技術的最新趨勢，並將其應用於我的工作中。
			</p>

			<div class="mb-8 flex flex-wrap justify-center gap-4">
				<a
					href="#contact"
					class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
				>
					<Mail size={20} />
					聯絡我
				</a>
				<a
					href="/resume.pdf"
					class="inline-flex items-center gap-2 rounded-lg border border-purple-400 px-6 py-3 font-medium text-purple-400 transition-colors hover:bg-purple-400 hover:text-white"
				>
					<Download size={20} />
					下載履歷
				</a>
			</div>

			<div class="flex justify-center gap-6">
				<a
					href="https://github.com/krok1029"
					class="text-gray-400 transition-colors hover:text-white"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github size={24} />
				</a>
				<a
					href="https://linkedin.com/in/your-profile"
					class="text-gray-400 transition-colors hover:text-white"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin size={24} />
				</a>
			</div>
		</div>
	</div>
</section>
