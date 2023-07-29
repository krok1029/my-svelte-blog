import FirestoreBlogRepository from "./blog/FirestoreBlogRepository";

export default class RepositoryFactory {
  static createBlogRepository(databaseType: string) {
    switch (databaseType) {
      case "Firestore":
        return new FirestoreBlogRepository(firebase.firestore());
      // 可以在這裡添加其他資料庫類型的支援
      // case "MySQL":
      //   return new MySQLBlogRepository(/* MySQL 連線設定 */);
      default:
        throw new Error("不支援的資料庫類型");
    }
  }
}
