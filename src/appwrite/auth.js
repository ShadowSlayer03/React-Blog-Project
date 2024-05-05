import config from "../config/config";
import { Client, Account, ID } from "appwrite";

// Made wrapper functions for each inbuilt function so that 
// the same functions can be called in case of BaaS changes,
// better error handling messages are provided and 
// changes have to be made in only a single file.

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession({ email, password });
    } catch (error) {
      throw new Error(`Login Failed - ${error.message}`);
    }
  }

  async logout(){
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        throw new Error(`Logout Failed - ${error.message}`)
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (!userAccount) {
        throw new Error("Sorry! Account Could Not be Created!");
      } else {
        return this.login({ email, password });
      }
    } catch (error) {
      throw new Error(`Sign Up Failed - ${error.message}`);
    }
  }

  async getCurrentUser() {
    try {
      const account =  await this.account.get();
      
      console.log("Account inside auth.js",account);

      if(!account){
        throw new Error("No Account Found!");
      }else{
        return account;
      }

    } catch (error) {
      throw new Error(`Account Could Not be Fetched! - ${error.message}`);
    }
  }
}

const authService = new AuthService();

export default authService;
