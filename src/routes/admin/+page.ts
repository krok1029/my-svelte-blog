// src/routes/admin/+page.ts

import { authUser } from '$lib/authStore';

export const load = async ({ data }) => {
	const unsubscribe = authUser.subscribe((_user) => {
		// if (!user) {
		// 	redirect(302, '/login');
		// }
	});

	unsubscribe();

	return data;
};
