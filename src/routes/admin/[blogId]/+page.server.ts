import { BlogService } from '$lib/server/repositoryFactory/blog/blogService';
import { blogRepo } from '$lib/server/repositoryFactory/RepositoryFactory';
import type { BlogPost } from '$lib/types/BlogPost';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const res = await blogRepo.getBlogPost(params.blogId);
	return {
		blogPost: res as BlogPost
	};
}

export const actions: Actions = {
	update: async ({ request, params }) => {
		const id = params.blogId;
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

			// 更新部落格文章
			const result = await BlogService.updateBlogPost(
				Number(id),
				title.trim(),
				tagArray,
				content.trim()
			);

			if (!result) {
				return fail(500, {
					error: '更新文章失敗，請稍後再試',
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
				error: '更新文章失敗，請稍後再試',
				title,
				tags,
				brief,
				content
			});
		}

		redirect(303, '/admin?success=文章更新成功');
	},
	delete: async ({ params }) => {
		const id = params.blogId;

		if (!id) {
			return fail(400, {
				error: '缺少文章 ID'
			});
		}

		try {
			const result = await BlogService.deleteBlogPost(Number(id));
			if (!result) {
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

		redirect(303, '/admin?success=文章刪除成功');
	}
};
