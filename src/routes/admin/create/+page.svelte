<!-- src/routes/admin/create/+page.svelte -->
<script lang="ts">
	import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';

	import { marked } from 'marked';

	let content = `	Write my blog`;
	let title: string;
	let inputTags: string;
	let brief: string;

	const handleClick = async () => {
		const res = await blogRepo.createBlogPost({
			title,
			tags: inputTags.split(','),
			brief,
			content
		});
		if(res){
			alert('新增成功！')
		}
	};
</script>

<svelte:head>
	<title>Admin route</title>
</svelte:head>

<h1 class="text-4xl font-bold">Admin route</h1>
<div class="flex justify-center flex-col items-center">
	<article class="prose max-w-none m-3 w-full flex justify-center">
		<main class="container px-6 py-3 bg-slate-300">
			<header class="header grid grid-cols-12 grid-rows-2">
				<div class="mb-3 col-span-11">
					<label for="title">Title</label>
					<input
						class="px-2 w-full rounded border-2 border-slate-200 placeholder-slate-400"
						type="text"
						name="title"
						id="title"
						placeholder="title"
						bind:value={title}
					/>
				</div>
				<div class="col-span-1 text-end">
					<button
						class="w-auto align-middle m-3 px-4 py-2 bg-sky-500 text-white rounded leading-none"
						on:click={handleClick}
					>
						Save</button
					>
				</div>
				<div class="mb-3 col-span-12">
					<label for="tag">Tags</label>
					<input
						class="px-2 w-full rounded border-2 border-slate-200 placeholder-slate-400"
						type="text"
						name="tag"
						id="tag"
						placeholder="Use , to split tags "
						bind:value={inputTags}
					/>
				</div>

				<div class="mb-3 col-span-12">
					<label for="brief">Brief</label>
					<textarea
						class="px-2 w-full rounded border-2 border-slate-200 placeholder-slate-400"
						name="brief"
						id="brief"
						placeholder="brief"
						bind:value={brief}
					/>
				</div>
			</header>

			<div class="markdown-editor rounded">
				<div class="left-panel">
					<textarea bind:value={content} class="source p-3" />
				</div>

				<div class="right-panel">
					<div class="output">{@html marked(content, { mangle: false, headerIds: false })}</div>
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
