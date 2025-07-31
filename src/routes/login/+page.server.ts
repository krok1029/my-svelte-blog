import { fail, redirect } from '@sveltejs/kit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '$lib/firebase';
import { redirectIfAuthenticated } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	// 如果使用者已登入，重新導向至管理頁面
	redirectIfAuthenticated(cookies);
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		// 伺服器端驗證
		if (!email || !password) {
			return fail(400, {
				email: email || '',
				missing: true,
				message: '請填寫所有必填欄位'
			});
		}

		// 基本 email 格式驗證
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				email,
				invalid: true,
				message: 'Email 格式不正確'
			});
		}

		try {
			// Firebase 身分驗證
			const userCredentials = await signInWithEmailAndPassword(firebaseAuth, email, password);

			// 設定安全的 session cookie
			const sessionToken = await userCredentials.user.getIdToken();

			cookies.set('session', sessionToken, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7 // 7 天
			});

			// 設定使用者資訊 cookie（非敏感資訊）
			cookies.set(
				'user',
				JSON.stringify({
					uid: userCredentials.user.uid,
					email: userCredentials.user.email
				}),
				{
					path: '/',
					httpOnly: false, // 客戶端需要存取
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7
				}
			);
		} catch (error: unknown) {
			console.error('登入錯誤:', error);

			// 根據錯誤代碼回傳友善的錯誤訊息
			let message = '登入失敗，請稍後再試';

			if (error && typeof error === 'object' && 'code' in error) {
				switch (error.code) {
					case 'auth/user-not-found':
						message = '找不到此帳號，請確認 Email 是否正確';
						break;
					case 'auth/wrong-password':
						message = '密碼錯誤，請重新輸入';
						break;
					case 'auth/invalid-email':
						message = 'Email 格式不正確';
						break;
					case 'auth/user-disabled':
						message = '此帳號已被停用';
						break;
					case 'auth/too-many-requests':
						message = '登入嘗試次數過多，請稍後再試';
						break;
					case 'auth/invalid-credential':
						message = '登入憑證無效，請檢查信箱與密碼';
						break;
				}
			}

			return fail(400, {
				email,
				error: true,
				message
			});
		}

		// 登入成功後重新導向
		redirect(303, '/admin');
	}
};
