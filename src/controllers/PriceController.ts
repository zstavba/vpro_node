import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { PriceType } from "../entity/PriceType";

class PriceController {

    get = async (req:any, res:any, next: any) => {
        const prices = await AppDataSource.manager.find(PriceType);

        return res.status(200).json({
            "prices": prices
        });

    }
    
    getByType = async (req:any, res:any, next:any) => {
        const type = await AppDataSource.manager.findBy(PriceType,{
            type: req.params.type
        });

        return res.status(200).json({
            data: type
        });
    }
}

export default PriceController;