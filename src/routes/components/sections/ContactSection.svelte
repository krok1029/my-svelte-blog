<script>
	import { Github, Mail } from 'lucide-svelte';
</script>

<section id="contact" class="bg-slate-900 py-20 text-white">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-4 text-3xl font-bold lg:text-4xl">讓我們一起合作</h2>
			<p class="mb-8 text-lg text-gray-300">
				如果您對我的工作感興趣，或有任何合作機會，歡迎與我聯絡！
			</p>

			<div class="flex flex-wrap justify-center gap-6">
				<a
					href="mailto:your.email@example.com"
					class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
				>
					<Mail size={20} />
					發送郵件
				</a>
				<a
					href="https://github.com/krok1029"
					class="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-6 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-700"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github size={20} />
					GitHub
				</a>
			</div>
		</div>
	</div>
</section>
