import { Client, Account, ID} from 'appwrite'
import config from '../config/config'

 

export class AuthServices{
    
    client;
    account;

    constructor() {
        this.client = new Client();
        this.client.setEndpoint(config.appwriteUrl) // Your API Endpoint
                   .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async  createAccount ({email, userName, password}){

        // const userAccount =await this.account.create( ID.unique(), email,userName, password );
        // userAccount.then(({email, password})=> this.login({email, password}) ).catch((err)=> err.message);

        try{
            const promise = await this.account.create(ID.unique(), email,userName, password );
            
            if (promise){
                return   this.login({email, password});

            } else {
                return userAccount;
            }

        } catch (error){
             throw ("error", error.message );
        }
    };

    async login ({email, password}){
      try {
        return  await this.account.createEmailSession(email, password);

      } catch (error) {
         throw error;
      }
    }

    async getCurrentuser(){
        try {
            return  await  this.account.get()
            
        } catch (error) {
            throw error
        }


    }

    async logout (){
        try{
            this.account.deleteSessions();

        } catch (error){
throw error
        }
    }



}

const  authService= new AuthServices();
export default authService;