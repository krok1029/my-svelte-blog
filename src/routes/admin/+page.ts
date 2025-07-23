// src/routes/admin/+page.ts

import { authUser } from '$lib/authStore';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const unsubscribe = authUser.subscribe((user) => {
		if (!user) {
			redirect(302, '/login');
		}
	});

	unsubscribe();

	return {};
};
