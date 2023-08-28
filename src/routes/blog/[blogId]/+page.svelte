<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';

	export let data: PageData;
	const { title, content } = data.blogPost;
</script>

<div class="container mx-auto p-4">
	<article class="prose lg:prose-xl mx-auto">
		<h1>{title}</h1>
		{@html marked(content, { mangle: false, headerIds: false })}
		<!-- ... -->
	</article>
</div>
