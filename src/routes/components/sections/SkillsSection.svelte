<script>
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

	const skills = [
		{ src: html5, alt: 'HTML5', name: 'HTML5' },
		{ src: css3, alt: 'CSS3', name: 'CSS3' },
		{ src: javascript, alt: 'JavaScript', name: 'JavaScript' },
		{ src: typescript, alt: 'TypeScript', name: 'TypeScript' },
		{ src: react, alt: 'React', name: 'React' },
		{ src: redux, alt: 'Redux', name: 'Redux' },
		{ src: storybook, alt: 'Storybook', name: 'Storybook' },
		{ src: webpack, alt: 'Webpack', name: 'Webpack' }
	];
</script>

<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">技術技能</h2>
				<p class="text-lg text-gray-600">我熟悉的前端技術與工具</p>
			</div>

			<div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8">
				{#each skills as skill}
					<div
						class="group flex flex-col items-center rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
					>
						<ImageBlock src={skill.src} alt={skill.alt} />
						<span
							class="mt-3 text-sm font-medium text-gray-700 transition-colors group-hover:text-purple-600"
							>{skill.name}</span
						>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
