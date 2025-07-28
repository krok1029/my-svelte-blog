import type {Timestamp} from  'firebase/firestore'
export type BlogPost = {
	id?: string;
	title: string;
	tags?: string[];
	brief?: string;
	content?: string;
	image?: string; // 文章封面圖片
	createdAt?: Timestamp | string;
	updatedAt?: Timestamp | string;
};
