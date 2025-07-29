<script>
	import { Github, Mail } from 'lucide-svelte';
</script>

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
