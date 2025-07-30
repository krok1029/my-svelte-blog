import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { FileService } from '$lib/server/repositoryFactory/fileContent/fileService';

export const ssr = false;

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'no-store'
	});
	try {
		const images = await FileService.getAllFileContents();
		return {
			images
		};
	} catch (error) {
		console.error('載入圖片失敗:', error);
		return {
			images: [],
			error: '載入圖片失敗'
		};
	}
};

export const actions: Actions = {
	upload: async ({ request }) => {
		const data = await request.formData();
		const file = data.get('image') as File;

		if (!file || file.size === 0) {
			return fail(400, {
				error: '請選擇要上傳的圖片'
			});
		}

		// 檢查檔案類型
		if (!file.type.startsWith('image/')) {
			return fail(400, {
				error: '請選擇圖片檔案'
			});
		}

		// 檢查檔案大小 (例如限制 5MB)
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			return fail(400, {
				error: '圖片檔案大小不能超過 5MB'
			});
		}

		try {
			// 將檔案轉換為 base64
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const base64 = buffer.toString('base64');
			const dataUrl = `data:${file.type};base64,${base64}`;

			// 清理檔案名稱
			const fileName = file.name.replace(/\s+/g, '_');

			// 上傳到 GitHub
			await FileService.uploadFile(fileName, dataUrl);

			return {
				success: '圖片上傳成功！'
			};
		} catch (error) {
			console.error('上傳圖片失敗:', error);
			return fail(500, {
				error: '上傳圖片失敗，請稍後再試'
			});
		}
	}
};
