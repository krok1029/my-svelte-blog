<!-- src/routes/admin/+page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let source = `
	# H1 heading

	## H2 heading

	### H3 heading

	--------

	**bold text**

	*italicized text*

	--------

	1. First item
	2. Second item
	3. Third item

	- First item
	- Second item
	- Third item

	[Svelte](https://svelte.dev/)
	`;

	const handleClick = () => {
		console.log('data: ', source);
		
	};
</script>

<svelte:head>
	<title>Admin route</title>
</svelte:head>

<h1 class="text-4xl font-bold">Admin route</h1>
<div class="flex justify-center flex-col items-center">
	<article class="prose max-w-none m-3 w-full flex justify-center">
		<main class="container p-6 bg-slate-300">
			<header class="header grid grid-cols-12">
				<div class="m-3 col-span-5 flex flex-nowrap">
					<label for="title">Title</label>
					<input
						class="mx-2 px-2 w-full rounded border-2 border-slate-200 placeholder-slate-400"
						type="text"
						name="title"
						id="title"
						placeholder="title"
					/>
				</div>
				<div class="m-3 col-span-5 flex flex-nowrap">
					<label for="tag">Tags</label>
					<input
						class="mx-2 px-2 w-full rounded border-2 border-slate-200 placeholder-slate-400"
						type="text"
						name="tag"
						id="tag"
						placeholder="Use , to split tags "
					/>
				</div>
				<button
					class="col-span-2 m-3 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
					on:click={handleClick}
				>
					Save</button
				>
			</header>

			<div class="markdown-editor rounded">
				<div class="left-panel">
					<textarea bind:value={source} class="source" />
				</div>

				<div class="right-panel">
					<div class="output">{@html marked(source, { mangle: false, headerIds: false })}</div>
				</div>
			</div>
		</main>
	</article>
</div>

<style>
	.markdown-editor {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-evenly;
	}
	.left-panel,
	.right-panel {
		width: 50%;
		border: solid 1px black;
		height: 70vh;
		background: #ffffff;
	}
	.right-panel {
		overflow: auto;
	}
	.source {
		border: none;
		width: 100%;
		height: 100%;
		background: #001628;
		color: #83ba52;
	}
	.source:focus {
		outline: none;
	}
	.output {
		width: 100%;
		padding: 0 2em;
	}
</style>
