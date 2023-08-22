import { db } from '$lib/fireStore/fireStore';
import type { DatabaseType } from '$lib/types/Database';
import { DATABASE } from '$lib/const';
import FirestoreBlogRepository from './blog/FirestoreBlogRepository';
import GithubIssueBlogRepository from './blog/GithubIssueBlogRepository';

export default class RepositoryFactory {
	static createBlogRepository(databaseType: DatabaseType) {
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
}

const DB = DATABASE.GITHUB_ISSUE

const blogRepo = RepositoryFactory.createBlogRepository(DB);

export { blogRepo };
