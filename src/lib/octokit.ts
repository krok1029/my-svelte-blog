import { Octokit } from 'octokit';
import { PUBLIC_GITHUB_OWNER, PUBLIC_GITHUB_REPO, PUBLIC_GIT_FILE_PATH } from '$env/static/public';

const octokit = new Octokit();

const fixPath = `/repos/${PUBLIC_GITHUB_OWNER}/${PUBLIC_GITHUB_REPO}`;
export const octokitPath = {
	createBlogPost: () => `POST ${fixPath}/issues`,
	getBlogPosts: () => `GET ${fixPath}/issues`,
	getBlogPost: (id: string | number) => `GET ${fixPath}/issues/${id}`,
	updateBlogPost: (id: string | number) => `PATCH ${fixPath}/issues/${id}`,
	deleteBlogPost: (id: string | number) => `PATCH ${fixPath}/issues/${id}`,
	createOrUpdateFile: (filename: string) =>
		`PUT ${fixPath}/contents/${PUBLIC_GIT_FILE_PATH + filename}`,
	getAllFiles: (path: string) => `GET ${fixPath}/contents/src/assets/image/${path}`
};
export default octokit;
