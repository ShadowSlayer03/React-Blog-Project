import config from "../config/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      throw new Error(`Failed to create DB documents - ${error}`);
    }
  }

  async updatePost({ title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw new Error(`Failed to update DB documents - ${error}`);
    }
  }

  async deletePost(slug) {
    try {
       return await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
      );
    } catch (error) {
      throw new Error(`Failed to delete DB documents - ${error}`);
    }
  }

  async getPost(slug) {
    try {
       return await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
      );
    } catch (error) {
      throw new Error(`Failed to get DB document - ${error}`);
    }
  }

  async listPosts(queries= [Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            queries,
        )
    } catch (error) {
        throw new Error(`Failed to list all DB documents - ${error}`);
    }
  } 

  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        throw new Error(`Failed to upload document to DB - ${error}`);
    }
  }
  async deleteFile(fileID){
    try {
        return await this.bucket.deleteFile(
            config.appwriteBucketID,
            fileID,
        )
    } catch (error) {
        throw new Error(`Failed to delete document in DB - ${error}`);
    }
  }

  getFilePreview(fileID){
    return this.bucket.getFilePreview(
        config.appwriteBucketID,
        fileID
    )
  }
}


const service = new Service();
export default service;
