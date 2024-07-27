import FileContentRepository from './FileContentRepository';
import octokit, { octokitPath } from '$lib/octokit';
import {
	PUBLIC_GIT_TARGET_BRANCH,
	PUBLIC_GIT_FILE_PATH,
	PUBLIC_GITHUB_OWNER,
	PUBLIC_GITHUB_REPO
} from '$env/static/public';

export default class GithubFileContentRepository extends FileContentRepository {
	constructor() {
		super();
	}
	async createFileContent(fileName: string, fileContent: string): Promise<void> {
		const regex = /data:.*base64,/;

		const result = await octokit
			.request(octokitPath.createOrUpdateFile(fileName), {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				path: PUBLIC_GIT_FILE_PATH + fileName,
				content: fileContent.replace(regex, ''),
				message: 'Upload image',
				branch: PUBLIC_GIT_TARGET_BRANCH, // 指定目標分支
				committer: { name: 'krok1029', email: 'krok1029@gmail.com' },
				author: { name: 'krok1029', email: 'krok1029@gmail.com' },
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			})
			.then((response) => {
				console.log(`Image uploaded to branch ${PUBLIC_GIT_TARGET_BRANCH}. URL: ${response}`);
			})
			.catch((error) => {
				console.error('Error uploading image:', error);
			});
		console.log(result);
	}
	async getAllFileContents(
		path = 'src/assets/image'
	): Promise<Array<{ name: string; path: string }>> {
		const result = await octokit.rest.repos
			.getContent({
				owner: PUBLIC_GITHUB_OWNER,
				repo: PUBLIC_GITHUB_REPO,
				path,
				ref: PUBLIC_GIT_TARGET_BRANCH
			})
			.then((response) => {
				const imgArr = response.data as Array<{
					download_url: string;
					git_url: string;
					html_url: string;
					name: string;
					path: string;
					sha: string;
					size: number;
					type: string;
					url: string;
				}>;
				console.log(`response. URL:`, imgArr);
				return imgArr.map(({ name, path }) => ({ name, path }));
			})
			.catch((error) => {
				console.error('Error uploading image:', error);
				return [];
			});
		return result;
	}
}
