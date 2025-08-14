<script lang="ts">
	import { ExternalLink, Github } from 'lucide-svelte';

	interface Props {
		path: string;
		imgPath: string;
		projectName: string;
		description?: string;
		technologies?: string[];
		githubUrl?: string;
	}

	let {
		path,
		imgPath,
		projectName,
		description = '',
		technologies = [],
		githubUrl = ''
	}: Props = $props();
</script>

<div
	class="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
>
	<!-- Image Container -->
	<div class="relative overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
		<img
			class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
			src={imgPath}
			alt={projectName}
			loading="lazy"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<div class="absolute right-4 bottom-4 left-4 flex gap-2">
				<a
					href={path}
					target="_blank"
					rel="noopener noreferrer"
					class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm transition-colors hover:bg-white dark:bg-gray-800/90 dark:text-gray-100 dark:hover:bg-gray-800"
				>
					<ExternalLink size={16} />
					查看專案
				</a>
				{#if githubUrl}
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-lg bg-gray-900/90 px-3 py-2 text-white backdrop-blur-sm transition-colors hover:bg-gray-900 dark:bg-gray-700/90 dark:hover:bg-gray-700"
					>
						<Github size={16} />
					</a>
				{/if}
			</div>
		</div>
	</div>

	<!-- Content Container -->
	<div class="flex flex-1 flex-col p-6">
		<!-- Title -->
		<h3
			class="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-gray-100 dark:group-hover:text-purple-400"
		>
			<a href={path} target="_blank" rel="noopener noreferrer" class="hover:underline">
				{projectName}
			</a>
		</h3>

		<!-- Description -->
		{#if description}
			<p class="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-400">
				{description}
			</p>
		{/if}

		<!-- Technologies -->
		{#if technologies.length > 0}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each technologies as tech}
					<span
						class="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
					>
						{tech}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Action Buttons -->
		<div class="mt-auto flex gap-2">
			<a
				href={path}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
			>
				<ExternalLink size={16} />
				查看專案
			</a>
			{#if githubUrl}
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				>
					<Github size={16} />
				</a>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
</style>
