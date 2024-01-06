import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Banks } from "../entity/Banks";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { MeasurementUnits } from "../entity/MeasurementUnits";
import { TrafficType } from "../entity/TrafficType";

class UnitsController {

    get = async (req:any, res:any, next:any) => {
        try {
            const MessurmentUnitsList: any = await AppDataSource.getRepository(MeasurementUnits)
                                                                .createQueryBuilder('MeassurmentUnits')
                                                                .leftJoinAndSelect('MeassurmentUnits.fk_user_id','User')
                                                                .getMany();
            return res.status(200).json(MessurmentUnitsList);
    
        } catch (error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }

}

export default UnitsController;