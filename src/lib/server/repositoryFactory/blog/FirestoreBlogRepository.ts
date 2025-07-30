import BlogRepository from './BlogRepository';
import type { Firestore, CollectionReference, DocumentData } from 'firebase/firestore';
import { collection, addDoc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import type { BlogPost } from '$lib/types/BlogPost';

export default class FirestoreBlogRepository extends BlogRepository {
	db: Firestore;
	blogPostsCollection: CollectionReference<DocumentData, DocumentData>;
	constructor(database: Firestore) {
		super();
		this.db = database;
		this.blogPostsCollection = collection(this.db, 'blogPosts');
	}

	// async createBlogPost(title: string, tags: string[], content: string) {
	async createBlogPost(blogPost: BlogPost) {
		try {
			const docRef = await addDoc(this.blogPostsCollection, {
				...blogPost,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp()
			});
			console.log('Document written with ID: ', docRef.id);
			return true;
		} catch (e) {
			console.error('Error getting document: ', e);
			throw e;
		}
	}

	async getAllBlogPosts() {
		try {
			const q = query(this.blogPostsCollection);
			const querySnapshot = await getDocs(q);
			const blogPosts: BlogPost[] = [];
			querySnapshot.forEach((doc) => {
				const post = doc.data() as BlogPost;
				blogPosts.push({ ...post, id: doc.id });
			});
			console.log('Blog posts', blogPosts);
			return blogPosts;
		} catch (e) {
			console.error('Error getting all documents: ', e);
			throw e;
		}
	}

	// async getBlogPost(id: string) {
	// 	try {
	// 		const q = query(this.blogPostsCollection, where('ㄌ', '!=', '1YF044Jnigwo2RJ3qyl5'));
	// 		const querySnapshot = await getDocs(q);
	// 		let blogPost = {} as BlogPost;
	// 		console.log('aaa',querySnapshot.size)

	// 		querySnapshot.forEach((doc) => {
	// 			console.log(doc.id, " => ", doc.data());
	// 			blogPost = {...doc.data()} as BlogPost;
	// 			return
	// 		});

	// 		return blogPost;
	// 	} catch (e) {
	// 		console.error('Error adding document: ', e);
	// 		throw e;
	// 	}
	// }

	// updateBlogPost(postId: number, title: string, tags: string[], content: string): void {
	// 	return this.blogPostsCollection.doc(postId).update({
	// 		title: title,
	// 		tags: tags,
	// 		content: content
	// 	});
	// }

	// deleteBlogPost(postId: number) {
	// 	return this.blogPostsCollection.doc(postId).delete();
	// }
}
