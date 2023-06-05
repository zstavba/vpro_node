import { get } from "http";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

class UserController {

    get =   async (req:any, res:any, next:any) => {
        const users = await AppDataSource.manager.find(User);

        return res.status(200).json({
            "users": users
        });
    }

    login = async (req:any, res:any, next:any) => {
        
    }



}

export default UserController;