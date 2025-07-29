import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';

export const load = async () => {
	const blogPosts = await blogRepo.getAllBlogPosts();
	return {
		blogPosts
	};
};
