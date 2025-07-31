import { BlogService } from '$lib/server/repositoryFactory/blog/blogService';
import { requireAuth } from '$lib/auth';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ setHeaders, cookies }) => {
	// 确保用户已登录
	const user = requireAuth(cookies);

	setHeaders({
		'cache-control': 'no-store'
	});
	try {
		const blogPosts = await BlogService.getAllBlogPosts();
		return {
			blogPosts,
			user
		};
	} catch (error) {
		console.error('載入文章失敗:', error);
		return {
			blogPosts: [],
			user,
			error: '載入文章失敗'
		};
	}
};

export const actions: Actions = {
	delete: async ({ request, cookies }) => {
		// 确保用户已登录
		requireAuth(cookies);

		const data = await request.formData();
		const id = data.get('id') as string;

		if (!id) {
			return fail(400, {
				error: '缺少文章 ID'
			});
		}

		try {
			const result = await BlogService.deleteBlogPost(Number(id));
			if (result) {
				return {
					success: '文章刪除成功'
				};
			} else {
				return fail(500, {
					error: '刪除文章失敗'
				});
			}
		} catch (error) {
			console.error('刪除文章失敗:', error);
			return fail(500, {
				error: '刪除文章失敗，請稍後再試'
			});
		}
	}
};
