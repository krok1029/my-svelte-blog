import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';

export async function load({ params }) {
	const res = await blogRepo.getBlogPost(params.blogId);
	return {
		blogPost: res
	};
}
