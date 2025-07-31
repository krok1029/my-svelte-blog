import { fail, redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '$lib/firebase';
import { redirectIfAuthenticated } from '$lib/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	// 如果使用者已登入，重新導向至管理頁面
	redirectIfAuthenticated(cookies);
};

// 密碼強度檢查函式
function checkPasswordStrength(password: string): {
	score: number;
	isValid: boolean;
	feedback: string[];
} {
	if (!password) return { score: 0, isValid: false, feedback: ['密碼不能為空'] };

	let score = 0;
	const feedback: string[] = [];

	if (password.length >= 8) score += 1;
	else feedback.push('至少 8 個字元');

	if (/[a-z]/.test(password)) score += 1;
	else feedback.push('包含小寫字母');

	if (/[A-Z]/.test(password)) score += 1;
	else feedback.push('包含大寫字母');

	if (/\d/.test(password)) score += 1;
	else feedback.push('包含數字');

	if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
	else feedback.push('包含特殊符號');

	return {
		score,
		isValid: score >= 3,
		feedback
	};
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword') as string;

		// 基本驗證
		if (!email || !password || !confirmPassword) {
			return fail(400, {
				email: email || '',
				missing: true,
				message: '請填寫所有必填欄位'
			});
		}

		// Email 格式驗證
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				email,
				invalid: true,
				message: 'Email 格式不正確'
			});
		}

		// 密碼確認驗證
		if (password !== confirmPassword) {
			return fail(400, {
				email,
				passwordMismatch: true,
				message: '密碼與確認密碼不一致'
			});
		}

		// 密碼強度驗證
		const passwordCheck = checkPasswordStrength(password);
		if (!passwordCheck.isValid) {
			return fail(400, {
				email,
				weakPassword: true,
				message: `密碼強度不足，建議改進：${passwordCheck.feedback.join(', ')}`
			});
		}

		try {
			// Firebase 使用者註冊
			const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);

			// 取得使用者 token
			const sessionToken = await userCredentials.user.getIdToken();

			// 設定安全的 session cookie
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
					httpOnly: false,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7
				}
			);
		} catch (error: any) {
			console.error('註冊錯誤:', error);

			// 根據錯誤代碼回傳友善的錯誤訊息
			let message = '註冊失敗，請稍後再試';

			switch (error.code) {
				case 'auth/email-already-in-use':
					message = '此 Email 已被註冊，請使用其他 Email 或前往登入';
					break;
				case 'auth/invalid-email':
					message = 'Email 格式不正確';
					break;
				case 'auth/weak-password':
					message = '密碼強度不足，請使用至少 6 個字元的密碼';
					break;
				case 'auth/operation-not-allowed':
					message = '註冊功能暫時停用，請聯絡管理員';
					break;
				case 'auth/network-request-failed':
					message = '網路連線失敗，請檢查網路後重試';
					break;
			}

			return fail(400, {
				email,
				error: true,
				message
			});
		}

		// 註冊成功後重新導向至管理頁面
		redirect(303, '/admin');
	}
};
