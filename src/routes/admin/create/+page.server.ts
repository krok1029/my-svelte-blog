import { fail, redirect } from '@sveltejs/kit';
import { BlogService } from '$lib/server/repositoryFactory/blog/blogService';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const title = data.get('title') as string;
		const tags = data.get('tags') as string;
		const brief = data.get('brief') as string;
		const content = data.get('content') as string;

		// 驗證必填欄位
		if (!title?.trim()) {
			return fail(400, {
				error: '請輸入文章標題',
				title,
				tags,
				brief,
				content
			});
		}

		if (!content?.trim()) {
			return fail(400, {
				error: '請輸入文章內容',
				title,
				tags,
				brief,
				content
			});
		}

		try {
			// 處理標籤
			const tagArray = tags
				? tags
						.split(',')
						.map((tag) => tag.trim())
						.filter((tag) => tag)
				: [];

			// 創建部落格文章
			const result = await BlogService.createBlogPost({
				title: title.trim(),
				tags: tagArray,
				brief: brief?.trim() || '',
				content: content.trim()
			});

			if (!result) {
				return fail(500, {
					error: '建立文章失敗，請稍後再試',
					title,
					tags,
					brief,
					content
				});
			}
		} catch (error) {
			// 如果是重定向錯誤，重新拋出
			if (error instanceof Response) {
				throw error;
			}

			// 處理特定的錯誤類型
			if (error instanceof Error && error.message.includes('GitHub token')) {
				return fail(500, {
					error: '系統配置錯誤，請聯絡管理員',
					title,
					tags,
					brief,
					content
				});
			}

			return fail(500, {
				error: '建立文章失敗，請稍後再試',
				title,
				tags,
				brief,
				content
			});
		}

		redirect(303, '/admin?success=文章建立成功');
	}
};
