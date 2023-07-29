import BlogRepository from "./BlogRepository";

export default class FirestoreBlogRepository extends BlogRepository {
  constructor(database) {
    super();
    this.db = database;
    this.blogPostsCollection = this.db.collection("blogPosts");
  }

  createBlogPost(title: string, tags: string[], content: string) {
    return this.blogPostsCollection.add({
      title: title,
      tags: tags,
      content: content
    });
  }

  getAllBlogPosts() {
    return this.blogPostsCollection.get();
  }

	updateBlogPost(postId: number, title: string, tags: string[], content: string): void {
    return this.blogPostsCollection.doc(postId).update({
      title: title,
      tags: tags,
      content: content
    });
  }

  deleteBlogPost(postId: number) {
    return this.blogPostsCollection.doc(postId).delete();
  }
}
