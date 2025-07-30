import { db } from '$lib/fireStore/fireStore';
import { PUBLIC_BLOG_GB, PUBLIC_FILE_GB } from '$env/static/public';
import { DATABASE } from '$lib/const';
import FirestoreBlogRepository from './blog/FirestoreBlogRepository';
import GithubIssueBlogRepository from './blog/GithubIssueBlogRepository';
import GithubFileContentRepository from './fileContent/GithubFileContentRepository';

export default class RepositoryFactory {
	static createBlogRepository(databaseType: string) {
		switch (databaseType) {
			case DATABASE.FIRESTORE:
				return new FirestoreBlogRepository(db);
			// 可以在這裡添加其他資料庫類型的支援
			case DATABASE.GITHUB_ISSUE:
				return new GithubIssueBlogRepository(/* MySQL 連線設定 */);
			default:
				throw new Error('不支援的資料庫類型');
		}
	}
	static createImageRepository(databaseType: string) {
		switch (databaseType) {
			// 可以在這裡添加其他資料庫類型的支援
			case DATABASE.GITHUB_ISSUE:
				return new GithubFileContentRepository();
			default:
				throw new Error('不支援的資料庫類型 ');
		}
	}
}

const blogRepo = RepositoryFactory.createBlogRepository(PUBLIC_BLOG_GB);
const fileRepo = RepositoryFactory.createImageRepository(PUBLIC_FILE_GB);

export { blogRepo, fileRepo };
