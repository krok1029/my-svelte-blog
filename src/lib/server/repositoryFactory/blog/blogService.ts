import { blogRepo } from '$lib/server/repositoryFactory/RepositoryFactory';
import { CLASS_GITHUB_TOKEN } from '$env/static/private';
import type { BlogPost } from '$lib/types/BlogPost';

/**
 * Server-side blog service
 * 這個 service 只能在 server 端使用，因為它需要存取環境變數
 */
export class BlogService {
	private static getToken(): string {
		if (!CLASS_GITHUB_TOKEN) {
			throw new Error('GitHub token not found in environment variables');
		}
		return CLASS_GITHUB_TOKEN;
	}

	/**
	 * 創建新的部落格文章
	 */
	static async createBlogPost(blogPost: BlogPost): Promise<boolean> {
		const token = this.getToken();
		return await blogRepo.createBlogPost(blogPost, token);
	}

	/**
	 * 獲取所有部落格文章
	 */
	static async getAllBlogPosts(): Promise<BlogPost[]> {
		const token = this.getToken();
		return await blogRepo.getAllBlogPosts(token);
	}

	/**
	 * 獲取單篇部落格文章
	 */
	static async getBlogPost(id: string): Promise<BlogPost | null> {
		const token = this.getToken();
		return await blogRepo.getBlogPost(id, token);
	}

	/**
	 * 更新部落格文章
	 */
	static async updateBlogPost(
		id: number, 
		title: string, 
		tags: string[], 
		content: string
	): Promise<BlogPost | null> {
		const token = this.getToken();
		return await blogRepo.updateBlogPost(id, title, tags, content, token);
	}

	/**
	 * 刪除部落格文章
	 */
	static async deleteBlogPost(id: number): Promise<BlogPost | null> {
		const token = this.getToken();
		console.log('Deleting blog post with ID:', id, 'using token:', token);
		return await blogRepo.deleteBlogPost(id, token);
	}

	/**
	 * 獲取公開的部落格文章（不需要 token）
	 * 用於前端頁面顯示
	 */
	static async getPublicBlogPosts(): Promise<BlogPost[]> {
		return await blogRepo.getAllBlogPosts(); // 不傳 token
	}

	/**
	 * 獲取公開的單篇部落格文章（不需要 token）
	 */
	static async getPublicBlogPost(id: string): Promise<BlogPost | null> {
		return await blogRepo.getBlogPost(id); // 不傳 token
	}
}
