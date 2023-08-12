import { blogRepo } from '$lib/repositoryFactory/RepositoryFactory';


export async function load({ params }) {
  // console.log(params.blogId)
  const res = await blogRepo.getBlogPost(params.blogId);
	return {
		blogPost: res
	};
}
