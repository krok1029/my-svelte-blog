export type BlogCard = {
	id: number;
	title: string;
	brief: string;
	createdAt: Date | string;
	image?: string;
	tags: string[];
	content?: string; // 用於估算閱讀時間
};

export type PracticeCard = {
	id: number;
	title: string;
	type: 'css' | 'js';
	image?: string;
	description?: string; // 練習描述
	difficulty?: 'easy' | 'medium' | 'hard'; // 難度等級
	tags?: string[]; // 相關標籤
};
