import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";

import { Banks } from "../entity/Banks";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { TrafficType } from "../entity/TrafficType";

class TrafficController {
    get = async (req:any, res: any, next: any) => {
        const traffic_list = await AppDataSource.manager.find(TrafficType);

        return res.status(200).json({
            "traffic_list": traffic_list
        });
    }
}

export default TrafficController;