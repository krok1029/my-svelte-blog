import type { PageLoad } from './$types';

import type { Card as CardType } from '$type/Card';

export const load = (() => {
	const testCards: CardType[] = [
		{
			id: 1,
			title: `The Coldest Sunset`,
			brief:
				'this is a brief string this is a brief stringthis is a brief stringthis is a brief string',
			createdAt: new Date(),
			tags: ['photography', 'travel', 'winter']
		},
		{
			id: 2,
			title: `The Coldest Sunset`,
			brief:
				'this is a brief string this is a brief stringthis is a brief stringthis is a brief string',
			createdAt: new Date(),
			tags: ['photography', 'travel', 'winter']
		},
		{
			id: 3,
			title: `The Coldest Sunset`,
			brief:
				'this is a brief string this is a brief stringthis is a brief stringthis is a brief string',
			createdAt: new Date(),
			tags: ['photography', 'travel', 'winter']
		},
	];

	return {
		testCards
	};
}) satisfies PageLoad;
