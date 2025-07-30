import { fileRepo } from '$lib/server/repositoryFactory/RepositoryFactory';
import { CLASS_GITHUB_TOKEN } from '$env/static/private';

export class FileService {
	private static getToken(): string {
		if (!CLASS_GITHUB_TOKEN) {
			throw new Error('GitHub token not found in environment variables');
		}
		return CLASS_GITHUB_TOKEN;
	}

	/**
	 * 上傳檔案到 GitHub
	 */
	static async uploadFile(fileName: string, dataUrl: string): Promise<boolean> {
		const token = this.getToken();
		try {
			await fileRepo.createFileContent(fileName, dataUrl, token);
		} catch (error) {
			console.error('上傳檔案失敗:', error);
			return false;
		}
		return true;
	}

	/**
	 * 取得所有檔案內容
	 */
	static async getAllFileContents(
		path = 'src/assets/image'
	): Promise<Array<{ name: string; path: string }>> {
		try {
			return await fileRepo.getAllFileContents(path);
		} catch (error) {
			console.error('載入檔案失敗:', error);
			return [];
		}
	}
}
