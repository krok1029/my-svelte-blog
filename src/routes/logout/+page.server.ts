import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		// 清除所有驗證相關的 cookies
		cookies.delete('session', { path: '/' });
		cookies.delete('user', { path: '/' });
		
		// 重新導向至首頁或登入頁
		throw redirect(303, '/login');
	}
};

// 如果直接訪問 /logout 路由，也執行登出
export async function load({ cookies }) {
	cookies.delete('session', { path: '/' });
	cookies.delete('user', { path: '/' });
	
	throw redirect(303, '/login');
}
