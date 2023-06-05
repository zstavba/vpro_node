import { AppDataSource } from "../data-source";
import { Classification } from "../entity/Classifications";

class ClassificationsController{

    get = async (req:any, res:any, next: any) => {
        try {
            const classifications = await AppDataSource.getRepository(Classification)
                                                        .createQueryBuilder("Classification")
                                                        .leftJoinAndSelect("Classification.user_id","User")
                                                        .getMany();

            return res.status(200).json({
                classifications: classifications
            });

        }  catch (error: any) {
            return res.status(400).json({
                message: error
            })
        }     
    }


    getBy = (req:any, res:any, next: any) => {
        
    }




}



export default ClassificationsController;