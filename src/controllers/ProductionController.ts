import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { PriceType } from "../entity/PriceType";
import { AlternativeCiphers } from "../entity/AlternativeCiphers";

class ProductionController {

    getALternatives = async (req:any, res:any, next:any) => {
        try {
            const AlternativesList = await AppDataSource.getRepository(AlternativeCiphers)
                                                        .createQueryBuilder("AlternativeCiphers")
                                                        .leftJoinAndSelect("AlternativeCiphers.em","MeasurementUnits")
                                                        .getMany();

            return res.status(200).json({
                alternatives_list: AlternativesList
            });

        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

}


export default ProductionController;