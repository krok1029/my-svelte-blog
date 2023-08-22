import BlogRepository from './BlogRepository';
import type { BlogPost } from '$lib/types/BlogPost';
import { Octokit, App } from 'octokit';
import { PUBLIC_GITHUB_TOKEN } from '$env/static/public';
export default class GithubIssueBlogRepository extends BlogRepository {
	constructor() {
		super();
	}

	async createBlogPost(blogPost: BlogPost) {
		const octokit = new Octokit({
			auth: PUBLIC_GITHUB_TOKEN
		});
		try {
			const a = await octokit.request('POST /repos/krok1029/my-svelte-blog/issues', {
				owner: 'krok1029',
				repo: 'my-svelte-blog',
				title: 'test create issue',
				body: "I'm testing create issue.",
				assignees: ['krok1029'],
				labels: ['test'],
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			});
			console.log(a);
			// const uri = 'https://api.github.com/repos/krok1029/my-svelte-blog/issues';
			// const payload = {
			// 	title: 'Found a bug',
			// 	body: "I'''m having a problem with this.",
			// 	labels: ['bug']
			// };
			// const config: RequestInit = {
			// 	method: 'POST',
			// 	headers: { Accept: 'application/vnd.github.v3+json' },
			// 	redirect: 'follow',
			// 	body: JSON.stringify(payload)
			// };

			// const data = fetch(uri, config)
			// 	.then((response) => response.json())
			// 	.then((result) => {
			// 		console.log(result);
			// 		// const datas: BlogPost[] = result.map((data: any) => ({
			// 		// 	id: data.number,
			// 		// 	title: data.title,
			// 		// 	tags: data.labels,
			// 		// 	brief: data.body.substring(0, 30),
			// 		// 	createdAt: data.created_at,
			// 		// 	updatedAt: data.updated_at
			// 		// }));
			// 		// console.log(datas);
			// 		// return datas;
			// 	})
			// 	.catch((error) => {
			// 		console.log('error', error);
			// 		throw error;
			// 	});
			return true;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}

	async getAllBlogPosts() {
		try {
			const uri = 'https://api.github.com/repos/krok1029/my-svelte-blog/issues';

			const config: RequestInit = {
				method: 'GET',
				headers: { Accept: 'application/vnd.github.v3+json' },
				redirect: 'follow'
			};

			const datas = fetch(uri, config)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					const datas: BlogPost[] = result.map((data: any) => ({
						id: data.number,
						title: data.title,
						tags: data.labels,
						brief: data.body.substring(0, 30),
						createdAt: data.created_at,
						updatedAt: data.updated_at
					}));
					console.log(datas);
					return datas;
				})
				.catch((error) => {
					console.log('error', error);
					throw error;
				});

			return datas;
		} catch (e) {
			console.error('Error adding document: ', e);
			throw e;
		}
	}

	// async getBlogPost(id: string) {
	// 	try {
	// 		const q = query(this.blogPostsCollection, where('ㄌ', '!=', '1YF044Jnigwo2RJ3qyl5'));
	// 		const querySnapshot = await getDocs(q);
	// 		let blogPost = {} as BlogPost;
	// 		console.log('aaa',querySnapshot.size)

	// 		querySnapshot.forEach((doc) => {
	// 			console.log(doc.id, " => ", doc.data());
	// 			blogPost = {...doc.data()} as BlogPost;
	// 			return
	// 		});

	// 		return blogPost;
	// 	} catch (e) {
	// 		console.error('Error adding document: ', e);
	// 		throw e;
	// 	}
	// }

	// updateBlogPost(postId: number, title: string, tags: string[], content: string): void {
	// 	return this.blogPostsCollection.doc(postId).update({
	// 		title: title,
	// 		tags: tags,
	// 		content: content
	// 	});
	// }

	// deleteBlogPost(postId: number) {
	// 	return this.blogPostsCollection.doc(postId).delete();
	// }
}
