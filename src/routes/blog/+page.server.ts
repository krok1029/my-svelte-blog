import { blogRepo } from '$lib/server/repositoryFactory/RepositoryFactory';

export const load = async () => {
	const blogPosts = await blogRepo.getAllBlogPosts();
	return {
		blogPosts
	};
};
