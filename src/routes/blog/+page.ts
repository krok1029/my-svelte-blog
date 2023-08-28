import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';

export const load = async () => {
	const blogPosts = await blogRepo.getAllBlogPosts();
	console.log(blogPosts);
	return {
		blogPosts
	};
};
