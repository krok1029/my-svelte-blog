import type {Timestamp} from  'firebase/firestore'
export type BlogPost = {
	id?: string;
	title: string;
	tags?: string[];
	brief?: string;
	content?: string;
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
};
