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
        const units_list = await AppDataSource.manager.find(MeasurementUnits);

        return res.status(200).json({
            "units": units_list
        });
    }

}

export default UnitsController;