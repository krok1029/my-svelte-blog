<!-- src/routes/admin/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';
	import type { BlogPost } from '$lib/types/BlogPost';

	let blogPosts: BlogPost[] = [];
	onMount(async () => {
		blogPosts = await blogRepo.getAllBlogPosts();
	});
</script>

<svelte:head>
	<title>Admin route</title>
</svelte:head>

<h1 class="text-4xl font-bold">Admin route</h1>
<div class="container mx-auto my-4">
	<div class="text-right my-3">
		<a href="/admin/create" class="rounded-lg p-2 bg-sky-500 text-slate-50">New Post</a>
	</div>
	<table class="table-fixed border rounded bg-gray-500 min-w-full text-sm font-light text-slate-50">
		<thead class="border-b font-medium">
			<tr>
				<th scope="col" class="px-3 text-center py-4">#</th>
				<th scope="col" class="px-2 text-left py-4">title</th>
				<th scope="col" class="px-2 text-left py-4">tag</th>
				<th scope="col" class="px-6 text-left py-4">brief</th>
				<th scope="col" class="px-6 text-left py-4">createdAt</th>
				<th scope="col" class="px-6 text-left py-4">updatedAt</th>
			</tr>
		</thead>
		<tbody>
			{#each blogPosts as blogPost, i}
				<tr class="">
					<td class="whitespace-nowrap text-center px-3 py-4 font-medium"
						><a href={`/admin/${blogPost.id}`}>{i}</a></td
					>
					<td class="whitespace-nowrap text-left px-2 py-4">{blogPost.title}</td>
					<td class="whitespace-nowrap text-left px-2 py-4">{blogPost.tags}</td>
					<td class="text-left px-6 py-4 overflow-auto">{blogPost.brief}</td>
					<td class="whitespace-nowrap text-left px-6 py-4">{blogPost.createdAt}</td>
					<td class="whitespace-nowrap text-left px-6 py-4">{blogPost.updatedAt}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
