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


    getByID =  async (req:any, res:any, next: any) => {
        try {
            let ByID = await AppDataSource.manager.findBy(Classification, {
                id: req.params.id
            })

            return res.status(200).json(ByID);


        } catch (error: any)  {
            return res.status(400).json({
                message: error
            })
        }
    }

    deleteItem = async (req:any, resd:any, next:any) => {
        try {
            let ItemID = req.params.id;

            if(ItemID == '' || ItemID == null || ItemID == undefined)
                throw new Error(`Paramater ItemID:  ${ItemID} ne obstaja !!`);

            const findItem = await AppDataSource.manager.findBy(Classification, {
                id: ItemID
            });

            if(findItem != null || findItem == undefined)
                throw new Error(`Objekt z IDjem ${ItemID} ne obstaja !`)

            const deleteItem = await AppDataSource.manager.delete(Classification, {
                id: ItemID
            })

            return resd.status(200).json({
                message: `Object z paramaterom ID: ${ItemID} je bil uspešno izbrisan.`
            })


        } catch(error: any) {
            return resd.status(400).json({
                message: error
            })
        }
    }




}



export default ClassificationsController;