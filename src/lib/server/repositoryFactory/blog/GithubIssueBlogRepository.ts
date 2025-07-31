import BlogRepository from './BlogRepository';
import type { BlogPost } from '$lib/types/BlogPost';
import octokit, { octokitPath } from '$lib/octokit';
import { blogBriefBuilder } from '$lib/builder/builder';

// GitHub API types
interface GitHubLabel {
	name: string;
	color: string;
	description?: string;
}

interface GitHubIssue {
	number: number;
	title: string;
	body: string;
	labels: GitHubLabel[];
	created_at: string;
	updated_at: string;
}

export default class GithubIssueBlogRepository extends BlogRepository {
	constructor() {
		super();
	}

	async createBlogPost(blogPost: BlogPost, token?: string): Promise<boolean> {
		if (!token) {
			throw new Error('GitHub token is required for creating blog posts');
		}

		try {
			await octokit.request(octokitPath.createBlogPost(), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				title: blogPost.title,
				body: blogPost.content,
				labels: blogPost.tags,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
					authorization: `Bearer ${token}`
				}
			});
			return true;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}

	async getAllBlogPosts(token?: string): Promise<BlogPost[]> {
		try {
			const headers: Record<string, string> = {
				'X-GitHub-Api-Version': '2022-11-28'
			};

			// 如果有 token，添加 authorization header
			if (token) {
				headers.authorization = `Bearer ${token}`;
			}

			const result = await octokit.request(octokitPath.getBlogPosts(), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers
			});

			const posts = result.data.map((data: GitHubIssue) => ({
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: GitHubLabel) => label.name),
				brief: blogBriefBuilder(data.body),
				content: data.body,
				createdAt: data.created_at,
				updatedAt: data.updated_at
			}));
			return posts;
		} catch (e) {
			console.error('Error getting all documents: ', e);
			throw e;
		}
	}

	async getBlogPost(id: string, token?: string): Promise<BlogPost | null> {
		try {
			const headers: Record<string, string> = {
				'X-GitHub-Api-Version': '2022-11-28'
			};

			if (token) {
				headers.authorization = `Bearer ${token}`;
			}

			const { data } = await octokit.request(octokitPath.getBlogPost(id), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers
			});

			const blogPost = {
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: GitHubLabel) => label.name),
				brief: data.body.substring(0, 30),
				content: data.body,
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			return blogPost;
		} catch (e) {
			console.error('Error getting document: ', e);
			throw e;
		}
	}

	async updateBlogPost(
		id: number,
		title: string,
		tags: string[],
		content: string,
		token?: string
	): Promise<BlogPost | null> {
		if (!token) {
			throw new Error('GitHub token is required for updating blog posts');
		}

		try {
			const { data } = await octokit.request(octokitPath.updateBlogPost(id), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
					authorization: `Bearer ${token}`
				},
				title,
				labels: tags,
				body: content
			});

			const blogPost = {
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: GitHubLabel) => label.name),
				brief: data.body.substring(0, 30),
				content: data.body,
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			return blogPost;
		} catch (e) {
			console.error('Error updating document: ', e);
			throw e;
		}
	}

	async deleteBlogPost(id: number, token?: string): Promise<BlogPost | null> {
		if (!token) {
			throw new Error('GitHub token is required for deleting blog posts');
		}

		try {
			const { data } = await octokit.request(octokitPath.deleteBlogPost(id), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28',
					authorization: `Bearer ${token}`
				},
				state: 'closed'
			});

			const blogPost = {
				id: data.number,
				title: data.title,
				tags: data.labels.map((label: GitHubLabel) => label.name),
				brief: data.body.substring(0, 30),
				createdAt: data.created_at,
				updatedAt: data.updated_at
			};
			return blogPost;
		} catch (e) {
			console.error('Error deleting document: ', e);
			throw e;
		}
	}
}
