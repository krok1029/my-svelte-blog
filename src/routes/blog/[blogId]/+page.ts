import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';

export async function load({ params }: { params: { blogId: string } }) {
	const blogPost = await blogRepo.getBlogPost(params.blogId);

	return {
		blogPost
	};
}
