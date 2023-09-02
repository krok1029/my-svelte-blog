import BlogRepository from './BlogRepository';
import type { BlogPost } from '$lib/types/BlogPost';
import octokit, { octokitPath } from '$lib/octokit';
import { blogBriefBuilder } from '$lib/builder/builder';

export default class GithubIssueBlogRepository extends BlogRepository {
	constructor() {
		super();
	}

	async createBlogPost(blogPost: BlogPost) {
		try {
			const result = await octokit.request(octokitPath.createBlogPost(), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				title: blogPost.title,
				body: blogPost.content,
				labels: blogPost.tags,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			});
			console.log(result);
			return true;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}

	async getAllBlogPosts() {
		try {
			const result = await octokit.request(octokitPath.getBlogPosts(), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			});
			const posts = result.data.map((data: any) => ({
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: any) => label.name),
				brief: blogBriefBuilder(data.body),
				content: data.body,
				createdAt: data.created_at,
				updatedAt: data.updated_at
			}));
			console.log(posts);
			return posts;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}

	async getBlogPost(id: string) {
		try {
			const { data } = await octokit.request(octokitPath.getBlogPost(id), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			});
			const blogPost = {
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: any) => label.name),
				brief: data.body.substring(0, 30),
				content: data.body,
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			return blogPost;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}

	async updateBlogPost(id: number, title: string, tags: string[], content: string) {
		try {
			const { data } = await octokit.request(octokitPath.updateBlogPost(id), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				},
				title,
				labels: tags,
				body: content
			});
			const blogPost = {
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: any) => label.name),
				brief: data.body.substring(0, 30),
				content: data.body,
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			return blogPost;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}

	async deleteBlogPost(id: number) {
		try {
			const { data } = await octokit.request(octokitPath.deleteBlogPost(id), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				},
				state: 'closed'
			});
			const blogPost = {
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: any) => label.name),
				brief: data.body.substring(0, 30),
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			return blogPost;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}
}
