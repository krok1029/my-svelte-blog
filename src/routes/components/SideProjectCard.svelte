<script lang="ts">
	import { ExternalLink, Github } from 'lucide-svelte';

	interface Props {
		path: string;
		imgPath: string;
		projecName: string;
		description?: string;
		technologies?: string[];
		githubUrl?: string;
	}

	let {
		path,
		imgPath,
		projecName,
		description = '',
		technologies = [],
		githubUrl = ''
	}: Props = $props();
</script>

<div class="project-card group">
	<!-- Image Container -->
	<div class="relative overflow-hidden rounded-t-xl bg-gray-100">
		<img
			class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
			src={imgPath}
			alt={projecName}
			loading="lazy"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
		>
			<div class="absolute bottom-4 left-4 right-4 flex gap-2">
				<a
					href={path}
					target="_blank"
					rel="noopener noreferrer"
					class="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors"
				>
					<ExternalLink size={16} />
					查看專案
				</a>
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors"
					>
						<Github size={16} />
					</a>
				{/if}
			</div>
		</div>
	</div>

	<!-- Content Container -->
	<div class="p-6 flex-1 flex flex-col">
		<!-- Title -->
		<h3 class="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
			<a href={path} target="_blank" rel="noopener noreferrer" class="hover:underline">
				{projecName}
			</a>
		</h3>

		<!-- Description -->
		{#if description}
			<p class="text-gray-600 text-sm mb-4 flex-1">
				{description}
			</p>
		{/if}

		<!-- Technologies -->
		{#if technologies.length > 0}
			<div class="flex flex-wrap gap-2 mb-4">
				{#each technologies as tech}
					<span class="tech-tag">
						{tech}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Action Buttons -->
		<div class="flex gap-2 mt-auto">
			<a
				href={path}
				target="_blank"
				rel="noopener noreferrer"
				class="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
			>
				<ExternalLink size={16} />
				查看專案
			</a>
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
				>
					<Github size={16} />
				</a>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.project-card {
		@apply bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full;
	}

	.tech-tag {
		@apply bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium;
	}
</style>
