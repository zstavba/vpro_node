import { get } from "http";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserInformation } from "../entity/UserInformation";

class UserController {

    get =   async (req:any, res:any, next:any) => {
        try {
            const users = await AppDataSource.manager.find(User);

            return res.status(200).json(users);
    
        } catch (error: any) {
            return res.status(400).json(error);
        }



    }

    getUserByType = async (req:any, res:any, next: any) => {
        try {
            const getByType = await AppDataSource.getRepository(UserInformation)
                                                 .createQueryBuilder('UserInformation')
                                                 .where({
                                                    user_type: req.params.type
                                                 })
                                                 .leftJoinAndSelect('UserInformation.user','User')
                                                 .getMany();

            return res.status(200).json(getByType);
        } catch (error: any) {
            return res.status(400).json(error)
        }
    }


    login = async (req:any, res:any, next:any) => {
        
    }



}

export default UserController;