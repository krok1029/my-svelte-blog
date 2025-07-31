import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export interface User {
	uid: string;
	email: string;
}

export function getUser(cookies: RequestEvent['cookies']): User | null {
	const userCookie = cookies.get('user');
	const sessionCookie = cookies.get('session');

	if (!userCookie || !sessionCookie) {
		return null;
	}

	try {
		return JSON.parse(userCookie);
	} catch {
		return null;
	}
}

export function requireAuth(cookies: RequestEvent['cookies']): User {
	const user = getUser(cookies);

	if (!user) {
		throw redirect(303, '/login');
	}

	return user;
}

export function redirectIfAuthenticated(
	cookies: RequestEvent['cookies'],
	redirectTo: string = '/admin'
) {
	const user = getUser(cookies);

	if (user) {
		throw redirect(303, redirectTo);
	}
}
