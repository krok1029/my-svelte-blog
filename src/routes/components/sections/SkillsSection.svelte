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

<section class="py-20 bg-white">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">技術技能</h2>
				<p class="text-lg text-gray-600">我熟悉的前端技術與工具</p>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
				{#each skills as skill}
					<div class="skill-item group">
						<ImageBlock src={skill.src} alt={skill.alt} />
						<span class="skill-label">{skill.name}</span>
					</div>
				{/each}
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
</style>
