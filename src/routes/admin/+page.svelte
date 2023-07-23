<!-- src/routes/admin/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Editor from 'cl-editor/src/Editor.svelte';

	let editor: Editor;
	onMount(() => {
		// Initialize editor
		editor = new Editor({
			// <HTMLElement> required
			target: document.getElementById('editor') as HTMLElement,
			// optional
			props: {
				// <Array[string | Object]> string if overwriting, object if customizing/creating
				// available actions:
				// 'viewHtml', 'undo', 'redo', 'b', 'i', 'u', 'strike', 'sup', 'sub', 'h1', 'h2', 'p', 'blockquote',
				// 'ol', 'ul', 'hr', 'left', 'right', 'center', 'justify', 'a', 'image', 'forecolor', 'backcolor', 'removeFormat'

				// default 300px
				height: '800px',
				// initial html
				html: ''
				// remove format action clears formatting, but also removes some html tags.
				// you can specify which tags you want to be removed.
			}
		});
	});
</script>

<svelte:head>
	<title>Admin route</title>
</svelte:head>

<h1 class="text-4xl font-bold">Admin route</h1>
<div class="flex justify-center flex-col items-center">
	<div class="m-3 w-5/12">
		<label for="title">Title</label>
		<input class="w-9/12 rounded border-2 border-slate-200 placeholder-slate-400" type="text" name="title" id="title" placeholder="title" />
	</div>
	<div class="m-3 w-5/12">
		<label for="tag">Tags</label>
		<input class="w-9/12 rounded border-2 border-slate-200 placeholder-slate-400" type="text" name="tag" id="tag" placeholder="Use , to split tags " />
	</div>
	<article class="prose lg:prose-xl grow">
		<div id="editor" />
	</article>
	<button
		class="flex-none m-3 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
		on:click={() => console.log(editor.getHtml())}
	>
		GET HTML</button
	>
</div>
