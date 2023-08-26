import { Octokit } from 'octokit';
import { PUBLIC_GITHUB_TOKEN, PUBLIC_GITHUB_OWNER, PUBLIC_GITHUB_REPO } from '$env/static/public';

const octokit = new Octokit({
	auth: PUBLIC_GITHUB_TOKEN
});

const fixPath = `/repos/${PUBLIC_GITHUB_OWNER}/${PUBLIC_GITHUB_REPO}`;
export const octokitPath = {
	createBlogPost: () => `POST ${fixPath}/issues`,
	getBlogPosts: () => `GET ${fixPath}/issues`,
	getBlogPost: (id: string | number) => `GET ${fixPath}/issues/${id}`,
	updateBlogPost: (id: string | number) => `PATCH ${fixPath}/issues/${id}`,
	deleteBlogPost: (id: string | number) => `PATCH ${fixPath}/issues/${id}`
};
export default octokit;
